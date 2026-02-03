#!/usr/bin/env node
import YAML from 'js-yaml';
import fs from 'fs/promises';

const config = YAML.load(await fs.readFile('eng/resource-origins.yml', 'utf8'));
const allCommands = Object.keys(config.mappings);
const results = {
  validNavigation: [],
  brokenNavigation: [],
  commandsWithoutNav: []
};

// Check navigation references
for (const [command, nav] of Object.entries(config.navigation || {})) {
  // Check if source command exists
  if (!allCommands.includes(command)) {
    results.brokenNavigation.push({ from: command, issue: 'source command not in mappings' });
    continue;
  }

  // Check if next commands exist
  if (nav.next) {
    for (const nextCmd of nav.next) {
      if (!allCommands.includes(nextCmd)) {
        results.brokenNavigation.push({ from: command, to: nextCmd, issue: 'target command not in mappings' });
      } else {
        results.validNavigation.push({ from: command, to: nextCmd });
      }
    }
  }
}

// Check which commands lack navigation
for (const cmd of allCommands) {
  if (!config.navigation[cmd]) {
    results.commandsWithoutNav.push(cmd);
  }
}

console.log(JSON.stringify(results, null, 2));
