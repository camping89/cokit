# CoKit Commands Usage Guide

When to use which command workflow.

## Quick Reference

| Need | Command | Workflow |
|------|---------|----------|
| **Quick implementation** | `ck-plan-fast` | ClaudeKit |
| **Deep research + plan** | `ck-plan-hard` | ClaudeKit |
| **Formal spec from idea** | `ck-spec-specify` | SpecKit |
| **Fix a bug** | `ck-fix` | ClaudeKit |
| **Run tests** | `ck-test` | ClaudeKit |

---

## Two Workflows

### ClaudeKit (`ck-*`) - Flexible, Fast

Best for: **Day-to-day development**, quick fixes, exploration.

```
ck-plan-fast → ck-test → ck-fix
```

**When to use:**
- Fixing bugs
- Small features (< 1 day)
- Prototyping
- Exploratory coding
- You know what to build

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

---

### SpecKit (`ck-spec-*`) - Structured, Rigorous

Best for: **Complex features**, team collaboration, formal requirements.

```
ck-spec-specify → ck-spec-clarify → ck-spec-plan → ck-spec-tasks → ck-spec-implement
```

**When to use:**
- Multi-day features
- Requirements need formal spec
- Multiple stakeholders
- Need traceability
- Compliance/audit needs

**Commands:**
| Command | Description |
|---------|-------------|
| `ck-spec-specify` | Create formal spec from idea |
| `ck-spec-clarify` | Ask clarification questions |
| `ck-spec-plan` | Generate plan from spec |
| `ck-spec-tasks` | Break plan into tasks |
| `ck-spec-implement` | Execute tasks |
| `ck-spec-analyze` | Check consistency |
| `ck-spec-checklist` | Validate requirements |

---

## Decision Flowchart

```
Is this a bug fix?
  └─ Yes → ck-fix

Is this < 4 hours work?
  └─ Yes → ck-plan-fast

Do you need formal requirements?
  └─ Yes → ck-spec-specify → ck-spec-* flow
  └─ No  → ck-plan-hard → ck-* flow

Are you exploring/prototyping?
  └─ Yes → ck-plan-fast (skip spec)
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
/ck-spec-specify "Integrate Stripe payments for subscriptions"
/ck-spec-clarify  (answer questions about tiers, regions, etc.)
/ck-spec-plan
/ck-spec-tasks
/ck-spec-implement
/ck-test
```

---

## Mixing Workflows

You can mix them:
- Start with `ck-spec-specify` for formal spec
- Use `ck-fix` when bugs arise during implementation
- Use `ck-test` regardless of workflow

---

## Summary

| Workflow | Best For | Time | Rigor |
|----------|----------|------|-------|
| **ClaudeKit** | Daily dev, fixes | Minutes-Hours | Low-Medium |
| **SpecKit** | Big features, teams | Days-Weeks | High |

**Rule of thumb:** If you can explain it in one sentence, use ClaudeKit. If you need a doc, use SpecKit.
