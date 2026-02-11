---
agent: 'agent'
description: 'Analyze logs and fix issues'
argument-hint: 'Describe the issue'
---
## Variant Notice
**IMPORTANT — Read before proceeding.**
`ck-fix-logs` is an internal mode for issues found in logs — it is meant to be selected automatically by AI when you run `/ck-fix`.
You don't need to call this directly. Just use `/ck-fix` and AI will pick the right mode for you.
Before executing, you MUST output the following message **exactly as written** and wait for user response:

---
**Variant Notice**

`ck-fix-logs` is an internal mode for issues found in logs — it is meant to be selected automatically by AI when you run `/ck-fix`.
You don't need to call this directly. Just use `/ck-fix` and AI will pick the right mode for you.

Do you want to continue anyway, or switch to `/ck-fix`? **[Continue / Switch to /ck-fix]**

---

Only proceed if user explicitly confirms Continue.
If user chooses "Switch to /ck-fix", run  immediately — do NOT ask user to re-enter their input.


## Mission
<issue>${input}</issue>

## Workflow
1. Check if `./logs.txt` exists:
   - If missing, set up permanent log piping in project's script config (`package.json`, `Makefile`, `pyproject.toml`, etc.):
     - **Bash/Unix**: append `2>&1 | tee logs.txt`
     - **PowerShell**: append `*>&1 | Tee-Object logs.txt`
   - Run the command to generate logs
2. Analyze `./logs.txt` and find root causes:
   - Use `Grep` with `head_limit: 30` to read only last 30 lines (avoid loading entire file)
   - If insufficient context, increase `head_limit` as needed
3. Search the codebase to find the exact location of the issues.
4. Create an implementation plan based on findings.
5. Implement the fix.
6. Test the fix and make sure it works.
7. Review the code changes and make sure it meets requirements.
8. If there are issues or failed tests, repeat from step 3.
9. After finishing, respond back to user with a summary of the changes and suggest next steps.

---

## Suggested Next Steps

| Command | Description |
|---------|-------------|
| `/ck-test` | Run tests and analyze results |
| `/ck-git` | Commit changes |
