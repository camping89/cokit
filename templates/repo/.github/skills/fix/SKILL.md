---
name: fix
description: ALWAYS activate this skill before fixing ANY bug, error, test failure, CI/CD issue, type error, lint, log error, UI issue, code problem.
---

# Fixing

Unified skill for fixing issues of any complexity with intelligent routing.

## Arguments

- `--auto` - Activate autonomous mode (**default**)
- `--review` - Activate human-in-the-loop review mode
- `--quick` - Activate quick mode
- `--parallel` - Fix 2+ independent issues concurrently using parallel agents

## Workflow

### Step 1: Mode Selection

**First action:** If there is no "auto" keyword in the request, ask the user directly to choose a workflow mode (then wait for response):

| Option | Recommend When | Behavior |
|--------|----------------|----------|
| **Autonomous** (default) | Simple/moderate issues | Auto-approve if score >= 9.5 & 0 critical |
| **Human-in-the-loop Review** | Critical/production code | Pause for approval at each step |
| **Quick** | Type errors, lint, trivial bugs | Fast debug → fix → review cycle |

See `references/mode-selection.md` for question format.

### Step 2: Debug

- Activate `debug` skill.
- Guess all possible root causes.
- Spawn multiple parallel search agents to verify each hypothesis.
- Create report with all findings for the next step.

### Step 3: Complexity Assessment & Task Orchestration

Classify before routing. See `references/complexity-assessment.md`.

| Level | Indicators | Workflow |
|-------|------------|----------|
| **Simple** | Single file, clear error, type/lint | `references/workflow-quick.md` |
| **Moderate** | Multi-file, root cause unclear | `references/workflow-standard.md` |
| **Complex** | System-wide, architecture impact | `references/workflow-deep.md` |
| **Parallel** | 2+ independent issues | Parallel `fullstack-developer` agents |

**Task orchestration notes:**
- **Quick workflow:** Skip task creation — proceed directly to fix.
- **Moderate+ workflows:** After classifying, create a todo checklist for all phases upfront with dependencies before starting any implementation. Track each phase with checkboxes and note blockers inline.

See `references/task-orchestration.md` for checklist structure and dependency tracking patterns.

### Step 4: Fix Implementation & Verification

- Read and analyze all the implemented changes.
- Spawn multiple parallel search agents to verify no regressions in related code.
- Make sure these fixes don't break other parts of the codebase.
- Prevent future issues by adding comprehensive validation.

### Step 5: Finalize

**MANDATORY — always execute all steps:**

1. Report summary to user with confidence score (0–10), all changes, and related files.
2. Update `./docs` via ``docs-manager`` agent (NON-OPTIONAL — always run even for small fixes).
3. Mark all checklist tasks complete.
4. Ask user to commit via ``git-manager`` agent.

---

## IMPORTANT: Skill/Agent Activation Matrix

See `references/skill-activation-matrix.md` for complete matrix.

**Always activate:** `debug` (all workflows)
**Conditional:** `problem-solving`, `sequential-thinking`, `brainstorming`, `context-engineering`
**Agents:** ``debugger``, ``researcher``, ``planner``, ``code-reviewer``, ``tester``
**Parallel patterns:** Multiple parallel search agents for scouting; parallel terminal commands for verification; parallel ``fullstack-developer`` agents for independent issues (`--parallel` flag)

## Output Format

Unified step markers:
```
✓ Step 0: [Mode] selected - [Complexity] detected
✓ Step 1: Root cause identified - [summary]
✓ Step 2: Fix implemented - [N] files changed
✓ Step 3: Tests [X/X passed]
✓ Step 4: Review [score]/10 - [status]
✓ Step 5: Complete - [action taken]
```

## References

Load as needed:
- `references/mode-selection.md` - Mode selection question format
- `references/complexity-assessment.md` - Classification criteria
- `references/task-orchestration.md` - Todo checklist structure and dependency tracking
- `references/workflow-quick.md` - Quick: debug → fix → review
- `references/workflow-standard.md` - Standard: full pipeline
- `references/workflow-deep.md` - Deep: research + brainstorm + plan
- `references/review-cycle.md` - Review logic (autonomous vs HITL)
- `references/skill-activation-matrix.md` - When to activate each skill
- `references/parallel-exploration.md` - Parallel search and execution patterns

**Specialized Workflows:**
- `references/workflow-ci.md` - GitHub Actions/CI failures
- `references/workflow-logs.md` - Application log analysis
- `references/workflow-test.md` - Test suite failures
- `references/workflow-types.md` - TypeScript type errors
- `references/workflow-ui.md` - Visual/UI issues (requires design skills)
