---
description: 'Debug systematically with root cause analysis before fixes'
argument-hint:
  - issue-description
name: ck.debug
---

## Context
Issue to debug:
<issue>${input}</issue>

## Core Principle

**NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST**

Random fixes waste time and create new bugs. Find the root cause, fix at source, validate at every layer, verify before claiming success.

## When to Use

**Always use for:** Test failures, bugs, unexpected behavior, performance issues, build failures, integration problems, before claiming work complete

**Especially when:** Under time pressure, "quick fix" seems obvious, tried multiple fixes, don't fully understand issue, about to claim success

## The Four Phases

### Phase 1: Root Cause Investigation
1. Read error messages completely
2. Reproduce the issue consistently
3. Check recent changes (git diff, git log)
4. Gather evidence before theorizing

### Phase 2: Pattern Analysis
1. Find working examples in codebase
2. Compare working vs broken code
3. Identify what's different
4. Document findings

### Phase 3: Hypothesis and Testing
1. Form theory based on evidence
2. Test with minimal changes
3. Verify hypothesis is correct
4. Document confirmation

### Phase 4: Implementation
1. Create test that catches the bug
2. Fix at the root cause (not symptom)
3. Verify fix works
4. Ensure no regressions

**Key rule:** Complete each phase before proceeding. No fixes without Phase 1.

## Root Cause Tracing

When error appears deep in execution:
1. Start at error location
2. Trace backward level-by-level
3. Find where invalid data originated
4. Fix at source, not at symptom

## Defense-in-Depth

After finding root cause, validate at every layer:
1. **Entry validation** - Input sanitization
2. **Business logic** - State validation
3. **Environment guards** - Config validation
4. **Debug instrumentation** - Logging

## Verification

**Iron law:** NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE

1. Run the command
2. Read the output
3. Then claim the result

## Red Flags

Stop and follow process if thinking:
- "Quick fix for now, investigate later"
- "Just try changing X and see if it works"
- "It's probably X, let me fix that"
- "Should work now" / "Seems fixed"
- "Tests pass, we're done"

**All mean:** Return to systematic process.

## Output Format

```markdown
## Debug Report

### Issue Summary
- What: [Brief description]
- When: [When it occurs]
- Impact: [Severity]

### Root Cause
[Explanation of actual cause]

### Fix Applied
[What was changed and why]

### Verification
[Evidence that fix works]
```

---

## Suggested Next Steps

| Command | Description |
|---------|-------------|
| `/ck.test` | Run tests to verify |
| `/ck.fix` | Apply fix |
| `/ck.git` | Commit fix |

**All commands:** `ck.ask`, `ck.bootstrap`, `ck.brainstorm`, `ck.cook`, `ck.debug`, `ck.docs`, `ck.fix`, `ck.git`, `ck.help`, `ck.journal`, `ck.plan`, `ck.plan.fast`, `ck.plan.hard`, `ck.preview`, `ck.review`, `ck.scout`, `ck.spec.analyze`, `ck.spec.checklist`, `ck.spec.clarify`, `ck.spec.constitution`, `ck.spec.implement`, `ck.spec.plan`, `ck.spec.specify`, `ck.spec.tasks`, `ck.spec.taskstoissues`, `ck.test`, `ck.watzup`
