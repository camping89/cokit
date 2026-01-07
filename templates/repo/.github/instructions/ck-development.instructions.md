---
applyTo: "**/*"
---

# Development Rules

## Principles

- **YAGNI**: Don't add features until needed
- **KISS**: Prefer simple solutions over complex ones
- **DRY**: Extract repeated code into reusable functions

## Code Standards

- File size: Keep under 200 lines when practical
- Naming: kebab-case for files, camelCase for variables
- No hardcoded secrets or credentials
- Verify before claiming complete

## Quality Gates

- Run linter before committing
- All tests must pass
- No TODO/FIXME without tracking issues
- Handle errors explicitly
