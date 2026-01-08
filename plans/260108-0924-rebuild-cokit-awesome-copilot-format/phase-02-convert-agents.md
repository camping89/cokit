# Phase 2: Convert Agents

## Context Links
- [Main Plan](./plan.md)
- [Phase 1: Restructure Folders](./phase-01-restructure-folders.md)

## Overview

| Priority | Status | Effort |
|----------|--------|--------|
| P1 | pending | 2h |

## Key Insights

1. ClaudeKit agents co frontmatter: `name`, `description`, `model`
2. Awesome Copilot agents can: `description`, `model`, `tools`, `allowed-tools`
3. Model mapping: opus → GPT-4.1, sonnet → GPT-4.0
4. Filename format: `kebab-case.agent.md`

## Requirements

### Source Agents (17 files)

| ClaudeKit Agent | Target File |
|-----------------|-------------|
| `copywriter.md` | `ck-copywriter.agent.md` |
| `docs-manager.md` | `ck-docs-manager.agent.md` |
| `tester.md` | `ck-tester.agent.md` |
| `scout.md` | `ck-scout.agent.md` |
| `debugger.md` | `ck-debugger.agent.md` |
| `project-manager.md` | `ck-project-manager.agent.md` |
| `scout-external.md` | `ck-scout-external.agent.md` |
| `brainstormer.md` | `ck-brainstormer.agent.md` |
| `journal-writer.md` | `ck-journal-writer.agent.md` |
| `database-admin.md` | `ck-database-admin.agent.md` |
| `code-reviewer.md` | `ck-code-reviewer.agent.md` |
| `fullstack-developer.md` | `ck-fullstack-developer.agent.md` |
| `git-manager.md` | `ck-git-manager.agent.md` |
| `mcp-manager.md` | `ck-mcp-manager.agent.md` |
| `planner.md` | `ck-planner.agent.md` |
| `researcher.md` | `ck-researcher.agent.md` |
| `ui-ux-designer.md` | `ck-ui-ux-designer.agent.md` |

### Frontmatter Conversion

**ClaudeKit Format:**
```yaml
---
name: planner
description: Use this agent when...
model: opus
---
```

**Awesome Copilot Format:**
```yaml
---
description: 'Use this agent when...'
model: 'GPT-4.1'
tools: ['search', 'read', 'edit/editFiles']
---
```

### Model Mapping

| ClaudeKit | Copilot |
|-----------|---------|
| opus | GPT-4.1 |
| sonnet | GPT-4.0 |
| (default) | GPT-4.0 |

## Related Code Files

| File | Purpose |
|------|---------|
| `~/.claude/agents/*.md` | Source agents |
| `agents/*.agent.md` | Target location |

## Implementation Steps

### Step 1: Create Conversion Script

Create `eng/convert-agents.mjs`:

```javascript
#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import os from 'os';

const CLAUDE_AGENTS_DIR = path.join(os.homedir(), '.claude', 'agents');
const TARGET_DIR = path.join(process.cwd(), 'agents');

const MODEL_MAP = {
  'opus': 'GPT-4.1',
  'sonnet': 'GPT-4.0'
};

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: content };

  const fm = {};
  match[1].split('\n').forEach(line => {
    const [key, ...val] = line.split(':');
    if (key && val.length) {
      fm[key.trim()] = val.join(':').trim();
    }
  });
  return { frontmatter: fm, body: match[2] };
}

function convertAgent(sourceFile) {
  const content = fs.readFileSync(sourceFile, 'utf8');
  const { frontmatter, body } = parseFrontmatter(content);

  const model = MODEL_MAP[frontmatter.model] || 'GPT-4.0';
  const description = frontmatter.description || 'Agent description';

  const newFm = `---
description: '${description.replace(/'/g, "''")}'
model: '${model}'
---`;

  return `${newFm}\n${body}`;
}

// Main
const files = fs.readdirSync(CLAUDE_AGENTS_DIR)
  .filter(f => f.endsWith('.md'));

files.forEach(file => {
  const source = path.join(CLAUDE_AGENTS_DIR, file);
  const targetName = `ck-${file.replace('.md', '.agent.md')}`;
  const target = path.join(TARGET_DIR, targetName);

  const converted = convertAgent(source);
  fs.writeFileSync(target, converted);
  console.log(`Converted: ${file} -> ${targetName}`);
});
```

### Step 2: Manual Review Checklist

For each converted agent, verify:

1. [ ] Description wrapped in single quotes
2. [ ] Model field present and valid
3. [ ] No broken markdown formatting
4. [ ] Remove Claude-specific references (e.g., "delegate to agent")

### Step 3: Update Agent Content

Replace Claude-specific patterns:

| Find | Replace |
|------|---------|
| `delegate to \`agent\` agent` | `use specialized approach for` |
| `%USERPROFILE%/.claude/` | `project's .github/` |
| `Task tool` | `available tools` |

### Step 4: Add Tools Field (Optional)

Common tools for Copilot agents:

```yaml
tools: ['search', 'read', 'edit/editFiles', 'execute/runInTerminal']
```

## Agent Template

```markdown
---
description: 'Brief description of agent purpose'
model: 'GPT-4.1'
tools: ['search', 'read', 'edit/editFiles']
---

# Agent Name

## Purpose
What this agent does.

## Capabilities
- Capability 1
- Capability 2

## Usage
How to use this agent.
```

## Success Criteria

- [ ] All 17 agents converted
- [ ] Filenames follow `ck-*.agent.md` pattern
- [ ] All have valid frontmatter with `description`
- [ ] Model values are valid Copilot models
- [ ] No Claude-specific references remain

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Description too long | Medium | Low | Truncate to 500 chars |
| Special chars in description | Medium | Low | Escape single quotes |
| Claude-specific features | High | Medium | Manual review |
