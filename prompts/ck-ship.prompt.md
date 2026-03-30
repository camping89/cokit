---
agent: 'agent'
description: 'Ship pipeline: test, review, commit, push, PR'
argument-hint: '[official|beta] [--skip-tests] [--skip-review] [--dry-run]'
---

## Context
Ship target:
<target>${input}</target>

Ship pipeline: merge main, test, review, commit, push, PR. Single command from feature branch to PR URL.

**IMPORTANT**: Follow the ship skill workflow steps precisely.

---

## Suggested Next Steps

| Command | Description |
|---------|-------------|
| `/ck-test` | Run tests and analyze results |
| `/ck-review` | Scan and analyze codebase |
