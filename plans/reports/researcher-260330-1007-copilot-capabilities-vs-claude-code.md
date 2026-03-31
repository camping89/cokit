# GitHub Copilot 2025-2026: Capabilities & Limitations Report

**Date:** 2026-03-30
**Research Scope:** Agent mode, extensibility, custom agents, tools, limitations vs Claude Code
**Status:** Complete

---

## Executive Summary

GitHub Copilot has evolved from an autocomplete tool into a multi-faceted agentic platform with three distinct deployment models:
1. **IDE Agent Mode** (VS Code, JetBrains, Eclipse, Xcode) — autonomous multi-file editing with terminal execution
2. **Copilot Coding Agent** (GitHub.com) — issue-to-PR automation for GitHub platform
3. **Copilot CLI** — command-line agent with MCP support and sub-agent delegation

**Key distinction:** Copilot agents CANNOT spawn independent sub-agents autonomously; they may delegate to configured subagents with isolated context only when the `runSubagent` tool is enabled and nesting is configured. Sub-agents are not fully autonomous agents but context-isolated workers reporting back to a main agent.

Unlike Claude Code's full autonomy model (which the user operates), Copilot agents operate within constrained scopes: single repo, single PR, and predefined tool access.

---

## 1. Agent Mode Capabilities

### IDE Agent Mode (Generally Available, Feb 2025+)

**What It Does:**
- Translates high-level goals into multi-step plans
- Identifies files needing changes across a codebase
- Executes edits automatically
- Runs terminal commands (npm, pytest, linters)
- Iterates on errors autonomously
- Currently available in: **VS Code, JetBrains IDEs, Eclipse, Xcode**

**Enterprise Policy Control (New Nov 2025):**
Admins can enable/disable agent mode via Copilot policies page per organization/enterprise.

### Copilot Coding Agent (GitHub.com, GA Sept 2025)

**What It Does:**
- Converts GitHub issues into pull requests
- Works asynchronously in background
- Runs automated checks (tests, linters)
- Opens PR for human review
- Operates on **GitHub.com only** — cannot work on local systems

**Key Limitation:** Scoped to single repository per task.

---

## 2. Sub-Agent Support & Delegation

### Sub-Agent Architecture (NEW - VS Code)

**YES, Copilot supports subagents with constraints:**

- **Initiated by:** Main agent recognizes when task benefits from context isolation
- **User role:** Subagents are NOT user-initiated; agents automatically delegate
- **Technical flow:**
  1. Main agent evaluates complex task
  2. Identifies subtasks needing isolated context
  3. Spawns subagent via `runSubagent` tool (must be enabled)
  4. Passes ONLY relevant information (not full conversation history)
  5. Subagent works independently, returns summary
  6. Main agent incorporates results

**Nesting Control:**
- Default: Subagents **cannot** spawn further subagents (prevents infinite recursion)
- Configurable: Enable via `chat.subagents.allowInvocationsFromSubagents` setting
- Max nesting depth: 5 levels

**Custom Agents as Subagents:**
- Custom agents can override model, tools, and instructions
- Control visibility via frontmatter: `user-invocable` (boolean) and `disable-model-invocation` (boolean)
- Appear as collapsible tool calls in chat

### Copilot CLI Delegation (Oct 2025+)

Model can choose to delegate tasks to "subsidiary subagent processes" using custom agents with specific expertise. This is more true delegation than IDE subagents.

**Key Insight:** This is different from Claude Code's peer-agent model. Copilot subagents are NOT autonomous entities the user controls; they're internal task decomposition with isolated context, managed entirely by the main agent.

---

## 3. Tool Access & Capabilities

### Built-in Tools (Copilot IDE Agent)

**File Operations:**
- Read/write files across repository
- Create new files
- Delete files
- Bulk operations

**Terminal Execution:**
- Run npm, pip, gradle, make commands
- Execute test frameworks (pytest, jest, unittest)
- Run linters and formatters
- Shell: **Bash on macOS/Linux; PowerShell Core (pwsh.exe) on Windows** (Command Prompt and Git Bash incompatible)

**Code Navigation:**
- Search across codebase
- Inspect compilation/test errors
- Review terminal output and logs

### MCP Server Integration (Primary Extensibility Mechanism)

**GitHub MCP Server (Official):**
- Provided/maintained by GitHub
- Available to ALL users (free and paid)
- Tools include: create issues, list PRs, retrieve repo info, manage branches, etc.
- Features requiring paid Copilot/GitHub subscription require same license as standalone equivalent

**Custom MCP Servers:**
- Agents can connect to local and remote MCP servers
- Support across: VS Code, JetBrains IDEs, XCode, Eclipse, Visual Studio
- **Current limitation:** MCP resources NOT supported (unlike Claude desktop with .mcp.json support)

**Tool Declaration in Agents:**
```yaml
tools: ["*"]  # All available tools
# OR
tools: [tool-name-1, tool-name-2]  # Specific tools
```

---

## 4. Custom Agents (.agent.md)

### File Format & Location

**Naming:** `.agent.md` (Markdown with YAML frontmatter)

**Storage Locations:**
```
Repository level:   .github/agents/CUSTOM-AGENT-NAME.md
Organization level: .github-private repository in .agents/CUSTOM-AGENT-NAME.md
```

### Frontmatter Schema

| Field | Type | Required | Details |
|-------|------|----------|---------|
| `name` | string | YES | Display name; used to invoke agent |
| `description` | string | YES | Purpose and capabilities (50-200 chars recommended) |
| `target` | string | NO | Environment: `vscode`, `github-copilot`, or both (default) |
| `tools` | array/string | NO | Tool names; `["*"]` = all; default = all if omitted |
| `model` | string | NO | Language model to use (e.g., `gpt-4-turbo`) |
| `disable-model-invocation` | boolean | NO | Prevent auto-invocation based on context (default: false) |
| `user-invocable` | boolean | NO | Allow manual selection in chat (default: true) |
| `mcp-servers` | object | NO | MCP server config (GitHub.com only, not VS Code) |
| `metadata` | object | NO | Custom name-value annotations (GitHub.com only) |

**Body:** Markdown instructions, max 30,000 characters

**Example:**
```markdown
---
name: backend-specialist
description: Optimizes backend API code with async/await patterns
tools: [file-edit, terminal, mcp-github]
model: claude-opus  # if Copilot supports selection
---

# Backend Specialist Agent

You are an expert in...
[instructions for specialized behavior]
```

---

## 5. Prompt Files (.prompt.md)

### Format & Location

**Naming:** `.prompt.md` (VS Code editor-specific; also used in GitHub Copilot)

**Storage:** Project or workspace root (VS Code looks in specific directories)

**Invoke via:** Type `/` in Copilot chat to list available prompts

### Frontmatter Fields

| Field | Type | Required | Details |
|-------|------|----------|---------|
| `name` | string | NO | Display name after `/`; defaults to filename |
| `description` | string | NO | Short summary (used in UI) |
| `agent` | string | NO | Agent mode: `ask`, `edit`, `agent`, `plan`, or custom agent name |
| `model` | string | NO | LLM to use; defaults to selected model in picker |
| `tools` | array | NO | Available tools for this prompt |
| `argument-hint` | string | NO | Hint text in chat input field |

**Body:** Markdown prompt text; supports:
- Relative file references: `../path/to/file.ts`
- Tool references: `#tool:<tool-name>`
- Variables: `${selection}`, `${file}`, `${input:variableName}`

**Example:**
```markdown
---
name: code-review
description: Review code for security and performance
agent: agent
argument-hint: "file to review"
---

Review the following code for:
1. Security vulnerabilities
2. Performance issues
3. Code style violations

File: ${file}
```

---

## 6. Custom Instructions (.github/copilot-instructions.md)

### Format

**File:** `.github/copilot-instructions.md` (create .github dir if needed)

**Scope Options:**
- Workspace-level (applies only to current workspace)
- Global (applies to all workspaces)

**Content:** Plain Markdown describing coding standards, conventions, patterns

**Features:**
- Always-on: applies to every request
- File-based: can target specific file types or folders
- Auto-initialization: Type `/init` in chat to generate scaffolded instructions

### Supported Rules

- Coding style guidelines
- Naming conventions
- File structure preferences
- Security/compliance requirements
- Language-specific patterns
- Architecture preferences

---

## 7. Skills (.skill.md)

### Overview

**Introduced:** December 18, 2025

Skills are folders of instructions, scripts, and resources that Copilot auto-loads when relevant to improve performance on specialized tasks. Essentially: packaged sets of expertise for specific domains.

### File Format

**Naming:** `SKILL.md` (Markdown with YAML frontmatter)

**Storage Locations:**
```
Personal (shared across projects):
  ~/.copilot/skills/
  ~/.claude/skills/
  ~/.agents/skills/

Project-specific:
  .github/skills/
  .claude/skills/
  .agents/skills/
```

### Frontmatter Schema

| Field | Type | Required | Details |
|-------|------|----------|---------|
| `name` | string | YES | Unique ID; lowercase with hyphens (e.g., `react-testing`) |
| `description` | string | YES | What it does and when to use it |
| `license` | string | NO | License terms (e.g., MIT, Apache 2.0) |

**Body:** Detailed instructions for how to apply the skill

**Example:**
```markdown
---
name: react-component-patterns
description: Teaches Copilot to use consistent React patterns with hooks, error boundaries, and memo optimization
---

# React Component Patterns Skill

When creating React components, Copilot should:
1. Use functional components with hooks
2. Implement error boundaries for production
3. Use React.memo for optimization
...
```

---

## 8. MCP Integration Details

### GitHub MCP Server (Official)

**Status:** Officially provided and maintained by GitHub

**Availability:**
- Free users: Basic tools available
- Paid Copilot users: Full tool access
- License requirement: Features requiring paid subscription need same license (e.g., Copilot Coding Agent features need paid Copilot)

**Supported Tools:**
- Create/manage issues and PRs
- List pull requests
- Retrieve repository information
- Manage branches
- Access GitHub Actions

### Custom MCP Servers

**Configuration in Agent:**
```yaml
mcp-servers:
  - name: my-custom-server
    url: http://localhost:3000  # local or remote
    tools: [tool1, tool2]
```

**Supported Environments:**
- Local MCP: VS Code, JetBrains, XCode, Eclipse
- Remote MCP: VS Code, Visual Studio, JetBrains IDEs, Xcode, Eclipse, Cursor

**Important Limitation:** MCP **resources** NOT supported (e.g., cannot directly access .mcp.json resource definitions like Claude desktop)

---

## 9. Copilot vs Claude Code: Detailed Comparison

### Architecture

| Aspect | Copilot | Claude Code |
|--------|---------|------------|
| Primary Interface | IDE-embedded (chat panel, inline suggestions) | CLI-first; VS Code extension secondary |
| Deployment | IDE extension; GitHub.com; CLI | Standalone CLI; extension support |
| Context Handling | IDE buffer context + MCP servers | Full repo context (1M tokens in beta with Opus) |
| Agent Type | Scoped agents (repo/PR limits) | Autonomous agents (user-controlled) |
| Sub-agents | Context-isolated workers; auto-delegated | User spawns independent peer agents |

### Capabilities Comparison

| Feature | Copilot | Claude Code |
|---------|---------|------------|
| **Agent Mode** | YES (IDEs + GitHub.com) | YES (CLI-first) |
| **File Multi-edit** | YES | YES |
| **Terminal Execution** | YES (shell-dependent) | YES |
| **Sub-agents** | YES (isolated context, auto-delegated) | YES (independent, user-spawned) |
| **MCP Integration** | YES (tools only, no resources) | YES (tools + resources via .mcp.json) |
| **Repo Scope** | Single repo per task | Supports multi-repo with context |
| **Web Search** | NO (firewall-blocked by default) | YES (if MCP server provides it) |
| **Custom Instructions** | YES (.copilot-instructions.md) | YES (.claude/instructions.md style) |
| **Prompt Files** | YES (.prompt.md) | YES (.prompt files via filesystem) |
| **Skills** | YES (.skill.md, auto-loaded) | YES (.claude/skills/, user can activate) |
| **Custom Agents** | YES (.agent.md) | NO (sub-agent model instead) |
| **Model Selection** | Limited (Copilot plan determines models) | Full model choice per task |
| **Context Window** | 32k-128k typical | 1M tokens (beta, Opus 4.6) |
| **Performance Metric** | 55% productivity boost (self-reported) | 72.5% SWE-bench Verified score |

### Adoption & Maturity

| Factor | Copilot | Claude Code |
|--------|---------|------------|
| **Maturity** | Stable; GA Jan 2022 for Copilot, Feb 2025 for agents | Newer; growing rapidly (2024-2026) |
| **Community Size** | Largest; millions of users | Growing; developer-focused community |
| **IDE Support** | VS Code, JetBrains, Eclipse, Xcode, Visual Studio | VS Code, terminal, minimal IDE integration |
| **Breaking Changes** | Occasional; documented in changelog | Lower risk; alpha/beta features still evolving |
| **Enterprise Support** | Excellent; policy controls, org-level config | Developing; API-first approach |
| **Documentation** | Comprehensive; official GitHub docs | Official Anthropic docs + guides |

### Use Case Fit

**Choose Copilot if:**
- Team wants IDE-first experience with inline suggestions
- Single-repository tasks predominate
- Enterprise policy/compliance controls required
- GitHub ecosystem deeply integrated (Issues, PRs, Actions)
- Prefer managed, stable platform

**Choose Claude Code if:**
- Need large context window (full repo analysis)
- Require multi-repo refactoring or migration tasks
- Want maximum flexibility in model/tool selection
- Prefer CLI-first, scriptable workflows
- Need maximum reasoning (SWE-bench performance metrics matter)
- Building custom agentic pipelines (MCP resource support)

---

## 10. Limitations & Gaps

### What Copilot CANNOT Do

| Limitation | Reason | Workaround |
|-----------|--------|-----------|
| **Web search** | Firewall-blocked by default; no built-in search tool | Use MCP server that provides search |
| **MCP resources** | Not implemented in current version | Only tool-based MCP supported |
| **Multi-repo tasks** | Scoped to single repo per invocation | Spawn separate agents for each repo |
| **Spawn independent agents** | Subagents are context-isolated workers only | Use Copilot CLI for true delegation |
| **Cross-PR updates** | One PR per task | Create sequential tasks |
| **Non-GitHub repos** | Coding agent only works GitHub.com | Use IDE agent mode for local repos |
| **Unsigned commits** | Blocked if repo requires signed commits | Configure git signing or policy exception |
| **Shell incompatibility** | Windows: Git Bash, CMD not supported (pwsh.exe required) | Use PowerShell Core (pwsh.exe) |
| **Custom models** | Limited by Copilot subscription plan | Claude Code allows custom model selection |
| **Tool output loss** | Sometimes doesn't receive terminal output (known issue) | Explicit tool output writes to files |

### Architectural Constraints

1. **Single-scope agents:** Each agent instance bound to one repo/one PR
2. **Firewall filtering:** Network requests blocked to prevent data exfiltration
3. **IDE-dependent:** Agent mode features vary by IDE; not all fields supported everywhere
4. **Context isolation:** Subagents receive ONLY relevant subtask info (vs Claude Code's full context awareness)

---

## 11. Configuration File Hierarchy

### Discovery Order (VS Code)

1. **Workspace-level:**
   - `.github/copilot-instructions.md` (custom instructions)
   - `.github/agents/*.agent.md` (custom agents)
   - `.github/skills/*.skill.md` (project skills)
   - Prompt files in workspace root or configured directories

2. **User-level:**
   - `~/.copilot/skills/` or `~/.claude/skills/` (personal skills)
   - Global Copilot settings

3. **Organization-level (GitHub.com):**
   - `.github-private` repository with `.agents/*.agent.md`

### .copilotignore (Third-party, not official GitHub feature)

- Community-contributed extension (not official GitHub Copilot feature)
- Disables Copilot in specified files/directories
- Not part of core Copilot; requires separate VSCode extension

---

## 12. Research Credibility & Sources

| Source | Credibility | Coverage |
|--------|-------------|----------|
| GitHub Docs (official) | HIGHEST | Agent mode, custom agents, MCP, skills, instructions |
| VS Code Docs (Microsoft) | HIGH | IDE-specific agents, subagents, prompt files |
| GitHub Changelog | HIGH | Feature announcements, GA dates, breaking changes |
| GitHub Community Discussions | MEDIUM | User experiences, workarounds, known issues |
| Third-party blogs/tools | MEDIUM | Comparisons, tutorials, community insights |

**Key Official References:**
- [About GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent)
- [Custom Agents Configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)
- [VS Code Subagents](https://code.visualstudio.com/docs/copilot/agents/subagents)
- [MCP and Coding Agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/mcp-and-coding-agent)
- [About Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)

---

## 13. Unresolved Questions

1. **Model Selection in Custom Agents:** Frontmatter supports `model` field, but documentation unclear if free Copilot plan can select arbitrary models or if selection limited by subscription tier. Needs verification in official docs.

2. **Recursive Nesting Depth:** VS Code docs mention max depth of 5 for nested subagents, but unclear if this applies to all environments (JetBrains, Eclipse, Xcode) or VS Code only.

3. **Firewall Configuration:** Documentation mentions "firewall to manage data exfiltration risks" but no details on:
   - How to whitelist domains for agent network access
   - Whether organizations can customize firewall rules
   - How this differs between free/paid tiers

4. **Skill Auto-Loading Mechanism:** Documentation states skills "auto-load when relevant" but mechanism for relevance detection not documented. How does Copilot decide which skills apply?

5. **MCP Server Authentication:** Docs don't address how Copilot agents authenticate to private MCP servers. Is it via env vars, credential files, or other means?

6. **VS Code Custom Agent Properties:** Docs mention "Some properties may function differently or be ignored between environments" but don't provide environment-specific property support matrix.

---

## Key Takeaways for CoKit Project Context

1. **Copilot agents are NOT equivalent to Claude Code agents:** Different execution model (scoped vs autonomous), different delegation approach (auto-delegated subagents vs user-spawned peers), different context handling.

2. **Skills concept aligns with CoKit's existing approach:** Both support `.skill.md` format with auto-discovery in `.claude/skills/` or `.agents/skills/` directories.

3. **Prompt files (.prompt.md) are IDE-specific to VS Code:** Copilot supports them but may not have feature parity across all environments.

4. **MCP is THE extensibility mechanism:** Custom agents + MCP servers = Copilot's primary way to add tools. GitHub MCP server is standard.

5. **No multi-repo agent support:** CoKit's orchestration needs may be better served by Claude Code's architecture or hybrid Copilot + custom MCP approach.

---

**Report Generated:** 2026-03-30 @ 10:07 UTC
**Next Steps:** Recommend comparing CoKit's current agent model against Copilot's single-scope/subagent pattern to assess architectural fit.
