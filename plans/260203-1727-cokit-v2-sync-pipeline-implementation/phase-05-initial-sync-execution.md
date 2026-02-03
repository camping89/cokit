# Phase 5: Initial Sync Execution

## Context Links

- [Plan Overview](plan.md)
- [Maintenance Guide](../../docs/cokit-sync-and-maintenance-guide.md)
- [Transform Scripts Phase](phase-03-transform-scripts.md)

## Overview

| Field | Value |
|-------|-------|
| Priority | P1 |
| Status | Pending |
| Effort | 1 hour |
| Dependencies | Phases 1-4 complete |

Execute the full sync pipeline for the first time, verify output, and fix any issues discovered during execution.

## Key Insights

- First run will reveal edge cases not covered in planning
- Expect iteration on transform scripts
- Keep detailed log of issues for future maintenance

## Requirements

### Functional

- Complete sync pipeline execution
- All 13 commands generated in prompts/
- Navigation footer in all generated files
- resource-origins.yml updated with sync timestamp

### Non-Functional

- Sync completes < 30 seconds
- No unhandled errors
- Graceful handling of missing source files

## Architecture

```
Initial Sync Flow:

1. Verify Prerequisites
   ├── ~/.claude/ exists
   ├── upstream/speckit/ exists
   └── eng/resource-origins.yml exists

2. Run Sync
   └── npm run sync

3. Verify Output
   ├── prompts/ has ck.* files
   ├── Navigation footer present
   └── Frontmatter valid

4. Review & Fix
   ├── Check git diff
   ├── Fix transform issues
   └── Re-run if needed
```

## Related Code Files

### Files to Verify (Input)

| File/Directory | Purpose |
|----------------|---------|
| `~/.claude/commands/` | ClaudeKit source commands |
| `~/.claude/skills/` | ClaudeKit source skills |
| `upstream/speckit/templates/commands/` | SpecKit source commands |
| `eng/resource-origins.yml` | Mapping configuration |

### Files to Generate (Output)

| File Pattern | Count Est. |
|--------------|------------|
| `prompts/ck.*.prompt.md` | 13+ |
| `agents/*.agent.md` | (if applicable) |
| `skills/ck-*/SKILL.md` | (if applicable) |

## Implementation Steps

### Step 1: Verify Prerequisites

```bash
# Check ClaudeKit installation
ls ~/.claude/commands/ && ls ~/.claude/skills/

# Check SpecKit subtree
ls upstream/speckit/templates/commands/

# Check config exists
cat eng/resource-origins.yml
```

### Step 2: Run Dry Run First

```bash
npm run sync:dry-run
```

Review output without writing files to catch issues early.

### Step 3: Run Full Sync

```bash
npm run sync
```

### Step 4: Verify Output Structure

```bash
# Check prompts generated
ls prompts/ck.*.prompt.md

# Count files
ls prompts/ | grep "^ck\." | wc -l

# Check navigation footer
tail -20 prompts/ck.brainstorm.prompt.md
```

### Step 5: Verify Frontmatter

```bash
# Quick YAML validation
for f in prompts/ck.*.prompt.md; do
  node -e "require('gray-matter').read('$f')" || echo "FAILED: $f"
done
```

### Step 6: Check for Untransformed Content

```bash
# Should return nothing
grep -r '\$ARGUMENTS' prompts/
grep -r 'model:' prompts/ | head -5

# Check command references updated
grep -r '/speckit\.' prompts/
grep -r '/brainstorm' prompts/ | grep -v 'ck.brainstorm'
```

### Step 7: Review Git Diff

```bash
git diff --stat
git diff prompts/
```

### Step 8: Fix Issues and Re-run

If issues found:
1. Update relevant transform script
2. Re-run `npm run sync:transform`
3. Repeat verification steps

## Todo List

- [ ] Verify ClaudeKit installed at ~/.claude/
- [ ] Verify SpecKit subtree at upstream/speckit/
- [ ] Verify eng/resource-origins.yml exists
- [ ] Run dry-run first
- [ ] Fix any dry-run errors
- [ ] Run full sync
- [ ] Verify all 13 commands generated
- [ ] Verify navigation footer in all prompts
- [ ] Verify no $ARGUMENTS remain
- [ ] Verify no model: fields remain
- [ ] Verify no /speckit. references remain
- [ ] Review git diff
- [ ] Document any issues found
- [ ] Commit generated files

## Success Criteria

- [ ] Sync completes without errors
- [ ] All mapped commands have output files
- [ ] `grep -r '\$ARGUMENTS' prompts/` returns empty
- [ ] `grep -r 'model:' prompts/` returns empty or only in comments
- [ ] Navigation footer in every ck.* prompt
- [ ] resource-origins.yml has updated synced_at timestamp

## Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Transform script bugs | Medium | High | Fix iteratively, re-run |
| Missing source files | Medium | Medium | Add to unknown_commands, skip gracefully |
| Output overwrites existing customizations | High | Low | Backup prompts/ before first run |
| Frontmatter corruption | High | Low | Validate after each transform |

## Security Considerations

- Backup existing prompts/ before first run
- Review git diff before committing
- No external services called during sync

## Next Steps

After completing this phase:
1. Proceed to [Phase 6: Testing and Validation](phase-06-testing-and-validation.md)
2. Full end-to-end workflow testing
