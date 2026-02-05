---
description: 'Testing guidelines for test files across languages'
applyTo: '**/*.test.ts,**/*.spec.ts,**/*.test.js,**/*.spec.js,**/*.test.py,**/test_*.py,**/*_test.go'
---

# Testing Guidelines

## Test Structure

- One concept per test (single assertion focus)
- Use descriptive test names that explain behavior
- Follow Arrange-Act-Assert (AAA) pattern
- Group related tests with describe/context blocks

## Coverage Requirements

- Cover happy path (expected behavior)
- Cover edge cases (boundaries, empty, null)
- Cover error cases (failures, exceptions)
- Cover integration points with external systems

## Best Practices

- Mock external dependencies only (DB, APIs, filesystem)
- No flaky tests allowed - fix or delete
- Tests must be deterministic and repeatable
- Clean up test data after runs (teardown)
- Use factories/fixtures for test data

## Forbidden

- No commented-out tests
- No skipped tests without linked issue
- No mocking internals to fake passing
- No changing assertions just to pass
- No tests that depend on execution order
