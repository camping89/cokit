---
agent: 'agent'
description: 'Analyze and fix small issues [FAST]'
tools: ['search/codebase', 'search/changes', 'read/problems', 'read/terminalLastCommand']
---

## Mission
**Think hard** to analyze and fix these issues:
<issues>${input}</issues>

## Workflow
1. If the user provides a screenshots or videos, 
2. find the root cause of the issues and .
3. Activate `debugging` skills and `problem-solving` skills to tackle the issues.
4. Start implementing the fix based the reports and solutions.
5. test the fix and make sure it works, .
6. If there are issues or failed tests, repeat from step 2.
7. After finishing, respond back to user with a summary of the changes and explain everything briefly, guide user to get started and suggest the next steps.
