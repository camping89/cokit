---
description: '⚡⚡ Analyze and fix issues [INTELLIGENT ROUTING]'
argument-hint:
  - issues
name: ck.fix
---

**Analyze issues and route to specialized fix command:**
<issues>${input}</issues>

## Decision Tree

**1. Check for existing plan:**
- If markdown plan exists → `/ck:code <path-to-plan>`

**2. Route by issue type:**

**A) Type Errors** (keywords: type, typescript, tsc, type error)
→ `/ck:fix:types`

**B) UI/UX Issues** (keywords: ui, ux, design, layout, style, visual, button, component, css, responsive)
→ `/ck:fix:ui <detailed-description>`

**C) CI/CD Issues** (keywords: github actions, pipeline, ci/cd, workflow, deployment, build failed)
→ `/ck:fix:ci <github-actions-url-or-description>`

**D) Test Failures** (keywords: test, spec, jest, vitest, failing test, test suite)
→ `/ck:fix:test <detailed-description>`

**E) Log Analysis** (keywords: logs, error logs, log file, stack trace)
→ `/ck:fix:logs <detailed-description>`

**F) Multiple Independent Issues** (2+ unrelated issues in different areas)
→ `/ck:fix:parallel <detailed-description>`

**G) Complex Issues** (keywords: complex, architecture, refactor, major, system-wide, multiple components)
→ `/ck:fix:hard <detailed-description>`

**H) Simple/Quick Fixes** (default: small bug, single file, straightforward)
→ `/ck:fix:fast <detailed-description>`

## Notes
- `detailed-description` = enhanced prompt describing issue in detail
- If unclear, ask user for clarification before routing
- Can combine routes: e.g., multiple type errors + UI issue → `/ck:fix:parallel`

---

## Suggested Next Steps

| Command | Description |
|---------|-------------|
| `/ck.test` | Run tests and analyze results |

**All commands:** `ck.ask`, `ck.bootstrap`, `ck.fix`, `ck.help`, `ck.journal`, `ck.plan`, `ck.plan.fast`, `ck.plan.hard`, `ck.preview`, `ck.review`, `ck.spec.analyze`, `ck.spec.checklist`, `ck.spec.clarify`, `ck.spec.constitution`, `ck.spec.implement`, `ck.spec.plan`, `ck.spec.specify`, `ck.spec.tasks`, `ck.spec.taskstoissues`, `ck.test`, `ck.watzup`
