# Phase 1: Git Subtree Setup for SpecKit

## Context Links

- [Plan Overview](plan.md)
- [Git Subtree Patterns](research/researcher-01-git-subtree-patterns.md)
- [Maintenance Guide](../../docs/cokit-sync-and-maintenance-guide.md)

## Overview

| Field | Value |
|-------|-------|
| Priority | P1 - Critical Path |
| Status | Pending |
| Effort | 30 minutes |
| Dependencies | None |

Set up git subtree to pull SpecKit repository into `upstream/speckit/` directory. This enables automated syncing of SpecKit commands while maintaining clean git history.

## Key Insights

- Use `--squash` flag always to flatten remote history
- Add named remote for shorter commands
- Pin to `main` branch initially; switch to tags for production stability
- Subtrees are invisible by default - document in README

## Requirements

### Functional

- SpecKit content at `upstream/speckit/`
- Named git remote `speckit` for easy pulls
- Squashed commits for clean history

### Non-Functional

- Pull should complete < 10 seconds
- No pollution of main git log

## Architecture

```
cokit/
├── upstream/
│   └── speckit/           ← git subtree
│       ├── templates/
│       │   └── commands/  ← Source prompts
│       ├── spec-driven.md
│       └── README.md
├── eng/                   ← Transform scripts (Phase 3)
├── prompts/               ← Generated output
└── ...
```

## Related Code Files

### Files to Create

- None (git operations only)

### Files to Modify

- `.gitignore` - Ensure upstream/ not ignored

### Directories to Create

- `upstream/speckit/` (via git subtree add)

## Implementation Steps

1. **Add SpecKit remote**
   ```bash
   git remote add speckit https://github.com/github/spec-kit.git
   ```

2. **Fetch remote refs**
   ```bash
   git fetch speckit
   ```

3. **Add subtree with squash**
   ```bash
   git subtree add --prefix=upstream/speckit speckit main --squash
   ```

4. **Verify structure**
   ```bash
   ls upstream/speckit/templates/commands/
   ```

5. **Document in README** (optional - defer to Phase 6)

## Todo List

- [ ] Add speckit git remote
- [ ] Fetch speckit refs
- [ ] Add subtree with --squash flag
- [ ] Verify upstream/speckit/ structure exists
- [ ] Verify templates/commands/ contains spec files
- [ ] Commit subtree addition

## Success Criteria

- [ ] `upstream/speckit/` directory exists
- [ ] `git remote -v` shows speckit remote
- [ ] `upstream/speckit/templates/commands/` contains .md files
- [ ] Git log shows single squashed commit for subtree

## Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| SpecKit repo unavailable | High | Low | Document fallback manual process |
| Wrong branch/path structure | Medium | Medium | Verify structure before proceeding |
| Merge conflicts on update | Low | Low | Use --squash to minimize |

## Security Considerations

- SpecKit is public GitHub repo - no credentials needed
- Subtree content is read-only (no push back)
- Review changes via `git diff` before committing

## Next Steps

After completing this phase:
1. Proceed to [Phase 2: Resource Origins Mapping](phase-02-resource-origins-mapping.md)
2. Verify SpecKit command files match expected structure from brainstorm
