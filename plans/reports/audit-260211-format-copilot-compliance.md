# Copilot Format Compliance Audit Report

**Date:** 2026-02-11
**Scope:** agents/, prompts/, instructions/, skills/, collections/
**Excluded:** templates/ (per user request)

---

## Summary

| Folder | Files | Frontmatter | Tools Format | Body Content | Overall |
|--------|-------|-------------|-------------|-------------|---------|
| agents/ | 12 | OK | OK | ISSUES | WARN |
| prompts/ | 35 | ISSUES (8) | OK | ISSUES | WARN |
| instructions/ | 5 | OK | N/A | OK | PASS |
| skills/ (SKILL.md) | 23 | ISSUES | N/A | ISSUES | WARN |
| collections/ | 5 | N/A (custom) | N/A | OK | PASS |

---

## 1. agents/ (12 files) - WARN

### Frontmatter: PASS
All 12 agents use only valid Copilot fields (`description`, `tools`). No unsupported fields.
Missing `name` field in all 12 (optional, defaults to filename - acceptable).

### Tools Format: PASS
All tool names use correct Copilot slash format: `search/codebase`, `search/changes`, `web/fetch`, `web/githubRepo`, `read/problems`, `read/terminalLastCommand`.

### Body Content: ISSUES

**Issue A - Claude Code tool names in body (4 agents)**

| File | Lines | Pattern |
|------|-------|---------|
| scout.agent.md | 12,41,42,53,82,86-89,94,107 | "Glob, Grep, and Read tools" (8 instances) |
| debugger.agent.md | 40 | "Use Glob/Grep tools" |
| docs-manager.agent.md | 24,60 | "Glob and Read tools", "Glob/Grep tools" |
| planner.agent.md | 22-24 | "Chunked Read", "Grep pattern=", "Glob and Grep" |

**Severity:** LOW - Body text is instructional; Copilot agent interprets intent regardless of tool naming.

**Issue B - `WebSearch` tool reference (not Copilot tool)**

| File | Line | Content |
|------|------|---------|
| brainstormer.agent.md | 40 | "Use `WebSearch` tool" |

**Severity:** MEDIUM - `WebSearch` is not a Copilot tool. Should be `#tool:web/fetch` or generic "search the web".

**Issue C - Gemini CLI references (external tool, not Copilot-native)**

| File | Lines | Usage |
|------|-------|-------|
| git-manager.agent.md | 71,78,95,102,163,166,208 | Gemini CLI for commit messages, PR titles |
| planner.agent.md | 21 | Gemini CLI fallback for large files |
| scout.agent.md | 87 | Gemini CLI fallback for large files |
| docs-manager.agent.md | 60 | "Gemini CLI for large files" |

**Severity:** LOW - Gemini CLI is a valid external tool, not a Copilot format violation. Works as terminal command via `execute/runInTerminal`.

---

## 2. prompts/ (35 files) - WARN

### Frontmatter: ISSUES

**Issue D - Invalid frontmatter fields in 8 spec-kit files**

| Field | Files |
|-------|-------|
| `scripts` | ck-spec-analyze, ck-spec-checklist, ck-spec-implement, ck-spec-plan, ck-spec-tasks, ck-spec-specify, ck-spec-clarify |
| `handoffs` | ck-spec-clarify, ck-spec-constitution, ck-spec-plan, ck-spec-tasks, ck-spec-specify |
| `agent_scripts` | ck-spec-plan |

Copilot prompt spec only supports: `description`, `name`, `argument-hint`, `agent`, `model`, `tools`.
`scripts`, `handoffs`, `agent_scripts` are NOT valid Copilot fields.

**Severity:** HIGH - Unknown fields may cause parsing issues or be silently ignored, losing intended functionality.

### Tools Format: PASS

### Variables: ISSUES

**Issue E - Wrong variable syntax in ck-preview.prompt.md**

| File | Line | Current | Should be |
|------|------|---------|-----------|
| ck-preview.prompt.md | 46 | `{{path}}` | `${input}` |

**Severity:** MEDIUM - `{{path}}` is not valid Copilot variable syntax.

### Body Content: ISSUES

**Issue F - Claude Code-specific API in ck-preview.prompt.md**

| Line | Content | Severity |
|------|---------|----------|
| 28 | `run_in_background: true` with **Bash tool**... `KillShell` | HIGH |
| 64 | "When calling the **Bash tool**:" | HIGH |
| 65 | "Set `run_in_background: true`" | HIGH |
| 69-77 | Full JSON example with `run_in_background`, `timeout` | HIGH |

These are Claude Code-specific API params. Copilot uses `execute/runInTerminal`.

**Issue G - Skill activation patterns (not Copilot concept, 9 prompts)**

| File | Lines | Pattern |
|------|-------|---------|
| ck-plan.prompt.md | 21,25 | "Activate `planning` skill" |
| ck-plan-fast.prompt.md | 27,92 | "Activate `planning` skill" |
| ck-plan-hard.prompt.md | 28,118 | "Activate `planning` skill" |
| ck-bootstrap.prompt.md | 51 | "Analyze skills catalog and activate" |
| ck-review.prompt.md | 22 | "Analyze skills catalog and activate" |
| ck-test.prompt.md | 10 | "Analyze skills catalog and activate" |
| ck-fix-fast.prompt.md | 31 | "Activate `debug` and `problem-solving` skills" |
| ck-fix-ui.prompt.md | 33 | "Activate `frontend-design` skill" |

**Severity:** MEDIUM - "Activate skill" is a Claude Code/CoKit concept. Copilot doesn't have explicit skill activation. These instructions would be ignored.

**Issue H - Tool name references in body (3 prompts)**

| File | Line | Content |
|------|------|---------|
| ck-fix-logs.prompt.md | 36 | "Use `Grep` with `head_limit: 30`" |
| ck-scout.prompt.md | 37 | "Use Glob and Grep with wide range" |
| ck-plan-validate.prompt.md | 159 | "Glob for `phase-{N:02d}-*.md`" |

**Severity:** LOW

---

## 3. instructions/ (5 files) - PASS

### Frontmatter: PASS
All use valid fields: `description`, `applyTo`.

### applyTo Patterns: PASS
All glob patterns valid.

### Body Content: PASS

---

## 4. skills/ SKILL.md (23 files) - WARN

### Frontmatter: ISSUES

**Issue I - Non-standard `name` in problem-solving/SKILL.md**

| File | Value | Spec Requirement |
|------|-------|-----------------|
| problem-solving/SKILL.md:2 | `Problem-Solving Techniques` | Lowercase, hyphens only, max 64 chars |

Should be: `problem-solving`.

**Issue J - Unsupported `version` field (14 files)**

Copilot SKILL.md only supports: `name`, `description`.

Files: backend-development, brainstorm, context-engineering, cook, debug, devops, docs-seeker, fix, git, problem-solving, scout, sequential-thinking, ui-styling, web-testing

**Severity:** LOW - Copilot ignores unknown fields.

**Issue K - Unsupported `license` field (11 files)**

Files: backend-development, agent-browser, web-testing, planning, brainstorm, frontend-design, ui-styling, databases, research, devops, sequential-thinking

**Severity:** LOW - Same as version.

### Body Content: ISSUES

**Issue L - Claude Code agent patterns in skill bodies (4 skills)**

| Skill | Pattern | Lines |
|-------|---------|-------|
| fix/SKILL.md | "Spawn multiple `Explore` agents", "`Bash` agents" | 35,52,70,94 |
| scout/SKILL.md | "Explore agents" in description and body | 3,12,49,78 |
| code-review/SKILL.md | "Task tool" reference | (body) |
| planning/SKILL.md | "TaskCreate", "TaskUpdate" references | (body) |

**Severity:** MEDIUM - `Explore`, `Bash` agents, `Task tool`, `TaskCreate`/`TaskUpdate` are Claude Code concepts not available in Copilot.

---

## 5. collections/ (5 files) - PASS

Custom CoKit format. No format violations. No Claude references.

---

## Priority Fix List

### HIGH (breaks functionality in Copilot)
1. **ck-preview.prompt.md** - Rewrite execution section: `Bash tool` → `execute/runInTerminal`, remove `run_in_background`/`KillShell`, fix `{{path}}` → `${input}`
2. **8 spec-kit prompts** - Remove invalid frontmatter fields: `scripts`, `handoffs`, `agent_scripts`

### MEDIUM (non-functional instructions)
3. **problem-solving/SKILL.md** - Fix name: `Problem-Solving Techniques` → `problem-solving`
4. **brainstormer.agent.md:40** - `WebSearch` → `#tool:web/fetch` or "search the web"
5. **9 prompts** - "Activate skill" patterns → rephrase as "Use the [skill-name] approach" or reference skill docs directly
6. **4 skills** (fix, scout, code-review, planning) - Replace Claude Code agent patterns (`Explore` agents, `Task tool`, `TaskCreate`) with generic instructions

### LOW (cosmetic, still functional)
7. **14 SKILL.md** - Remove `version` field
8. **11 SKILL.md** - Remove `license` field
9. **4 agents** (scout, debugger, docs-manager, planner) - Replace Glob/Grep/Read with generic terms
10. **3 prompts** (ck-fix-logs, ck-scout, ck-plan-validate) - Same tool name cleanup

---

## Stats

- **HIGH issues:** 2 categories, 9 files
- **MEDIUM issues:** 4 categories, ~16 files
- **LOW issues:** 4 categories, ~30 file instances
- **Clean files:** instructions/ (5), collections/ (5), ~10 prompts, ~8 agents
