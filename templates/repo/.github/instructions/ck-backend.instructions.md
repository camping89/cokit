---
applyTo: "**/*.ts,**/*.py,**/*.go,**/api/**"
---

# Backend Guidelines

## Input Validation

- Validate all external inputs
- Sanitize before processing
- Return clear error messages

## Error Handling

- Handle errors explicitly
- Log at appropriate levels
- Don't expose internal errors to clients

## Data Integrity

- Use transactions for multi-step operations
- Validate data consistency
- Handle concurrent access

## External Services

- Rate limit API calls
- Implement circuit breakers
- Handle timeouts gracefully

## Documentation

- Document API endpoints
- Include request/response examples
- Note rate limits and constraints
