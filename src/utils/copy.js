// File copy utilities with conflict handling
import { existsSync, mkdirSync, readdirSync, statSync, copyFileSync, readFileSync, writeFileSync } from 'fs';
import { join, basename, dirname } from 'path';
import prompts from 'prompts';
import { success, warn, hint } from './colors.js';

// Copy directory recursively with conflict handling
export async function copyDir(src, dest, options = {}) {
  const { overwrite = false, prompt = true } = options;
  const copied = [];
  const skipped = [];

  if (!existsSync(src)) {
    throw new Error(`Source directory not found: ${src}`);
  }

  await copyDirRecursive(src, dest, { overwrite, prompt, copied, skipped });

  return { copied, skipped };
}

async function copyDirRecursive(src, dest, ctx) {
  // Create dest directory if not exists
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }

  const entries = readdirSync(src);

  for (const entry of entries) {
    // Skip .gitkeep files
    if (entry === '.gitkeep') continue;

    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    const stat = statSync(srcPath);

    if (stat.isDirectory()) {
      await copyDirRecursive(srcPath, destPath, ctx);
    } else {
      await copyFile(srcPath, destPath, ctx);
    }
  }
}

async function copyFile(src, dest, ctx) {
  const { overwrite, prompt, copied, skipped } = ctx;
  const relativeDest = dest.replace(process.cwd(), '.');

  // Check if file exists
  if (existsSync(dest)) {
    if (overwrite) {
      copyFileSync(src, dest);
      copied.push(relativeDest);
      success(`Updated ${relativeDest}`);
    } else if (prompt) {
      const response = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: `${relativeDest} exists. Overwrite?`,
        initial: false
      });

      if (response.overwrite) {
        copyFileSync(src, dest);
        copied.push(relativeDest);
        success(`Updated ${relativeDest}`);
      } else {
        skipped.push(relativeDest);
        warn(`Skipped ${relativeDest}`);
      }
    } else {
      skipped.push(relativeDest);
    }
  } else {
    // Ensure parent directory exists
    const dir = dirname(dest);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    copyFileSync(src, dest);
    copied.push(relativeDest);
    success(`Created ${relativeDest}`);
  }
}

// Check if a path exists
export function pathExists(p) {
  return existsSync(p);
}

// Count files in directory recursively
export function countFiles(dir) {
  if (!existsSync(dir)) return 0;

  let count = 0;
  const entries = readdirSync(dir);

  for (const entry of entries) {
    if (entry === '.gitkeep') continue;
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      count += countFiles(fullPath);
    } else {
      count++;
    }
  }

  return count;
}

// List subdirectories in a directory
export function listDirs(dir) {
  if (!existsSync(dir)) return [];

  return readdirSync(dir)
    .filter(entry => {
      const fullPath = join(dir, entry);
      return statSync(fullPath).isDirectory();
    });
}
