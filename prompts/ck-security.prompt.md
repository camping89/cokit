---
agent: 'agent'
description: 'STRIDE + OWASP security audit'
argument-hint: '<scope glob or full> [--fix] [--iterations N]'
---

## Context
Security audit scope:
<scope>${input}</scope>

Run a STRIDE + OWASP-based security audit. Scans code for vulnerabilities, categorizes by severity, and can iteratively fix findings.

**IMPORTANT**: Report all findings with severity levels before applying fixes.

---

## Suggested Next Steps

| Command | Description |
|---------|-------------|
| `/ck-fix` | Fix security issues found |
| `/ck-review` | Review security fixes |
