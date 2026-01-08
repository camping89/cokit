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

// User-level agents directory (~/.copilot/agents/)
export function getUserAgentsDir() {
  return join(homedir(), '.copilot', 'agents');
}

// User-level prompts directory (~/.copilot/prompts/)
export function getUserPromptsDir() {
  return join(homedir(), '.copilot', 'prompts');
}

// User-level instructions directory (~/.copilot/instructions/)
export function getUserInstructionsDir() {
  return join(homedir(), '.copilot', 'instructions');
}

// Source directories in package
export function getAgentsSourceDir() {
  return join(PACKAGE_ROOT, 'agents');
}

export function getPromptsSourceDir() {
  return join(PACKAGE_ROOT, 'prompts');
}

export function getInstructionsSourceDir() {
  return join(PACKAGE_ROOT, 'instructions');
}

export function getSkillsSourceDir() {
  return join(PACKAGE_ROOT, 'skills');
}

export function getCollectionsSourceDir() {
  return join(PACKAGE_ROOT, 'collections');
}

// Repo-level templates source (legacy)
export function getTemplatesDir() {
  return join(PACKAGE_ROOT, 'templates', 'repo');
}

// Get .github directory in current project
export function getRepoGithubDir(cwd = process.cwd()) {
  return join(cwd, '.github');
}

// Get .vscode directory in current project
export function getRepoVscodeDir(cwd = process.cwd()) {
  return join(cwd, '.vscode');
}
