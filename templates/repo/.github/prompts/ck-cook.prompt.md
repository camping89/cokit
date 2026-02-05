---
description: 'Smart feature implementation with automatic workflow detection'
argument-hint:
  - task-or-plan-path
name: ck.cook
---

## Context
Task or plan path:
<task>${input}</task>

**Principles:** YAGNI, KISS, DRY | Token efficiency | Concise reports

## Smart Intent Detection

| Input Pattern | Detected Mode | Behavior |
|---------------|---------------|----------|
| Path to `plan.md` or `phase-*.md` | code | Execute existing plan |
| Contains "fast", "quick" | fast | Skip research, scout→plan→code |
| Contains "trust me", "auto" | auto | Auto-approve all steps |
| Lists 3+ features OR "parallel" | parallel | Multi-agent execution |
| Contains "no test", "skip test" | no-test | Skip testing step |
| Default | interactive | Full workflow with user input |

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
- **Finalize:** project-manager AND docs-manager must complete

## Required Agents

| Phase | Agent |
|-------|-------|
| Research | `@researcher` (parallel, optional in fast) |
| Scout | `@scout` |
| Plan | `@planner` |
| UI Work | `ui-ux-designer` |
| Testing | `@tester`, `@debugger` |
| Review | `@code-reviewer` |
| Finalize | `project-manager`, `@docs-manager`, `@git-manager` |

## Process

1. **Detect Mode**: Analyze input to determine workflow mode
2. **Scout**: Use `/ck.scout` to discover relevant files
3. **Research** (if applicable): Gather technical context
4. **Plan**: Create or load implementation plan
5. **Implement**: Execute plan phases
6. **Test**: Run tests and validate
7. **Review**: Code review with quality gates
8. **Finalize**: Update docs, commit changes

---

## Suggested Next Steps

| Command | Description |
|---------|-------------|
| `/ck.test` | Run tests |
| `/ck.git` | Commit changes |
| `/ck.review` | Code review |

**All commands:** `ck.ask`, `ck.bootstrap`, `ck.brainstorm`, `ck.cook`, `ck.debug`, `ck.docs`, `ck.fix`, `ck.git`, `ck.help`, `ck.journal`, `ck.plan`, `ck.plan.fast`, `ck.plan.hard`, `ck.preview`, `ck.review`, `ck.scout`, `ck.spec.analyze`, `ck.spec.checklist`, `ck.spec.clarify`, `ck.spec.constitution`, `ck.spec.implement`, `ck.spec.plan`, `ck.spec.specify`, `ck.spec.tasks`, `ck.spec.taskstoissues`, `ck.test`, `ck.watzup`
