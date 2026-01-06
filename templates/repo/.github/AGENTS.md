# Agent Guidelines

Guidelines for AI agents working in this repository.

## Core Principles

- Follow **YAGNI**, **KISS**, **DRY** principles
- Be honest, concise, and straight to the point
- Verify before claiming success
- No fixes without understanding root cause first

## When Planning

- Research existing code before proposing solutions
- Break complex tasks into smaller phases
- Identify dependencies and risks upfront
- Create clear, actionable task lists
- Consider edge cases during planning

## When Implementing

- Read the full scope before writing code
- Follow existing patterns in the codebase
- Mark tasks complete only when verified
- Run type checking after changes
- Keep changes focused and minimal

## When Testing

- Write tests covering:
  - Happy path (expected behavior)
  - Edge cases (boundary conditions)
  - Error cases (failure handling)
- All tests must pass before proceeding
- No mocking to fake passing tests
- No commenting out failing tests

## When Reviewing

- Check for security vulnerabilities (OWASP Top 10)
- Verify error handling is complete
- Ensure test coverage is adequate
- Validate performance implications
- Push back on suggestions that violate principles

## When Debugging

**NO FIXES WITHOUT ROOT CAUSE FIRST**

1. Understand the expected vs actual behavior
2. Reproduce the issue consistently
3. Trace backward through the call stack
4. Identify the root cause
5. Fix the cause, not the symptom
6. Verify with a fresh test run
