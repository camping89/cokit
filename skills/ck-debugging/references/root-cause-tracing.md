# Root Cause Tracing

Technique for finding where bugs originate, not where they manifest.

## Core Concept

Bugs often appear deep in execution but originate elsewhere. Trace backward through the call stack to find the original source.

## The Backward Trace

When you see an error:

1. **Note the error location**
   - Where did it crash/fail?
   - This is the symptom, not cause

2. **Ask: Where did this data come from?**
   - What function called this?
   - What set this variable?

3. **Trace one level back**
   - Check the caller
   - Verify data at that point

4. **Repeat until source found**
   - Keep asking "where from?"
   - Stop when you find invalid data entry point

## Example

```
Error: Cannot read property 'name' of undefined
  at renderUser (line 50)
  at processUsers (line 30)
  at handleResponse (line 15)
  at fetchUsers (line 5)
```

**Bad approach:** Fix at line 50 with null check
**Good approach:** Trace back - why is user undefined at line 30? Where did it come from?

## Questions to Ask

At each level:
- What is the value here?
- Is it what I expect?
- Who set it / passed it?
- Was it validated?

## Finding the Root

Root cause is found when:
- You find where invalid data first entered
- Or where a valid value became invalid
- Or where an assumption was violated

Fix at that point, not downstream.

## Common Root Causes

- Missing input validation
- Incorrect API response handling
- Race condition
- State mutation
- Incorrect assumption about data shape
