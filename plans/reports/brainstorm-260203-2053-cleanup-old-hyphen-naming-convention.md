# Brainstorm Report: Cleanup Old Hyphen Naming Convention

**Date:** 2026-02-03
**Status:** AGREED - Ready for implementation

---

## Problem Statement

CoKit has two naming conventions:
1. **Old hyphen style** - Used in `templates/repo/.github/` (v1 system)
2. **New dot style** - Used in `prompts/`, `resource-origins.yml` (v2 sync system)

User wants to clean up old hyphen references and consolidate to v2 system.

---

## Key Findings

### 1. Two Separate Systems

| System | Location | Purpose |
|--------|----------|---------|
| v1 OLD | `templates/repo/.github/` | Legacy Copilot templates (14 prompts) |
| v2 NEW | `prompts/` | Synced from ClaudeKit + SpecKit (21 prompts) |

### 2. Commands Only in OLD Templates

5 commands exist ONLY in old templates, NOT in Claude Code commands:
- `brainstorm` → Exists as Claude Code **skill** at `~/.claude/skills/brainstorm/`
- `cook` → Exists as Claude Code **skill** at `~/.claude/skills/cook/`
- `git` → Exists as Claude Code **skill** at `~/.claude/skills/git/`
- `debug` → Exists as Claude Code **skill** at `~/.claude/skills/debug/`
- `scout` → Exists as Claude Code **skill** at `~/.claude/skills/scout/`

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

Remove command references to these (they're skills, not commands):
- brainstorm, cook, git, debug, scout, code

### Keep As-Is

- `prompts/` (v2 synced prompts)
- `resource-origins.yml` (v2 sync config)
- Skills remain as skills, not slash commands

---

## Files Affected

### To Remove (~50 files)

```
templates/repo/.github/
├── prompts/ (14 files)
├── skills/ (7 directories)
├── instructions/ (5 files)
├── collections/ (5 files)
```

### Documentation to Update (~15 files)

- `QUICK-START.md`
- `FAQ.md`
- `docs/cokit-team-presentation.md`
- `docs/cokit-slides.md`
- `docs/project-roadmap.md`
- `docs/migration-guide.md`
- `docs/cokit-comprehensive-mapping-guide.md`
- `docs/copilot-processing-flow.md`
- `changelogs/1.0.8.md`
- `README.FLOW.md`

---

## Implementation Steps

1. Remove `templates/repo/.github/` directory
2. Update `resource-origins.yml` - remove ignore entries
3. Update documentation - use consistent dot notation
4. Verify sync pipeline still works
5. Test CLI installation

---

## Success Criteria

- [ ] `templates/repo/.github/` removed
- [ ] No skill-only command references in docs
- [ ] Documentation uses consistent dot notation
- [ ] CLI `npx cokit-cli init` still works
- [ ] Sync pipeline `npm run sync` still works

---

## Next Steps

Run `/ck.plan` to create implementation plan for this cleanup.
