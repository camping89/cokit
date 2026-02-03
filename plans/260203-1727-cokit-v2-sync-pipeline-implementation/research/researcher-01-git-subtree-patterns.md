# Git Subtree Best Practices Report

## 1. Core Commands & Flags

### Basic Operations
```bash
# Add subtree (first time)
git subtree add --prefix=<path> <repo-url> <branch/tag> --squash

# Update subtree (pull upstream)
git subtree pull --prefix=<path> <repo-url> <branch/tag> --squash

# Push local changes back to upstream
git subtree push --prefix=<path> <repo-url> <branch>
```

### Critical Flag: `--squash`
- **Recommended always**: Flattens remote history into single commit
- Reduces log clutter, avoids history duplication
- Prevents issues when same subproject included multiple times
- Simplifies merge conflict handling

### Remote Strategy (Recommended)
```bash
git remote add <remote-name> <repo-url>
git subtree add --prefix=<path> <remote-name> <branch> --squash
```
Enables shorter commands & easier maintenance.

---

## 2. Merge Conflict Handling

### Standard Resolution
- Conflicts follow normal git merge patterns
- Resolve manually like any merge conflict
- Use `--ours` or `--theirs` merge strategies if needed

### Advanced: `--rejoin` for Smarter Merging
```bash
git subtree split --prefix=<path> --rejoin
```
- Helps git's algorithm avoid future conflicts
- Preserves synthetic history understanding
- Use when splitting changes for upstream backport

### Prevention Strategy
- Split commits between subtree & main project
- Example: if change affects library + app → make 2 commits
- Cleaner history + easier backporting

---

## 3. Version Pinning Strategies

### Tags (Preferred)
```bash
git subtree add --prefix=libs/mylib <url> v1.2.3 --squash
```
- Explicit, reproducible, semantic versioning
- Clear upgrade path (v1.2.3 → v1.3.0)

### Branches
```bash
git subtree add --prefix=libs/mylib <url> main --squash
```
- Tracks latest upstream
- Risky for production (can break without warning)
- Use only for active development

### Hybrid Approach
- Pin to stable tags for dependencies
- Use branches only for internal tooling/dev repos
- Document pinning decision in commit messages

---

## 4. Common Pitfalls & Solutions

| Pitfall | Impact | Solution |
|---------|--------|----------|
| **Invisible subtrees** | Team unaware of external deps | Document in README, use consistent prefix naming |
| **Mixed commits** | Hard to backport changes | Split commits: one for subtree, one for main |
| **Forgot `--squash`** | Polluted history, repeated merges | Use always; reset & recommit if forgotten |
| **Bidirectional confusion** | Unclear source of truth | Pull from upstream first, push local changes last |
| **No version tracking** | Can't reproduce builds | Use tags, pin versions in docs |

---

## 5. When to Use Subtree vs. Submodule

**Use Subtree if:**
- Third-party read-only dependencies
- Rarely pushing changes upstream
- Want simpler repository structure (no .gitmodules)
- Content may need local modifications

**Use Submodule if:**
- Own the upstream repository
- Regularly push changes back
- Need explicit version management metadata
- Multiple teams managing same submodule

---

## Key Takeaways

1. **Always use `--squash`** for cleaner history
2. **Pin to tags**, not branches, for stability
3. **Split commits** between subtree & main project
4. **Add remotes** for shorter, maintainable commands
5. **Document subtrees** - they're invisible by default
6. **Use `--rejoin`** before complex merges to avoid conflicts

---

**Sources:**
- [Git Subtree: Alternative to Git Submodule | Atlassian](https://www.atlassian.com/git/tutorials/git-subtree)
- [Mastering Git subtrees | Medium](https://medium.com/@porteneuve/mastering-git-subtrees-943d29a798ec)
- [Git Subtree basics | GitHub Gist](https://gist.github.com/SKempin/b7857a6ff6bddb05717cc17a44091202)
- [Git Subtrees Handbook | Giant Swarm](https://handbook.giantswarm.io/docs/product/managed-apps/dev-experience/git-subtree/)
- [About Git subtree merges | GitHub Docs](https://docs.github.com/en/get-started/using-git/about-git-subtree-merges)
- [Advanced Merging | Git SCM Book](https://git-scm.com/book/en/v2/Git-Tools-Advanced-Merging)
