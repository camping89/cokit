---
applyTo: "**/*.py,**/*.go,**/*.rs,**/*.java,**/*.cs,**/api/**,**/services/**,**/controllers/**"
description: "Backend development rules for Python, Go, Rust, Java, C# and API files"
---

# Backend Guidelines

## Input Validation

- Validate all external inputs at boundaries
- Sanitize before processing
- Return clear, actionable error messages
- Never trust client-side validation alone

## Error Handling

- Handle errors explicitly, no silent failures
- Log at appropriate levels (debug/info/warn/error)
- Don't expose internal errors or stack traces to clients
- Use structured error responses with error codes

## Data Integrity

- Use transactions for multi-step operations
- Validate data consistency at write time
- Handle concurrent access with proper locking
- Implement idempotency for critical operations

## External Services

- Rate limit outbound API calls
- Implement circuit breakers for resilience
- Handle timeouts gracefully with retries
- Cache responses when appropriate

## Security

- Parameterize all database queries (no SQL injection)
- Escape output to prevent XSS
- Validate file uploads (type, size, content)
- Use least-privilege for service accounts

## Performance

- Profile before optimizing
- Use connection pooling for databases
- Batch operations when possible
- Index frequently queried fields
