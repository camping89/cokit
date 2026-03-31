# CoKit System Architecture

## Overview
```
┌─────────────────────────────────────────────────────────────┐
│                        SOURCE                                │
├─────────────────────────────────────────────────────────────┤
│  Upstream Source                                             │
│  ├── commands/                                               │
│  ├── skills/                                                 │
│  └── (local install)                                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    SYNC PIPELINE (npm run sync)              │
├─────────────────────────────────────────────────────────────┤
│  eng/sync.mjs                                                │
│  ├── Load resource-origins.yml (mappings + ignore list)     │
│  ├── transform-upstream.mjs → ck-* namespace                │
│  ├── patch-navigation.mjs → Add "Suggested Next Steps"      │
│  └── Write to prompts/                                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       OUTPUT                                 │
├─────────────────────────────────────────────────────────────┤
│  prompts/                                                    │
│  ├── ck-*.prompt.md (17 commands)                           │
│  └── agents/, skills/, instructions/, collections/         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    CLI (npx cokit-cli)                       │
├─────────────────────────────────────────────────────────────┤
│  bin/cokit.js → src/index.js                                │
│  └── init       → Interactive setup                         │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Sync Pipeline
```
1. Read upstream commands source
2. Transform: rename, replace $ARGUMENTS, remove model field
3. Patch: inject navigation footer
4. Write: prompts/*.prompt.md
5. Update: resource-origins.yml (timestamps)
```

### CLI Install
```
1. User runs: npx cokit-cli init
2. CLI copies: prompts/, agents/, skills/, instructions/, collections/
3. Target: ~/.copilot/
4. User gets: All ck-* commands in Copilot
```

## Key Components

| Component | File | Purpose |
|-----------|------|---------|
| Orchestrator | eng/sync.mjs | Runs full sync pipeline |
| Upstream Transform | eng/transform-upstream.mjs | Transform upstream commands |
| Navigation Patch | eng/patch-navigation.mjs | Add cross-command navigation |
| Config | eng/resource-origins.yml | Mappings, ignore list, navigation |

## Namespace Convention

| Prefix | Source | Example |
|--------|--------|---------|
| `ck-*` | Upstream | ck-plan, ck-fix, ck-test |
