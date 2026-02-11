# Copilot Format Audit Report

**Auditor:** auditor-prompts
**Date:** 2026-02-11
**Scope:** 35 prompt files + 5 instruction files

---

## Summary

| Category | Total | OK | Issues |
|----------|-------|----|--------|
| Prompt files | 35 | 5 | 30 |
| Instruction files | 5 | 4 | 1 |

**Common issues found across multiple files:**
1. **Unsupported frontmatter fields**: `scripts`, `agent_scripts`, `handoffs` (not part of Copilot spec)
2. **Invalid agent values**: `code-simplifier` is not a standard Copilot agent value
3. **Claude Code patterns in body**: References to `Bash`, `Grep`, `Glob`, `WebSearch`, `KillShell`, `run_in_background`, `TodoWrite`, `Task` tool, subagent delegation patterns
4. **Missing `name` field**: No prompt file uses the `name` frontmatter field (optional but recommended)
5. **Tool references in body**: Many files reference tools via backtick code spans or prose instead of `#tool:<name>` format

---

## Prompt Files Audit

### ck-ask.prompt.md
- **Frontmatter:** OK - Valid fields: `agent`, `description`, `argument-hint`
- **Variables:** OK - Uses `${input}` correctly (L9)
- **Body:** ISSUES
  - L12-15: References `$HOME/.copilot/rules/` paths (Copilot-compatible path convention, OK)
  - L39: `SlashCommand(/scout)` syntax with local file path reference - non-standard Copilot pattern. Should use prompt reference or `#tool:` syntax

### ck-brainstorm.prompt.md
- **Frontmatter:** OK - Valid fields: `agent`, `description`, `argument-hint`
- **Variables:** OK - Uses `${input}` correctly (L9)
- **Body:** OK - No Claude Code-specific patterns

### ck-cook.prompt.md
- **Frontmatter:** OK - Valid fields: `agent`, `description`, `argument-hint`
- **Variables:** OK - Uses `${input}` correctly (L9)
- **Body:** ISSUES
  - L65-73: References agent names with `@` prefix (`@researcher`, `@scout`, `@planner`, etc.) - these are conceptual role names, not Copilot tool references. Copilot uses `#tool:<name>` for tool invocation
  - L81-85: References `/ck-scout` as a slash command - acceptable in Copilot context as prompt references

### ck-debug.prompt.md
- **Frontmatter:** OK - Valid fields: `agent`, `description`, `argument-hint`
- **Variables:** OK - Uses `${input}` correctly (L9)
- **Body:** OK - No format issues, pure methodology content

### ck-docs.prompt.md
- **Frontmatter:** ISSUES
  - L5: `tools: ['web/fetch']` - Copilot tool name. `web/fetch` is a valid VS Code Copilot built-in tool. OK
- **Variables:** OK - Uses `${input}` correctly (L10)
- **Body:** OK - No Claude Code-specific patterns

### ck-fix.prompt.md
- **Frontmatter:** OK - Valid fields: `agent`, `description`, `argument-hint`
- **Variables:** OK - Uses `${input}` correctly (L8)
- **Body:** OK - Decision tree referencing other `/ck-fix-*` prompts

### ck-git.prompt.md
- **Frontmatter:** ISSUES
  - L6: `tools: ['execute/runInTerminal', 'execute/getTerminalOutput']` - These are valid Copilot tool names. OK
- **Variables:** OK - Uses `${input}` correctly (L10)
- **Body:** OK - Standard git workflow content

### ck-plan.prompt.md
- **Frontmatter:** OK - Valid fields: `agent`, `description`, `argument-hint`
- **Variables:** OK - Uses `${input}` correctly (L9)
- **Body:** ISSUES
  - L21: "Activate `planning` skill" - Copilot doesn't have a "skill activation" concept. This is a Claude Code pattern referencing skill catalogs

### ck-scout.prompt.md
- **Frontmatter:** ISSUES
  - L6: `tools: ['search/codebase', 'read/readFile', 'search/listDirectory', 'search/textSearch', 'search/fileSearch']` - Valid Copilot tool names. OK
- **Variables:** OK - Uses `${input}` correctly (L10)
- **Body:** ISSUES
  - L37: "Use Glob and Grep with wide range of patterns" - **Claude Code tool names**. `Glob` and `Grep` are Claude Code-specific tools. Copilot equivalent would be `#tool:search/codebase`, `#tool:search/textSearch`, `#tool:search/fileSearch`

### ck-simplify.prompt.md
- **Frontmatter:** ISSUES
  - L3: `agent: 'code-simplifier'` - **Not a standard Copilot agent value**. Valid values are `ask`, `agent`, `plan`, or a custom agent name registered as a Copilot Chat participant. Unless `code-simplifier` is a registered custom participant, this is invalid
- **Variables:** OK - Uses `${input}` correctly (L9)
- **Body:** OK - No Claude Code-specific patterns

### ck-spec-analyze.prompt.md
- **Frontmatter:** ISSUES
  - L5-6: `scripts:` field with `sh:` and `ps:` sub-fields - **Not a valid Copilot frontmatter field**. Copilot `.prompt.md` only supports: `description`, `name`, `argument-hint`, `agent`, `model`, `tools`
- **Variables:** OK - Uses `${input}` correctly (L12)
- **Body:** OK - Methodology content, no Claude Code tool references

### ck-spec-checklist.prompt.md
- **Frontmatter:** ISSUES
  - L5-6: `scripts:` field - **Not a valid Copilot frontmatter field**
- **Variables:** OK - Uses `${input}` correctly (L33)
- **Body:** OK - Domain content, no Claude Code tool references

### ck-spec-clarify.prompt.md
- **Frontmatter:** ISSUES
  - L4-7: `handoffs:` field - **Not a valid Copilot frontmatter field**
  - L8-9: `scripts:` field - **Not a valid Copilot frontmatter field**
- **Variables:** OK - Uses `${input}` correctly (L14)
- **Body:** OK - Clarification workflow methodology

### ck-spec-implement.prompt.md
- **Frontmatter:** ISSUES
  - L5-6: `scripts:` field - **Not a valid Copilot frontmatter field**
- **Variables:** OK - Uses `${input}` correctly (L12)
- **Body:** OK - Implementation workflow content

### ck-spec-plan.prompt.md
- **Frontmatter:** ISSUES
  - L4-12: `handoffs:` field - **Not a valid Copilot frontmatter field**
  - L13-14: `scripts:` field - **Not a valid Copilot frontmatter field**
  - L15-17: `agent_scripts:` field - **Not a valid Copilot frontmatter field**
- **Variables:** OK - Uses `${input}` correctly (L22)
- **Body:** OK - Planning workflow methodology

### ck-spec-specify.prompt.md
- **Frontmatter:** ISSUES
  - L4-9: `handoffs:` field - **Not a valid Copilot frontmatter field**
  - L10-11: `scripts:` field - **Not a valid Copilot frontmatter field**
- **Variables:** OK - Uses `${input}` correctly (L16)
- **Body:** OK - Specification workflow content

### ck-spec-tasks.prompt.md
- **Frontmatter:** ISSUES
  - L4-11: `handoffs:` field - **Not a valid Copilot frontmatter field**
  - L12-13: `scripts:` field - **Not a valid Copilot frontmatter field**
- **Variables:** OK - Uses `${input}` correctly (L19)
- **Body:** OK - Task generation rules content

### ck-watzup.prompt.md
- **Frontmatter:** ISSUES
  - L5: `tools: ['search/changes', 'execute/runInTerminal', 'execute/getTerminalOutput', 'search/codebase', 'read/readFile']` - Valid Copilot tool names. OK
- **Variables:** OK - No `${input}` needed (no argument-hint)
- **Body:** OK - Standard review content

### ck-fix-fast.prompt.md
- **Frontmatter:** OK - Valid fields: `agent`, `description`, `argument-hint`
- **Variables:** OK - Uses `${input}` correctly (L28)
- **Body:** ISSUES
  - L31: "Activate `debug` and `problem-solving` skills" - **Claude Code skill activation pattern**. Copilot doesn't have this concept

### ck-fix-ci.prompt.md
- **Frontmatter:** OK - Valid fields: `agent`, `description`, `argument-hint`
- **Variables:** OK - Uses `${input}` correctly (L27)
- **Body:** OK - Standard CI fix workflow

### ck-fix-hard.prompt.md
- **Frontmatter:** OK - Valid fields: `agent`, `description`, `argument-hint`
- **Variables:** OK - Uses `${input}` correctly (L27)
- **Body:** ISSUES
  - L39: "Use `sequential-thinking` skill" - **Claude Code skill activation pattern**
  - L40: "Use `problem-solving` skills" - **Claude Code skill activation pattern**

### ck-fix-logs.prompt.md
- **Frontmatter:** OK - Valid fields: `agent`, `description`, `argument-hint`
- **Variables:** OK - Uses `${input}` correctly (L27)
- **Body:** ISSUES
  - L36: "Use `Grep` with `head_limit: 30`" - **Claude Code tool name and parameter**. `Grep` is a Claude Code-specific tool. Copilot should use `#tool:search/textSearch` or equivalent

### ck-fix-test.prompt.md
- **Frontmatter:** OK - Valid fields: `agent`, `description`, `argument-hint`
- **Variables:** OK - Uses `${input}` correctly (L27)
- **Body:** OK - Standard test fix workflow

### ck-fix-types.prompt.md
- **Frontmatter:** OK - Valid fields: `agent`, `description`
- **Variables:** N/A - No `${input}` used (no argument-hint either, consistent)
- **Body:** OK - Simple typecheck workflow

### ck-fix-ui.prompt.md
- **Frontmatter:** OK - Valid fields: `agent`, `description`, `argument-hint`
- **Variables:** OK - Uses `${input}` correctly (L30)
- **Body:** OK - UI fix workflow

### ck-bootstrap.prompt.md
- **Frontmatter:** OK - Valid fields: `agent`, `description`, `argument-hint`
- **Variables:** OK - Uses `${input}` correctly (L13)
- **Body:** ISSUES
  - L55: "Use multiple `researcher` agents in parallel" - **Claude Code multi-agent/subagent delegation pattern**. Copilot doesn't support spawning parallel sub-agents
  - L61-62: "Use `planner` agent and multiple `researcher` agents" - Same issue
  - L67-70: "Use `planner` agent to create a detailed implementation plan" - Agent delegation pattern
  - L79: "Use `ui-ux-designer` agent and multiple `researcher` agents" - Agent delegation
  - L84: "Use `agent-browser` skill" - **Claude Code skill reference**
  - L92-93: "Use `general agent (main agent)`... Use `ui-ux-designer` agent" - Agent delegation
  - L100: "Use `tester` agent" - Agent delegation
  - L101: "Use `debugger` agent" - Agent delegation
  - L106: "delegate to `code-reviewer` agent" - Agent delegation
  - L112: "use `docs-manager` agent" - Agent delegation
  - L118: "Use `project-manager` agent" - Agent delegation
  - L129: "use `git-manager` agent" - Agent delegation

### ck-preview.prompt.md
- **Frontmatter:** ISSUES
  - L5: `tools: ['execute/runInTerminal', 'execute/getTerminalOutput']` - Valid Copilot tool names. OK
- **Variables:** N/A - Uses `{{path}}` (L47) instead of `${input}` - **Incorrect variable syntax**. Copilot uses `${input}` not `{{path}}`
- **Body:** ISSUES
  - L28: "Run server as background task using `run_in_background: true` with the Bash tool" - **Claude Code-specific**: `run_in_background` is a Claude Code Bash tool parameter, not available in Copilot
  - L28: "visible in `/tasks` and manageable via `KillShell`" - **Claude Code tools**: `KillShell` and `/tasks` are Claude Code-specific
  - L37: "node $HOME/.copilot/skills/markdown-novel-viewer/scripts/server.cjs --stop" - References `$HOME/.copilot/skills/` directory (Copilot-adapted path, OK)
  - L65-67: Bash tool JSON example with `run_in_background: true`, `timeout: 300000` - **Claude Code Bash tool parameters**

### ck-review.prompt.md
- **Frontmatter:** OK - Valid fields: `agent`, `description`, `argument-hint`
- **Variables:** OK - Uses `${input}` correctly (L8)
- **Body:** ISSUES
  - L26-27: "Use 2 `researcher` agents in parallel" - **Claude Code multi-agent pattern**
  - L28: "Use `/ck-scout` slash command" - Prompt reference, acceptable
  - L33: "use multiple `code-reviewer` agents in parallel" - **Claude Code multi-agent pattern**
  - L38-41: "Use `planner` agent to analyze reports from `researcher` and `scout` agents" - **Claude Code agent delegation**

### ck-plan-hard.prompt.md
- **Frontmatter:** ISSUES
  - L5: `tools: ['web/fetch', 'search/codebase', 'read/readFile', 'search/listDirectory', 'edit/createFile', 'edit/editFiles']` - Valid Copilot tool names. OK
- **Variables:** OK - Uses `${input}` correctly (L32)
- **Body:** ISSUES
  - L28-29: "Activate `planning` skill" - **Claude Code skill activation pattern**
  - L47: "Use multiple `researcher` agents (max 2 agents) in parallel" - **Claude Code multi-agent pattern**
  - L50: "Use `/scout <instructions>` slash command" - Prompt reference, acceptable
  - L51: "Main agent gathers all research and scout report filepaths, and pass them to `planner` agent" - **Claude Code agent delegation**
  - L43: "run `node $HOME/.copilot/scripts/set-active-plan.cjs {plan-dir}`" - Script execution (Copilot-adapted, OK)

### ck-plan-fast.prompt.md
- **Frontmatter:** OK - Valid fields: `agent`, `description`, `argument-hint`
- **Variables:** OK - Uses `${input}` correctly (L32)
- **Body:** ISSUES
  - L27: "Activate `planning` skill" - **Claude Code skill activation pattern**
  - L42: "Use `planner` agent to:" - **Claude Code agent delegation pattern**
  - L43: "run `node $HOME/.copilot/scripts/set-active-plan.cjs {plan-dir}`" - Script execution (OK)

### ck-journal.prompt.md
- **Frontmatter:** OK - Valid fields: `agent`, `description`
- **Variables:** N/A - No input variable needed
- **Body:** ISSUES
  - L6: "Use the `journal-writer` agent" - **Claude Code agent delegation pattern**

### ck-test.prompt.md
- **Frontmatter:** ISSUES
  - L5: `tools: ['execute/runInTerminal', 'execute/getTerminalOutput', 'execute/runTests', 'execute/testFailure', 'read/problems']` - Valid Copilot tool names. OK
- **Variables:** N/A - No input variable needed
- **Body:** ISSUES
  - L7: "Use the `tester` agent" - **Claude Code agent delegation pattern**
  - L10: "Analyze the skills catalog and activate the skills" - **Claude Code skill pattern**

### ck-help.prompt.md
- **Frontmatter:** ISSUES
  - L6: `tools: ['execute/runInTerminal', 'execute/getTerminalOutput']` - Valid Copilot tool names. OK
- **Variables:** OK - Uses `${input}` correctly (L37, L39)
- **Body:** OK - Help system workflow (references Python script execution, acceptable)

### ck-plan-validate.prompt.md
- **Frontmatter:** OK - Valid fields: `agent`, `description`, `argument-hint`
- **Variables:** OK - Uses `${input}` correctly (L32)
- **Body:** OK - Validation interview methodology

### ck-spec-constitution.prompt.md
- **Frontmatter:** ISSUES
  - L4-8: `handoffs:` field - **Not a valid Copilot frontmatter field**
- **Variables:** OK - Uses `${input}` correctly (L13)
- **Body:** OK - Constitution creation workflow

---

## Instruction Files Audit

### ck-research.instructions.md
- **Frontmatter:** OK - Valid fields: `description`, `applyTo`
- **applyTo:** `plans/reports/**/*.md` - Valid glob pattern
- **Body:** ISSUES
  - L27: "Check if `gemini` bash command is available... execute `gemini -m gemini-2.5-flash -p`" - Specific to local CLI tool, not a Copilot concern but may not work in Copilot environment
  - L28: "fallback to `WebSearch` tool" - **Claude Code tool name**. Copilot doesn't have a `WebSearch` tool; web search in Copilot uses `#tool:web/fetch` or is handled differently
  - L28: "Run multiple `gemini` bash commands or `WebSearch` tools" - Same issue

### ck-backend.instructions.md
- **Frontmatter:** OK - Valid fields: `description`, `applyTo`
- **applyTo:** `**/*.py,**/*.go,**/*.rs,**/*.java,**/*.cs,**/api/**,**/services/**,**/controllers/**` - Valid glob pattern (comma-separated)
- **Body:** OK - Pure guidelines content, no tool-specific references

### ck-development.instructions.md
- **Frontmatter:** OK - Valid fields: `description`, `applyTo`
- **applyTo:** `**/*` - Valid glob pattern
- **Body:** OK - Pure guidelines content, no Claude Code-specific patterns

### ck-frontend.instructions.md
- **Frontmatter:** OK - Valid fields: `description`, `applyTo`
- **applyTo:** `**/*.tsx,**/*.jsx,**/*.vue,**/*.svelte,**/components/**` - Valid glob pattern
- **Body:** OK - Pure guidelines content

### ck-testing.instructions.md
- **Frontmatter:** OK - Valid fields: `description`, `applyTo`
- **applyTo:** `**/*.test.ts,**/*.spec.ts,**/*.test.js,**/*.spec.js,**/*.test.py,**/test_*.py,**/*_test.go` - Valid glob pattern
- **Body:** OK - Pure guidelines content

---

## Issue Summary by Category

### 1. Invalid Frontmatter Fields (8 files)

| File | Invalid Fields |
|------|---------------|
| `ck-spec-analyze.prompt.md` | `scripts` |
| `ck-spec-checklist.prompt.md` | `scripts` |
| `ck-spec-clarify.prompt.md` | `handoffs`, `scripts` |
| `ck-spec-implement.prompt.md` | `scripts` |
| `ck-spec-plan.prompt.md` | `handoffs`, `scripts`, `agent_scripts` |
| `ck-spec-specify.prompt.md` | `handoffs`, `scripts` |
| `ck-spec-tasks.prompt.md` | `handoffs`, `scripts` |
| `ck-spec-constitution.prompt.md` | `handoffs` |

**Impact:** Copilot will likely ignore unknown fields, but they add noise and may cause warnings.

### 2. Invalid Agent Value (1 file)

| File | Agent Value | Issue |
|------|-------------|-------|
| `ck-simplify.prompt.md` | `code-simplifier` | Not a standard Copilot agent (`ask`, `agent`, `plan`). Only valid if registered as custom chat participant |

### 3. Claude Code Tool References in Body (4 files)

| File | Line | Reference |
|------|------|-----------|
| `ck-scout.prompt.md` | L37 | `Glob` and `Grep` (Claude Code tools) |
| `ck-fix-logs.prompt.md` | L36 | `Grep` with `head_limit: 30` (Claude Code tool + parameter) |
| `ck-preview.prompt.md` | L28 | `run_in_background`, `KillShell`, `/tasks` |
| `ck-preview.prompt.md` | L65-67 | Bash tool JSON with `run_in_background`, `timeout` params |

### 4. Claude Code Skill Activation Pattern (7 files)

| File | Line | Pattern |
|------|------|---------|
| `ck-plan.prompt.md` | L21 | "Activate `planning` skill" |
| `ck-fix-fast.prompt.md` | L31 | "Activate `debug` and `problem-solving` skills" |
| `ck-fix-hard.prompt.md` | L39-40 | "Use `sequential-thinking` skill", "Use `problem-solving` skills" |
| `ck-plan-hard.prompt.md` | L28 | "Activate `planning` skill" |
| `ck-plan-fast.prompt.md` | L27 | "Activate `planning` skill" |
| `ck-test.prompt.md` | L10 | "Analyze the skills catalog and activate the skills" |
| `ck-bootstrap.prompt.md` | L84 | "Use `agent-browser` skill" |

### 5. Claude Code Multi-Agent/Delegation Patterns (7 files)

| File | Lines | Pattern |
|------|-------|---------|
| `ck-bootstrap.prompt.md` | L55,61,67,79,84,92,100,101,106,112,118,129 | Multiple agent delegations (`researcher`, `planner`, `tester`, `debugger`, `code-reviewer`, `docs-manager`, `project-manager`, `git-manager`, `ui-ux-designer`) |
| `ck-review.prompt.md` | L26-27,33,38-41 | `researcher` and `code-reviewer` agent delegation |
| `ck-plan-hard.prompt.md` | L47,51 | `researcher` and `planner` agent delegation |
| `ck-plan-fast.prompt.md` | L42 | `planner` agent delegation |
| `ck-journal.prompt.md` | L6 | `journal-writer` agent delegation |
| `ck-test.prompt.md` | L7 | `tester` agent delegation |
| `ck-cook.prompt.md` | L65-73 | Multiple `@agent` references |

### 6. Incorrect Variable Syntax (1 file)

| File | Line | Issue |
|------|------|-------|
| `ck-preview.prompt.md` | L47 | Uses `{{path}}` instead of `${input}` |

### 7. Claude Code Tool Reference in Instructions (1 file)

| File | Line | Reference |
|------|------|-----------|
| `ck-research.instructions.md` | L28 | `WebSearch` tool (Claude Code) |

---

## Files With No Issues (Clean)

### Prompt files (5/35):
1. `ck-brainstorm.prompt.md`
2. `ck-debug.prompt.md`
3. `ck-fix-ci.prompt.md`
4. `ck-fix-test.prompt.md`
5. `ck-fix-types.prompt.md`

### Instruction files (4/5):
1. `ck-backend.instructions.md`
2. `ck-development.instructions.md`
3. `ck-frontend.instructions.md`
4. `ck-testing.instructions.md`

---

## Severity Classification

| Severity | Count | Description |
|----------|-------|-------------|
| HIGH | 8 | Invalid frontmatter fields (`scripts`, `handoffs`, `agent_scripts`) - may cause parse errors |
| MEDIUM | 7 | Claude Code multi-agent delegation patterns - won't function in Copilot |
| MEDIUM | 7 | Claude Code skill activation patterns - no equivalent in Copilot |
| MEDIUM | 4 | Claude Code tool name references (`Glob`, `Grep`, `WebSearch`, `run_in_background`, `KillShell`) |
| LOW | 1 | Invalid agent value (`code-simplifier`) - may be intentional custom participant |
| LOW | 1 | Incorrect variable syntax (`{{path}}` vs `${input}`) |

---

## Recommendations

1. **Remove invalid frontmatter fields** (`scripts`, `handoffs`, `agent_scripts`) from all 8 affected spec-kit prompt files. If these trigger runtime behavior, move them to a separate config mechanism
2. **Replace Claude Code tool names** (`Glob`, `Grep`, `WebSearch`) with `#tool:search/textSearch`, `#tool:search/codebase`, `#tool:web/fetch`
3. **Remove or adapt multi-agent delegation** patterns - Copilot operates as a single agent. Replace "Use `planner` agent" with direct instructions
4. **Remove skill activation** references - Copilot doesn't have a skill catalog. Inline the behavior or reference `#tool:` where applicable
5. **Fix variable syntax** in `ck-preview.prompt.md`: change `{{path}}` to `${input}`
6. **Validate `code-simplifier` agent** value - confirm if it's a registered chat participant, otherwise change to `agent`
7. **Remove `run_in_background`/`KillShell`** references from `ck-preview.prompt.md`

## Unresolved Questions

- Are `scripts`, `handoffs`, and `agent_scripts` fields used by a custom Copilot extension/plugin? If so, they may be valid for that extension but not for standard Copilot
- Is `code-simplifier` a registered VS Code Chat Participant in the user's extension?
- The `ck-research.instructions.md` references a `gemini` CLI command -- is this expected to be available in Copilot environments?
