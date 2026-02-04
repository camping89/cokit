---

description: "Phase file template for hybrid task structure"
---

# Phase [N]: [Phase Title]

**Status**: pending | in-progress | completed
**Dependencies**: [List phase dependencies, e.g., "Phase 2 must complete first"]
**Parallel**: [yes/no - can tasks in this phase run parallel with other phases?]

## Goal

[Brief description of what this phase delivers]

## Test Criteria

[How to verify this phase is complete - independently testable]

<!--
  ============================================================================
  TASK FORMAT: - [ ] [ID] [P?] [Story?] Description with file path

  - [P]: Can run in parallel (different files, no dependencies)
  - [Story]: Which user story (e.g., US1, US2) - only for user story phases
  - Include exact file paths in descriptions
  ============================================================================
-->

## Tasks

- [ ] TXXX [P] Description with exact file path
- [ ] TXXX Description with exact file path (sequential - depends on previous)
- [ ] TXXX [P] Another parallel task with file path

## Checkpoint

[What should be true when this phase completes]

- [ ] All tasks marked complete
- [ ] Test criteria verified
- [ ] No blocking issues for dependent phases
