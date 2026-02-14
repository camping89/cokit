---
agent: 'agent'
description: 'Run test suite and fix issues'
argument-hint: 'Describe the test issues'
---
## Variant Notice
**IMPORTANT — Read before proceeding.**
`ck-fix-test` is an internal mode for test failures — it is meant to be selected automatically by AI when you run `/ck-fix`.
You don't need to call this directly. Just use `/ck-fix` and AI will pick the right mode for you.
Before executing, you MUST output the following message **exactly as written** and wait for user response:

---
**Variant Notice**

`ck-fix-test` is an internal mode for test failures — it is meant to be selected automatically by AI when you run `/ck-fix`.
You don't need to call this directly. Just use `/ck-fix` and AI will pick the right mode for you.

Do you want to continue anyway, or switch to `/ck-fix`? **[Continue / Switch to /ck-fix]**

---

Only proceed if user explicitly confirms Continue.
If user chooses "Switch to /ck-fix", run  immediately — do NOT ask user to re-enter their input.


## Reported Issues:
<issues>${input}</issues>

## Workflow:
1. Compile the code and fix all syntax errors if any.
2. Run the tests and analyze the results.
3. If there are issues or failed tests, investigate the root cause.
4. Create an implementation plan based on findings.
5. Implement the fix step by step.
6. Test the fix and make sure it works.
7. Review the code changes and make sure it meets requirements.
8. If there are issues or failed tests, repeat from step 2.
9. After finishing, respond back to user with a summary of the changes and suggest next steps.

---

## Suggested Next Steps

| Command | Description |
|---------|-------------|
| `/ck-fix` | Analyze and fix issues |
| `/ck-git` | Commit changes |
