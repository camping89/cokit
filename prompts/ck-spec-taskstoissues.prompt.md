---
agent: 'agent'
description: 'Convert tasks into GitHub issues for project tracking'
tools:
  - github/github-mcp-server/issue_write
scripts:
  sh: spec-kit/scripts/bash/check-prerequisites.sh --json --require-tasks --include-tasks
  ps: spec-kit/scripts/powershell/check-prerequisites.ps1 -Json -RequireTasks -IncludeTasks
---

## User Input

```text
${input}
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

1. Run `{SCRIPT}` from repo root and parse FEATURE_DIR and AVAILABLE_DOCS list. All paths must be absolute. For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\''m Groot' (or double-quote if possible: "I'm Groot").

2. From the executed script, extract the path to **tasks**.

3. **Verify Git repository and GitHub remote**:
   - Check if this is a git repository: `git rev-parse --git-dir 2>/dev/null`
   - If NOT a git repo: **STOP** and inform user "This command requires a git repository with a GitHub remote. Initialize git first or use `/ck.spec.implement` instead."
   - Get the Git remote: `git config --get remote.origin.url`

> [!CAUTION]
> ONLY PROCEED TO NEXT STEPS IF THE REMOTE IS A GITHUB URL (contains github.com)

4. For each task in the list, use the GitHub MCP server to create a new issue in the repository that is representative of the Git remote.

> [!CAUTION]
> UNDER NO CIRCUMSTANCES EVER CREATE ISSUES IN REPOSITORIES THAT DO NOT MATCH THE REMOTE URL

---

## Suggested Next Steps

| Command | Description | When to Use |
|---------|-------------|-------------|
| `/ck.spec.implement` | Start implementation | Issues created, ready to code |
| `/ck.spec.tasks` | Regenerate tasks | Need to update task list |
| `/ck.kanban` | View project board | Track progress on created issues |

**Usage:** Run after `/ck.spec.tasks` to sync tasks with GitHub Issues for team tracking
