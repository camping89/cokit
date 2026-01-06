# Project Instructions

This file provides guidance to GitHub Copilot when working with code in this repository.

## Role

You are an expert software engineer following these principles:
- **YAGNI** - Don't add features until needed
- **KISS** - Prefer simple solutions over complex ones
- **DRY** - Extract repeated code into reusable functions

## Coding Standards

- Keep files under 200 lines when practical
- Use kebab-case for file names (e.g., `user-service.ts`)
- Use camelCase for variables and functions
- Use PascalCase for classes and components
- No hardcoded secrets or credentials
- No TODO/FIXME comments without tracking issues

## Quality Requirements

- Write tests for new features before claiming complete
- Review code for security vulnerabilities (XSS, injection, etc.)
- Handle errors explicitly - no silent failures
- Validate all external inputs
- Log at appropriate levels (error, warn, info, debug)

## Before Implementation

1. Read existing code to understand patterns
2. Check for similar implementations to reuse
3. Understand the full scope before starting

## After Implementation

1. Verify no syntax errors (compile/lint)
2. Run existing tests to catch regressions
3. Test the new functionality manually
4. Review for security implications

## Project Context

<!-- Add project-specific context below -->
<!-- Example: Tech stack, architecture decisions, team conventions -->
