/**
 * Transform SpecKit commands from upstream/speckit/ to ck.* namespace
 *
 * Transformations applied:
 * - Rename: /speckit.* → /ck.*
 * - Placeholder: $ARGUMENTS → ${input}
 * - Update handoffs to use ck.* commands
 * - Remove model field from frontmatter
 */

import { globby } from 'globby';
import matter from 'gray-matter';
import fs from 'fs/promises';
import path from 'path';

/**
 * Transform a single SpecKit command file
 * @param {string} filePath - Path to source file
 * @param {object} mapping - Mapping config for this command
 * @param {object} config - Full resource-origins config
 * @returns {object} Transformed prompt object
 */
async function transformFile(filePath, mapping, config) {
  const raw = await fs.readFile(filePath, 'utf8');
  const { data: frontmatter, content } = matter(raw);

  // Transform frontmatter
  const newFrontmatter = { ...frontmatter };

  // Remove model field
  delete newFrontmatter.model;

  // Update command name in frontmatter
  newFrontmatter.name = mapping.cokit_name;

  // Update handoffs to use ck.* namespace
  if (newFrontmatter.handoffs) {
    newFrontmatter.handoffs = newFrontmatter.handoffs.map(handoff => ({
      ...handoff,
      agent: transformCommandReference(handoff.agent, config)
    }));
  }

  // Transform content
  let newContent = content;

  // Replace $ARGUMENTS with ${input}
  newContent = newContent.replace(/\$ARGUMENTS/g, '${input}');

  // Replace /speckit.* command references with /ck.*
  newContent = transformContentReferences(newContent, config);

  return {
    filename: `${mapping.cokit_name.replace(/\./g, '-')}.prompt.md`,
    frontmatter: newFrontmatter,
    content: newContent,
    origin: 'speckit',
    original: mapping.original
  };
}

/**
 * Transform command reference from speckit.* to ck.*
 */
function transformCommandReference(ref, config) {
  if (!ref) return ref;

  // Find mapping by original name
  for (const [ckName, info] of Object.entries(config.mappings)) {
    if (info.original === ref) {
      return ckName;
    }
  }

  // If starts with speckit., try direct mapping
  if (ref.startsWith('speckit.')) {
    const baseName = ref.replace('speckit.', '');
    return `ck.${baseName}`;
  }

  return ref;
}

/**
 * Transform content references from speckit.* to ck.*
 */
function transformContentReferences(content, config) {
  let result = content;

  // Replace /speckit.* with /ck.*
  result = result.replace(/\/speckit\.(\w+)/g, (match, name) => {
    // Find the ck.* equivalent
    for (const [ckName, info] of Object.entries(config.mappings)) {
      if (info.original === `speckit.${name}`) {
        return `/${ckName}`;
      }
    }
    return `/ck.${name}`;
  });

  // Also handle backtick-wrapped references
  result = result.replace(/`speckit\.(\w+)`/g, (match, name) => {
    for (const [ckName, info] of Object.entries(config.mappings)) {
      if (info.original === `speckit.${name}`) {
        return `\`${ckName}\``;
      }
    }
    return `\`ck.${name}\``;
  });

  return result;
}

/**
 * Transform all SpecKit commands
 * @param {object} config - Resource origins config
 * @param {string[]} ignoreList - Commands to skip
 * @returns {object} Transform results with prompts array
 */
export async function transformSpeckit(config, ignoreList = []) {
  const sourceDir = 'upstream/speckit/templates/commands';
  const results = { prompts: [], errors: [], skipped: [] };

  // Check if source directory exists
  try {
    await fs.access(sourceDir);
  } catch {
    console.warn(`[speckit] Source directory not found: ${sourceDir}`);
    return results;
  }

  // Find all markdown files
  const files = await globby('*.md', { cwd: sourceDir });

  for (const file of files) {
    const filePath = path.join(sourceDir, file);

    // Find matching mapping
    let mapping = null;
    let cokitName = null;

    for (const [name, info] of Object.entries(config.mappings)) {
      if (info.origin === 'speckit' && info.upstream_file === file) {
        mapping = { ...info, cokit_name: name };
        cokitName = name;
        break;
      }
    }

    if (!mapping) {
      // Unknown command - add to unknown_commands
      results.skipped.push({ file, reason: 'No mapping found' });
      if (!config.unknown_commands.includes(`speckit:${file}`)) {
        config.unknown_commands.push(`speckit:${file}`);
      }
      continue;
    }

    if (ignoreList.includes(cokitName)) {
      results.skipped.push({ file, reason: 'In ignore list' });
      continue;
    }

    try {
      const transformed = await transformFile(filePath, mapping, config);
      results.prompts.push(transformed);
      console.log(`[speckit] Transformed: ${file} → ${transformed.filename}`);
    } catch (err) {
      results.errors.push({ file, error: err.message });
      console.error(`[speckit] Error transforming ${file}: ${err.message}`);
    }
  }

  return results;
}
