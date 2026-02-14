# CoKit Sync & Maintenance Guide

> **IMPORTANT**: This is the official guide for maintaining CoKit's integration with upstream sources (ClaudeKit + SpecKit). Read this before making any changes to the sync pipeline.

---

## Architecture Overview

CoKit merges two upstream sources into a unified `ck-*` command namespace:

```
┌─────────────────────────────────────────────────────────────────┐
│                        SOURCES                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ClaudeKit (pre-installed)        SpecKit (git subtree)         │
│  ~/.claude/                       upstream/speckit/             │
│  ├── commands/                    └── templates/commands/       │
│  ├── agents/                                                    │
│  └── skills/                                                    │
│                                                                 │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SYNC PIPELINE                                 │
│                    npm run sync                                  │
├─────────────────────────────────────────────────────────────────┤
│  1. PULL      → git subtree pull speckit                        │
│  2. TRANSFORM → Rename commands, fix placeholders               │
│  3. PATCH     → Inject unified navigation                       │
│  4. GENERATE  → Write to prompts/, agents/, skills/             │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                      OUTPUT                                      │
├─────────────────────────────────────────────────────────────────┤
│  prompts/           agents/           skills/                   │
│  ├── ck-brainstorm  ├── planner       ├── ck-planning/          │
│  ├── ck-specify     ├── debugger      ├── ck-databases/         │
│  ├── ck-plan        └── ...           └── ...                   │
│  └── ...                                                        │
│                                                                 │
│  All use unified ck-* namespace                                 │
│  All have cross-navigation to other ck-* commands               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Files

| File | Purpose |
|------|---------|
| `eng/sync.mjs` | Main sync orchestrator |
| `eng/transform-claudekit.mjs` | ClaudeKit → CoKit transform rules |
| `eng/transform-speckit.mjs` | SpecKit → CoKit transform rules |
| `eng/patch-navigation.mjs` | Injects unified navigation footer |
| `eng/resource-origins.yml` | **CRITICAL** - Maps ck-* commands to upstream sources |

---

## The Resource Origins File

**Location:** `eng/resource-origins.yml`

This is the **source of truth** for all command mappings. When upstream adds/removes commands, update this file.

```yaml
version: "2.0"
synced_at: "2026-02-03"

sources:
  speckit:
    repo: github/spec-kit
    ref: main
    last_sync: "2026-02-03"
  claudekit:
    path: ~/.claude
    last_sync: "2026-02-03"

# COMMAND MAPPINGS
# Format: ck-{name} → source info
mappings:
  # ═══════════════════════════════════════════════════════════════
  # FROM SPECKIT
  # ═══════════════════════════════════════════════════════════════
  ck-specify:
    origin: speckit
    original: speckit.specify
    upstream_file: templates/commands/specify.md
    description: Create feature specification from description

  ck-clarify:
    origin: speckit
    original: speckit.clarify
    upstream_file: templates/commands/clarify.md
    description: Resolve specification ambiguities

  ck-constitution:
    origin: speckit
    original: speckit.constitution
    upstream_file: templates/commands/constitution.md
    description: Create/update project constitution

  ck-spec-tasks:
    origin: speckit
    original: speckit.tasks
    upstream_file: templates/commands/tasks.md
    description: Generate task list from plan

  ck-analyze:
    origin: speckit
    original: speckit.analyze
    upstream_file: templates/commands/analyze.md
    description: Analyze spec consistency

  ck-checklist:
    origin: speckit
    original: speckit.checklist
    upstream_file: templates/commands/checklist.md
    description: Quality validation checklist

  # ═══════════════════════════════════════════════════════════════
  # FROM CLAUDEKIT
  # ═══════════════════════════════════════════════════════════════
  ck-brainstorm:
    origin: claudekit
    original: brainstorm
    upstream_file: skills/brainstorm/SKILL.md
    description: Explore solutions with trade-off analysis

  ck-plan:
    origin: claudekit
    original: plan
    upstream_file: commands/plan.md
    description: Intelligent plan creation

  ck-plan-hard:
    origin: claudekit
    original: plan/hard
    upstream_file: commands/plan/hard.md
    description: Deep research + comprehensive plan

  ck-plan-fast:
    origin: claudekit
    original: plan/fast
    upstream_file: commands/plan/fast.md
    description: Quick plan without research

  ck-cook:
    origin: claudekit
    original: cook
    upstream_file: skills/cook/SKILL.md
    description: Implement feature step by step

  ck-fix:
    origin: claudekit
    original: fix
    upstream_file: skills/fix/SKILL.md
    description: Analyze and fix issues

  ck-test:
    origin: claudekit
    original: test
    upstream_file: commands/test.md
    description: Run tests and analyze results

# New commands discovered during sync (review and add to mappings)
unknown_commands: []
```

---

## Sync Workflow

### Regular Sync (Weekly/Monthly)

```bash
# 1. Pull latest from SpecKit
npm run sync:pull

# 2. Transform and generate
npm run sync:transform

# 3. Review changes
git diff

# 4. Check for unknown commands
cat eng/resource-origins.yml | grep -A5 "unknown_commands"

# 5. If unknown commands found, add them to mappings
# Edit eng/resource-origins.yml, then re-run:
npm run sync:transform

# 6. Commit
git add .
git commit -m "sync: update from claudekit + speckit $(date +%Y-%m-%d)"
```

### When Upstream Adds New Commands

1. **Sync detects unknown command** → logged to `unknown_commands` in resource-origins.yml
2. **Review the new command** → check upstream docs
3. **Add to mappings** with appropriate `ck-*` name
4. **Re-run transform**
5. **Test the new command**

### When Upstream Removes/Renames Commands

1. **Sync will fail** to find upstream file
2. **Check if renamed** → update `upstream_file` path
3. **If removed** → decide: keep as cokit-native or deprecate
4. **Update resource-origins.yml** accordingly

---

## Transform Rules

### Command Renaming

| Original | Transformed |
|----------|-------------|
| `/speckit.specify` | `/ck-specify` |
| `/speckit.plan` | `/ck-plan` (conflicts with claudekit, see below) |
| `/plan` (claudekit) | `/ck-plan` |
| `/plan:hard` | `/ck-plan-hard` |
| `/brainstorm` | `/ck-brainstorm` |

### Conflict Resolution

When both sources have same command name (e.g., `plan`):
- **Default**: ClaudeKit version wins (more mature)
- **SpecKit version**: Available as `ck-plan.spec` if needed
- **Document in resource-origins.yml**

### Placeholder Substitution

| Original | Transformed |
|----------|-------------|
| `$ARGUMENTS` | `${input}` |
| `{ARGS}` | `${input}` |

### Model Field

- **Remove entirely** - Let Copilot use its default
- ClaudeKit's `model: opus/sonnet/haiku` → removed

### Handoffs (SpecKit-specific)

SpecKit commands have `handoffs` in frontmatter:
```yaml
handoffs:
  - label: Build Technical Plan
    agent: speckit.plan
```

Transform to:
```yaml
handoffs:
  - label: Build Technical Plan
    agent: ck-plan
```

---

## Patch: Unified Navigation

Every prompt gets a navigation footer injected:

```markdown
---

## Suggested Next Steps

| Current | Next Options |
|---------|--------------|
| After `ck-brainstorm` | `/ck-specify`, `/ck-plan-fast` |
| After `ck-specify` | `/ck-clarify`, `/ck-brainstorm`, `/ck-plan` |
| After `ck-clarify` | `/ck-specify` (update), `/ck-plan` |
| After `ck-plan` | `/ck-spec-tasks`, `/ck-cook`, `/ck-brainstorm` (rethink) |
| After `ck-cook` | `/ck-test`, `/ck-fix` |

**All commands:** `ck-brainstorm`, `ck-specify`, `ck-clarify`, `ck-constitution`, `ck-plan`, `ck-plan-hard`, `ck-plan-fast`, `ck-spec-tasks`, `ck-cook`, `ck-fix`, `ck-test`
```

---

## Default Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    RECOMMENDED FLOW                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  User has idea                                                  │
│       │                                                         │
│       ▼                                                         │
│  ┌─────────────┐                                                │
│  │ck-brainstorm│ ← Always start here (question everything)     │
│  └──────┬──────┘                                                │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────┐                                                │
│  │ ck-specify  │ ← Formalize into spec                         │
│  └──────┬──────┘                                                │
│         │ Has ambiguities?                                      │
│         ▼                                                       │
│  ┌─────────────┐                                                │
│  │ ck-clarify  │ ← Resolve (optional)                          │
│  └──────┬──────┘                                                │
│         │◄────────────────────────┐                             │
│         ▼                         │                             │
│  ┌─────────────┐                  │                             │
│  │ ck-plan     │    Loop back if  │                             │
│  └──────┬──────┘    approach needs│                             │
│         │           rethinking    │                             │
│         ▼                         │                             │
│  ┌───────────────┐                │                             │
│  │ck-spec-tasks  │ ← Break into tasks                          │
│  └───────┬───────┘                │                             │
│          │                        │                             │
│          ▼                        │                             │
│  ┌─────────────┐                  │                             │
│  │ ck-cook     │──────────────────┘                             │
│  └──────┬──────┘    (via ck-brainstorm)                         │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────┐                                                │
│  │ ck-test     │                                                │
│  └─────────────┘                                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Troubleshooting

### Sync fails with "file not found"

1. Check if upstream renamed/moved the file
2. Update `upstream_file` in resource-origins.yml
3. Re-run sync

### New command not appearing

1. Check if it's in `unknown_commands` list
2. Add to `mappings` section with `ck-*` name
3. Re-run sync

### Merge conflicts in generated files

**Never manually edit files in `prompts/`, `agents/`, `skills/`**

These are generated. Fix the source:
1. Check transform scripts for bugs
2. Check resource-origins.yml for correct mappings
3. Re-run sync

### ClaudeKit not found

Ensure ClaudeKit is installed at `~/.claude/`:
```bash
ls ~/.claude/commands/
ls ~/.claude/agents/
ls ~/.claude/skills/
```

---

## Adding Cokit-Native Commands

For commands that don't come from upstream:

1. Create directly in `prompts/` with `ck-` prefix
2. Add to resource-origins.yml with `origin: cokit-native`:

```yaml
ck-workflow.enterprise:
  origin: cokit-native
  description: Full enterprise flow (brainstorm → specify → plan → cook)
```

3. These won't be overwritten by sync

---

## Version Pinning (Production)

For stability, pin SpecKit to a specific tag:

```yaml
# eng/resource-origins.yml
sources:
  speckit:
    repo: github/spec-kit
    ref: v1.2.0  # Pin to tag instead of main
```

Update `sync:pull` script to use the ref:
```bash
git subtree pull --prefix=upstream/speckit https://github.com/github/spec-kit.git v1.2.0 --squash
```

---

## Changelog

| Date | Change |
|------|--------|
| 2026-02-03 | Initial architecture design |

---

## Questions?

Check the brainstorm report: `plans/reports/brainstorm-260203-1630-cokit-v2-architecture-refresh.md`
