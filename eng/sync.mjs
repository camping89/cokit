#!/usr/bin/env node
/**
 * Main sync orchestrator - merges ClaudeKit + SpecKit into unified ck.* namespace
 * Usage: node eng/sync.mjs [--dry-run]
 */

import { transformClaudekit } from './transform-claudekit.mjs';
import { transformSpeckit } from './transform-speckit.mjs';
import { patchAllNavigation } from './patch-navigation.mjs';
import YAML from 'js-yaml';
import matter from 'gray-matter';
import fs from 'fs/promises';
import path from 'path';

const DRY_RUN = process.argv.includes('--dry-run');

async function main() {
  console.log(`\n🔄 CoKit Sync Pipeline ${DRY_RUN ? '(DRY RUN)' : ''}\n`);

  // 1. Load config
  console.log('📋 Loading resource-origins.yml...');
  const configPath = 'eng/resource-origins.yml';
  const config = YAML.load(await fs.readFile(configPath, 'utf8'));

  // 2. Transform sources in parallel (respecting ignore list)
  console.log('\n🔧 Transforming sources...');
  const ignoreList = config.ignore || [];
  if (ignoreList.length > 0) {
    console.log(`   Ignoring: ${ignoreList.join(', ')}`);
  }
  const [claudekitResults, speckitResults] = await Promise.all([
    transformClaudekit(config, ignoreList),
    transformSpeckit(config, ignoreList)
  ]);

  // 3. Merge results
  const allPrompts = [...claudekitResults.prompts, ...speckitResults.prompts];
  console.log(`\n📦 Total prompts: ${allPrompts.length}`);
  console.log(`   - ClaudeKit: ${claudekitResults.prompts.length}`);
  console.log(`   - SpecKit: ${speckitResults.prompts.length}`);

  if (claudekitResults.skipped.length > 0) {
    console.log(`   - ClaudeKit skipped: ${claudekitResults.skipped.length}`);
  }
  if (speckitResults.skipped.length > 0) {
    console.log(`   - SpecKit skipped: ${speckitResults.skipped.length}`);
  }

  // 4. Patch navigation
  console.log('\n🧭 Patching navigation footers...');
  const patched = patchAllNavigation(allPrompts, config);

  // 5. Write output
  if (!DRY_RUN) {
    console.log('\n💾 Writing output files...');
    await fs.mkdir('prompts', { recursive: true });

    for (const prompt of patched) {
      const outputPath = path.join('prompts', prompt.filename);
      const content = matter.stringify(prompt.content, prompt.frontmatter);
      await fs.writeFile(outputPath, content);
      console.log(`   ✓ ${prompt.filename}`);
    }

    // 6. Update config with sync timestamp
    config.synced_at = new Date().toISOString();
    config.sources.claudekit.last_sync = new Date().toISOString();
    config.sources.speckit.last_sync = new Date().toISOString();
    await fs.writeFile(configPath, YAML.dump(config, { lineWidth: -1 }));
    console.log('\n✓ Updated resource-origins.yml');
  } else {
    console.log('\n📝 Dry run - files that would be written:');
    for (const prompt of patched) {
      console.log(`   ${prompt.filename}`);
    }
  }

  // 7. Report summary
  console.log('\n' + '─'.repeat(50));
  console.log('📊 Sync Summary');
  console.log('─'.repeat(50));
  console.log(`Total commands: ${patched.length}`);
  console.log(`Errors: ${claudekitResults.errors.length + speckitResults.errors.length}`);
  console.log(`Unknown commands: ${config.unknown_commands?.length || 0}`);

  if (config.unknown_commands?.length > 0) {
    console.log('\n⚠️  Unknown commands (add to mappings):');
    config.unknown_commands.forEach(cmd => console.log(`   - ${cmd}`));
  }

  console.log('\n✅ Sync complete!\n');
}

main().catch(err => {
  console.error('\n❌ Sync failed:', err.message);
  process.exit(1);
});
