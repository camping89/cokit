---
phase: 3
status: pending
priority: medium
effort: 0.5h
---

# Phase 3: Update Pipeline, Config, and Docs

## Overview

Update resource-origins.yml with new mappings, verify sync pipeline, bump version, update docs with correct resource counts.

## Implementation Steps

### Step 1: Update resource-origins.yml

Add new skill mappings (for skills that also have prompts):

```yaml
# New mappings to add:
ck.test:
  origin: claudekit
  original: test
  upstream_file: skills/test/SKILL.md
  description: Run tests, coverage analysis, build verification

ck.ship:
  origin: claudekit
  original: ship
  upstream_file: skills/ship/SKILL.md
  description: Release pipeline - test, review, commit, push, PR

ck.deploy:
  origin: claudekit
  original: deploy
  upstream_file: skills/deploy/SKILL.md
  description: Deploy to any platform with auto-detection

ck.security:
  origin: claudekit
  original: ck-security
  upstream_file: skills/ck-security/SKILL.md
  description: STRIDE + OWASP security audit
```

Add navigation entries:
```yaml
navigation:
  ck.ship:
    next: [ck.test, ck.review]
  ck.deploy:
    next: [ck.test, ck.fix]
  ck.security:
    next: [ck.fix, ck.review]
```

Update sync timestamp.

### Step 2: Run Sync Pipeline

```bash
npm run sync:dry-run  # Verify no errors
npm run sync          # Generate updated prompts
```

### Step 3: Update package.json Version

Bump to v1.3.0 (new features added):
```json
"version": "1.3.0"
```

### Step 4: Update Docs

Files to update with new counts:

| File | Change |
|------|--------|
| README.md | Prompts: 17→~20, Skills: 23→27+ |
| docs/codebase-summary.md | Update counts, add new skills to inventory |
| docs/system-architecture.md | No structural change needed |
| docs/project-roadmap.md | Add v1.3.0 milestone |
| docs/cokit-commands-usage-guide.md | Add new commands |
| docs/resource-catalog.md | Add new resources |

### Step 5: Update CHANGELOG.md

Add entry:
```markdown
## v1.3.0 (2026-03-30)

### Added
- 7 new skills: test, ship, deploy, ck-security, bootstrap, frontend-development, project-management
- 1 new agent: project-manager

### Updated
- Synced 23 skills and 12 agents from ClaudeKit (48 days of drift resolved)
- All skills now have Copilot-compatible frontmatter (ck: prefix, license, argument-hint)

### Removed
- SpecKit integration (removed in previous commit)
```

### Step 6: Verify Final State

```bash
# Count resources
ls skills/*/SKILL.md | wc -l       # Expected: 31
ls agents/*.agent.md | wc -l       # Expected: 13
ls prompts/*.prompt.md | wc -l     # Expected: ~20

# Verify sync works
npm run sync:dry-run

# Check no broken references
grep -r "speckit\|spec-kit" prompts/ skills/ agents/ || echo "Clean"
```

## Files Modified

- `eng/resource-origins.yml` — New mappings + navigation
- `package.json` — Version bump
- `README.md` — Updated counts
- `CHANGELOG.md` — New version entry
- `docs/codebase-summary.md` — Updated inventory
- `docs/cokit-commands-usage-guide.md` — New commands
- `docs/project-roadmap.md` — New milestone

## Success Criteria

- [ ] resource-origins.yml has all new mappings
- [ ] `npm run sync:dry-run` passes
- [ ] Version bumped to 1.3.0
- [ ] CHANGELOG updated
- [ ] Docs reflect correct resource counts
- [ ] No stale SpecKit references in new files
