# Agents (`.agent.md`)

**Location:** `.github/agents/NAME.agent.md`

## YAML Front Matter

```yaml
---
name: agent-name                    # Optional, defaults to filename
description: What it does           # Required
target: vscode | github-copilot     # Optional, defaults to both
tools: [tool1, tool2]               # Optional, defaults to all
infer: true | false                 # Optional, defaults to true
metadata:                           # Optional
  key: value
---
```

## Fields

| Field | Required | Type | Default | Notes |
|-------|----------|------|---------|-------|
| `name` | No | string | filename | lowercase với hyphens |
| `description` | **Yes** | string | - | Mô tả purpose |
| `target` | No | string | both | `vscode` hoặc `github-copilot` |
| `tools` | No | array/string | all | Tool names |
| `infer` | No | boolean | true | Auto-invoke based on context |
| `metadata` | No | object | - | Key-value pairs |

## Checklist

| # | Criteria | ☐ |
|---|----------|---|
| 1 | File extension `.agent.md` |  |
| 2 | YAML front matter between `---` markers |  |
| 3 | `description` field present (required) |  |
| 4 | `name` lowercase với hyphens (nếu có) |  |
| 5 | `tools` là array hoặc string |  |
| 6 | Body content ≤ 30,000 characters |  |
| 7 | Valid Markdown syntax trong body |  |

## Example

```markdown
---
name: code-reviewer
description: Reviews code for best practices and security issues
tools: [codebase, terminal]
---

You are a senior code reviewer. Focus on:
- Security vulnerabilities
- Performance issues
- Code readability
```
