---
agent: 'agent'
description: 'Analyze logs and fix issues'
tools: ['search/codebase', 'search/changes', 'read/problems', 'read/terminalLastCommand']
---

**IMPORTANT:** Activate `debugging` and `problem-solving` skills.

## Mission
<issue>${input}</issue>

## Workflow
1. Check if `./logs.txt` exists:
   - If missing, set up permanent log piping in project's script config (`package.json`, `Makefile`, `pyproject.toml`, etc.):
     - **Bash/Unix**: append `2>&1 | tee logs.txt`
     - **PowerShell**: append `*>&1 | Tee-Object logs.txt`
   - Run the command to generate logs
2. analyze `./logs.txt` and find root causes:
   - Use `Grep` with `head_limit: 30` to read only last 30 lines (avoid loading entire file)
   - If insufficient context, increase `head_limit` as needed
3. analyze the codebase and find the exact location of the issues, .
4. create an implementation plan based on the reports, .
5. Start implementing the fix based the reports and solutions.
6. test the fix and make sure it works, .
7. quickly review the code changes and make sure it meets requirements, .
8. If there are issues or failed tests, repeat from step 3.
9. After finishing, respond back to user with a summary of the changes and explain everything briefly, guide user to get started and suggest the next steps.
