# Brainstorm Report: ck-* Naming Convention Cleanup

**Date:** 2026-02-03
**Status:** AGREED - Ready for implementation

---

## Problem Statement

CoKit has two naming conventions:
1. **Old `ck-*` (hyphen)** - Used in `templates/repo/.github/` (v1 system)
2. **New `ck.*` (dot)** - Used in `prompts/`, `resource-origins.yml` (v2 sync system)

User wants to clean up old `ck-*` references and consolidate to v2 system.

---

## Key Findings

### 1. Two Separate Systems

| System | Location | Purpose |
|--------|----------|---------|
| v1 OLD | `templates/repo/.github/` | Legacy Copilot templates (14 prompts) |
| v2 NEW | `prompts/` | Synced from ClaudeKit + SpecKit (21 prompts) |

### 2. Commands Only in OLD Templates

5 commands exist ONLY in old templates, NOT in Claude Code commands:
- `ck-brainstorm` → Exists as Claude Code **skill** at `~/.claude/skills/brainstorm/`
- `ck-cook` → Exists as Claude Code **skill** at `~/.claude/skills/cook/`
- `ck-git` → Exists as Claude Code **skill** at `~/.claude/skills/git/`
- `ck-debug` → Exists as Claude Code **skill** at `~/.claude/skills/debug/`
- `ck-scout` → Exists as Claude Code **skill** at `~/.claude/skills/scout/`

### 3. `docs/` Already Synced

`docs/` commands (init, summarize, update) already exist in:
- Claude Code: `~/.claude/commands/docs/`
- CoKit: `prompts/` (synced via resource-origins.yml)

---

## Agreed Solution

### Remove

1. **`templates/repo/.github/`** - Entire old v1 templates directory
   - 14 prompt files
   - 7 skill directories
   - 5 instruction files
   - 5 collection files

### Update Documentation

Remove command references to:
- `/ck-brainstorm` (skill only)
- `/ck-cook` (skill only)
- `/ck-git` (skill only)
- `/ck-debug` (skill only)
- `/ck-scout` (skill only)
- `/ck-code` (doesn't exist)
- `/ck-ck-help` (old naming, now `ck.help`)

### Keep As-Is

- `prompts/` (v2 synced prompts with `ck-*.prompt.md` file naming)
- `resource-origins.yml` (v2 sync config with `ck.*` command mapping)
- Skills remain as skills, not slash commands

---

## Files Affected

### To Remove (~50 files)

```
templates/repo/.github/
├── prompts/ck-*.prompt.md (14 files)
├── skills/ck-*/ (7 directories)
├── instructions/ck-*.instructions.md (5 files)
├── collections/ck-*.collection.yml (5 files)
```

### Documentation to Update (~15 files)

- `QUICK-START.md` - References `/ck-fix`, `/ck-plan`, `/ck-review`
- `FAQ.md` - References `ck-*` file patterns
- `docs/cokit-team-presentation.md` - Many `/ck-*` command refs
- `docs/cokit-slides.md` - Command table
- `docs/project-roadmap.md` - Workflow list
- `docs/migration-guide.md` - Command mapping
- `docs/cokit-comprehensive-mapping-guide.md` - Full mapping
- `docs/copilot-processing-flow.md` - Process flow
- `changelogs/1.0.8.md` - Old command aliases
- `README.FLOW.md` - Flow diagram

---

## Implementation Steps

1. Remove `templates/repo/.github/` directory
2. Update `resource-origins.yml` - remove ignore entries (they no longer exist)
3. Update documentation - change `/ck-*` to `/ck.*` or remove skill-only refs
4. Verify sync pipeline still works
5. Test CLI installation

---

## Success Criteria

- [ ] `templates/repo/.github/` removed
- [ ] No `/ck-brainstorm`, `/ck-cook`, `/ck-git`, `/ck-debug`, `/ck-scout` command references in docs
- [ ] Documentation uses consistent `/ck.*` notation
- [ ] CLI `npx cokit-cli init` still works
- [ ] Sync pipeline `npm run sync` still works

---

## Next Steps

Run `/plan` or `/ck.plan` to create implementation plan for this cleanup.
