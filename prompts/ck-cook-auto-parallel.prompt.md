---
agent: 'agent'
description: 'Plan parallel phases & execute with fullstack-developer agents'
tools: ['search/codebase', 'search/changes', 'web/fetch', 'web/githubRepo', 'read/terminalLastCommand']
---

**Ultrathink parallel** to implement: <tasks>${input}</tasks>

**IMPORTANT:** Activate needed skills. Ensure token efficiency. Sacrifice grammar for concision.

## Workflow

### 1. Research (Optional)
- Use max 2 `researcher` agents  if tasks complex
- Use  to search codebase
- Keep reports ≤150 lines

### 2. Parallel Planning
- Trigger :parallel <detailed-instruction>`
- Wait for plan with dependency graph, execution strategy, file ownership matrix

### 3. Parallel Implementation
- Read `plan.md` for dependency graph
- Launch multiple `fullstack-developer` agents  for concurrent phases
  - Example: "Phases 1-3 parallel" → launch 3 agents simultaneously
  - Pass phase file path: `{plan-dir}/phase-XX-*.md`
  - Include environment info
- Wait for all parallel phases complete before dependent phases
- Sequential phases: launch one agent at a time

### 4. Testing
- NO fake data/mocks/cheats
- If fail: use `debugger`, fix, repeat

### 5. Code Review
- Use `code-reviewer` for all changes
- If critical issues: fix, retest

### 6. Project Management & Docs
- If approved: use `project-manager` + `docs-manager` 
- Update plan files, docs, roadmap
- If rejected: fix and repeat

### 7. Final Report
- Summary of all parallel phases
- Guide to get started
- Ask to commit to LOCAL repository (use `git-manager` if yes)
- **IMPORTANT:** Do NOT push to remote repository. Only commit locally. If user wants to push, suggest them to run `/commit` or `git push` manually.

**Example:** Phases 1-3 parallel → Launch 3 fullstack-developer agents → Wait → Phase 4 sequential
