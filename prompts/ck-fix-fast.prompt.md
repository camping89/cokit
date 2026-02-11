---
agent: 'agent'
description: 'Analyze and fix small issues [FAST]'
argument-hint: 'Describe the issues'
---
## Variant Notice
> This is a specialized variant, normally auto-routed by `/ck-fix`.
> If user invoked directly, briefly note: _"Tip: `/ck-fix` auto-detects the right fix mode for your issue."_ Then proceed normally.


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
