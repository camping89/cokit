---
agent: 'agent'
description: 'Intelligent plan creation with prompt enhancement'
tools: ['search/codebase', 'search/changes', 'web/fetch', 'read/problems']
---

## Your mission
<task>
${input}
</task>

## Pre-Creation Check (Active vs Suggested Plan Detection)

Check the `## Plan Context` section in the injected context:
- If "Plan:" shows a path → Active plan exists. Ask user: "Active plan found: {path}. Continue with this? [Y/n]"
- If "Suggested:" shows a path → Branch-matched plan hint only. Ask user if they want to activate it or create new.
- If "Plan: none" → Proceed to create new plan using naming pattern from `## Naming` section.

## Workflow
- Analyze the given task and ask user for more details if needed.
- Decide complexity:
  - **Simple task** (clear scope, no research needed) → Use `/plan:fast`
  - **Complex task** (needs research, multiple aspects) → Use `/plan:hard`
- Execute the chosen SlashCommand with an **enhanced detailed prompt**:
  - `/plan:fast <detailed-instructions-prompt>`
  - `/plan:hard <detailed-instructions-prompt>`

**Note:** The `detailed-instructions-prompt` must describe the task in detail based on user's input.

## Output
The output MUST be markdown plan files saved to `plans/` directory:
```
{plan-dir}/
├── plan.md              ← Main plan with YAML frontmatter
├── phase-XX-*.md        ← Implementation phases
└── reports/             ← Any analysis reports
```

## Clarification & Finalization Flow

After creating the initial plan:

1. **If questions exist** → List questions at the end of your response (max 3-5 questions)
2. **After user answers** → Update `plan.md` with clarified requirements
3. **Repeat** until no ambiguities remain
4. **Finalize** → Confirm plan is complete and ready for implementation

**Question format:**
```
## Questions before finalizing:
1. [Question 1]?
2. [Question 2]?
...
```

## Next Steps Suggestion

After plan is finalized, suggest the appropriate implementation command:

| Task Type | Suggested Command |
|-----------|-------------------|
| Feature development | `/ck-cook` or `/ck-code` |
| Bug fix | `/fix` |
| Refactoring | `/refactor` |
| Documentation | `/docs` |

**Example output:**
```
✅ Plan finalized: {plan-dir}/plan.md

Ready to implement? Run one of these:
- `/ck-cook` - Full-featured implementation with tests
- `/ck-code` - Quick implementation
```

## Important Notes
- **IMPORTANT:** Sacrifice grammar for the sake of concision when writing reports.
- **IMPORTANT:** Ensure token efficiency while maintaining high quality.
- **IMPORTANT:** In reports, list any unresolved questions at the end, if any.
- **IMPORTANT:** **Do not** start implementing.
