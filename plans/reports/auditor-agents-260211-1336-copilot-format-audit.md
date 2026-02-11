# Copilot Format Audit Report

**Date:** 2026-02-11
**Auditor:** auditor-agents
**Scope:** 12 agent files, 5 collection files

---

## Summary

All 12 `.agent.md` files share **systemic issues** common across the board. Collections use a **custom format** (not official Copilot). Findings below.

### Common Issues (All Agents)

These issues appear in **every** agent file:

1. **Missing `name` field** in frontmatter -- Copilot spec supports `name` for display; all agents rely on filename-derived name
2. **Tool format uses slash-style** (`search/codebase`, `web/fetch`) -- this matches Copilot's tool naming convention, appears valid
3. **No `#tool:<name>` references in body** -- Copilot spec says body should reference tools as `#tool:<tool-name>`; none of these files do
4. **References to other agents by name** (e.g., "Consult the `planner` agent") without using the `agents` frontmatter field or Copilot's agent invocation syntax
5. **No `agents` field** in frontmatter -- if agents should invoke subagents, they need `agents: [list]` field
6. **Claude Code-ish patterns**: references to `Glob`, `Grep`, `Read` tools (capitalized, Claude Code tool names) appear in several files
7. **References to `gemini` CLI tool** -- not a Copilot-compatible tool; appears in planner, scout, docs-manager, git-manager
8. **`plans/reports/` directory pattern** -- custom convention, not a Copilot feature (fine as project convention)
9. **Report naming pattern `{type}-{date}-{slug}.md`** -- custom, not Copilot (fine as project convention)

---

## Agent File Audits

### brainstormer.agent.md
- **Frontmatter: OK** - `description` and `tools` are valid Copilot fields
- **Tools: OK** - `search/codebase`, `search/changes`, `web/fetch`, `read/problems` -- valid Copilot tool names
- **Body: ISSUES**
  - Line 38-39: References `planner` and `docs-manager` agents by name without `agents` frontmatter field
  - Line 40: References `WebSearch` tool -- not a Copilot tool name; should be `#tool:web-search` or similar Copilot syntax
  - No `#tool:` references in body

### debugger.agent.md
- **Frontmatter: OK** - Valid fields
- **Tools: OK** - `search/codebase`, `search/changes`, `web/fetch`, `web/githubRepo`, `read/problems`, `read/terminalLastCommand` -- valid
- **Body: ISSUES**
  - Line 40: References `Glob/Grep tools` -- Claude Code tool names (capitalized)
  - Line 41-45: References `repomix --remote` -- external CLI tool, not Copilot-integrated
  - Line 21: References "activate `debugging` skills" and "`problem-solving` skills" -- unclear if these are Copilot skills or custom
  - No `#tool:` references in body

### planner.agent.md
- **Frontmatter: OK** - Valid fields
- **Tools: OK** - `search/codebase`, `search/changes`, `web/fetch`, `read/problems`
- **Body: ISSUES**
  - Line 21: References `Gemini CLI` -- `echo "[question]" | gemini -y -m gemini-2.5-flash` is not a Copilot tool
  - Line 23: References `Grep` (capitalized) -- Claude Code tool name
  - Line 68: References YAML frontmatter for plan files -- fine as project convention
  - No `#tool:` references in body

### scout.agent.md
- **Frontmatter: OK** - Valid fields
- **Tools: OK** - `search/codebase`, `search/changes`
- **Body: ISSUES**
  - Lines 41-53: Heavy references to `Glob`, `Grep`, `Read` tools (capitalized) -- Claude Code tool names
  - Line 87: References `Gemini CLI` -- not Copilot
  - Line 94: References `Glob, Grep, and Read tools` again
  - No `#tool:` references in body

### docs-manager.agent.md
- **Frontmatter: OK** - Valid fields
- **Tools: OK** - `search/codebase`, `search/changes`, `read/problems`
- **Body: ISSUES**
  - Line 31: References `Glob and Read tools` (capitalized) -- Claude Code tool names
  - Line 60: References `Glob/Grep tools OR Gemini CLI` -- mixed non-Copilot tools
  - No `#tool:` references in body

### tester.agent.md
- **Frontmatter: OK** - Valid fields
- **Tools: OK** - `search/codebase`, `search/changes`, `read/problems`, `read/terminalLastCommand`
- **Body: OK** - No Claude Code-specific tool references in body
- No `#tool:` references in body (minor)

### code-reviewer.agent.md
- **Frontmatter: OK** - Valid fields
- **Tools: OK** - `search/codebase`, `search/changes`, `read/problems`, `read/terminalLastCommand`
- **Body: OK** - No direct Claude Code tool references
- No `#tool:` references in body (minor)

### code-simplifier.agent.md
- **Frontmatter: OK** - Valid fields
- **Tools: OK** - `search/codebase`, `search/changes`, `read/problems`, `read/terminalLastCommand`
- **Body: OK** - No Claude Code-specific patterns
- No `#tool:` references in body (minor)

### fullstack-developer.agent.md
- **Frontmatter: OK** - Valid fields
- **Tools: OK** - `search/codebase`, `search/changes`, `read/problems`, `read/terminalLastCommand`
- **Body: OK** - No direct Claude Code tool references
- No `#tool:` references in body (minor)

### researcher.agent.md
- **Frontmatter: OK** - Valid fields
- **Tools: OK** - `search/codebase`, `web/fetch`, `read/problems`
- **Body: ISSUES**
  - Line 27: References `docs-seeker` skills -- unclear if Copilot skill or custom
  - No `#tool:` references in body

### ui-ux-designer.agent.md
- **Frontmatter: OK** - Valid fields
- **Tools: OK** - `search/codebase`, `search/changes`, `web/fetch`, `read/problems`
- **Body: ISSUES**
  - Lines 24-28: References custom skills (`ui-ux-pro-max`, `frontend-design`, `web-design-guidelines`, `ui-styling`, `frontend-development`) -- not standard Copilot skills
  - Line 56: References `researcher` agents -- subagent delegation without `agents` field
  - No `#tool:` references in body

### git-manager.agent.md
- **Frontmatter: OK** - Valid fields
- **Tools: OK** - `search/codebase`, `search/changes`, `read/terminalLastCommand`
- **Body: ISSUES**
  - Lines 71, 95, 163, etc.: Heavy use of `gemini` CLI for commit message generation -- not Copilot tool
  - Line 111: Uses emoji `✓` in output format -- fine stylistically
  - Lines 289-294: Uses emoji `❌` and `⚠` -- fine stylistically
  - No `#tool:` references in body

---

## Collection File Audits

**Note:** `.collection.yml` is **NOT an official Copilot format**. This appears to be a custom extension. Auditing for Claude-specific content only.

### ck-git-workflow.collection.yml
- **Format: CUSTOM** - `id`, `name`, `description`, `tags`, `items`, `display` -- none are Copilot-standard fields
- **Content: OK** - No Claude-specific references
- References `agents/git-manager.agent.md` and `prompts/ck-git.prompt.md` via relative paths

### ck-documentation.collection.yml
- **Format: CUSTOM** - Same custom schema
- **Content: OK** - No Claude-specific references
- References 2 agents and 1 prompt

### ck-core.collection.yml
- **Format: CUSTOM** - Same custom schema
- **Content: OK** - No Claude-specific references
- References 5 agents and 5 prompts

### ck-development-rules.collection.yml
- **Format: CUSTOM** - Same custom schema
- **Content: OK** - No Claude-specific references
- References 2 agents and 3 prompts

### ck-orchestration.collection.yml
- **Format: CUSTOM** - Same custom schema
- **Content: OK** - No Claude-specific references
- References 1 agent and 3 prompts

---

## Issue Summary Table

| Issue | Severity | Files Affected |
|-------|----------|----------------|
| No `#tool:<name>` syntax in body | Medium | All 12 agents |
| No `agents` frontmatter field for subagent refs | Medium | brainstormer, ui-ux-designer, researcher |
| `Glob`/`Grep`/`Read` (Claude Code tools) in body | High | scout, debugger, planner, docs-manager |
| `gemini` CLI references | High | planner, scout, docs-manager, git-manager |
| `WebSearch` tool reference | Medium | brainstormer |
| `repomix` CLI reference | Low | debugger |
| Custom skill names without Copilot integration | Low | ui-ux-designer, researcher, debugger |
| Missing `name` field in frontmatter | Low | All 12 agents |
| Collections use custom format | Info | All 5 collections |

---

## Recommendations

1. **High Priority**: Replace `Glob`, `Grep`, `Read` references with Copilot tool references (`#tool:search`, `#tool:fetch`, etc.)
2. **High Priority**: Replace `gemini` CLI usage with Copilot-native alternatives or document as optional external tool
3. **Medium Priority**: Add `#tool:<name>` syntax in body where tools are referenced
4. **Medium Priority**: Add `agents` field in frontmatter for agents that reference subagents
5. **Low Priority**: Add `name` field to frontmatter for explicit display names
6. **Info**: Collections format is custom -- document this as a CoKit extension, not Copilot-standard

---

## Unresolved Questions

1. Are the tool names like `search/codebase`, `web/fetch`, `read/problems` verified against the actual Copilot tool registry? The slash notation looks correct but exact names need verification against the specific Copilot extension version.
2. Does the target Copilot environment support the `read/terminalLastCommand` tool? This may be VS Code-specific.
3. Should collections be migrated to an official Copilot format if one exists, or kept as custom CoKit extension?
4. The `gemini` CLI fallback pattern in git-manager -- should this be replaced with a Copilot-compatible model call, or is it intentionally an external tool?
