/**
 * Patch navigation footer into all transformed prompts
 * Injects "Suggested Next Steps" section for cross-command workflow navigation
 */

/**
 * Generate navigation footer based on current command
 */
function generateNavigationFooter(commandName, config) {
  const nav = config.navigation || {};
  const nextCommands = nav[commandName]?.next || [];
  const allCommands = Object.keys(config.mappings).sort();

  let nextStepsRows = '';
  if (nextCommands.length > 0) {
    nextStepsRows = nextCommands.map(cmd => {
      const info = config.mappings[cmd];
      return `| \`/${cmd}\` | ${info?.description || 'Continue workflow'} |`;
    }).join('\n');
  } else {
    nextStepsRows = getDefaultSuggestions(commandName, config);
  }

  return `
---

## Suggested Next Steps

| Command | Description |
|---------|-------------|
${nextStepsRows}

**All commands:** ${allCommands.map(c => `\`${c}\``).join(', ')}
`;
}

function getDefaultSuggestions(commandName, config) {
  const suggestions = [];
  if (commandName.includes('brainstorm')) {
    suggestions.push(['ck.specify', 'Formalize ideas into specification']);
    suggestions.push(['ck.plan.fast', 'Quick implementation plan']);
  } else if (commandName.includes('specify') || commandName.includes('clarify')) {
    suggestions.push(['ck.plan', 'Create implementation plan']);
    suggestions.push(['ck.brainstorm', 'Explore implementation approaches']);
  } else if (commandName.includes('plan')) {
    suggestions.push(['ck.cook', 'Start implementation']);
    suggestions.push(['ck.tasks', 'Break into actionable tasks']);
  } else if (commandName.includes('cook') || commandName.includes('implement')) {
    suggestions.push(['ck.test', 'Run tests']);
    suggestions.push(['ck.fix', 'Fix issues']);
  } else if (commandName.includes('test')) {
    suggestions.push(['ck.fix', 'Fix failing tests']);
    suggestions.push(['ck.review', 'Review codebase']);
  } else {
    suggestions.push(['ck.brainstorm', 'Explore ideas']);
    suggestions.push(['ck.plan', 'Create plan']);
  }
  return suggestions.map(([cmd, desc]) => `| \`/${cmd}\` | ${desc} |`).join('\n');
}

export function patchNavigation(prompt, config) {
  const commandName = prompt.frontmatter.name || prompt.filename.replace('.prompt.md', '').replace(/-/g, '.');
  if (prompt.content.includes('## Suggested Next Steps')) return prompt;
  return { ...prompt, content: prompt.content.trimEnd() + '\n' + generateNavigationFooter(commandName, config) };
}

export function patchAllNavigation(prompts, config) {
  return prompts.map(prompt => patchNavigation(prompt, config));
}
