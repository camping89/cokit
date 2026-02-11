# Agents Folder - Claude/Anthropic References Audit

**Date:** 2026-02-11
**Scope:** `C:\w\_me\cokit\agents\` (12 files total, all `.agent.md`)

---

## Files Scanned (12)

1. `brainstormer.agent.md`
2. `code-reviewer.agent.md`
3. `code-simplifier.agent.md`
4. `debugger.agent.md`
5. `docs-manager.agent.md`
6. `fullstack-developer.agent.md`
7. `git-manager.agent.md`
8. `planner.agent.md`
9. `researcher.agent.md`
10. `scout.agent.md`
11. `tester.agent.md`
12. `ui-ux-designer.agent.md`

---

## Direct Claude/Anthropic References

### Search terms with ZERO matches:
- "claude" (case insensitive) - **0 matches**
- "claude code" - **0 matches**
- "claude.ai" - **0 matches**
- "anthropic" - **0 matches**
- "claude-code" - **0 matches**
- "Claude Code" - **0 matches**
- "CLAUDE.md" - **0 matches**
- "claude.md" - **0 matches**
- ".claude/" - **0 matches**
- "claude-opus" - **0 matches**
- "claude-sonnet" - **0 matches**
- "Task tool" (Claude Code specific) - **0 matches**
- "subagent" (Claude Code specific) - **0 matches**
- "subagent_type" / "agent_type" - **0 matches**
- "mcp__" / "context7" / "playwright" - **0 matches**
- "TodoWrite" / "SendMessage" / "NotebookEdit" - **0 matches**

---

## Indirect/Related References Found

### 1. "Haiku" references (Anthropic model name)

| # | File | Line | Content | Assessment |
|---|------|------|---------|------------|
| 1 | `git-manager.agent.md` | 300 | `- Haiku 4.5: $1/$5 per 1M tokens` | **Direct reference** to Anthropic's Claude Haiku 4.5 model pricing |
| 2 | `git-manager.agent.md` | 302 | `- Haiku focuses on orchestration, Gemini does heavy lifting` | **Direct reference** - describes Haiku as the orchestrating agent |
| 3 | `git-manager.agent.md` | 317 | `## Critical Instructions for Haiku` | **Direct reference** - section header targeting Haiku model specifically |

**Assessment:** These 3 lines in `git-manager.agent.md` (lines 296-344, "Token Optimization Strategy" and "Critical Instructions for Haiku" sections) are **Claude Code-specific**. They describe a dual-model architecture where Haiku (Claude) orchestrates and delegates to Gemini Flash for cost optimization. This architecture is specific to Claude Code's agent model.

### 2. "WebSearch" tool reference (Claude Code built-in tool)

| # | File | Line | Content | Assessment |
|---|------|------|---------|------------|
| 1 | `brainstormer.agent.md` | 40 | `- Use \`WebSearch\` tool to find efficient approaches...` | **Possibly Claude Code-specific** - `WebSearch` is a Claude Code built-in tool name. GitHub Copilot uses different tool names. |

### 3. "Copilot" reference

| # | File | Line | Content | Assessment |
|---|------|------|---------|------------|
| 1 | `git-manager.agent.md` | 256 | `- **Git history persists** across GitHub Copilot sessions` | **Copilot-aligned** - explicitly references GitHub Copilot. Suggests this file was partially adapted for Copilot. |

### 4. Tool name references (Glob/Grep/Read - shared tooling)

Multiple files reference `Glob`, `Grep`, and `Read` tools. These are **shared tool names** that exist in both Claude Code and GitHub Copilot agent mode, so they are NOT Claude-specific:

- `debugger.agent.md:40` - "Use Glob/Grep tools"
- `docs-manager.agent.md:24` - "using Glob and Read tools"
- `docs-manager.agent.md:60` - "Use Glob/Grep tools OR Gemini CLI"
- `scout.agent.md:12,41,53,94,107` - multiple Glob/Grep/Read references

### 5. Gemini CLI references (non-Claude, non-Copilot external tool)

Multiple files reference `gemini` CLI as a supplementary tool:
- `git-manager.agent.md` - lines 71, 78, 95, 102, 163, 166, 208, 294, 299, 301, 302, 308, 310, 331
- `planner.agent.md:21` - Gemini CLI for large files
- `scout.agent.md:87` - Gemini CLI for large files
- `docs-manager.agent.md:60` - Gemini CLI for large files

**Assessment:** Gemini CLI is used as an external cost-optimization tool, NOT a platform-specific feature. It works as a bash command in any environment.

---

## Claude Code-Specific Features Analysis

### Features found that are Claude Code-specific:

1. **Haiku orchestration model** (`git-manager.agent.md` lines 296-344): The "Token Optimization Strategy" and "Critical Instructions for Haiku" sections assume the agent IS Claude Haiku, which is Claude Code-specific behavior.

2. **`WebSearch` tool** (`brainstormer.agent.md` line 40): This specific tool name is a Claude Code built-in. Copilot's equivalent would be accessed differently.

### Features that are platform-agnostic:
- All `.agent.md` files use YAML frontmatter with `description` and `tools` fields - this is **Copilot agent format** (`.agent.md` extension)
- `Glob`, `Grep`, `Read` tool references work in both platforms
- `gemini` CLI is a standalone tool
- `gh` CLI is a standalone tool
- `repomix` is a standalone tool
- Report output patterns are platform-agnostic

---

## Summary

| Category | Count | Files |
|----------|-------|-------|
| Direct "claude"/"anthropic" string matches | **0** | - |
| Indirect Haiku model references | **3 lines** | `git-manager.agent.md` |
| Claude Code-specific tool references | **1 line** | `brainstormer.agent.md` |
| Copilot-aligned references | **1 line** | `git-manager.agent.md` |
| Platform-agnostic tool references | ~15 lines | Multiple files |

**Overall:** The agents folder is **mostly clean** of Claude/Anthropic references. Only `git-manager.agent.md` has significant Claude-specific content (3 Haiku references in the token optimization section), and `brainstormer.agent.md` has 1 `WebSearch` tool reference. The `.agent.md` file format itself is Copilot-native.
