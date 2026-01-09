# Prompts (`.prompt.md`)

**Location:** `.github/prompts/NAME.prompt.md`

## YAML Front Matter

```yaml
---
name: prompt-name                   # Optional, defaults to filename
description: What this prompt does  # Optional but recommended
agent: ask | edit | agent | custom  # Optional
model: GPT-4o | Claude-Sonnet-4     # Optional
mode: edit                          # Optional
tools: [tool1, tool2]               # Optional
argument-hint: hint text            # Optional
---
```

## Fields

| Field | Required | Type | Default | Notes |
|-------|----------|------|---------|-------|
| `name` | No | string | filename | Display name |
| `description` | No | string | - | For discoverability |
| `agent` | No | string | current | `ask`, `edit`, `agent`, or custom |
| `model` | No | string | selected | Language model ID |
| `mode` | No | string | - | Execution mode |
| `tools` | No | array | - | Available tools |
| `argument-hint` | No | string | - | Hint text |

## Variables trong Body

```
${workspaceFolder}           # Workspace root path
${workspaceFolderBasename}   # Workspace folder name
${file}                      # Current file path
${fileBasename}              # Current file name
${fileDirname}               # Current file directory
${selection}                 # Selected text
${selectedText}              # Same as selection
${input:varName}             # User input
${input:varName:placeholder} # User input with placeholder
```

## Checklist

| # | Criteria | ☐ |
|---|----------|---|
| 1 | File extension `.prompt.md` |  |
| 2 | File trong `.github/prompts/` folder |  |
| 3 | Filename alphanumeric và spaces |  |
| 4 | YAML front matter valid (nếu có) |  |
| 5 | `tools` là array of strings |  |
| 6 | File references dùng relative paths |  |
| 7 | Variables syntax đúng `${...}` |  |
| 8 | Body content present |  |

## Example

```markdown
---
name: generate-tests
description: Generate unit tests for selected code
agent: agent
tools: [codebase, terminal]
---

Generate comprehensive unit tests for the following code:

${selection}

Requirements:
- Use Jest framework
- Cover edge cases
- Mock external dependencies
```
