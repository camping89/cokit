// doctor command - Diagnose setup issues
import { Command } from 'commander';
import { pathExists, listDirs, countFiles } from '../utils/copy.js';
import { getUserSkillsDir, getRepoGithubDir, getRepoVscodeDir } from '../utils/paths.js';
import { success, error, warn, info, hint, bold, cyan } from '../utils/colors.js';
import { join } from 'path';
import { readdirSync, existsSync, readFileSync } from 'fs';
import { execSync } from 'child_process';

export const doctorCommand = new Command('doctor')
  .description('Diagnose CoKit setup issues')
  .action(async () => {
    console.log();
    console.log(bold(cyan('Checking CoKit setup...')));
    console.log();

    let hasIssues = false;

    // Check project-level files
    console.log(bold('Project Files:'));
    const githubDir = getRepoGithubDir();

    // Check copilot-instructions.md
    const instructionsFile = join(githubDir, 'copilot-instructions.md');
    if (pathExists(instructionsFile)) {
      success('.github/copilot-instructions.md exists');
    } else {
      error('.github/copilot-instructions.md not found');
      hint('Run: npx cokit init');
      hasIssues = true;
    }

    // Check prompts directory
    const promptsDir = join(githubDir, 'prompts');
    if (pathExists(promptsDir)) {
      const promptFiles = readdirSync(promptsDir).filter(f => f.endsWith('.prompt.md'));
      if (promptFiles.length >= 6) {
        success(`.github/prompts/ has ${promptFiles.length} prompts`);
      } else {
        warn(`.github/prompts/ has ${promptFiles.length} prompts (expected 6)`);
        hasIssues = true;
      }
    } else {
      error('.github/prompts/ not found');
      hint('Run: npx cokit init');
      hasIssues = true;
    }

    console.log();

    // Check global skills
    console.log(bold('Personal Skills:'));
    const globalSkillsDir = getUserSkillsDir();

    if (pathExists(globalSkillsDir)) {
      const skills = listDirs(globalSkillsDir);
      if (skills.length >= 5) {
        success(`~/.copilot/skills/ has ${skills.length} skills`);
      } else if (skills.length > 0) {
        warn(`~/.copilot/skills/ has ${skills.length} skills (expected 5)`);
      } else {
        error('~/.copilot/skills/ is empty');
        hint('Run: npx cokit init --global');
        hasIssues = true;
      }
    } else {
      error('~/.copilot/skills/ not found');
      hint('Run: npx cokit init --global');
      hasIssues = true;
    }

    console.log();

    // Check VS Code
    console.log(bold('Environment:'));

    // Check if VS Code is installed
    try {
      execSync('code --version', { stdio: 'pipe' });
      success('VS Code detected');
    } catch {
      warn('VS Code not detected in PATH');
      hint('Install VS Code or add to PATH');
    }

    // Check .vscode/settings.json
    const vscodeSettings = join(getRepoVscodeDir(), 'settings.json');
    if (pathExists(vscodeSettings)) {
      success('.vscode/settings.json exists');

      // Check for Copilot settings
      try {
        const settings = JSON.parse(readFileSync(vscodeSettings, 'utf-8'));
        if (settings['github.copilot.chat.useAgentSkills'] === true) {
          success('Agent Skills enabled in settings');
        } else {
          warn('Agent Skills not enabled in settings');
          hint('Add: "github.copilot.chat.useAgentSkills": true');
          hasIssues = true;
        }
      } catch {
        // Can't parse settings, skip
      }
    } else {
      info('.vscode/settings.json not found (optional)');
    }

    console.log();

    // Summary
    if (hasIssues) {
      console.log(bold('Found issues. Run suggested commands to fix.'));
    } else {
      console.log(bold(cyan('✓ Everything looks good!')));
    }
    console.log();
  });
