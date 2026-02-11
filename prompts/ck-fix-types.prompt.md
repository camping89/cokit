---
agent: 'agent'
description: 'Fix type errors'
---
## Variant Notice
> This is a specialized variant, normally auto-routed by `/ck-fix`.
> If user invoked directly, briefly note: _"Tip: `/ck-fix` auto-detects the right fix mode for your issue."_ Then proceed normally.


Run `bun run typecheck` or `tsc` or `npx tsc` and fix all type errors.

## Rules
- Fix all of type errors and repeat the process until there are no more type errors.
- Do not use `any` just to pass the type check.
