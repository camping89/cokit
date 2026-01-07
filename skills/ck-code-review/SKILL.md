---
name: code-review
description: Code review practices with technical rigor and verification. Use when receiving feedback, completing features, or before claiming work complete.
---

# Code Review

Guide proper code review practices emphasizing technical rigor and verification.

## Core Principles

- **YAGNI**, **KISS**, **DRY**
- Technical correctness over social comfort
- Evidence before claims

## When to Use

### Receiving Feedback
- Code review comments arrive
- Feedback seems unclear or questionable
- Suggestion conflicts with existing decisions

### Requesting Review
- After completing major features
- Before merging to main
- After fixing complex bugs

### Verification Gates
- About to claim work is complete
- Before committing or pushing
- Moving to next task

## Receiving Feedback Protocol

**Pattern:** READ → UNDERSTAND → VERIFY → EVALUATE → RESPOND

### Key Rules
- No performative agreement ("Great point!", "You're right!")
- Verify technically before implementing
- Push back with reasoning if wrong
- Ask for clarification on ALL unclear items first

### YAGNI Check
Before implementing suggested "improvements":
- Grep for actual usage
- Is it needed now?
- Does it add complexity?

## Requesting Review Checklist

Before requesting review:
- [ ] Code compiles/lints clean
- [ ] Tests pass (fresh run)
- [ ] Changes focused and minimal
- [ ] No unrelated changes

During review focus on:
- Security vulnerabilities
- Error handling completeness
- Test coverage adequacy
- Performance implications

## Verification Gates

**Iron Law:** NO COMPLETION CLAIMS WITHOUT VERIFICATION

### Process
1. Identify verification command
2. Run full command
3. Read actual output
4. Verify confirms claim
5. Then (and only then) claim

### Red Flags
Stop if using:
- "should work"
- "seems fixed"
- "probably passing"

These mean: RUN VERIFICATION FIRST

## References

See `./references/` for detailed protocols:
- `code-review-reception.md` - Handling feedback
- `verification-before-completion.md` - Verification gates
