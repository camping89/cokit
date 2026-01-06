---
mode: agent
description: Review code for issues
---
# Code Review

Review the specified code for quality and issues.

## Check Categories

### Security
- [ ] Input validation
- [ ] No hardcoded secrets
- [ ] SQL injection prevention
- [ ] XSS prevention

### Performance
- [ ] No N+1 queries
- [ ] Appropriate caching
- [ ] No memory leaks

### Quality
- [ ] YAGNI compliance
- [ ] KISS compliance
- [ ] DRY compliance
- [ ] Error handling
- [ ] Test coverage

### Maintainability
- [ ] Clear naming
- [ ] Reasonable file size
- [ ] Documentation for complex logic

## Output
List issues by severity:
- **Critical**: Must fix before merge
- **Important**: Should fix soon
- **Minor**: Nice to have
