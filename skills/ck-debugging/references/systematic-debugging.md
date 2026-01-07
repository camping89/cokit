# Systematic Debugging

Four-phase framework ensuring proper investigation before fixes.

## Phase 1: Root Cause Investigation

Before ANY fix attempt:

1. **Read the full error**
   - Stack trace, line numbers, error type
   - Don't skim - read word by word

2. **Reproduce consistently**
   - Can you trigger it reliably?
   - What are the exact steps?

3. **Check recent changes**
   - What changed since it last worked?
   - git diff, recent commits

4. **Gather evidence**
   - Add logging if needed
   - Check inputs and outputs
   - Don't guess - observe

## Phase 2: Pattern Analysis

1. **Find working example**
   - Similar code that works
   - Previous version that worked

2. **Compare systematically**
   - Line by line comparison
   - What's different?

3. **Identify key difference**
   - What's the minimal difference?
   - What assumption changed?

## Phase 3: Hypothesis and Testing

1. **Form specific theory**
   - "The bug is caused by X because Y"
   - Must be testable

2. **Test minimally**
   - Smallest change to prove/disprove
   - Don't fix yet - just test theory

3. **Verify theory**
   - Did prediction match result?
   - If not, return to Phase 1

## Phase 4: Implementation

1. **Write failing test first**
   - Test should fail before fix
   - Proves you understand bug

2. **Make minimal fix**
   - Fix at root cause
   - Don't add workarounds

3. **Verify fix works**
   - Test passes now
   - No regressions
   - Fresh run, not cached

## Key Rules

- Complete each phase before proceeding
- No fixes without Phase 1 evidence
- Theory must be testable
- Verify every claim
