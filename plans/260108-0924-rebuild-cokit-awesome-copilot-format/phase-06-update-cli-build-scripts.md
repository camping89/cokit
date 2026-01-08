# Phase 6: Update CLI & Build Scripts

## Context Links
- [Main Plan](./plan.md)
- [Phase 5: Create Collections](./phase-05-create-collections.md)

## Overview

| Priority | Status | Effort |
|----------|--------|--------|
| P1 | pending | 2h |

## Key Insights

1. CLI phai update de copy new structure
2. Build scripts generate README tu files
3. Validation scripts ensure format compliance
4. npm scripts cho developer workflow

## Requirements

### CLI Commands Update

| Command | Current | Updated |
|---------|---------|---------|
| `cokit init` | Copy templates/ | Copy all categories |
| `cokit add <name>` | Add single skill | Add prompt/instruction/agent |
| `cokit list` | List skills | List all categories |
| `cokit doctor` | Check setup | Validate all files |

### Build Scripts (eng/)

| Script | Purpose |
|--------|---------|
| `constants.mjs` | Shared constants and templates |
| `yaml-parser.mjs` | Parse frontmatter and YAML |
| `update-readme.mjs` | Generate READMEs |
| `validate-collections.mjs` | Validate collection schema |
| `validate-skills.mjs` | Validate skill structure |
| `create-collection.mjs` | Scaffold new collection |
| `create-skill.mjs` | Scaffold new skill |

## Implementation Steps

### Step 1: Update src/utils/paths.js

```javascript
// src/utils/paths.js
import { join } from 'path';
import { homedir } from 'os';

// Source directories (in package)
export function getPackageDir() {
  return join(import.meta.dirname, '..', '..');
}

export function getAgentsSourceDir() {
  return join(getPackageDir(), 'agents');
}

export function getPromptsSourceDir() {
  return join(getPackageDir(), 'prompts');
}

export function getInstructionsSourceDir() {
  return join(getPackageDir(), 'instructions');
}

export function getSkillsSourceDir() {
  return join(getPackageDir(), 'skills');
}

export function getCollectionsSourceDir() {
  return join(getPackageDir(), 'collections');
}

export function getTemplatesDir() {
  return join(getPackageDir(), 'templates', 'repo');
}

// Target directories
export function getRepoGithubDir(cwd = process.cwd()) {
  return join(cwd, '.github');
}

export function getRepoVscodeDir(cwd = process.cwd()) {
  return join(cwd, '.vscode');
}

export function getUserCopilotDir() {
  return join(homedir(), '.copilot');
}

export function getUserSkillsDir() {
  return join(getUserCopilotDir(), 'skills');
}

export function getUserPromptsDir() {
  return join(getUserCopilotDir(), 'prompts');
}

export function getUserInstructionsDir() {
  return join(getUserCopilotDir(), 'instructions');
}
```

### Step 2: Update src/commands/init.js

```javascript
// src/commands/init.js
import { Command } from 'commander';
import prompts from 'prompts';
import { copyDir, pathExists } from '../utils/copy.js';
import {
  getTemplatesDir,
  getPromptsSourceDir,
  getInstructionsSourceDir,
  getSkillsSourceDir,
  getUserPromptsDir,
  getUserInstructionsDir,
  getUserSkillsDir,
  getRepoGithubDir,
  getRepoVscodeDir
} from '../utils/paths.js';
import { success, error, done, info, hint, bold, cyan } from '../utils/colors.js';
import { join } from 'path';
import { mkdirSync, existsSync, copyFileSync, readdirSync } from 'fs';

export const initCommand = new Command('init')
  .description('Set up CoKit in your project or globally')
  .option('-g, --global', 'Install to ~/.copilot/')
  .option('-a, --all', 'Install both project and global')
  .option('-y, --yes', 'Skip confirmation prompts')
  .option('--overwrite', 'Overwrite existing files')
  .action(async (options) => {
    console.log();
    console.log(bold(cyan('CoKit Setup')));
    console.log();

    try {
      let installProject = false;
      let installGlobal = false;

      if (options.all) {
        installProject = true;
        installGlobal = true;
      } else if (options.global) {
        installGlobal = true;
      } else {
        const response = await prompts({
          type: 'select',
          name: 'mode',
          message: 'What do you want to set up?',
          choices: [
            { title: 'Project templates (.github/)', value: 'project' },
            { title: 'Global prompts & skills (~/.copilot/)', value: 'global' },
            { title: 'Both', value: 'both' }
          ],
          initial: 0
        });

        if (!response.mode) {
          console.log('Setup cancelled.');
          return;
        }

        installProject = response.mode === 'project' || response.mode === 'both';
        installGlobal = response.mode === 'global' || response.mode === 'both';
      }

      if (installProject) {
        info('Setting up project templates...');
        await installProjectTemplates(options);
      }

      if (installGlobal) {
        info('Setting up global prompts and skills...');
        await installGlobalContent(options);
      }

      done('Done! Open VS Code and start using Copilot.');
      hint('Try typing /ck-fix in Copilot Chat.');
      console.log();

    } catch (err) {
      error(`Setup failed: ${err.message}`);
      process.exit(1);
    }
  });

async function installProjectTemplates(options) {
  const cwd = process.cwd();

  // Copy .github/ templates
  const githubSrc = getTemplatesDir();
  const githubDest = getRepoGithubDir(cwd);

  if (pathExists(join(githubSrc, '.github'))) {
    await copyDir(join(githubSrc, '.github'), githubDest, {
      overwrite: options.overwrite,
      prompt: !options.yes
    });
  }

  // Copy .vscode/ templates
  const vscodeSrc = join(githubSrc, '.vscode');
  const vscodeDest = getRepoVscodeDir(cwd);

  if (pathExists(vscodeSrc)) {
    await copyDir(vscodeSrc, vscodeDest, {
      overwrite: options.overwrite,
      prompt: !options.yes
    });
  }
}

async function installGlobalContent(options) {
  // Ensure directories exist
  const dirs = [getUserPromptsDir(), getUserInstructionsDir(), getUserSkillsDir()];
  dirs.forEach(dir => {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  });

  // Copy prompts
  const promptsSrc = getPromptsSourceDir();
  if (pathExists(promptsSrc)) {
    await copyDir(promptsSrc, getUserPromptsDir(), {
      overwrite: options.overwrite,
      prompt: !options.yes
    });
    info(`Copied prompts to ${getUserPromptsDir()}`);
  }

  // Copy instructions
  const instructionsSrc = getInstructionsSourceDir();
  if (pathExists(instructionsSrc)) {
    await copyDir(instructionsSrc, getUserInstructionsDir(), {
      overwrite: options.overwrite,
      prompt: !options.yes
    });
    info(`Copied instructions to ${getUserInstructionsDir()}`);
  }

  // Copy skills
  const skillsSrc = getSkillsSourceDir();
  if (pathExists(skillsSrc)) {
    await copyDir(skillsSrc, getUserSkillsDir(), {
      overwrite: options.overwrite,
      prompt: !options.yes
    });
    info(`Copied skills to ${getUserSkillsDir()}`);
  }
}
```

### Step 3: Create eng/constants.mjs

```javascript
// eng/constants.mjs
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const ROOT_FOLDER = path.join(__dirname, '..');
export const AGENTS_DIR = path.join(ROOT_FOLDER, 'agents');
export const PROMPTS_DIR = path.join(ROOT_FOLDER, 'prompts');
export const INSTRUCTIONS_DIR = path.join(ROOT_FOLDER, 'instructions');
export const SKILLS_DIR = path.join(ROOT_FOLDER, 'skills');
export const COLLECTIONS_DIR = path.join(ROOT_FOLDER, 'collections');
export const DOCS_DIR = path.join(ROOT_FOLDER, 'docs');

export const SKILL_NAME_MAX_LENGTH = 64;
export const SKILL_DESCRIPTION_MIN_LENGTH = 10;
export const SKILL_DESCRIPTION_MAX_LENGTH = 1024;
export const MAX_COLLECTION_ITEMS = 50;

export const TEMPLATES = {
  agentsSection: `## Custom Agents

CoKit agents for specialized development tasks.`,

  promptsSection: `## Reusable Prompts

Ready-to-use prompts with the \`ck-\` prefix.`,

  instructionsSection: `## Custom Instructions

Coding standards and best practices for specific technologies.`,

  skillsSection: `## Agent Skills

Skills with bundled assets for complex workflows.`,

  collectionsSection: `## Collections

Curated collections of prompts, instructions, and agents.`
};
```

### Step 4: Create eng/yaml-parser.mjs

```javascript
// eng/yaml-parser.mjs
import fs from 'fs';
import yaml from 'js-yaml';

export function parseFrontmatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return null;

    return yaml.load(match[1]);
  } catch (e) {
    console.warn(`Failed to parse frontmatter: ${filePath}`);
    return null;
  }
}

export function parseCollectionYaml(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return yaml.load(content);
  } catch (e) {
    console.warn(`Failed to parse collection: ${filePath}`);
    return null;
  }
}

export function parseSkillMetadata(skillPath) {
  const skillMd = path.join(skillPath, 'SKILL.md');
  if (!fs.existsSync(skillMd)) return null;

  const frontmatter = parseFrontmatter(skillMd);
  if (!frontmatter) return null;

  // Get bundled assets
  const assets = fs.readdirSync(skillPath)
    .filter(f => f !== 'SKILL.md' && !f.startsWith('.'));

  return {
    name: frontmatter.name,
    description: frontmatter.description,
    assets
  };
}
```

### Step 5: Create eng/update-readme.mjs

Simplified version of Awesome Copilot's script:

```javascript
#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import {
  ROOT_FOLDER,
  AGENTS_DIR,
  PROMPTS_DIR,
  INSTRUCTIONS_DIR,
  SKILLS_DIR,
  COLLECTIONS_DIR,
  DOCS_DIR,
  TEMPLATES
} from './constants.mjs';
import { parseFrontmatter, parseCollectionYaml, parseSkillMetadata } from './yaml-parser.mjs';

function generateSection(dir, extension, template) {
  if (!fs.existsSync(dir)) return '';

  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith(extension))
    .sort();

  if (files.length === 0) return '';

  let content = `${template}\n\n| Name | Description |\n| ---- | ----------- |\n`;

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const fm = parseFrontmatter(filePath);
    const name = file.replace(extension, '');
    const description = fm?.description || 'No description';
    content += `| [${name}](${path.basename(dir)}/${file}) | ${description} |\n`;
  });

  return content;
}

function main() {
  console.log('Generating README files...');

  // Ensure docs directory exists
  if (!fs.existsSync(DOCS_DIR)) {
    fs.mkdirSync(DOCS_DIR, { recursive: true });
  }

  // Generate category READMEs
  const agentsContent = generateSection(AGENTS_DIR, '.agent.md', TEMPLATES.agentsSection);
  const promptsContent = generateSection(PROMPTS_DIR, '.prompt.md', TEMPLATES.promptsSection);
  const instructionsContent = generateSection(INSTRUCTIONS_DIR, '.instructions.md', TEMPLATES.instructionsSection);

  fs.writeFileSync(path.join(DOCS_DIR, 'README.agents.md'), agentsContent || '# Agents\n\nNo agents found.');
  fs.writeFileSync(path.join(DOCS_DIR, 'README.prompts.md'), promptsContent || '# Prompts\n\nNo prompts found.');
  fs.writeFileSync(path.join(DOCS_DIR, 'README.instructions.md'), instructionsContent || '# Instructions\n\nNo instructions found.');

  console.log('README files generated successfully!');
}

main();
```

### Step 6: Update package.json Scripts

```json
{
  "scripts": {
    "build": "node eng/update-readme.mjs",
    "collection:validate": "node eng/validate-collections.mjs",
    "collection:create": "node eng/create-collection.mjs",
    "skill:validate": "node eng/validate-skills.mjs",
    "skill:create": "node eng/create-skill.mjs",
    "test": "node --test",
    "lint": "echo 'No linter configured'"
  }
}
```

## Success Criteria

- [ ] `cokit init` copies new structure
- [ ] `cokit list` shows all categories
- [ ] `npm run build` generates READMEs
- [ ] `npm run collection:validate` validates collections
- [ ] `npm run skill:validate` validates skills
- [ ] All scripts run without errors

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Path resolution issues | Medium | High | Test on Windows/Mac/Linux |
| Missing dependencies | Low | Medium | Document in package.json |
| Copy overwrites user files | Medium | High | Add confirmation prompts |
