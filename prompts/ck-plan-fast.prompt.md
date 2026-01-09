---
agent: 'agent'
description: 'No research. Only analyze and create an implementation plan'
tools: ['search/codebase', 'search/changes', 'read/problems']
---

Think.


## Your mission
<task>
${input}
</task>

## Pre-Creation Check (Active vs Suggested Plan)

Check the `## Plan Context` section in the injected context:
- If "Plan:" shows a path → Active plan exists. Ask user: "Continue with this? [Y/n]"
- If "Suggested:" shows a path → Branch-matched hint only. Ask if they want to activate or create new.
- If "Plan: none" → Create new plan using naming from `## Naming` section.

## Workflow
Use  to:
1. If creating new: Create directory using `Plan dir:` from `## Naming` section, then run `node  {plan-dir}`
   If reusing: Use the active plan path from Plan Context.
   Make sure you pass the directory path to every  during the process.
2. Follow strictly to the "Plan Creation & Organization" rules of `planning` skill.
3. Analyze the codebase by reading `codebase-summary.md`, ``, `system-architecture.md` and `project-overview-pdr.md` file.
4. Gathers all information and create an implementation plan of this task.
5. Ask user to review the plan.

## Output Requirements

**Plan Directory Structure** (use `Plan dir:` from `## Naming` section)
```
{plan-dir}/
├── reports/
│   ├── XX-report.md
│   └── ...
├── plan.md
├── phase-XX-phase-name-here.md
└── ...
```

**Plan File Specification**
- Every `plan.md` MUST start with YAML frontmatter:
  ```yaml
  ---
  title: "{Brief title}"
  description: "{One sentence for card preview}"
  status: pending
  priority: P2
  effort: {sum of phases, e.g., 4h}
  branch: {current git branch}
  tags: [relevant, tags]
  created: {YYYY-MM-DD}
  ---
  ```
- Save the overview access point at `{plan-dir}.md`. Keep it generic, under 80 lines, and list each implementation phase with status and progress plus links to phase files.
- For each phase, create `{plan-dir}/phase-XX-phase-name-here.md` containing the following sections in order: Context links (reference parent plan, dependencies, docs), Overview (date, description, priority, implementation status, review status), Key Insights, Requirements, Architecture, Related code files, Implementation Steps, Todo list, Success Criteria, Risk Assessment, Security Considerations, Next steps.

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
| Feature development | `/cook` or `/code` |
| Bug fix | `/fix` |
| Refactoring | `/refactor` |
| Documentation | `/docs` |

**Example output:**
```
✅ Plan finalized: {plan-dir}/plan.md

Ready to implement? Run one of these:
- `/cook` - Full-featured implementation with tests
- `/code` - Quick implementation
```

## Important Notes
- **IMPORTANT:** Ensure token consumption efficiency while maintaining high quality.
- **IMPORTANT:** Sacrifice grammar for the sake of concision when writing reports.
- **IMPORTANT:** In reports, list any unresolved questions at the end, if any.
- **IMPORTANT:** **Do not** start implementing.
- **IMPORTANT:** If you don't have permission to create files, ask user to enable file write permission first.
