---
agent: 'code-simplifier'
description: 'Simplify and refine code for clarity and maintainability'
argument-hint: 'Scope: file path, git diff, or "recent changes"'
---

## Context
Scope:
<scope>${input}</scope>

**Principles:** YAGNI, KISS, DRY | Preserve functionality | Token efficiency

## Simplification Rules

- Reduce unnecessary nesting — prefer early returns and guard clauses
- Eliminate redundant code and abstractions
- Improve variable and function names for clarity
- Consolidate related logic
- Remove comments that describe obvious code
- Choose clarity over brevity — explicit > compact
- Never combine too many concerns into single functions
- Never remove helpful abstractions that improve organization

## Process

1. **Identify scope**: Use `${input}` or default to recent `git diff` changes
2. **Analyze**: Find complexity reduction opportunities
3. **Apply standards**: Follow `./docs/code-standards.md` conventions
4. **Refine**: Simplify without changing behavior
5. **Verify**: Run typecheck + linter to confirm no breakage

## Scope Rules

- **Default**: Only refine recently modified code (git diff)
- **Explicit path**: Review specified files/directories
- **Never**: Refactor unrelated code or change architecture

---

## Suggested Next Steps

| Command | Description |
|---------|-------------|
| `/ck.test` | Run tests to verify nothing broke |
| `/ck.review` | Code review the simplified code |
| `/ck.git` | Commit changes |
