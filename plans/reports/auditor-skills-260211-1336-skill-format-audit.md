# Skills Format Audit Report

**Date:** 2026-02-11
**Auditor:** auditor-skills
**Scope:** 15 top-level skills in `skills/`
**Standard:** GitHub Copilot Agent Skills format (SKILL.md frontmatter: only `name` + `description`)

---

## Summary

| Issue Type | Count | Skills Affected |
|-----------|-------|-----------------|
| Extra frontmatter fields | 11 | cook, fix, scout, git, planning, context-engineering, sequential-thinking, databases, devops, docs-seeker, ui-styling |
| `version` field (non-official) | 9 | cook, fix, scout, git, context-engineering, sequential-thinking, devops, docs-seeker, ui-styling |
| `license` field (non-official) | 5 | frontend-design, planning, sequential-thinking, databases, devops |
| Description > 1024 chars | 0 | - |
| Name format issues | 0 | - |
| Directory naming issues | 0 | - |
| Claude-specific patterns in body | 6 | cook, fix, scout, code-review, planning, mcp-management |
| README with Claude references | 2 | sequential-thinking, mcp-management |

---

## Per-Skill Audit

### cook/SKILL.md
- **Frontmatter:** ISSUE - Extra field `version: 2.1.0` (line 4)
- **Name:** OK - `cook` (lowercase, 4 chars)
- **Description:** OK - 78 chars, describes when to use
- **Dir naming:** OK
- **File refs:** OK - relative paths (`references/...`)
- **Body:** ISSUES
  - Line 81-87: Agent names like `researcher`, `planner`, `ui-ux-designer`, `tester`, `debugger`, `code-reviewer`, `project-manager`, `docs-manager`, `git-manager` - Claude Code agent/subagent pattern
  - Line 35: `Explore` agents reference (Claude-specific `subagent_type`)
- **README.md:** OK - no Claude-specific references, uses generic `/cook` syntax

### fix/SKILL.md
- **Frontmatter:** ISSUE - Extra field `version: 1.1.0` (line 5)
- **Name:** OK - `fix` (lowercase, 3 chars)
- **Description:** OK - 116 chars
- **Dir naming:** OK
- **File refs:** OK - relative paths
- **Body:** ISSUES
  - Line 35: `Spawn multiple Explore agents in parallel` - Claude-specific `subagent_type=Explore`
  - Line 47: `Parallel fullstack-developer agents` - Claude agent pattern
  - Line 52: `Spawn multiple Explore agents` - Claude-specific
  - Line 69-70: `debugger`, `researcher`, `planner`, `code-reviewer`, `tester`, `Bash` listed as agents
  - Line 70: `Multiple Explore agents for scouting, Bash agents for verification` - Claude-specific tool/agent names

### scout/SKILL.md
- **Frontmatter:** ISSUE - Extra field `version: 1.0.0` (line 5)
- **Name:** OK - `scout` (lowercase, 5 chars)
- **Description:** OK - 170 chars. Mentions `Explore` and `Gemini/OpenCode` agents
- **Dir naming:** OK
- **File refs:** OK - relative paths
- **Body:** ISSUES
  - Line 12: `Scout using built-in Explore agents` - Claude-specific `subagent_type=Explore`
  - Line 49: `references/internal-scouting.md (Explore agents)` - Claude-specific
  - Description itself mentions "Supports internal (Explore)" which is Claude-specific terminology

### code-review/SKILL.md
- **Frontmatter:** OK - only `name` and `description`
- **Name:** OK - `code-review` (lowercase+hyphens, 11 chars)
- **Description:** OK - 163 chars
- **Dir naming:** OK
- **File refs:** OK - relative paths
- **Body:** ISSUES
  - Line 105: `Dispatch code-reviewer agent via Task tool` - Claude-specific `Task` tool reference
  - Line 71-72: `Request code-reviewer agent review` - agent pattern (could be generic)

### git/SKILL.md
- **Frontmatter:** ISSUE - Extra field `version: 1.0.0` (line 5)
- **Name:** OK - `git` (lowercase, 3 chars)
- **Description:** OK - 131 chars
- **Dir naming:** OK
- **File refs:** OK - relative paths
- **Body:** MINOR ISSUES
  - Line 9: `Execute git workflows via git-manager agent` - agent pattern
  - Line 10: `Activate context-engineering skill` - skill cross-reference (OK for Copilot)

### frontend-design/SKILL.md
- **Frontmatter:** ISSUE - Extra field `license: Complete terms in LICENSE.txt` (line 5)
- **Name:** OK - `frontend-design` (lowercase+hyphens, 15 chars)
- **Description:** OK - 129 chars
- **Dir naming:** OK
- **File refs:** OK - relative paths (`./references/...`)
- **Body:** MINOR
  - Line 27: `ui-ux-designer agent` - agent pattern

### mcp-management/SKILL.md
- **Frontmatter:** OK - only `name` and `description`
- **Name:** OK - `mcp-management` (lowercase+hyphens, 14 chars)
- **Description:** OK - 174 chars
- **Dir naming:** OK
- **File refs:** OK - relative paths with markdown links
- **Body:** ISSUES
  - Line 84: `mcp-manager Agent (Fallback)` - agent pattern
  - Line 116-117: `mcp-manager agent` - agent delegation pattern
  - Line 200-208: Detailed agent architecture description
- **README.md:** ISSUES
  - Line 15: `Context Efficiency: Delegate MCP operations to mcp-manager agent`
  - Line 77-82: `Main Agent → mcp-manager Agent → mcp-management Skill` architecture diagram
  - Line 179-188: `mcp-manager agent` integration section

### planning/SKILL.md
- **Frontmatter:** ISSUE - Extra field `license: MIT` (line 5)
- **Name:** OK - `planning` (lowercase, 8 chars)
- **Description:** OK - 186 chars
- **Dir naming:** OK
- **File refs:** OK - relative paths
- **Body:** ISSUES
  - Line 63-67: `TaskCreate`, `TaskUpdate` references - could be Claude-specific Task tool, though labeled "Optional"
  - Line 108: `node $HOME/.copilot/scripts/set-active-plan.cjs` - references `.copilot` directory (OK for Copilot)

### context-engineering/SKILL.md
- **Frontmatter:** ISSUE - Extra field `version: 1.0.0` (line 7)
- **Name:** OK - `context-engineering` (lowercase+hyphens, 19 chars)
- **Description:** OK - 177 chars (multiline YAML string)
- **Dir naming:** OK
- **File refs:** OK - relative markdown links
- **Body:** MINOR
  - Line 78: `sub-agents` mentioned generically (not Claude-specific)
  - Line 106-107: Python scripts with relative paths

### repomix/SKILL.md
- **Frontmatter:** OK - only `name` and `description`
- **Name:** OK - `repomix` (lowercase, 7 chars)
- **Description:** OK - 152 chars
- **Dir naming:** OK
- **File refs:** OK - relative markdown links
- **Body:** OK - no Claude-specific patterns. Generic tool documentation.

### sequential-thinking/SKILL.md
- **Frontmatter:** ISSUES - Extra fields `version: 1.0.0` (line 5) and `license: MIT` (line 6)
- **Name:** OK - `sequential-thinking` (lowercase+hyphens, 20 chars)
- **Description:** OK - 149 chars
- **Dir naming:** OK
- **File refs:** OK - relative paths
- **Body:** OK - no Claude-specific patterns
- **README.md:** MINOR
  - Line 7: "teaches the AI agent" - generic, acceptable
  - Line 80: "MCP tool provided interface" - references MCP origin, acceptable

### databases/SKILL.md
- **Frontmatter:** ISSUE - Extra field `license: MIT` (line 5)
- **Name:** OK - `databases` (lowercase, 9 chars)
- **Description:** OK - 197 chars
- **Dir naming:** OK
- **File refs:** OK - relative markdown links
- **Body:** OK - no Claude-specific patterns

### devops/SKILL.md
- **Frontmatter:** ISSUES - Extra fields `license: MIT` (line 5) and `version: 2.0.0` (line 6)
- **Name:** OK - `devops` (lowercase, 6 chars)
- **Description:** OK - 155 chars
- **Dir naming:** OK
- **File refs:** OK - relative paths (no `./` prefix but still relative)
- **Body:** OK - no Claude-specific patterns

### docs-seeker/SKILL.md
- **Frontmatter:** ISSUE - Extra field `version: 3.1.0` (line 5)
- **Name:** OK - `docs-seeker` (lowercase+hyphens, 11 chars)
- **Description:** OK - 143 chars
- **Dir naming:** OK
- **File refs:** OK - relative paths
- **Body:** OK - no Claude-specific patterns. Uses generic script-based workflow.

### ui-styling/SKILL.md
- **Frontmatter:** ISSUES - Extra fields `license: MIT` (line 5) and `version: 1.0.0` (line 6)
- **Name:** OK - `ui-styling` (lowercase+hyphens, 10 chars)
- **Description:** OK - 147 chars
- **Dir naming:** OK
- **File refs:** OK - relative paths
- **Body:** OK - no Claude-specific patterns

---

## Issues by Priority

### HIGH - Extra Frontmatter Fields (non-official)

Official Copilot Skills format only supports `name` and `description`. These skills have extra fields:

| Skill | Extra Fields |
|-------|-------------|
| cook | `version` |
| fix | `version` |
| scout | `version` |
| git | `version` |
| frontend-design | `license` |
| planning | `license` |
| context-engineering | `version` |
| sequential-thinking | `version`, `license` |
| databases | `license` |
| devops | `license`, `version` |
| docs-seeker | `version` |
| ui-styling | `license`, `version` |

**Clean skills** (frontmatter OK): `code-review`, `mcp-management`, `repomix`

### MEDIUM - Claude-Specific Patterns in Body

| Skill | Pattern | Lines |
|-------|---------|-------|
| cook | `Explore` agents, named agent roles | 35, 81-87 |
| fix | `Explore` agents, `Bash` agents, agent names | 35, 47, 52, 69-70 |
| scout | `Explore` agents in description and body | desc, 12, 49 |
| code-review | `Task tool` reference | 105 |
| planning | `TaskCreate`, `TaskUpdate` | 63-67 |
| mcp-management | `mcp-manager` agent architecture | 84, 116-117, 200-208 |

### LOW - README.md References

| Skill | Issue |
|-------|-------|
| mcp-management | Agent delegation architecture described | lines 15, 77-82, 179-188 |
| sequential-thinking | Minor - "AI agent" generic reference | line 7 |
| cook | Clean - no issues |

---

## Unresolved Questions

1. Should `version` and `license` fields be stripped entirely, or does this project intentionally extend the official format?
2. The Claude-specific agent patterns (`Explore`, `Task tool`, named agents like `code-reviewer`) are deeply embedded in workflow logic. Removing them would require alternative orchestration patterns - is the intent to be fully Copilot-compatible or to support multiple platforms?
3. `scout` description mentions `Explore` directly - should this be rephrased to platform-neutral language?
