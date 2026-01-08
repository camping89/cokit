# Phase 3: Convert Commands to Prompts

## Context Links
- [Main Plan](./plan.md)
- [Phase 2: Convert Agents](./phase-02-convert-agents.md)

## Overview

| Priority | Status | Effort |
|----------|--------|--------|
| P1 | pending | 4h |

## Key Insights

1. ClaudeKit commands dung nested folder structure (e.g., `ck/fix/hard.md`)
2. Awesome Copilot prompts la flat files (e.g., `ck-fix-hard.prompt.md`)
3. ClaudeKit dung `$ARGUMENTS` variable - Copilot khong co equivalent
4. Prompts phai co `agent` field (value = `'agent'` for reusable prompts)

## Requirements

### Source Commands Structure

```
~/.claude/commands/ck/
├── fix.md                    → ck-fix.prompt.md
├── fix/
│   ├── fast.md               → ck-fix-fast.prompt.md
│   ├── hard.md               → ck-fix-hard.prompt.md
│   ├── parallel.md           → ck-fix-parallel.prompt.md
│   ├── logs.md               → ck-fix-logs.prompt.md
│   ├── test.md               → ck-fix-test.prompt.md
│   ├── ci.md                 → ck-fix-ci.prompt.md
│   ├── types.md              → ck-fix-types.prompt.md
│   └── ui.md                 → ck-fix-ui.prompt.md
├── code.md                   → ck-code.prompt.md
├── code/
│   ├── auto.md               → ck-code-auto.prompt.md
│   ├── no-test.md            → ck-code-no-test.prompt.md
│   └── parallel.md           → ck-code-parallel.prompt.md
├── plan.md                   → ck-plan.prompt.md
├── plan/
│   ├── fast.md               → ck-plan-fast.prompt.md
│   ├── hard.md               → ck-plan-hard.prompt.md
│   ├── parallel.md           → ck-plan-parallel.prompt.md
│   ├── validate.md           → ck-plan-validate.prompt.md
│   ├── archive.md            → ck-plan-archive.prompt.md
│   └── ...
├── test.md                   → ck-test.prompt.md
├── debug.md                  → ck-debug.prompt.md
├── cook.md                   → ck-cook.prompt.md
├── cook/
│   ├── auto.md               → ck-cook-auto.prompt.md
│   └── auto/
│       ├── fast.md           → ck-cook-auto-fast.prompt.md
│       └── parallel.md       → ck-cook-auto-parallel.prompt.md
├── docs/
│   ├── init.md               → ck-docs-init.prompt.md
│   ├── update.md             → ck-docs-update.prompt.md
│   └── summarize.md          → ck-docs-summarize.prompt.md
├── git/
│   ├── pr.md                 → ck-git-pr.prompt.md
│   ├── cm.md                 → ck-git-cm.prompt.md
│   ├── cp.md                 → ck-git-cp.prompt.md
│   └── merge.md              → ck-git-merge.prompt.md
└── ... (71 total)
```

### Complete Command List (71 files)

| Category | Commands |
|----------|----------|
| Core | fix, code, plan, test, debug, cook |
| Fix variants | fast, hard, parallel, logs, test, ci, types, ui |
| Code variants | auto, no-test, parallel |
| Plan variants | fast, hard, parallel, validate, archive, two, ci, cro |
| Cook variants | auto, auto/fast, auto/parallel |
| Bootstrap | bootstrap, auto, auto/parallel, auto/fast |
| Docs | init, update, summarize |
| Git | pr, cm, cp, merge |
| Design | video, screenshot, describe, 3d, fast, good |
| Content | enhance, fast, cro, good |
| Review | codebase |
| Skill | fix-logs, add, create, optimize, optimize/auto, plan |
| Integrate | polar, sepay |
| Utility | ask, watzup, scout, scout/ext, journal, brainstorm, preview, kanban, worktree, coding-level, ck-help, use-mcp, test/ui |

### Frontmatter Conversion

**ClaudeKit Format:**
```yaml
---
description: Fix issues
argument-hint: [issues]
---
```

**Awesome Copilot Format:**
```yaml
---
agent: 'agent'
description: 'Fix issues - provide issues in chat'
model: 'GPT-4.0'
---
```

## Implementation Steps

### Step 1: Create Flattening Script

Create `eng/convert-commands.mjs`:

```javascript
#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import os from 'os';

const COMMANDS_DIR = path.join(os.homedir(), '.claude', 'commands', 'ck');
const TARGET_DIR = path.join(process.cwd(), 'prompts');

function flattenPath(relativePath) {
  // ck/fix/hard.md -> ck-fix-hard.prompt.md
  return 'ck-' + relativePath
    .replace(/\//g, '-')
    .replace('.md', '.prompt.md');
}

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

function convertPrompt(content, filename) {
  const { frontmatter, body } = parseFrontmatter(content);

  let description = frontmatter.description || `Prompt: ${filename}`;

  // Handle $ARGUMENTS
  let newBody = body.replace(/\$ARGUMENTS/g, '[user input from chat]');

  // Add note about arguments if present
  if (body.includes('$ARGUMENTS') || frontmatter['argument-hint']) {
    const hint = frontmatter['argument-hint'] || 'input';
    description += ` - Provide ${hint} in chat`;
  }

  // Clean description
  description = description
    .replace(/'/g, "''")
    .substring(0, 500);

  const newFm = `---
agent: 'agent'
description: '${description}'
---`;

  return `${newFm}\n${newBody}`;
}

function walkDir(dir, base = '') {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = base ? `${base}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      files.push(...walkDir(fullPath, relativePath));
    } else if (entry.name.endsWith('.md')) {
      files.push({ fullPath, relativePath });
    }
  }
  return files;
}

// Main
const files = walkDir(COMMANDS_DIR);
console.log(`Found ${files.length} command files`);

files.forEach(({ fullPath, relativePath }) => {
  const content = fs.readFileSync(fullPath, 'utf8');
  const targetName = flattenPath(relativePath);
  const target = path.join(TARGET_DIR, targetName);

  const converted = convertPrompt(content, targetName);
  fs.writeFileSync(target, converted);
  console.log(`Converted: ${relativePath} -> ${targetName}`);
});
```

### Step 2: Handle $ARGUMENTS Replacement

ClaudeKit `$ARGUMENTS` patterns:

| Pattern | Replacement |
|---------|-------------|
| `<issues>$ARGUMENTS</issues>` | `<issues>[Describe issues in chat]</issues>` |
| `$ARGUMENTS` in body | `[user input from chat]` |
| `argument-hint: [issues]` | Add to description |

### Step 3: Remove Claude-Specific References

| Find | Replace/Remove |
|------|----------------|
| `/code <path-to-plan>` | `follow the plan at [path]` |
| `/fix:types` | `use type-fixing approach` |
| `delegate to \`agent\`` | Remove or generalize |
| `Task tool` | `available tools` |

### Step 4: Organize by Category

After conversion, verify prompts by category:

```
prompts/
├── ck-fix.prompt.md          # Core
├── ck-fix-*.prompt.md        # Fix variants (8 files)
├── ck-code.prompt.md         # Core
├── ck-code-*.prompt.md       # Code variants (3 files)
├── ck-plan.prompt.md         # Core
├── ck-plan-*.prompt.md       # Plan variants (8 files)
├── ck-test.prompt.md         # Core
├── ck-cook.prompt.md         # Core
├── ck-cook-*.prompt.md       # Cook variants (3 files)
├── ck-docs-*.prompt.md       # Docs (3 files)
├── ck-git-*.prompt.md        # Git (4 files)
├── ck-design-*.prompt.md     # Design (6 files)
└── ...
```

## Prompt Template

```markdown
---
agent: 'agent'
description: 'Brief description of what this prompt does'
model: 'GPT-4.0'
---

# Prompt Title

## Purpose
What this prompt accomplishes.

## Instructions
1. Step one
2. Step two
3. Step three

## Expected Input
- Input type 1
- Input type 2

## Output Format
Description of expected output.
```

## Success Criteria

- [ ] All 71 commands converted to prompts
- [ ] Filenames follow `ck-*.prompt.md` pattern (lowercase, hyphens)
- [ ] All have `agent` field with value `'agent'`
- [ ] All have non-empty `description` field
- [ ] No `$ARGUMENTS` variables remain
- [ ] No broken slash command references

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Complex nested routing lost | High | Medium | Document original behavior |
| $ARGUMENTS functionality lost | High | Medium | Add instructions to provide input |
| Inter-command references broken | High | Medium | Update to use generic text |
