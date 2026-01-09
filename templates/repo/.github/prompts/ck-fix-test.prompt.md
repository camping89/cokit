---
agent: 'agent'
description: 'Run test suite and fix issues'
tools: ['search/codebase', 'search/changes', 'read/problems', 'read/terminalLastCommand']
---

## Reported Issues:
<issues>${input}</issues>

## Workflow:
1. compile the code and fix all syntax errors if any.
2. run the tests and .
3. If there are issues or failed tests, find the root cause of the issues, .
4. create an implementation plan based on the reports, .
5. Use main agent to implement the plan step by step.
6. test the fix and make sure it works, .
6. quickly review the code changes and make sure it meets requirements, .
7. If there are issues or failed tests, repeat from step 2.
8. After finishing, respond back to user with a summary of the changes and explain everything briefly, guide user to get started and suggest the next steps.
