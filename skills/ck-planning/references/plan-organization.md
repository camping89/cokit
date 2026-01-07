# Plan Organization

How to structure implementation plans.

## Plan Document Structure

```markdown
---
title: "Feature Name"
status: pending
effort: Xh
created: YYYY-MM-DD
---

# Plan Title

## Overview
[2-3 sentences describing what and why]

## Goals
- [ ] Goal 1
- [ ] Goal 2

## Non-Goals
- Thing we're not doing
- Thing deferred to later

## Design
[Architecture overview]

## Phases

| Phase | Description | Effort |
|-------|-------------|--------|
| 1 | Setup | 1h |
| 2 | Core feature | 2h |
| 3 | Testing | 1h |

## Risks
- Risk 1: [mitigation]
- Risk 2: [mitigation]

## Success Criteria
- [ ] Criterion 1
- [ ] Criterion 2
```

## Phase Documents

Each phase gets its own file:

```markdown
# Phase N: Name

**Effort:** Xh | **Status:** Pending

## Objective
[What this phase accomplishes]

## Tasks
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
```

## File Organization

```
plans/
└── YYMMDD-feature-name/
    ├── plan.md
    ├── phase-01-setup.md
    ├── phase-02-implementation.md
    ├── phase-03-testing.md
    └── research/
        └── notes.md
```

## Quality Checks

- [ ] Clear structure?
- [ ] Tasks actionable?
- [ ] Effort estimated?
- [ ] Success criteria defined?
