# CoKit Sync & Maintenance Guide

> **IMPORTANT**: This is the official guide for maintaining CoKit's integration with ClaudeKit. Read this before making any changes to the sync pipeline.

---

## Architecture Overview

CoKit transforms ClaudeKit commands into a unified `ck-*` command namespace:

```
┌─────────────────────────────────────────────────────────────────┐
│                        SOURCE                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ClaudeKit (pre-installed)                                      │
│  ~/.claude/                                                     │
│  ├── commands/                                                  │
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
│  1. TRANSFORM → Rename commands, fix placeholders               │
│  2. PATCH     → Inject unified navigation                       │
│  3. GENERATE  → Write to prompts/                               │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                      OUTPUT                                      │
├─────────────────────────────────────────────────────────────────┤
│  prompts/           agents/           skills/                   │
│  ├── ck-brainstorm  ├── planner       ├── ck-planning/          │
│  ├── ck-plan        ├── debugger      ├── ck-databases/         │
│  └── ...            └── ...           └── ...                   │
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
  claudekit:
    path: ~/.claude
    last_sync: "2026-02-03"

# COMMAND MAPPINGS
mappings:
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
  # ... more mappings

# New commands discovered during sync (review and add to mappings)
unknown_commands: []
```

---

## Sync Workflow

### Regular Sync

```bash
# 1. Transform and generate
npm run sync

# 2. Review changes
git diff

# 3. Check for unknown commands
cat eng/resource-origins.yml | grep -A5 "unknown_commands"

# 4. If unknown commands found, add them to mappings
# Edit eng/resource-origins.yml, then re-run:
npm run sync

# 5. Commit
git add .
git commit -m "sync: update from claudekit $(date +%Y-%m-%d)"
```

### When Upstream Adds New Commands

1. **Sync detects unknown command** → logged to `unknown_commands` in resource-origins.yml
2. **Review the new command** → check upstream docs
3. **Add to mappings** with appropriate `ck-*` name
4. **Re-run sync**
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
| `/plan` (claudekit) | `/ck-plan` |
| `/plan:hard` | `/ck-plan-hard` |
| `/brainstorm` | `/ck-brainstorm` |

### Placeholder Substitution

| Original | Transformed |
|----------|-------------|
| `$ARGUMENTS` | `${input}` |
| `{ARGS}` | `${input}` |

### Model Field

- **Remove entirely** - Let Copilot use its default
- ClaudeKit's `model: opus/sonnet/haiku` → removed

---

## Patch: Unified Navigation

Every prompt gets a navigation footer injected:

```markdown
---

## Suggested Next Steps

| Current | Next Options |
|---------|--------------|
| After `ck-brainstorm` | `/ck-plan`, `/ck-plan-fast` |
| After `ck-plan` | `/ck-cook`, `/ck-brainstorm` (rethink) |
| After `ck-cook` | `/ck-test`, `/ck-fix` |

**All commands:** `ck-brainstorm`, `ck-plan`, `ck-plan-hard`, `ck-plan-fast`, `ck-cook`, `ck-fix`, `ck-test`
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
│  │ ck-plan     │ ← Create implementation plan                   │
│  └──────┬──────┘                                                │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────┐                                                │
│  │ ck-cook     │ ← Implement step by step                      │
│  └──────┬──────┘                                                │
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
  description: Full enterprise flow (brainstorm → plan → cook)
```

3. These won't be overwritten by sync

---

## Changelog

| Date | Change |
|------|--------|
| 2026-03-30 | Removed SpecKit integration |
| 2026-02-03 | Initial architecture design |
