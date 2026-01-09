// Update checker - Notify users when new version is available
import { homedir } from 'os';
import { join } from 'path';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { warn, hint, bold, cyan, dim } from './colors.js';
import { PACKAGE_ROOT } from './paths.js';

const CACHE_DIR = join(homedir(), '.cokit');
const CACHE_FILE = join(CACHE_DIR, 'update-check.json');
const CHECK_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours
const NPM_REGISTRY_URL = 'https://registry.npmjs.org/cokit-cli';

// Get current version from package.json
function getCurrentVersion() {
  try {
    const pkg = JSON.parse(readFileSync(join(PACKAGE_ROOT, 'package.json'), 'utf8'));
    return pkg.version;
  } catch {
    return null;
  }
}

// Read cache file
function readCache() {
  try {
    if (existsSync(CACHE_FILE)) {
      return JSON.parse(readFileSync(CACHE_FILE, 'utf8'));
    }
  } catch { /* ignore */ }
  return null;
}

// Write cache file
function writeCache(data) {
  try {
    if (!existsSync(CACHE_DIR)) {
      mkdirSync(CACHE_DIR, { recursive: true });
    }
    writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
  } catch { /* ignore */ }
}

// Fetch latest version from npm registry
async function fetchLatestVersion() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000); // 3s timeout

    const response = await fetch(NPM_REGISTRY_URL, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    clearTimeout(timeout);

    if (!response.ok) return null;

    const data = await response.json();
    return data['dist-tags']?.latest || null;
  } catch {
    return null;
  }
}

// Compare semver versions (returns 1 if a > b, -1 if a < b, 0 if equal)
function compareVersions(a, b) {
  const partsA = a.split('.').map(Number);
  const partsB = b.split('.').map(Number);

  for (let i = 0; i < 3; i++) {
    const numA = partsA[i] || 0;
    const numB = partsB[i] || 0;
    if (numA > numB) return 1;
    if (numA < numB) return -1;
  }
  return 0;
}

// Display update notification
function showUpdateNotification(currentVersion, latestVersion) {
  console.log();
  console.log(bold(cyan('╭─────────────────────────────────────────╮')));
  console.log(bold(cyan('│')) + '   Update available! ' + dim(currentVersion) + ' → ' + bold(cyan(latestVersion)) + '     ' + bold(cyan('│')));
  console.log(bold(cyan('│')) + '                                         ' + bold(cyan('│')));
  console.log(bold(cyan('│')) + '   Run: ' + bold('npx cokit-cli@latest init -g') + '   ' + bold(cyan('│')));
  console.log(bold(cyan('╰─────────────────────────────────────────╯')));
  console.log();
}

// Main update check function (non-blocking)
export async function checkForUpdates() {
  try {
    const currentVersion = getCurrentVersion();
    if (!currentVersion) return;

    const cache = readCache();
    const now = Date.now();

    // Check if we have a cached result that's still valid
    if (cache && cache.checkedAt && (now - cache.checkedAt) < CHECK_INTERVAL_MS) {
      // Use cached result
      if (cache.latestVersion && compareVersions(cache.latestVersion, currentVersion) > 0) {
        showUpdateNotification(currentVersion, cache.latestVersion);
      }
      return;
    }

    // Fetch latest version (non-blocking, don't await in main flow)
    const latestVersion = await fetchLatestVersion();

    if (latestVersion) {
      // Update cache
      writeCache({
        checkedAt: now,
        latestVersion,
        currentVersion
      });

      // Show notification if update available
      if (compareVersions(latestVersion, currentVersion) > 0) {
        showUpdateNotification(currentVersion, latestVersion);
      }
    }
  } catch {
    // Silently fail - don't disrupt user experience
  }
}
