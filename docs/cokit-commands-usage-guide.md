# CoKit Commands Usage Guide

When to use which command workflow.

## Quick Reference

| Need | Command | Workflow |
|------|---------|----------|
| **Quick implementation** | `ck-plan-fast` | ClaudeKit |
| **Deep research + plan** | `ck-plan-hard` | ClaudeKit |
| **Fix a bug** | `ck-fix` | ClaudeKit |
| **Run tests** | `ck-test` | ClaudeKit |

---

## Commands

### ClaudeKit (`ck-*`)

```
ck-plan-fast → ck-test → ck-fix
```

**Commands:**
| Command | Description |
|---------|-------------|
| `ck-plan` | Create implementation plan |
| `ck-plan-fast` | Quick plan, no research |
| `ck-plan-hard` | Deep research + plan |
| `ck-fix` | Fix issues |
| `ck-test` | Run tests |
| `ck-ask` | Answer questions |
| `ck-review` | Review codebase |
| `ck-bootstrap` | Start new project |
| `ck-brainstorm` | Brainstorm solutions |
| `ck-cook` | Implement step by step |
| `ck-scout` | Fast codebase scouting |
| `ck-git` | Git operations |
| `ck-debug` | Systematic debugging |
| `ck-docs` | Search library docs |
| `ck-watzup` | Review recent changes |
| `ck-help` | CoKit usage guide |

---

## Decision Flowchart

```
Is this a bug fix?
  └─ Yes → ck-fix

Is this < 4 hours work?
  └─ Yes → ck-plan-fast

Need deep research?
  └─ Yes → ck-plan-hard
  └─ No  → ck-plan-fast

Are you exploring/prototyping?
  └─ Yes → ck-brainstorm → ck-plan-fast
```

---

## Example Scenarios

### Scenario 1: Fix a Login Bug
```
/ck-fix "Users can't login with email containing +"
```
Single command. Done.

### Scenario 2: Add Dark Mode (Small Feature)
```
/ck-plan-fast "Add dark mode toggle"
/ck-test
/ck-fix  (if tests fail)
```

### Scenario 3: Payment Integration (Complex Feature)
```
/ck-brainstorm "Integrate Stripe payments for subscriptions"
/ck-plan-hard "Stripe payment integration"
→ implement phase by phase
/ck-test
/ck-review
```
