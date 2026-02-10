# CoKit System Architecture

## Overview
```
┌─────────────────────────────────────────────────────────────┐
│                        SOURCES                               │
├─────────────────────────────────────────────────────────────┤
│  ClaudeKit (~/.claude/)      SpecKit (upstream/speckit/)    │
│  ├── commands/               ├── templates/commands/         │
│  ├── skills/                 └── (git subtree)               │
│  └── (local install)                                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    SYNC PIPELINE (npm run sync)              │
├─────────────────────────────────────────────────────────────┤
│  eng/sync.mjs                                                │
│  ├── Load resource-origins.yml (mappings + ignore list)     │
│  ├── transform-claudekit.mjs → ck.* namespace               │
│  ├── transform-speckit.mjs → ck.spec.* namespace            │
│  ├── patch-navigation.mjs → Add "Suggested Next Steps"      │
│  └── Write to prompts/                                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       OUTPUT                                 │
├─────────────────────────────────────────────────────────────┤
│  prompts/                                                    │
│  ├── ck-*.prompt.md (28 total commands)                     │
│  └── agents/, skills/, instructions/, collections/         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    CLI (npx cokit-cli)                       │
├─────────────────────────────────────────────────────────────┤
│  bin/cokit.js → src/index.js                                │
│  ├── init -g    → Install to ~/.copilot/                    │
│  ├── init -a    → Install global + project                  │
│  └── init       → Interactive setup                         │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Sync Pipeline
```
1. git subtree pull (SpecKit)
2. Read ~/.claude/commands/ (ClaudeKit)
3. Transform: rename, replace $ARGUMENTS, remove model field
4. Patch: inject navigation footer
5. Write: prompts/*.prompt.md
6. Update: resource-origins.yml (timestamps)
```

### CLI Install
```
1. User runs: npx cokit-cli init -g
2. CLI copies: prompts/, agents/, skills/, instructions/, collections/
3. Target: ~/.copilot/
4. User gets: All ck.* commands in Copilot
```

## Key Components

| Component | File | Purpose |
|-----------|------|---------|
| Orchestrator | eng/sync.mjs | Runs full sync pipeline |
| ClaudeKit Transform | eng/transform-claudekit.mjs | Transform ~/.claude/ commands |
| SpecKit Transform | eng/transform-speckit.mjs | Transform upstream/speckit/ |
| Navigation Patch | eng/patch-navigation.mjs | Add cross-command navigation |
| Config | eng/resource-origins.yml | Mappings, ignore list, navigation |

## Namespace Convention

| Prefix | Source | Example |
|--------|--------|---------|
| `ck.*` | ClaudeKit | ck.plan, ck.fix, ck.test |
| `ck.spec.*` | SpecKit | ck.spec.specify, ck.spec.plan |
