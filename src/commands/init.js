// init command - Setup CoKit in project or globally
import { Command } from 'commander';
import prompts from 'prompts';
import { copyDir, pathExists } from '../utils/copy.js';
import {
  getTemplatesDir,
  getSkillsSourceDir,
  getAgentsSourceDir,
  getPromptsSourceDir,
  getInstructionsSourceDir,
  getUserSkillsDir,
  getUserAgentsDir,
  getUserPromptsDir,
  getUserInstructionsDir,
  getRepoGithubDir,
  getRepoVscodeDir
} from '../utils/paths.js';
import { success, error, done, info, hint, bold, cyan } from '../utils/colors.js';
import { join } from 'path';
import { mkdirSync, existsSync } from 'fs';

export const initCommand = new Command('init')
  .description('Set up CoKit in your project or globally')
  .option('-g, --global', 'Install all CoKit resources to ~/.copilot/')
  .option('-a, --all', 'Install both project templates and global resources')
  .option('-y, --yes', 'Skip confirmation prompts')
  .option('--overwrite', 'Overwrite existing files without prompting')
  .action(async (options) => {
    console.log();
    console.log(bold(cyan('🚀 CoKit Setup')));
    console.log();

    try {
      let installProject = false;
      let installGlobal = false;

      if (options.all) {
        installProject = true;
        installGlobal = true;
      } else if (options.global) {
        installGlobal = true;
      } else if (!options.global && !options.all) {
        const response = await prompts({
          type: 'select',
          name: 'mode',
          message: 'What do you want to set up?',
          choices: [
            { title: 'Project templates (.github/)', value: 'project', description: 'For this project only - share via git' },
            { title: 'Global resources (~/.copilot/)', value: 'global', description: 'Works in all projects' },
            { title: 'Both', value: 'both', description: 'Recommended for first-time setup' }
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

      if (!options.yes) {
        const targets = [];
        if (installProject) targets.push('.github/');
        if (installGlobal) targets.push('~/.copilot/');

        const confirm = await prompts({
          type: 'confirm',
          name: 'proceed',
          message: `This will create files in ${targets.join(' and ')}. Continue?`,
          initial: true
        });

        if (!confirm.proceed) {
          console.log('Setup cancelled.');
          return;
        }
      }

      console.log();

      if (installProject) {
        info('Setting up project templates...');
        await installProjectTemplates(options);
        console.log();
      }

      if (installGlobal) {
        info('Setting up global CoKit resources...');
        await installGlobalResources(options);
        console.log();
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
  const templatesDir = getTemplatesDir();
  const cwd = process.cwd();

  if (!pathExists(templatesDir)) {
    error('Templates not found. Package may be corrupted.');
    return;
  }

  const githubSrc = join(templatesDir, '.github');
  const githubDest = getRepoGithubDir(cwd);

  if (pathExists(githubSrc)) {
    await copyDir(githubSrc, githubDest, {
      overwrite: options.overwrite,
      prompt: !options.yes
    });
  }

  const vscodeSrc = join(templatesDir, '.vscode');
  const vscodeDest = getRepoVscodeDir(cwd);

  if (pathExists(vscodeSrc)) {
    await copyDir(vscodeSrc, vscodeDest, {
      overwrite: options.overwrite,
      prompt: !options.yes
    });
  }
}

async function installGlobalResources(options) {
  const copyOptions = {
    overwrite: options.overwrite,
    prompt: !options.yes
  };

  // Install agents
  const agentsSrc = getAgentsSourceDir();
  const agentsDest = getUserAgentsDir();
  if (pathExists(agentsSrc)) {
    ensureDir(agentsDest);
    await copyDir(agentsSrc, agentsDest, copyOptions);
    success(`  ✓ Agents installed to ${agentsDest}`);
  }

  // Install prompts
  const promptsSrc = getPromptsSourceDir();
  const promptsDest = getUserPromptsDir();
  if (pathExists(promptsSrc)) {
    ensureDir(promptsDest);
    await copyDir(promptsSrc, promptsDest, copyOptions);
    success(`  ✓ Prompts installed to ${promptsDest}`);
  }

  // Install instructions
  const instructionsSrc = getInstructionsSourceDir();
  const instructionsDest = getUserInstructionsDir();
  if (pathExists(instructionsSrc)) {
    ensureDir(instructionsDest);
    await copyDir(instructionsSrc, instructionsDest, copyOptions);
    success(`  ✓ Instructions installed to ${instructionsDest}`);
  }

  // Install skills
  const skillsSrc = getSkillsSourceDir();
  const skillsDest = getUserSkillsDir();
  if (pathExists(skillsSrc)) {
    ensureDir(skillsDest);
    await copyDir(skillsSrc, skillsDest, copyOptions);
    success(`  ✓ Skills installed to ${skillsDest}`);
  }
}

function ensureDir(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}
