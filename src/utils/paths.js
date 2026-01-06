// Cross-platform path utilities
import { homedir } from 'os';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get package root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const PACKAGE_ROOT = join(__dirname, '..', '..');

// User-level skills directory (~/.copilot/skills/)
export function getUserSkillsDir() {
  return join(homedir(), '.copilot', 'skills');
}

// Repo-level templates source
export function getTemplatesDir() {
  return join(PACKAGE_ROOT, 'templates', 'repo');
}

// User-level skills source
export function getSkillsSourceDir() {
  return join(PACKAGE_ROOT, 'skills');
}

// Get .github directory in current project
export function getRepoGithubDir(cwd = process.cwd()) {
  return join(cwd, '.github');
}

// Get .vscode directory in current project
export function getRepoVscodeDir(cwd = process.cwd()) {
  return join(cwd, '.vscode');
}
