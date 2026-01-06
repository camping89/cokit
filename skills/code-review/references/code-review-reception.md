# Code Review Reception

How to properly receive and respond to code review feedback.

## Response Pattern

READ → UNDERSTAND → VERIFY → EVALUATE → RESPOND → IMPLEMENT

## Step 1: Read

- Read entire comment
- Note specific concerns
- Identify any questions

## Step 2: Understand

- What exactly is being asked?
- What's the underlying concern?
- Is context missing?

## Step 3: Verify

- Is the concern technically valid?
- Does the suggestion work?
- Would it break anything?

## Step 4: Evaluate

- Does it improve the code?
- Is it necessary now (YAGNI)?
- Worth the complexity?

## Step 5: Respond

Options:
- **Implement:** If valid and valuable
- **Push back:** If technically incorrect
- **Clarify:** If unclear
- **Defer:** If valuable but not now

## Anti-Patterns

**Never say:**
- "You're absolutely right!"
- "Great catch!"
- "Thanks for the suggestion!"

These are performative, not technical.

**Instead say:**
- "Implementing [specific change]"
- "This would break X because Y"
- "Can you clarify what you mean by Z?"

## Handling Disagreement

If you disagree:
1. State your technical reasoning
2. Provide evidence or examples
3. Propose alternative if applicable
4. Accept if they provide better reasoning

## Priority Handling

- **Critical:** Security, data loss, crashes → Fix immediately
- **Important:** Bugs, performance → Fix before proceeding
- **Minor:** Style, naming → Note for later

## YAGNI Check

Before implementing "improvements":
```
grep -r "feature_name" src/
```

If no usage found → Push back or defer
