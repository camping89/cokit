# GitHub Copilot Customization Formats Research (2025-2026)

## 1. Custom Instructions Format

**File:** `.github/copilot-instructions.md` (workspace-level, applies to all chats)
**Format:** Markdown with optional YAML frontmatter

```markdown
---
name: 'Team Standards'
description: 'TypeScript + React guidelines'
---

# Instructions
- Use functional components with TypeScript strict mode
- Follow the code-standards.md for naming conventions
```

Frontmatter fields:
- `name` - Display name (optional)
- `description` - Shown on hover in Chat (optional)

**Alternative:** Path-specific `.instructions.md` files with `applyTo` glob patterns:
```yaml
---
name: 'React Guidelines'
applyTo: '**/*.tsx'
description: 'React-specific rules'
---
```

---

## 2. Custom Agents Format

**File:** `.github/agents/*.agent.md`
**Format:** Markdown with YAML frontmatter

```markdown
---
name: 'CodeReviewer'
description: 'Specialized code review agent'
tools: ['editFiles', 'grep', 'bash']
model: ['Claude Opus 4.5', 'GPT-4o']
argument-hint: 'Describe the code to review'
user-invokable: true
target: vscode
---

You are a senior code reviewer specializing in...
```

All frontmatter fields:
- `name` - Agent identifier (defaults to filename)
- `description` - Brief description shown in chat input
- `tools` - Array of available tools
- `agents` - Array of sub-agent names
- `model` - String or array of model names
- `argument-hint` - Guidance text in chat input
- `user-invokable` - Show in agents dropdown (default: true)
- `disable-model-invocation` - Prevent subagent calls (default: false)
- `target` - `vscode` or `github-copilot` (omit for both)
- `mcp-servers` - MCP server configuration array
- `handoffs` - Array of transition prompts

---

## 3. Prompt Files Format

**File:** `.github/prompts/*.prompt.md`
**Format:** Markdown with YAML frontmatter

```markdown
---
name: 'Generate React Form'
description: 'Create a new form component'
agent: 'agent'
model: 'Claude Opus 4.5'
tools: ['editFiles', 'grep']
argument-hint: 'Form name and fields'
---

Create a React form component with validation.
Use Zod for schema validation.
```

Frontmatter fields:
- `name` - Display name after typing `/` in chat
- `description` - Short description
- `agent` - Type: `ask`, `agent`, `plan`, or custom agent name
- `model` - LLM selection
- `tools` - Available tools list
- `argument-hint` - Chat input hint text

Body: Markdown instructions with variables like `${workspaceFolder}`, `${selection}`, `${file}`

---

## 4. Skills Format

**Directory:** `.github/skills/{skill-name}/SKILL.md` or `.claude/skills/`

```markdown
---
name: 'webapp-testing'
description: 'End-to-end web app testing with Playwright'
---

## Overview
Automated testing framework for web applications.

## Step-by-Step
1. Install Playwright
2. Write test scenarios in `/tests` directory
3. Run with `npx playwright test`

## Examples
[Reference example-test.js]
```

Required fields:
- `name` - Lowercase, hyphens, max 64 chars
- `description` - What it does, max 1024 chars

Supports: Scripts, templates, docs in same directory (loaded on-demand)

---

## 5. Collections Format

**File:** `.github/collections/*.collection.yml`

```yaml
id: 'web-development'
name: 'Web Development Suite'
description: 'Frontend agents and prompts'
items:
  - type: 'agent'
    path: '../agents/react-dev.agent.md'
  - type: 'prompt'
    path: '../prompts/generate-component.prompt.md'
  - type: 'skill'
    path: '../skills/testing'
```

Structure: YAML manifests bundling agents, prompts, instructions, skills by theme

---

## 6. Key Differences from Claude Code

| Aspect | Copilot | Claude Code |
|--------|---------|-------------|
| Config file | `.github/copilot-instructions.md` | `.claude/CLAUDE.md` + `.claude/workflows/` |
| Directory structure | `.github/agents/`, `.github/prompts/`, `.github/skills/` | `.claude/skills/`, `.claude/rules/` |
| Agent format | `.agent.md` in `.github/agents/` | No agents; uses `/slash` commands |
| Prompt files | `.prompt.md` in `.github/prompts/` | Prompts embedded in CLAUDE.md |
| Collections | `.collection.yml` grouping mechanism | No collections; tree structure |
| MCP support | `mcp-servers` in agent frontmatter | Full MCP Server integration |
| Skills location | `.github/skills/` (new) or `.claude/skills/` (legacy) | `.claude/skills/` exclusively |
| Model selection | Per-agent/prompt via frontmatter | Global + per-agent override |
| Extensions | Minimal; Microsoft-controlled ecosystem | 34,000+ MCP-based skills |

**Copilot Philosophy:** GitHub-first, enterprise-focused, tightly constrained ecosystem
**Claude Code Philosophy:** Maximally customizable, MCP-extensible, local-first control

---

## 7. Tool References Syntax

**In prompts/agents/instructions:**
```markdown
Use the #tool:bash command
Reference #tool:grep for searching
Call #tool:editFiles to modify code
```

**Copilot built-in tools:** bash, editFiles, read, grep (equivalent to Claude Code)
**MCP tools:** Custom tools via `mcp-servers` config in agent frontmatter

---

## File Extension Reference

| Type | Extension | Location |
|------|-----------|----------|
| Custom instructions | `.instructions.md` | `.github/instructions/` or root as `copilot-instructions.md` |
| Custom agents | `.agent.md` | `.github/agents/` |
| Prompt files | `.prompt.md` | `.github/prompts/` |
| Skills | `SKILL.md` | `.github/skills/{name}/` |
| Collections | `.collection.yml` | `.github/collections/` |

---

## Unresolved Questions

1. **Collections validation:** Is there a JSON schema validator for `.collection.yml`?
2. **MCP server tools:** Complete list of Copilot-compatible MCP tool types
3. **Legacy support:** Timeline for `.chatmode.md` → `.agent.md` migration
4. **Cross-org agents:** Can enterprise agents reference org-level agents?
5. **Prompt inheritance:** Can `.prompt.md` files inherit from other prompts?

---

## Sources

- [Use custom instructions in VS Code](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [Custom agents in VS Code](https://code.visualstudio.com/docs/copilot/customization/custom-agents)
- [Use prompt files in VS Code](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [Use Agent Skills in VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
- [Custom agents configuration - GitHub Docs](https://docs.github.com/en/copilot/reference/custom-agents-configuration)
- [GitHub Copilot prompt files - GitHub Docs](https://docs.github.com/en/copilot/tutorials/customization-library/prompt-files)
- [Claude Code vs GitHub Copilot (2025): Complete Comparison Guide](https://skywork.ai/blog/claude-code-vs-github-copilot-2025-comparison/)
