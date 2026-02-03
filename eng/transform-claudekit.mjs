/**
 * Transform ClaudeKit commands from ~/.claude/ to ck.* namespace
 *
 * Transformations applied:
 * - Rename: /* → /ck.*
 * - Placeholder: $ARGUMENTS → ${input}
 * - Remove model field from frontmatter
 * - Update handoffs to use ck.* commands
 */

import { globby } from 'globby';
import matter from 'gray-matter';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

/**
 * Resolve ClaudeKit path (handles ~ expansion)
 */
function resolveClaudekitPath(configPath) {
  if (configPath.startsWith('~')) {
    return path.join(os.homedir(), configPath.slice(1));
  }
  return configPath;
}

/**
 * Transform a single ClaudeKit command file
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

  // Update command name
  newFrontmatter.name = mapping.cokit_name;

  // Update description if not present
  if (!newFrontmatter.description && mapping.description) {
    newFrontmatter.description = mapping.description;
  }

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

  // Replace command references in content
  newContent = transformContentReferences(newContent, config);

  return {
    filename: `${mapping.cokit_name.replace(/\./g, '-')}.prompt.md`,
    frontmatter: newFrontmatter,
    content: newContent,
    origin: 'claudekit',
    original: mapping.original
  };
}

/**
 * Transform command reference to ck.* namespace
 */
function transformCommandReference(ref, config) {
  if (!ref) return ref;

  // Find mapping by original name
  for (const [ckName, info] of Object.entries(config.mappings)) {
    if (info.original === ref) {
      return ckName;
    }
  }

  // If it's a simple name without ck prefix, add it
  if (!ref.startsWith('ck.')) {
    return `ck.${ref}`;
  }

  return ref;
}

/**
 * Transform content references to ck.* namespace
 */
function transformContentReferences(content, config) {
  let result = content;

  // Build lookup map of original -> ck name
  const originalToCk = {};
  for (const [ckName, info] of Object.entries(config.mappings)) {
    if (info.origin === 'claudekit') {
      originalToCk[info.original] = ckName;
    }
  }

  // Replace /command references (but not /ck.* which are already correct)
  // Match /word but not /ck.word
  result = result.replace(/\/(?!ck\.)(\w+(?:\/\w+)?)/g, (match, name) => {
    if (originalToCk[name]) {
      return `/${originalToCk[name]}`;
    }
    // Check if it's a nested command like plan/hard
    const normalized = name.replace('/', '.');
    if (originalToCk[normalized] || originalToCk[name]) {
      return `/${originalToCk[normalized] || originalToCk[name]}`;
    }
    return match;
  });

  // Replace backtick-wrapped command references
  result = result.replace(/`\/(?!ck\.)(\w+(?:\/\w+)?)`/g, (match, name) => {
    if (originalToCk[name]) {
      return `\`/${originalToCk[name]}\``;
    }
    return match;
  });

  return result;
}

/**
 * Find the actual file path for a ClaudeKit command
 * Handles various file structures (index.md, direct .md, nested dirs)
 */
async function findCommandFile(baseDir, upstreamFile) {
  // Try exact path first
  const exactPath = path.join(baseDir, upstreamFile);
  try {
    const stat = await fs.stat(exactPath);
    if (stat.isFile()) return exactPath;
  } catch {}

  // Try without extension variations
  const variations = [
    upstreamFile,
    upstreamFile.replace('.md', '/index.md'),
    upstreamFile.replace('/index.md', '.md'),
    `${upstreamFile}.md`
  ];

  for (const variant of variations) {
    const varPath = path.join(baseDir, variant);
    try {
      const stat = await fs.stat(varPath);
      if (stat.isFile()) return varPath;
    } catch {}
  }

  return null;
}

/**
 * Transform all ClaudeKit commands
 * @param {object} config - Resource origins config
 * @param {string[]} ignoreList - Commands to skip
 * @returns {object} Transform results with prompts array
 */
export async function transformClaudekit(config, ignoreList = []) {
  const sourceDir = resolveClaudekitPath(config.sources.claudekit.path);
  const results = { prompts: [], errors: [], skipped: [] };

  // Check if source directory exists
  try {
    await fs.access(sourceDir);
  } catch {
    console.warn(`[claudekit] Source directory not found: ${sourceDir}`);
    console.warn('[claudekit] Make sure ClaudeKit is installed at ~/.claude/');
    return results;
  }

  // Process each mapping that has claudekit origin
  for (const [ckName, info] of Object.entries(config.mappings)) {
    if (info.origin !== 'claudekit') continue;
    if (ignoreList.includes(ckName)) {
      results.skipped.push({ command: ckName, reason: 'In ignore list' });
      continue;
    }

    const filePath = await findCommandFile(sourceDir, info.upstream_file);

    if (!filePath) {
      results.skipped.push({
        command: ckName,
        file: info.upstream_file,
        reason: 'Source file not found'
      });
      console.warn(`[claudekit] File not found: ${info.upstream_file}`);
      continue;
    }

    try {
      const mapping = { ...info, cokit_name: ckName };
      const transformed = await transformFile(filePath, mapping, config);
      results.prompts.push(transformed);
      console.log(`[claudekit] Transformed: ${info.upstream_file} → ${transformed.filename}`);
    } catch (err) {
      results.errors.push({ command: ckName, file: info.upstream_file, error: err.message });
      console.error(`[claudekit] Error transforming ${ckName}: ${err.message}`);
    }
  }

  return results;
}
