---
name: debugging
description: Systematic debugging framework with root cause investigation. Use when encountering bugs, test failures, unexpected behavior, or before claiming work complete.
---

# Debugging

Comprehensive debugging framework combining systematic investigation and verification.

## Core Principle

**NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST**

Random fixes waste time and create new bugs. Find the root cause, fix at source, verify before claiming success.

## When to Use

- Test failures or bugs
- Unexpected behavior
- Performance issues
- Build failures
- Before claiming work complete

## The Four Phases

### Phase 1: Root Cause Investigation
1. Read error messages completely
2. Reproduce the issue consistently
3. Check recent changes
4. Gather evidence before theorizing

### Phase 2: Pattern Analysis
1. Find working examples
2. Compare with failing case
3. Identify differences

### Phase 3: Hypothesis and Testing
1. Form a theory
2. Test minimally
3. Verify theory is correct

### Phase 4: Implementation
1. Create a test that fails
2. Fix once at root cause
3. Verify test passes

## Quick Reference

```
Bug reported → Phase 1 (investigate)
  Error deep in stack? → Trace backward to source
  Found root cause? → Phase 4 (fix at source)
  About to claim success? → Verify first!
```

## Red Flags

Stop if thinking:
- "Quick fix for now"
- "Just try changing X"
- "Should work now"

**All mean:** Return to Phase 1.

## References

See `./references/` for detailed guides:
- `systematic-debugging.md` - Full 4-phase process
- `root-cause-tracing.md` - Backward tracing technique
- `verification.md` - Verification protocol
