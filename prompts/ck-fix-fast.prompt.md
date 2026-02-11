---
agent: 'agent'
description: 'Analyze and fix small issues [FAST]'
argument-hint: 'Describe the issues'
---
## Variant Notice
**IMPORTANT — Read before proceeding.**
`ck-fix-fast` is an internal mode for quick fixes for simple bugs — it is meant to be selected automatically by AI when you run `/ck-fix`.
You don't need to call this directly. Just use `/ck-fix` and AI will pick the right mode for you.
Before executing, you MUST output the following message **exactly as written** and wait for user response:

---
**Variant Notice**

`ck-fix-fast` is an internal mode for quick fixes for simple bugs — it is meant to be selected automatically by AI when you run `/ck-fix`.
You don't need to call this directly. Just use `/ck-fix` and AI will pick the right mode for you.

Do you want to continue anyway, or switch to `/ck-fix`? **[Continue / Switch to /ck-fix]**

---

Only proceed if user explicitly confirms Continue.
If user chooses "Switch to /ck-fix", run `/ck-fix ${input}` immediately — do NOT ask user to re-enter their input.


## Mission
**Think hard** to analyze and fix these issues:
<issues>${input}</issues>

## Workflow
1. Activate `debug` and `problem-solving` skills to find the root cause.
2. Implement the fix.
3. Test the fix and make sure it works.
4. If there are issues or failed tests, repeat from step 1.
5. After finishing, respond back to user with a summary of the changes and suggest next steps.

---

## Suggested Next Steps

| Command | Description |
|---------|-------------|
| `/ck-test` | Run tests and analyze results |
| `/ck-git` | Commit changes |
