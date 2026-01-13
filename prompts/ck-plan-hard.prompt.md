---
agent: 'agent'
description: 'Research, analyze, and create an implementation plan'
tools: ['search/codebase', 'search/changes', 'web/fetch', 'read/problems']
---

Think harder.


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
1. If creating new: Create directory using `Plan dir:` from `## Naming` section, then run `node  {plan-dir}`
   If reusing: Use the active plan path from Plan Context.
   Make sure you pass the directory path to every  during the process.
2. Follow strictly to the "Plan Creation & Organization" rules of `planning` skill.
3. Use multiple `researcher` agents (max 2 agents)  to research for this task:
   Each agent research for a different aspect of the task and are allowed to perform max 5 tool calls.
4. Analyze the codebase by reading `codebase-summary.md`, ``, `system-architecture.md` and `project-overview-pdr.md` file.
   **ONLY PERFORM THIS FOLLOWING STEP IF `codebase-summary.md` is not available or older than 3 days**: Use  <instructions>`  to search the codebase for files needed to complete the task.
5. 
6. 

**Check `## Plan Context` → `Validation: mode=X, questions=MIN-MAX`:**

| Mode | Behavior |
|------|----------|
| `prompt` | Ask user: "Validate this plan with a brief interview?" → Yes (Recommended) / No |
| `auto` | Automatically execute :validate {plan-path}` |
| `off` | Skip validation step entirely |

**If mode is `prompt`:** Ask user with options above.
**If user chooses validation or mode is `auto`:** Execute :validate {plan-path}` SlashCommand.

## Output Requirements

**Plan Directory Structure** (use `Plan dir:` from `## Naming` section)
```
{plan-dir}/
├── research/
│   ├── researcher-XX-report.md
│   └── ...
├── reports/
│   ├── XX-report.md
│   └── ...
├── scout/
│   ├── scout-XX-report.md
│   └── ...
├── plan.md
├── phase-XX-phase-name-here.md
└── ...
```

**Research Output Requirements**
- Ensure every research markdown report remains concise (≤150 lines) while covering all requested topics and citations.

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
- **IMPORTANT:** Ensure token efficiency while maintaining high quality.
- **IMPORTANT:** Sacrifice grammar for the sake of concision when writing reports.
- **IMPORTANT:** In reports, list any unresolved questions at the end, if any.
- **IMPORTANT:** **Do not** start implementing.
