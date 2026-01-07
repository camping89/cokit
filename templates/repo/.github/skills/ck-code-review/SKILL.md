---
name: code-review
description: Code review with security and best practices focus
---

# Code Review Skill

This skill teaches Copilot thorough code review practices.

## When to Activate

- User asks for review
- New code is written
- Before merging changes

## Review Checklist

### Security (Critical)
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] No hardcoded secrets
- [ ] Input validation present
- [ ] Authentication/authorization checked

### Quality
- [ ] Error handling is complete
- [ ] Edge cases are handled
- [ ] Code is readable and maintainable
- [ ] No unnecessary complexity

### Performance
- [ ] No obvious bottlenecks
- [ ] Database queries are optimized
- [ ] No memory leaks

### Testing
- [ ] Tests cover new functionality
- [ ] Tests cover edge cases
- [ ] All tests pass

## Feedback Style

- Be specific with issues
- Explain why something is problematic
- Suggest improvements
- Acknowledge good code
