# Phase 3: Transform Scripts Implementation

## Context Links

- [Plan Overview](plan.md)
- [Node.js Transform Patterns](research/researcher-02-nodejs-transform-patterns.md)
- [Brainstorm Report](../reports/brainstorm-260203-1630-cokit-v2-architecture-refresh.md)

## Overview

| Field | Value |
|-------|-------|
| Priority | P1 - Critical Path |
| Status | Pending |
| Effort | 4 hours |
| Dependencies | Phase 1 (subtree), Phase 2 (resource-origins.yml) |

Implement Node.js transform scripts that read from upstream sources, apply transformations, and generate unified `ck.*` commands.

## Key Insights

- Use ES modules (`.mjs`) for top-level await and cleaner imports
- `gray-matter` handles frontmatter parsing/serialization
- `globby` respects .gitignore automatically
- Keep transforms simple: rename + placeholder + remove model

## Requirements

### Functional

- Read commands from `~/.claude/` (ClaudeKit)
- Read commands from `upstream/speckit/` (SpecKit)
- Apply transformations per brainstorm decisions
- Generate output to `prompts/`, `agents/`, `skills/`
- Inject unified navigation footer

### Non-Functional

- Complete sync < 30 seconds
- Graceful error handling for missing files
- Dry-run mode for testing

## Architecture

```
eng/
├── sync.mjs                    ← Main orchestrator
├── transform-claudekit.mjs     ← ClaudeKit-specific transforms
├── transform-speckit.mjs       ← SpecKit-specific transforms
├── patch-navigation.mjs        ← Navigation footer injection
└── resource-origins.yml        ← Config (Phase 2)
```

### Pipeline Flow

```
sync.mjs
  │
  ├─→ load resource-origins.yml
  │
  ├─→ transform-claudekit.mjs
  │   ├─ globby: find files in ~/.claude/
  │   ├─ gray-matter: parse frontmatter
  │   ├─ apply transforms (rename, placeholder, remove model)
  │   └─ return transformed objects
  │
  ├─→ transform-speckit.mjs
  │   ├─ globby: find files in upstream/speckit/
  │   ├─ gray-matter: parse frontmatter
  │   ├─ apply transforms (rename, handoffs, placeholder)
  │   └─ return transformed objects
  │
  ├─→ patch-navigation.mjs
  │   └─ inject navigation footer to all prompts
  │
  └─→ write output files
      ├─ prompts/*.prompt.md
      ├─ agents/*.agent.md
      └─ skills/*/SKILL.md
```

## Related Code Files

### Files to Create

| File | Purpose | Lines Est. |
|------|---------|------------|
| `eng/sync.mjs` | Main orchestrator | ~100 |
| `eng/transform-claudekit.mjs` | ClaudeKit transforms | ~80 |
| `eng/transform-speckit.mjs` | SpecKit transforms | ~80 |
| `eng/patch-navigation.mjs` | Navigation injection | ~50 |

### Dependencies to Add

```json
{
  "devDependencies": {
    "globby": "^14.0.0",
    "gray-matter": "^4.0.3",
    "js-yaml": "^4.1.0"
  }
}
```

## Implementation Steps

### Step 1: Install Dependencies

```bash
npm install --save-dev globby gray-matter js-yaml
```

### Step 2: Create sync.mjs (Main Orchestrator)

```javascript
// eng/sync.mjs
import { transformClaudekit } from './transform-claudekit.mjs';
import { transformSpeckit } from './transform-speckit.mjs';
import { patchNavigation } from './patch-navigation.mjs';
import YAML from 'js-yaml';
import fs from 'fs/promises';

async function main() {
  // 1. Load config
  const config = YAML.load(await fs.readFile('eng/resource-origins.yml', 'utf8'));

  // 2. Transform sources
  const claudekitResults = await transformClaudekit(config);
  const speckitResults = await transformSpeckit(config);

  // 3. Merge results
  const allPrompts = [...claudekitResults.prompts, ...speckitResults.prompts];

  // 4. Patch navigation
  const patched = allPrompts.map(p => patchNavigation(p, config));

  // 5. Write output
  for (const prompt of patched) {
    await fs.writeFile(`prompts/${prompt.filename}`, prompt.content);
  }

  // 6. Update config with sync timestamp
  config.synced_at = new Date().toISOString();
  await fs.writeFile('eng/resource-origins.yml', YAML.dump(config));
}

main().catch(console.error);
```

### Step 3: Create transform-claudekit.mjs

Key transforms:
- Rename: `/brainstorm` → `/ck.brainstorm`
- Placeholder: `$ARGUMENTS` → `${input}`
- Remove: `model:` field from frontmatter
- Update handoffs to `ck.*` commands

### Step 4: Create transform-speckit.mjs

Key transforms:
- Rename: `/speckit.specify` → `/ck.specify`
- Update handoffs: `speckit.plan` → `ck.plan`
- Placeholder: same as claudekit

### Step 5: Create patch-navigation.mjs

Inject footer to every prompt:
```markdown
---

## Suggested Next Steps

| Current | Next Options |
|---------|--------------|
| After `ck.brainstorm` | `/ck.specify`, `/ck.plan.fast` |
...

**All commands:** ck.brainstorm, ck.specify, ...
```

## Todo List

- [ ] Install dependencies (globby, gray-matter, js-yaml)
- [ ] Create `eng/sync.mjs` orchestrator
- [ ] Create `eng/transform-claudekit.mjs`
  - [ ] File discovery with globby
  - [ ] Frontmatter parsing with gray-matter
  - [ ] Command renaming logic
  - [ ] Placeholder substitution
  - [ ] Model field removal
- [ ] Create `eng/transform-speckit.mjs`
  - [ ] File discovery in upstream/speckit/
  - [ ] Frontmatter parsing
  - [ ] Command renaming
  - [ ] Handoff updates
- [ ] Create `eng/patch-navigation.mjs`
  - [ ] Navigation footer template
  - [ ] Injection logic
- [ ] Add error handling for missing files
- [ ] Add dry-run mode (--dry-run flag)
- [ ] Test each script individually

## Success Criteria

- [ ] `node eng/sync.mjs` completes without errors
- [ ] All 13 commands transformed correctly
- [ ] Navigation footer present in all output files
- [ ] Frontmatter valid YAML after transforms
- [ ] No `$ARGUMENTS` in output (replaced with `${input}`)
- [ ] No `model:` field in output frontmatter

## Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| ClaudeKit not installed | High | Low | Check ~/.claude exists, provide helpful error |
| SpecKit structure changed | Medium | Medium | Validate upstream structure in sync.mjs |
| gray-matter edge cases | Low | Low | Wrap in try-catch, log problematic files |
| Frontmatter corruption | High | Low | Validate output YAML before writing |

## Security Considerations

- Read-only operations on ~/.claude/
- No external network calls during transform
- Validate all file paths to prevent directory traversal

## Next Steps

After completing this phase:
1. Proceed to [Phase 4: Package.json Updates](phase-04-package-json-updates.md)
2. Add npm scripts for sync commands
