---
name: code-review
description: Review code quality, receive feedback with technical rigor, verify completion claims. Includes edge case scouting for multi-file features. Use before PRs, after implementing features, when claiming task completion, for agent reviews.
---

# Code Review

Guide proper code review practices emphasizing technical rigor, evidence-based claims, and verification over performative responses.

## Overview

| Practice | When | Protocol |
|----------|------|----------|
| **Edge Case Scouting** | Before any review on 3+ file features | `/ck-scout` for hidden paths and untested scenarios |
| **Receiving Feedback** | Feedback from human or agent | READ → UNDERSTAND → VERIFY → EVALUATE → RESPOND → IMPLEMENT |
| **Requesting Reviews** | After each task, before merge, after major features | Delegate to `code-reviewer` agent |
| **Verification Gates** | Before any completion claim | Run command, read output, then claim |

## Core Principle

Always honoring **YAGNI**, **KISS**, and **DRY** principles.
**Be honest, be brutal, straight to the point, and be concise.**

**Technical correctness over social comfort.** Verify before implementing. Ask before assuming. Evidence before claims.

## When to Use This Skill

### Edge Case Scouting
Trigger when:
- Feature touches 3+ files
- Implementing complex business logic
- Before requesting formal code review
- After implementation, before testing

**Reference:** `references/requesting-code-review.md`

### Receiving Feedback
Trigger when:
- Receiving code review comments from any source
- Feedback seems unclear or technically questionable
- Multiple review items need prioritization
- External reviewer lacks full context
- Suggestion conflicts with existing decisions

**Reference:** `references/code-review-reception.md`

### Requesting Review
Trigger when:
- Completing tasks in agent-driven development (after EACH task)
- Finishing major features or refactors
- Before merging to main branch
- Stuck and need fresh perspective
- After fixing complex bugs

**Reference:** `references/requesting-code-review.md`

### Verification Gates
Trigger when:
- About to claim tests pass, build succeeds, or work is complete
- Before committing, pushing, or creating PRs
- Moving to next task
- Any statement suggesting success/completion
- Expressing satisfaction with work

**Reference:** `references/verification-before-completion.md`

## Quick Decision Tree

```
SITUATION?
│
├─ Multi-file feature (3+ files)?
│  └─ Run edge case scouting first → /ck-scout then request review
│
├─ Received feedback
│  ├─ Unclear items? → STOP, ask for clarification first
│  ├─ From human partner? → Understand, then implement
│  └─ From external reviewer? → Verify technically before implementing
│
├─ Completed work
│  ├─ Major feature/task? → Request `code-reviewer` agent review
│  └─ Before merge? → Request `code-reviewer` agent review
│
└─ About to claim status
   ├─ Have fresh verification? → State claim WITH evidence
   └─ No fresh verification? → RUN verification command first
```

## Edge Case Scouting

### When to Scout
Before formal review of any multi-file feature (3+ files changed).

### Process
1. Use `/ck-scout` to search for hidden code paths, edge inputs, error branches
2. Document untested scenarios found
3. Add tests or guards for critical edge cases
4. Then proceed to formal `code-reviewer` review

### What to Look For
- Null/undefined paths not covered by tests
- Error branches lacking handlers
- Boundary conditions (empty arrays, max values, concurrent calls)
- Async race conditions
- Permission/auth edge cases

## Task-Managed Review Pipeline (Multi-File Features)

For features spanning 3+ files, use a structured pipeline:

```
scout → review → fix → verify
```

**Steps:**
1. **Scout** - Use `/ck-scout` or `/ck-scout ext` to identify edge cases and gaps
2. **Review** - Delegate to `code-reviewer` agent with full context
3. **Fix** - Implement critical and important feedback
4. **Verify** - Run tests, confirm fixes, then claim completion

Track progress using a checklist in your plan or task notes:
```
- [ ] Edge case scouting complete
- [ ] `code-reviewer` review complete
- [ ] Critical issues fixed
- [ ] Verification passed
```

## Receiving Feedback Protocol

### Response Pattern
READ → UNDERSTAND → VERIFY → EVALUATE → RESPOND → IMPLEMENT

### Key Rules
- No performative agreement: "You're absolutely right!", "Great point!", "Thanks for [anything]"
- No implementation before verification
- Restate requirement, ask questions, push back with technical reasoning, or just start working
- If unclear: STOP and ask for clarification on ALL unclear items first
- YAGNI check: search for usage before implementing suggested "proper" features

**Full protocol:** `references/code-review-reception.md`

## Requesting Review Protocol

### When to Request
- After each task in agent-driven development
- After major feature completion
- Before merge to main

### Process
1. Scout edge cases (3+ file features): use `/ck-scout` first
2. Get git SHAs: `BASE_SHA=$(git rev-parse HEAD~1)` and `HEAD_SHA=$(git rev-parse HEAD)`
3. Delegate to `code-reviewer` agent with: WHAT_WAS_IMPLEMENTED, PLAN_OR_REQUIREMENTS, BASE_SHA, HEAD_SHA, DESCRIPTION
4. Act on feedback: Fix Critical immediately, Important before proceeding, note Minor for later

**Full protocol:** `references/requesting-code-review.md`

## Verification Gates Protocol

### The Iron Law
**NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE**

### Gate Function
IDENTIFY command → RUN full command → READ output → VERIFY confirms claim → THEN claim

Skip any step = lying, not verifying

### Requirements
- Tests pass: Test output shows 0 failures
- Build succeeds: Build command exit 0
- Bug fixed: Test original symptom passes
- Requirements met: Line-by-line checklist verified

### Red Flags - STOP
Using "should"/"probably"/"seems to", expressing satisfaction before verification, committing without verification, trusting agent reports, ANY wording implying success without running verification

**Full protocol:** `references/verification-before-completion.md`

## Integration with Workflows

- **Agent-Driven:** Scout edge cases first (3+ files), review after EACH task, verify before moving to next
- **Pull Requests:** Scout → verify tests pass → request `code-reviewer` review before merge
- **General:** Apply verification gates before any status claims, push back on invalid feedback
- **Pipeline:** For complex features use the full `scout → review → fix → verify` pipeline

## Bottom Line

1. **Scout first** - Edge cases found before review save rework cycles
2. Technical rigor over social performance - No performative agreement
3. Systematic review processes - Use `code-reviewer` agent via pipeline
4. Evidence before claims - Verification gates always

Scout. Verify. Question. Then implement. Evidence. Then claim.
