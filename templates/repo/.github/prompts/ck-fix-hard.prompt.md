---
agent: 'agent'
description: 'Plan and fix hard issues systematically'
argument-hint: 'Describe the issues'
---
## Variant Notice
**IMPORTANT — Read before proceeding.**
`ck-fix-hard` is an internal mode for complex, multi-step bug fixing — it is meant to be selected automatically by AI when you run `/ck-fix`.
You don't need to call this directly. Just use `/ck-fix` and AI will pick the right mode for you.
Before executing, you MUST output the following message **exactly as written** and wait for user response:

---
**Variant Notice**

`ck-fix-hard` is an internal mode for complex, multi-step bug fixing — it is meant to be selected automatically by AI when you run `/ck-fix`.
You don't need to call this directly. Just use `/ck-fix` and AI will pick the right mode for you.

Do you want to continue anyway, or switch to `/ck-fix`? **[Continue / Switch to /ck-fix]**

---

Only proceed if user explicitly confirms Continue.
If user chooses "Switch to /ck-fix", run  immediately — do NOT ask user to re-enter their input.


**Think deeply** to plan & fix these issues:
<issues>${input}</issues>

## Workflow:

### Clarify the request
**Question Everything**: Ask probing questions directly in your response to fully understand the user's request, constraints, and true objectives. Then stop and wait for the user to answer before proceeding. Don't assume - clarify until you're 100% certain.

* Ask 1 question at a time, wait for the user to answer before moving to the next question.
* If you don't have any questions, start the next step.

### Fix the issue

Use `sequential-thinking` skill to break complex problems into sequential thought steps.
Use `problem-solving` skills to tackle the issues.

1. Investigate and find the root cause of the issues.
2. Research about the root causes on the internet (if needed).
3. Create an implementation plan based on findings.
4. Implement the plan step by step.
5. Test the fix and make sure it works.
6. Final Report:
   * Summary of changes, guide user to get started, suggest next steps.
   * Ask the user if they want to commit and push to git repository.
   - **IMPORTANT:** Sacrifice grammar for the sake of concision when writing reports.
   - **IMPORTANT:** In reports, list any unresolved questions at the end, if any.

---

## Suggested Next Steps

| Command | Description |
|---------|-------------|
| `/ck-test` | Run tests and analyze results |
| `/ck-git` | Commit changes |
