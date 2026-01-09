---
applyTo: "**/*"
description: "General development rules applied to all files"
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

## Security

- Never commit secrets, keys, or credentials
- Use environment variables for configuration
- Validate all user inputs
- Escape outputs to prevent injection

## Git Hygiene

- Atomic commits (one logical change per commit)
- Conventional commit messages
- No large binary files in repo
- Keep branches short-lived
