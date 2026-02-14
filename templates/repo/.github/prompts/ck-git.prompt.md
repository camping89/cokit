---
agent: 'agent'
description: 'Git operations with conventional commits'
argument-hint: 'cm | cp | pr | merge'
tools: ['execute/runInTerminal', 'execute/getTerminalOutput']
---

## Context
Git operation:
<operation>${input}</operation>

## Arguments

| Arg | Description |
|-----|-------------|
| `cm` | Stage files & create commits |
| `cp` | Stage files, create commits and push |
| `pr` | Create Pull Request [to-branch] [from-branch] |
| `merge` | Merge [to-branch] [from-branch] |

**Defaults:**
- `to-branch`: main
- `from-branch`: current branch

## Core Workflow

### Step 1: Stage + Analyze
```bash
git add -A && git diff --cached --stat && git diff --cached --name-only
```

### Step 2: Security Check
Scan for secrets before commit:
```bash
git diff --cached | grep -iE "(api[_-]?key|token|password|secret|credential)"
```
**If secrets found:** STOP, warn user, suggest `.gitignore`.

### Step 3: Split Decision

**Split commits if:**
- Different types mixed (feat + fix, code + docs)
- Multiple scopes (auth + payments)
- Config/deps + code mixed
- FILES > 10 unrelated

**Single commit if:**
- Same type/scope, FILES ≤ 3, LINES ≤ 50

### Step 4: Commit
```bash
git commit -m "type(scope): description"
```

## Commit Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no code change |
| `refactor` | Code change, no feature/fix |
| `perf` | Performance improvement |
| `test` | Adding/updating tests |
| `chore` | Maintenance tasks |

## Output Format
```
✓ staged: N files (+X/-Y lines)
✓ security: passed
✓ commit: HASH type(scope): description
✓ pushed: yes/no
```

## Error Handling

| Error | Action |
|-------|--------|
| Secrets detected | Block commit, show files |
| No changes | Exit cleanly |
| Push rejected | Suggest `git pull --rebase` |
| Merge conflicts | Suggest manual resolution |

## Pull Request Format

```bash
gh pr create --title "type(scope): description" --body "## Summary
- Change 1
- Change 2

## Test Plan
- [ ] Test A
- [ ] Test B"
```

---

## Suggested Next Steps

| Command | Description |
|---------|-------------|
| `/ck-test` | Run tests before push |
| `/ck-review` | Code review |
