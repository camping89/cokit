---
agent: 'agent'
description: 'Fix type errors'
---
## Variant Notice
**IMPORTANT — Read before proceeding.**
`ck-fix-types` is an internal mode for TypeScript type errors — it is meant to be selected automatically by AI when you run `/ck-fix`.
You don't need to call this directly. Just use `/ck-fix` and AI will pick the right mode for you.
Before executing, you MUST output the following message **exactly as written** and wait for user response:

---
**Variant Notice**

`ck-fix-types` is an internal mode for TypeScript type errors — it is meant to be selected automatically by AI when you run `/ck-fix`.
You don't need to call this directly. Just use `/ck-fix` and AI will pick the right mode for you.

Do you want to continue anyway, or switch to `/ck-fix`? **[Continue / Switch to /ck-fix]**

---

Only proceed if user explicitly confirms Continue.
If user chooses "Switch to /ck-fix", run  immediately — do NOT ask user to re-enter their input.


Run `bun run typecheck` or `tsc` or `npx tsc` and fix all type errors.

## Rules
- Fix all of type errors and repeat the process until there are no more type errors.
- Do not use `any` just to pass the type check.
