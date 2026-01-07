---
applyTo: "**/*.test.ts,**/*.spec.ts,**/*.test.js,**/*.spec.js"
---

# Testing Guidelines

## Test Structure

- One concept per test
- Use descriptive test names
- Follow Arrange-Act-Assert pattern

## Coverage Requirements

- Cover happy path (expected behavior)
- Cover edge cases (boundaries)
- Cover error cases (failures)

## Best Practices

- Mock external dependencies only
- No flaky tests allowed
- Tests must be deterministic
- Clean up test data after runs

## Forbidden

- No commented-out tests
- No skipped tests without issue
- No mocking to fake passing
- No changing assertions to pass
