// list command - Show installed components
import { Command } from 'commander';
import { pathExists, listDirs, countFiles } from '../utils/copy.js';
import { getUserSkillsDir, getRepoGithubDir } from '../utils/paths.js';
import { success, error, info, bold, cyan, dim } from '../utils/colors.js';
import { join } from 'path';
import { readdirSync, existsSync } from 'fs';

export const listCommand = new Command('list')
  .description('Show installed CoKit components')
  .option('-a, --all', 'Show both project and global')
  .action(async (options) => {
    console.log();
    console.log(bold(cyan('CoKit Installation Status')));
    console.log();

    // Check project-level installation
    console.log(bold('Project (.github/):'));
    const githubDir = getRepoGithubDir();

    if (pathExists(githubDir)) {
      // Check for copilot-instructions.md
      const instructionsFile = join(githubDir, 'copilot-instructions.md');
      if (pathExists(instructionsFile)) {
        success('copilot-instructions.md');
      }

      // Check for AGENTS.md
      const agentsFile = join(githubDir, 'AGENTS.md');
      if (pathExists(agentsFile)) {
        success('AGENTS.md');
      }

      // Check prompts
      const promptsDir = join(githubDir, 'prompts');
      if (pathExists(promptsDir)) {
        const promptFiles = readdirSync(promptsDir).filter(f => f.endsWith('.prompt.md'));
        if (promptFiles.length > 0) {
          success(`prompts/ (${promptFiles.length} prompts)`);
          promptFiles.forEach(f => {
            console.log(dim(`    ${f}`));
          });
        }
      }

      // Check instructions
      const instructionsDir = join(githubDir, 'instructions');
      if (pathExists(instructionsDir)) {
        const instructionFiles = readdirSync(instructionsDir).filter(f => f.endsWith('.instructions.md'));
        if (instructionFiles.length > 0) {
          success(`instructions/ (${instructionFiles.length} files)`);
        }
      }

      // Check skills
      const skillsDir = join(githubDir, 'skills');
      if (pathExists(skillsDir)) {
        const skills = listDirs(skillsDir);
        if (skills.length > 0) {
          success(`skills/ (${skills.length} skills)`);
          skills.forEach(s => {
            console.log(dim(`    ${s}`));
          });
        }
      }
    } else {
      info('Not installed');
    }

    console.log();

    // Check global skills
    console.log(bold('Personal (~/.copilot/skills/):'));
    const globalSkillsDir = getUserSkillsDir();

    if (pathExists(globalSkillsDir)) {
      const skills = listDirs(globalSkillsDir);
      if (skills.length > 0) {
        success(`${skills.length} skills installed`);
        skills.forEach(s => {
          console.log(dim(`    ${s}`));
        });
      } else {
        info('No skills installed');
      }
    } else {
      info('Not installed');
    }

    console.log();
  });
