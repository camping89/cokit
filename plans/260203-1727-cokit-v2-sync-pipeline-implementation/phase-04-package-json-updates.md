# Phase 4: Package.json Script Updates

## Context Links

- [Plan Overview](plan.md)
- [Current package.json](../../package.json)
- [Maintenance Guide](../../docs/cokit-sync-and-maintenance-guide.md)

## Overview

| Field | Value |
|-------|-------|
| Priority | P2 |
| Status | Pending |
| Effort | 15 minutes |
| Dependencies | Phase 3 (transform scripts exist) |

Update package.json with sync-related npm scripts for easy execution and maintenance.

## Key Insights

- Keep script names consistent with maintenance guide
- Provide granular scripts (pull, transform) + combined (sync)
- Use ES modules directly (no build step needed)

## Requirements

### Functional

- `npm run sync` - Full sync pipeline
- `npm run sync:pull` - Pull latest from SpecKit subtree
- `npm run sync:transform` - Run transforms without pull
- Add dev dependencies for transform scripts

### Non-Functional

- Scripts should be self-documenting
- Consistent naming convention

## Architecture

```
npm run sync
    │
    ├── sync:pull (git subtree pull)
    │
    └── sync:transform (node eng/sync.mjs)
```

## Related Code Files

### Files to Modify

| File | Changes |
|------|---------|
| `package.json` | Add scripts, devDependencies |

## Implementation Steps

### Step 1: Add devDependencies

```json
{
  "devDependencies": {
    "globby": "^14.0.0",
    "gray-matter": "^4.0.3",
    "js-yaml": "^4.1.0"
  }
}
```

### Step 2: Add Scripts

```json
{
  "scripts": {
    "sync": "npm run sync:pull && npm run sync:transform",
    "sync:pull": "git subtree pull --prefix=upstream/speckit speckit main --squash",
    "sync:transform": "node eng/sync.mjs",
    "sync:dry-run": "node eng/sync.mjs --dry-run"
  }
}
```

### Step 3: Update Existing Scripts (Optional Cleanup)

Current scripts to review:
- `convert:agents` - May be deprecated by new sync
- `convert:commands` - May be deprecated by new sync
- `convert:skills` - May be deprecated by new sync
- `convert:all` - May be deprecated by new sync

Recommendation: Keep old scripts until v2 sync is stable, then remove.

## Todo List

- [ ] Add globby to devDependencies
- [ ] Add gray-matter to devDependencies
- [ ] Add js-yaml to devDependencies
- [ ] Add `sync` script
- [ ] Add `sync:pull` script
- [ ] Add `sync:transform` script
- [ ] Add `sync:dry-run` script
- [ ] Run `npm install` to update package-lock.json
- [ ] Verify scripts execute correctly

## Success Criteria

- [ ] `npm run sync:pull` executes git subtree pull
- [ ] `npm run sync:transform` runs eng/sync.mjs
- [ ] `npm run sync` runs both in sequence
- [ ] All devDependencies installed correctly

## Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Script name conflicts | Low | Low | Check existing scripts first |
| Dependency version issues | Low | Low | Pin to stable versions |
| Old convert scripts break | Medium | Low | Keep both until v2 stable |

## Security Considerations

- No secrets in scripts
- Use local node_modules only
- Git operations are local (no push)

## Next Steps

After completing this phase:
1. Proceed to [Phase 5: Initial Sync Execution](phase-05-initial-sync-execution.md)
2. Run full sync pipeline for first time
