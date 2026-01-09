# Skills

**Location:** `.github/skills/SKILL-NAME/SKILL.md`

## Directory Structure

```
.github/skills/
└── skill-name/
    ├── SKILL.md          # Required
    ├── scripts/          # Optional
    ├── examples/         # Optional
    └── resources/        # Optional
```

## YAML Front Matter (SKILL.md)

```yaml
---
name: skill-identifier              # Required, lowercase với hyphens, ≤64 chars
description: What and when to use   # Required, ≤1024 chars
---
```

## Fields

| Field | Required | Type | Limit | Notes |
|-------|----------|------|-------|-------|
| `name` | **Yes** | string | 64 chars | lowercase với hyphens |
| `description` | **Yes** | string | 1024 chars | What + when to use |

## Checklist

| # | Criteria | ☐ |
|---|----------|---|
| 1 | Folder name lowercase với hyphens |  |
| 2 | `SKILL.md` file exists trong folder |  |
| 3 | `name` field present (required) |  |
| 4 | `name` lowercase với hyphens |  |
| 5 | `name` ≤ 64 characters |  |
| 6 | `description` field present (required) |  |
| 7 | `description` ≤ 1024 characters |  |
| 8 | Resources referenced bằng relative paths |  |

## Example

```
.github/skills/
└── webapp-testing/
    ├── SKILL.md
    ├── scripts/
    │   └── run-tests.sh
    └── examples/
        └── test-template.js
```

**SKILL.md:**
```markdown
---
name: webapp-testing
description: Run and debug web application tests using Jest and Playwright
---

# Web App Testing

Use this skill when testing React/Vue applications.

## Scripts
- [run-tests.sh](./scripts/run-tests.sh) - Run all tests
- [test-template.js](./examples/test-template.js) - Example test
```
