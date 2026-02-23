---
agent: 'agent'
description: 'Intelligent plan creation with prompt enhancement'
argument-hint: 'Task description or requirements'
---

**Analyze task and route to the right planning mode:**
<task>${input}</task>

## Decision Tree

**1. Check for existing plan:**
- Check `## Plan Context` section in injected context
- If "Plan:" shows a path → Active plan exists. Ask user: "Active plan found: {path}. Continue with this? [Y/n]"
- If "Suggested:" shows a path → Branch-matched hint. Ask user to activate or create new.
- If "Plan: none" → Proceed to step 2.

**2. Route by complexity:**

**A) Simple/Quick Tasks** (keywords: small, quick, simple, straightforward, single file, minor, tweak, < 2 hours)
→ `/ck-plan-fast <detailed-instructions-prompt>`

**B) Complex/Research-Heavy Tasks** (keywords: complex, research, unfamiliar, architecture, multi-component, integration, large, major, multi-day)
→ `/ck-plan-hard <detailed-instructions-prompt>`

**C) Validate Existing Plan** (keywords: validate, review plan, check plan, verify assumptions)
→ `/ck-plan-validate <path-to-plan>`

**D) Default/Medium Tasks** (anything else)
→ Execute planning workflow below directly.

## Workflow (for Default/Medium tasks)

- Activate `planning` skill.
- Analyze the given task and ask clarifying questions directly if needed. Wait for user response before proceeding.
- Note: `detailed-instructions-prompt` is **an enhanced prompt** that describes the task in detail based on the provided task description.

## Post-Plan Validation (Optional)

After plan creation, offer validation for non-trivial plans.

Check `## Plan Context` → `Validation: mode=X, questions=MIN-MAX`:

| Mode | Behavior |
|------|----------|
| `prompt` | Ask user: "Validate this plan with a brief interview?" → Yes (Recommended) / No |
| `auto` | Automatically execute `/ck-plan-validate {plan-path}` |
| `off` | Skip validation step entirely |

If user chooses validation or mode is `auto`: Execute `/ck-plan-validate {plan-path}`.

## Notes
- `detailed-instructions-prompt` = enhanced prompt describing task in detail
- If unclear about complexity, default to this prompt's workflow (medium)
- Fast plans skip validation by default
- Hard plans recommend validation

## Important Notes
**IMPORTANT:** Analyze the skills catalog and activate the skills that are needed for the task during the process.
**IMPORTANT:** Sacrifice grammar for the sake of concision when writing reports.
**IMPORTANT:** Ensure token efficiency while maintaining high quality.
**IMPORTANT:** In reports, list any unresolved questions at the end, if any.
**IMPORTANT**: **Do not** start implementing.

---

## Suggested Next Steps

| Command | Description |
|---------|-------------|
| `/ck-plan-validate` | Validate plan with critical questions |
| `/ck-spec-tasks` | Break plan into actionable tasks |
| `/ck-cook` | Implement plan |
| `/ck-test` | Run tests and analyze results |
| `/ck-fix` | Analyze and fix issues |
| `/ck-spec-specify` | Need detailed spec first? Start spec-driven flow |
