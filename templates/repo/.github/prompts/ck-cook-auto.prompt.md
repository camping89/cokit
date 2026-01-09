---
agent: 'agent'
description: 'Implement a feature automatically ("trust me bro")'
tools: ['search/codebase', 'search/changes', 'web/fetch', 'web/githubRepo', 'read/terminalLastCommand']
---

**Ultrathink** to plan & start working on these tasks follow the Orchestration Protocol, Core Responsibilities, Subagents Team and Development Rules:
<tasks>${input}</tasks>

**

## Workflow:
1.
2.
3. Finally ask user if they want to commit to git repository, if yes trigger `/git:cm` to create a LOCAL commit only.

**IMPORTANT:** Do NOT push to remote repository. Only commit locally. If user wants to push, suggest them to run `/commit` or `git push` manually.
