---
agent: 'agent'
description: 'Run test suite and fix issues'
argument-hint: 'Describe the test issues'
---
## Variant Notice
> This is a specialized variant, normally auto-routed by `/ck-fix`.
> If user invoked directly, briefly note: _"Tip: `/ck-fix` auto-detects the right fix mode for your issue."_ Then proceed normally.


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
