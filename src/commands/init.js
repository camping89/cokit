// init command - Setup CoKit in project or globally
import { Command } from 'commander';
import prompts from 'prompts';
import { copyDir, pathExists } from '../utils/copy.js';
import { getTemplatesDir, getSkillsSourceDir, getUserSkillsDir, getRepoGithubDir, getRepoVscodeDir } from '../utils/paths.js';
import { success, error, done, info, hint, bold, cyan } from '../utils/colors.js';
import { join } from 'path';
import { mkdirSync, existsSync } from 'fs';

export const initCommand = new Command('init')
  .description('Set up CoKit in your project or globally')
  .option('-g, --global', 'Install personal skills to ~/.copilot/')
  .option('-a, --all', 'Install both project templates and personal skills')
  .option('-y, --yes', 'Skip confirmation prompts')
  .option('--overwrite', 'Overwrite existing files without prompting')
  .action(async (options) => {
    console.log();
    console.log(bold(cyan('🚀 CoKit Setup')));
    console.log();

    try {
      // Determine what to install
      let installProject = false;
      let installGlobal = false;

      if (options.all) {
        installProject = true;
        installGlobal = true;
      } else if (options.global) {
        installGlobal = true;
      } else if (!options.global && !options.all) {
        // Interactive mode - ask user
        const response = await prompts({
          type: 'select',
          name: 'mode',
          message: 'What do you want to set up?',
          choices: [
            { title: 'Project templates (.github/)', value: 'project', description: 'For this project only - share via git' },
            { title: 'Personal skills (~/.copilot/)', value: 'global', description: 'Works in all projects' },
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

      // Confirm before proceeding
      if (!options.yes) {
        const targets = [];
        if (installProject) targets.push('.github/');
        if (installGlobal) targets.push('~/.copilot/skills/');

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

      // Install project templates
      if (installProject) {
        info('Setting up project templates...');
        await installProjectTemplates(options);
        console.log();
      }

      // Install global skills
      if (installGlobal) {
        info('Setting up personal skills...');
        await installGlobalSkills(options);
        console.log();
      }

      // Success message
      done('Done! Open VS Code and start using Copilot.');
      hint('Try typing /fix in Copilot Chat.');
      console.log();

    } catch (err) {
      error(`Setup failed: ${err.message}`);
      process.exit(1);
    }
  });

async function installProjectTemplates(options) {
  const templatesDir = getTemplatesDir();
  const cwd = process.cwd();

  // Check if templates exist
  if (!pathExists(templatesDir)) {
    error('Templates not found. Package may be corrupted.');
    return;
  }

  // Copy .github directory
  const githubSrc = join(templatesDir, '.github');
  const githubDest = getRepoGithubDir(cwd);

  if (pathExists(githubSrc)) {
    await copyDir(githubSrc, githubDest, {
      overwrite: options.overwrite,
      prompt: !options.yes
    });
  }

  // Copy .vscode directory
  const vscodeSrc = join(templatesDir, '.vscode');
  const vscodeDest = getRepoVscodeDir(cwd);

  if (pathExists(vscodeSrc)) {
    await copyDir(vscodeSrc, vscodeDest, {
      overwrite: options.overwrite,
      prompt: !options.yes
    });
  }
}

async function installGlobalSkills(options) {
  const skillsSrc = getSkillsSourceDir();
  const skillsDest = getUserSkillsDir();

  // Check if skills source exists
  if (!pathExists(skillsSrc)) {
    error('Skills not found. Package may be corrupted.');
    return;
  }

  // Ensure ~/.copilot/skills/ directory exists
  if (!existsSync(skillsDest)) {
    mkdirSync(skillsDest, { recursive: true });
  }

  await copyDir(skillsSrc, skillsDest, {
    overwrite: options.overwrite,
    prompt: !options.yes
  });
}
