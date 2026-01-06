// add command - Add specific skills
import { Command } from 'commander';
import { copyDir, pathExists, listDirs } from '../utils/copy.js';
import { getSkillsSourceDir, getUserSkillsDir } from '../utils/paths.js';
import { success, error, info, done, hint, bold, cyan } from '../utils/colors.js';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

// Validate skill name to prevent path traversal
function validateSkillName(skill) {
  if (!skill || !/^[a-zA-Z0-9_-]+$/.test(skill)) {
    return false;
  }
  return true;
}

export const addCommand = new Command('add')
  .description('Add a specific skill')
  .argument('[skill]', 'Skill name to add')
  .option('-l, --list', 'List available skills')
  .option('-g, --global', 'Add to ~/.copilot/skills/ (default)')
  .option('--local', 'Add to .github/skills/ in current project')
  .option('--overwrite', 'Overwrite existing files')
  .action(async (skill, options) => {
    const skillsSrc = getSkillsSourceDir();

    // List available skills
    if (options.list || !skill) {
      console.log();
      console.log(bold(cyan('Available Skills:')));
      console.log();

      const skills = listDirs(skillsSrc);
      if (skills.length === 0) {
        info('No skills available.');
      } else {
        skills.forEach(s => {
          console.log(`  • ${s}`);
        });
        console.log();
        hint('Run: npx cokit add <skill-name>');
      }
      return;
    }

    // Validate skill name (prevent path traversal)
    if (!validateSkillName(skill)) {
      error('Invalid skill name. Use only letters, numbers, hyphens, and underscores.');
      return;
    }

    // Validate skill exists
    const skillSrc = join(skillsSrc, skill);
    if (!pathExists(skillSrc)) {
      error(`Skill "${skill}" not found.`);
      hint('Run: npx cokit add --list');
      return;
    }

    // Determine destination
    let skillDest;
    if (options.local) {
      skillDest = join(process.cwd(), '.github', 'skills', skill);
    } else {
      skillDest = join(getUserSkillsDir(), skill);
    }

    // Ensure parent directory exists
    const parentDir = join(skillDest, '..');
    if (!existsSync(parentDir)) {
      mkdirSync(parentDir, { recursive: true });
    }

    try {
      console.log();
      info(`Adding skill: ${skill}`);

      await copyDir(skillSrc, skillDest, {
        overwrite: options.overwrite,
        prompt: true
      });

      console.log();
      done(`Skill "${skill}" added!`);
      if (options.local) {
        hint('Skill added to .github/skills/');
      } else {
        hint('Skill added to ~/.copilot/skills/');
      }
    } catch (err) {
      error(`Failed to add skill: ${err.message}`);
    }
  });
