# Collections (`.collection.yml`)

**Location:** `.github/collections/NAME.collection.yml`

## YAML Schema

```yaml
id: collection-id                   # Required, unique, lowercase-hyphens
name: Collection Name               # Required
description: What this collection   # Required
tags: [tag1, tag2]                  # Optional, lowercase-hyphens
items:                              # Required
  - path: prompts/file.prompt.md
    kind: prompt
  - path: agents/file.agent.md
    kind: agent
  - path: instructions/file.instructions.md
    kind: instruction
display:                            # Optional
  ordering: alpha | manual
  show_badge: true | false
  featured: true | false
```

## Fields

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| `id` | **Yes** | string | Unique, lowercase với hyphens |
| `name` | **Yes** | string | Display name |
| `description` | **Yes** | string | Purpose description |
| `tags` | No | array | lowercase với hyphens |
| `items` | **Yes** | array | List of items |
| `display` | No | object | Display options |

## Item Fields

| Field | Required | Notes |
|-------|----------|-------|
| `path` | **Yes** | Relative path to file |
| `kind` | **Yes** | `prompt`, `agent`, or `instruction` |

## Checklist

| # | Criteria | ☐ |
|---|----------|---|
| 1 | File extension `.collection.yml` |  |
| 2 | Valid YAML syntax |  |
| 3 | `id` field present (required) |  |
| 4 | `id` unique, lowercase với hyphens |  |
| 5 | `name` field present (required) |  |
| 6 | `description` field present (required) |  |
| 7 | `items` array present (required) |  |
| 8 | Each item có `path` và `kind` |  |
| 9 | `path` references existing files |  |
| 10 | `kind` matches file extension |  |
| 11 | `tags` lowercase với hyphens (nếu có) |  |

## Example

```yaml
id: react-development
name: React Development
description: Tools and prompts for React development workflow
tags: [react, frontend, typescript]
items:
  - path: prompts/generate-component.prompt.md
    kind: prompt
  - path: prompts/generate-tests.prompt.md
    kind: prompt
  - path: agents/react-expert.agent.md
    kind: agent
  - path: instructions/components.instructions.md
    kind: instruction
display:
  ordering: alpha
  show_badge: true
```
