---
name: cook
description: ALWAYS activate this skill before implementing EVERY feature, plan, or fix.
---

# Cook - Smart Feature Implementation

End-to-end implementation with automatic workflow detection.

**Principles:** YAGNI, KISS, DRY | Token efficiency | Concise reports

## Usage

```
/cook <natural language task OR plan path>
```

**Optional flags:** `--fast`, `--parallel`, `--no-test`, `--auto`, `--interactive`

Example:
```
/cook "Add user authentication to the app" --fast
/cook path/to/plan.md --auto
/cook "Fix login bug" --interactive
```

## Smart Intent Detection

| Input Pattern | Detected Mode | Behavior |
|---------------|---------------|----------|
| Path to `plan.md` or `phase-*.md` | code | Execute existing plan |
| Contains "fast", "quick" | fast | Skip research, scout→plan→code |
| Contains "trust me", "auto" | auto | Auto-approve all steps |
| Lists 3+ features OR "parallel" | parallel | Multi-agent execution |
| Contains "no test", "skip test" | no-test | Skip testing step |
| `--interactive` flag (explicit) | interactive | Full workflow with user input |
| Default | interactive | Full workflow with user input |

See `references/intent-detection.md` for detection logic.

## Workflow Overview

```
[Intent Detection] → [Research?] → [Review] → [Plan] → [Review] → [Implement] → [Review] → [Test?] → [Review] → [Finalize]
```

**Default (non-auto):** Stops at `[Review]` gates for human approval before each major step.
**Auto mode (`--auto`):** Skips human review gates, implements all phases continuously.

| Mode | Research | Testing | Review Gates | Phase Progression |
|------|----------|---------|--------------|-------------------|
| interactive | ✓ | ✓ | **User approval at each step** | One at a time |
| auto | ✓ | ✓ | Auto if score≥9.5 | All at once (no stops) |
| fast | ✗ | ✓ | User approval at each step | One at a time |
| parallel | Optional | ✓ | User approval at each step | Parallel groups |
| no-test | ✓ | ✗ | User approval at each step | One at a time |
| code | ✗ | ✓ | User approval at each step | Per plan |

## Step Output Format

```
✓ Step [N]: [Brief status] - [Key metrics]
```

## Blocking Gates (Non-Auto Mode)

Human review required at these checkpoints (skipped with `--auto`):
- **Post-Research:** Review findings before planning
- **Post-Plan:** Approve plan before implementation
- **Post-Implementation:** Approve code before testing
- **Post-Testing:** 100% pass + approve before finalize

**Always enforced (all modes):**
- **Testing:** 100% pass required (unless no-test mode)
- **Code Review:** User approval OR auto-approve (score≥9.5, 0 critical)
- **Finalize:** project-manager AND docs-manager MUST complete

## Required Agents

| Phase | Agent | Requirement |
|-------|-------|-------------|
| Research | `researcher` agent (parallel, optional in fast) | Spawn as needed |
| Scout | `scout` agent | Spawn for codebase search |
| Plan | `planner` agent | MUST spawn |
| UI Work | `ui-ux-designer` agent | Spawn when frontend work exists |
| Testing | `tester`, `debugger` agents | MUST spawn |
| Review | `code-reviewer` agent | MUST spawn |
| Finalize | `docs-manager`, `git-manager` agents | MUST spawn |

## Implementation Progress Tracking

During Step 3 (Implementation), track progress using a todo list/checklist in the active plan or phase file:

```
- [ ] Phase 1: Setup environment
- [ ] Phase 2: Database models
- [ ] Phase 3: API endpoints
- [ ] Phase 4: UI components
```

Update each item as completed. This replaces task management tooling with simple markdown tracking visible in the plan.

## CRITICAL ENFORCEMENT

**Steps 4 (Testing), 5 (Code Review), and 6 (Finalize) MUST delegate to agents. DO NOT implement testing, review, or finalization yourself.**

- Step 4: Always delegate to `tester` agent. If failures, delegate to `debugger` agent, then re-delegate to `tester`.
- Step 5: Always delegate to `code-reviewer` agent. Never self-review.
- Step 6: Always delegate to `docs-manager` agent for doc updates.

## Finalize Step (MANDATORY)

Step 6 is not optional. All four actions MUST complete:

1. Update plan/phase status to completed in plan files
2. Delegate to `docs-manager` agent → review and update `./docs` if implementation changed APIs, architecture, or behavior
3. Mark all todo checklist items complete in the active plan
4. Ask the user: "Would you like to commit these changes via `git-manager` agent?"

**Never skip finalize**, even in fast or auto mode.

## References

- `references/intent-detection.md` - Detection rules and routing logic
- `references/workflow-steps.md` - Detailed step definitions for all modes
- `references/review-cycle.md` - Interactive and auto review processes
- `references/agent-patterns.md` - Agent invocation patterns
