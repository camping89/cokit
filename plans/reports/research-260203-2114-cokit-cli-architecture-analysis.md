# Research Report: CoKit CLI Architecture Analysis

**Date:** 2026-02-03
**Subject:** How CoKit CLI integrates SpecKit and ClaudeKit

---

## Executive Summary

CoKit CLI has a **dual-layer architecture**:
1. **Sync Pipeline** (`eng/`) - Transforms upstream sources (ClaudeKit + SpecKit) into unified `ck.*` namespace
2. **CLI Distribution** (`src/`) - Installs resources to user's system via `npx cokit init`

Resources flow: **Upstream → Sync → Package → Install**

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     UPSTREAM SOURCES                             │
├─────────────────────────┬───────────────────────────────────────┤
│     ClaudeKit           │           SpecKit                     │
│   ~/.claude/commands    │    upstream/speckit/templates/        │
│                         │    (git subtree)                      │
└───────────┬─────────────┴─────────────────┬─────────────────────┘
            │                               │
            ▼                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SYNC PIPELINE (eng/)                          │
│  ┌──────────────────────┐    ┌────────────────────────┐         │
│  │transform-claudekit.mjs│   │ transform-speckit.mjs │         │
│  │  - Remove model field │   │ - /speckit.* → /ck.*  │         │
│  │  - $ARGUMENTS→${input}│   │ - $ARGUMENTS→${input} │         │
│  │  - Update handoffs    │   │ - Update handoffs     │         │
│  └──────────┬────────────┘   └────────────┬──────────┘         │
│             │                             │                     │
│             └──────────┬──────────────────┘                     │
│                        ▼                                        │
│              ┌─────────────────────┐                            │
│              │ patch-navigation.mjs│                            │
│              │ Inject navigation   │                            │
│              │ footers to prompts  │                            │
│              └──────────┬──────────┘                            │
│                         ▼                                       │
│               resource-origins.yml                              │
│               (mapping + config)                                │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                     PACKAGE OUTPUT                               │
│  prompts/        skills/        agents/        instructions/    │
│  (21 files)      (55 dirs)      (N files)      (N files)       │
│                                                                  │
│  templates/repo/.github/                                        │
│  (project-level templates)                                      │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CLI DISTRIBUTION (src/)                       │
│                                                                  │
│  npx cokit init                                                 │
│  ├── Project mode → .github/ (templates)                        │
│  └── Global mode  → ~/.copilot/ (skills, prompts, agents)      │
│                                                                  │
│  paths.js:                                                      │
│  - getUserSkillsDir()    → ~/.copilot/skills/                   │
│  - getUserPromptsDir()   → ~/.copilot/prompts/                  │
│  - getSkillsSourceDir()  → PACKAGE_ROOT/skills/                 │
│  - getTemplatesDir()     → PACKAGE_ROOT/templates/repo/         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Components

### 1. Sync Pipeline (`eng/`)

**Purpose:** Merge ClaudeKit + SpecKit into unified `ck.*` namespace

| File | Function |
|------|----------|
| `sync.mjs` | Main orchestrator - runs all transforms |
| `transform-claudekit.mjs` | Transform `~/.claude/commands/` → `prompts/` |
| `transform-speckit.mjs` | Transform `upstream/speckit/` → `prompts/` |
| `patch-navigation.mjs` | Inject navigation footers |
| `resource-origins.yml` | Mapping config + ignore list |

**Transformations applied:**
- Rename: `/*` → `/ck.*`, `/speckit.*` → `/ck.spec.*`
- Placeholder: `$ARGUMENTS` → `${input}`
- Remove `model:` from frontmatter
- Update handoffs to `ck.*` references

**Run:** `npm run sync` (pulls subtree + transforms)

### 2. CLI Distribution (`src/commands/init.js`)

**Two installation modes:**

| Mode | Command | Target | Source |
|------|---------|--------|--------|
| Project | `cokit init` | `.github/` | `templates/repo/.github/` |
| Global | `cokit init -g` | `~/.copilot/` | `skills/`, `prompts/`, etc. |

### 3. Resource Origins (`eng/resource-origins.yml`)

```yaml
sources:
  speckit:
    repo: https://github.com/github/spec-kit.git
    path: upstream/speckit/templates/commands
  claudekit:
    path: ~/.claude/commands

mappings:
  ck.spec.specify:   # SpecKit origin
    origin: speckit
    original: speckit.specify
  ck.plan:           # ClaudeKit origin
    origin: claudekit
    original: plan

ignore:  # Commands excluded from sync
  - ck.brainstorm
  - ck.cook
  - ck.scout
  - ck.git
  - ck.debug
  - ck.docs
```

---

## File Counts

| Directory | Count | Description |
|-----------|-------|-------------|
| `prompts/` | 21 | Synced commands (ck.* namespace) |
| `skills/` | 55 | All skills (copied from Claude Code) |
| `templates/repo/.github/skills/` | ~55 | Project template skills |

---

## How SpecKit Integration Works

1. **Git Subtree Setup:**
   ```bash
   git subtree add --prefix=upstream/speckit \
     https://github.com/github/spec-kit.git main --squash
   ```

2. **Sync Pull:**
   ```bash
   npm run sync:pull
   # → git subtree pull --prefix=upstream/speckit speckit main --squash
   ```

3. **Transform:**
   - Reads `upstream/speckit/templates/commands/*.md`
   - Maps `speckit.*` → `ck.spec.*`
   - Outputs to `prompts/`

---

## How ClaudeKit Integration Works

1. **Source:** `~/.claude/commands/` (local user's Claude Code commands)

2. **Transform:**
   - Reads from local Claude Code installation
   - Maps to `ck.*` namespace
   - Outputs to `prompts/`

3. **Ignored commands** (exist as separate skills):
   - brainstorm, cook, scout, git, debug, docs

---

## Installation Flow

```bash
npx cokit-cli init
```

**Interactive prompts:**
1. Project templates only → copies to `.github/`
2. Global resources only → copies to `~/.copilot/`
3. Both (recommended) → copies to both

**Global install paths:**
- Skills: `~/.copilot/skills/`
- Prompts: `~/.copilot/prompts/`
- Agents: `~/.copilot/agents/`
- Instructions: `~/.copilot/instructions/`

---

## Key Differences: ClaudeKit vs SpecKit

| Aspect | ClaudeKit | SpecKit |
|--------|-----------|---------|
| Source | Local `~/.claude/` | Git subtree `upstream/speckit/` |
| Namespace | `ck.*` | `ck.spec.*` |
| Focus | General dev workflows | Specification-driven development |
| Commands | plan, fix, test, ask, etc. | specify, clarify, plan, tasks, implement |

---

## Summary

CoKit unifies two distinct toolkits:

1. **SpecKit** (GitHub) - Spec-driven development commands
2. **ClaudeKit** (User's Claude Code) - General dev workflow commands

The sync pipeline merges them into `ck.*` namespace, then CLI distributes to users via `npx cokit init`.

**Key files to understand:**
- `eng/sync.mjs` - Orchestrator
- `eng/resource-origins.yml` - Source of truth for mappings
- `src/commands/init.js` - Installation logic
- `src/utils/paths.js` - Path resolution
