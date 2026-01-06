# Verification Before Completion

Verification gates require evidence before any status claims.

## The Iron Law

**NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE**

"Should work" is not evidence.
Run it. Read it. Then claim it.

## Gate Process

1. **IDENTIFY** - What command verifies this claim?
2. **RUN** - Execute the full command
3. **READ** - Read the actual output
4. **VERIFY** - Output confirms claim?
5. **CLAIM** - Only then state completion

## Common Claims & Verification

### "Tests pass"
```bash
npm test
# Read output - 0 failures?
```

### "Build succeeds"
```bash
npm run build
# Exit code 0?
```

### "Bug is fixed"
```bash
# Run original failing test
# Does it pass now?
```

### "Linting clean"
```bash
npm run lint
# No errors?
```

## Red Flags

Stop immediately if saying:
- "should work now"
- "seems to be fixed"
- "probably passing"
- "looks good"
- "I think it's done"

These mean: **RUN VERIFICATION FIRST**

## Evidence Format

Bad:
> "Tests pass"

Good:
> "Tests pass - ran `npm test`, output shows 45/45 passing"

## Before Claiming Complete

Checklist:
- [ ] Tests pass (fresh run, not cached)
- [ ] No new warnings
- [ ] Feature works manually
- [ ] Edge cases handled
- [ ] No regressions

## Before Committing

Checklist:
- [ ] All above verified
- [ ] No unrelated changes
- [ ] Commit message accurate
- [ ] Branch is correct

## Bottom Line

Verify. Then claim.
Not: Claim. Then verify.
Not: Claim. Assume verified.
