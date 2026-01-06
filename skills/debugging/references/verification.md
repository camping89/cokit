# Verification Protocol

Run verification commands and confirm output before claiming success.

## Core Rule

**NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE**

"Should work" is not evidence. Run it. Read the output. Then claim.

## Verification Steps

### 1. Run Fresh

- Clear cache if applicable
- Run from clean state
- Don't rely on previous runs

### 2. Read Output

- Read the actual output
- Don't assume it passed
- Check for warnings too

### 3. Confirm Expectations

- Did it do what you expected?
- All tests pass (not just most)?
- No new warnings/errors?

### 4. Document Evidence

- Copy relevant output
- Note what was verified
- Timestamp if needed

## What to Verify

Before claiming "fixed":
- [ ] Tests pass (fresh run)
- [ ] No new errors in logs
- [ ] Feature works manually
- [ ] Edge cases handled

Before claiming "complete":
- [ ] All acceptance criteria met
- [ ] Tests cover new code
- [ ] No regressions
- [ ] Documentation updated

## Anti-Patterns

**Don't do:**
- "Tests passed earlier"
- "It worked on my machine"
- "Should be fine now"
- Skipping verification because confident

**Do instead:**
- Run fresh every time
- Read actual output
- Verify on clean state
- Question assumptions

## Verification Checklist

```
[ ] Ran command fresh (not cached)
[ ] Read full output (not skimmed)
[ ] Output matches expectations
[ ] No warnings or errors
[ ] Tested edge case
[ ] Documented result
```
