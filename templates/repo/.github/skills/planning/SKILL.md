---
name: planning
description: Plan implementations, design architectures, create technical roadmaps with detailed phases. Use for feature planning, system design, solution architecture, implementation strategy, phase documentation.
---

# Planning

Create detailed technical implementation plans through research, codebase analysis, solution design, and comprehensive documentation.

## Workflow Modes

Default: `--auto` — analyze the task and auto-pick the most appropriate mode.

| Flag | Research | Red Team | Validation | Cook Flag |
|------|----------|----------|------------|-----------|
| `--auto` | Auto | Auto | Auto | auto |
| `--fast` | Skip | Skip | Skip | fast |
| `--hard` | Full | Yes | Yes | hard |
| `--parallel` | Parallel | Yes | Yes | parallel |
| `--two` | Full | Yes | Yes | two |

Add `--no-tasks` to any mode to skip todo checklist hydration after the plan is written.

See `references/workflow-modes.md` for detailed mode behavior.

## When to Use

Use this skill when:
- Planning new feature implementations
- Architecting system designs
- Evaluating technical approaches
- Creating implementation roadmaps
- Breaking down complex requirements
- Assessing technical trade-offs

## Core Responsibilities & Rules

Always honoring **YAGNI**, **KISS**, and **DRY** principles.
**Be honest, be brutal, straight to the point, and be concise.**

### 1. Research & Analysis
Load: `references/research-phase.md`
**Skip if:** Provided with researcher reports

### 2. Codebase Understanding
Load: `references/codebase-understanding.md`
**Skip if:** Provided with scout reports

### 3. Solution Design
Load: `references/solution-design.md`

### 4. Plan Creation & Organization
Load: `references/plan-organization.md`

### 5. Task Breakdown & Output Standards
Load: `references/output-standards.md`

## Workflow Process

1. **Pre-Creation Check** → Check `## Plan Context` from hook injection; follow Active Plan State rules below.
2. **Mode Detection** → Use explicit flag if provided; otherwise auto-detect based on task complexity.
3. **Research Phase** → Spawn parallel researcher agents to investigate approaches (skip in `--fast` mode).
4. **Codebase Analysis** → Read docs in `./docs`; activate `/ck-scout` if file relationships are unclear.
5. **Plan Documentation** → Write comprehensive plan via `planner` agent using the directory structure below.
6. **Red Team Review** → Spawn adversarial reviewers to challenge assumptions (`--hard`, `--parallel`, `--two` modes only). See `references/workflow-modes.md`.
7. **Post-Plan Validation** → Use `/ck-plan-validate` to verify completeness and coherence (`--hard`, `--parallel`, `--two` modes only).
8. **Hydrate Tasks** → Create a todo checklist from plan phases with dependency annotations (default on; skip with `--no-tasks` or fewer than 3 phases).
9. **Context Reminder** → Output the cook command with the absolute plan path (MANDATORY): `Use plan at: {absolute-plan-dir-path}`

## Output Requirements

- DO NOT implement code - only create plans
- Respond with plan file path and summary
- Ensure self-contained plans with necessary context
- Include code snippets/pseudocode when clarifying
- Provide multiple options with trade-offs when appropriate
- Fully respect the `./docs/development-rules.md` file.

## Task Management

Plan files are persistent on disk. Todo checklists are session-scoped. Hydration bridges the gap by converting plan phases into trackable checklist items at plan-creation time.

- **Default:** Auto-hydrate after plan is written (create checklist with one item per phase).
- **Skip with:** `--no-tasks` flag or when plan has fewer than 3 phases (3-Task Rule).
- **Checklist format:** Include phase name, dependencies, and owning agent hint per item.

See `references/task-management.md` for checklist schema and dependency notation.

### Important
DO NOT create plans or reports in USER directory.
ALWAYS create plans or reports in CURRENT WORKING PROJECT DIRECTORY.

**Plan Directory Structure**
IN CURRENT WORKING PROJECT DIRECTORY:
```
plans/
└── {date}-plan-name/
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

## Active Plan State

Prevents version proliferation by tracking current working plan via session state.

### Active vs Suggested Plans

Check the `## Plan Context` section injected by hooks:
- **"Plan: {path}"** = Active plan, explicitly set via `set-active-plan.cjs` — use this path for all reports
- **"Suggested: {path}"** = Branch-matched hint only — do NOT auto-use
- **"Plan: none"** = No active plan

### Rules

1. **If "Plan:" shows a path**: Ask "Continue with existing plan? [Y/n]"
2. **If "Suggested:" shows a path**: Inform user, ask if they want to activate or create new
3. **If "Plan: none"**: Create new plan using naming from `## Naming` section
4. **Update on create**: Run `node $HOME/.copilot/scripts/set-active-plan.cjs {plan-dir}`

### Report Output Location

All agents writing reports MUST:
1. Check `## Naming` section injected by hooks for the computed naming pattern
2. Active plans use plan-specific reports path
3. Suggested plans use default reports path (not plan folder)

### Important
DO NOT create plans or reports in USER directory.
ALWAYS create plans or reports in CURRENT WORKING PROJECT DIRECTORY.

**Important:** Suggested plans do NOT get plan-specific reports — this prevents pollution of old plan folders.

## Quality Standards

- Be thorough and specific
- Consider long-term maintainability
- Research thoroughly when uncertain
- Address security and performance concerns
- Make plans detailed enough for junior developers
- Validate against existing codebase patterns

**Remember:** Plan quality determines implementation success. Be comprehensive and consider all solution aspects.

## References

Load as needed:
- `references/workflow-modes.md` - Mode behavior details and flag descriptions
- `references/task-management.md` - Checklist schema, dependency notation, hydration rules
- `references/research-phase.md` - Research phase execution
- `references/codebase-understanding.md` - Codebase analysis steps
- `references/solution-design.md` - Solution design process
- `references/plan-organization.md` - Plan file structure and organization
- `references/output-standards.md` - Task breakdown and output format standards
