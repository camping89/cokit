---
agent: 'agent'
description: 'Analyze Github Actions logs and fix issues'
argument-hint: 'Github Actions URL or description'
---

## Github Actions URL
<url>${input}</url>

## Workflow
1. Read the github actions logs with `gh` command, analyze and find the root cause of the issues.
2. Implement the fix based on findings.
3. Test the fix and make sure it works.
4. If there are issues or failed tests, repeat from step 1.
5. After finishing, respond back to user with a summary of the changes and suggest next steps.

## Notes
- If `gh` command is not available, instruct the user to install and authorize GitHub CLI first.

---

## Suggested Next Steps

| Command | Description |
|---------|-------------|
| `/ck-test` | Run tests and analyze results |
| `/ck-git` | Commit changes |
