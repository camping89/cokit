---
agent: 'agent'
description: 'Git workflow - commit, push, merge, or create PR'
tools: ['search/changes', 'web/githubRepo']
---

# Git Workflow

## Usage

- `/ck-git` or `/ck-git commit` - Stage all files and create a commit (no push)
- `/ck-git push` - Stage, commit, and push to remote
- `/ck-git merge [to] [from]` - Merge from one branch to another
- `/ck-git pr [to] [from]` - Create a pull request

## Commands

### commit (default)
Stage all files and create a commit.
**DO NOT push the changes to remote repository**

### push
Stage all files, create a meaningful commit based on the changes and push to remote repository.

### merge [TO_BRANCH] [FROM_BRANCH]
- TO_BRANCH: defaults to `main`
- FROM_BRANCH: defaults to current branch

**Workflow:**
1. Sync with remote
```bash
git fetch origin
git checkout {TO_BRANCH}
git pull origin {TO_BRANCH}
```

2. Merge from REMOTE tracking branch
```bash
git merge origin/{FROM_BRANCH} --no-ff -m "merge: {FROM_BRANCH} into {TO_BRANCH}"
```

3. Resolve conflicts if any, then `git add . && git commit`

4. Push merged result
```bash
git push origin {TO_BRANCH}
```

### pr [TO_BRANCH] [FROM_BRANCH]
- TO_BRANCH: defaults to `main`
- FROM_BRANCH: defaults to current branch

**Workflow:**
1. Ensure remote is synced
```bash
git fetch origin
git push -u origin HEAD
```

2. Analyze REMOTE diff (CRITICAL)
```bash
git log origin/{TO_BRANCH}...origin/{FROM_BRANCH} --oneline
git diff origin/{TO_BRANCH}...origin/{FROM_BRANCH} --stat
git diff origin/{TO_BRANCH}...origin/{FROM_BRANCH}
```

3. Generate PR content from remote diff
- Title: Conventional commit format
- Body: Summary of changes on REMOTE

4. Create PR
```bash
gh pr create --base {TO_BRANCH} --head {FROM_BRANCH} --title "..." --body "..."
```

## Notes
- If `gh` command not available, instruct user to install GitHub CLI first
- Always fetch and pull latest remote state before operations
- PR content must reflect REMOTE state since PRs are based on remote branches
