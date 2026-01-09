# File-Specific Instructions (`.instructions.md`)

**Location:** `.github/instructions/NAME.instructions.md`

## YAML Front Matter

```yaml
---
applyTo: "**/*.ts"                  # Required, glob pattern
excludeAgent: code-review           # Optional
---
```

## Fields

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| `applyTo` | **Yes** | string | Glob pattern |
| `excludeAgent` | No | string | `code-review` hoặc `coding-agent` |

## Glob Patterns

```
*                    # Current dir files
**/*                 # All files recursive
*.py                 # Extension in current dir
src/**/*.py          # Recursive in subdir
**/*.{ts,tsx}        # Multiple extensions
**/test/**/*.ts      # Files in test folders
```

## Checklist

| # | Criteria | ☐ |
|---|----------|---|
| 1 | File extension `.instructions.md` |  |
| 2 | File trong `.github/instructions/` folder |  |
| 3 | YAML front matter present |  |
| 4 | `applyTo` field present (required) |  |
| 5 | `applyTo` valid glob pattern |  |
| 6 | `excludeAgent` valid value (nếu có) |  |
| 7 | Body contains instructions |  |
| 8 | No overlapping patterns gây conflict |  |

## Example

**tests.instructions.md:**
```markdown
---
applyTo: "**/*.test.ts,**/*.spec.ts"
---

# Test Guidelines

- Use describe/it pattern
- Mock external dependencies
- Aim for 80% coverage
- Test edge cases
```

**components.instructions.md:**
```markdown
---
applyTo: "src/components/**/*.tsx"
excludeAgent: code-review
---

# Component Guidelines

- Use functional components
- Props interface above component
- Extract hooks to separate files
```
