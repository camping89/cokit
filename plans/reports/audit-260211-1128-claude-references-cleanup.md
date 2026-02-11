# Audit Report: Claude Code References in Copilot Toolkit

**Date:** 2026-02-11 | **Status:** FINDINGS DETECTED | **Total matches:** ~150+

---

## Summary

Scanned 5 folders: `collections/`, `agents/`, `instructions/`, `prompts/`, `skills/`.
Found Claude Code-specific references that need cleanup for Copilot compatibility.

---

## Findings by Folder

### 1. `collections/` - CLEAN (0 issues)

All 5 YAML files are tool-agnostic. No Claude references found.

### 2. `agents/` - 1 file with issues

| File | Line | Issue | Severity |
|------|------|-------|----------|
| `git-manager.agent.md` | 300 | `Haiku 4.5: $1/$5 per 1M tokens` (Claude model pricing) | HIGH |
| `git-manager.agent.md` | 302 | `Haiku focuses on orchestration, Gemini does heavy lifting` | HIGH |
| `git-manager.agent.md` | 317 | `## Critical Instructions for Haiku` section header | HIGH |
| `brainstormer.agent.md` | 40 | `WebSearch` tool reference (CC-specific tool name) | LOW |

> Other 10 agent files are clean.

### 3. `instructions/` - CLEAN (0 issues)

All 5 instruction files are Copilot-native. Already use Copilot-specific terminology.

### 4. `prompts/` - 10 files with issues (~30 matches)

| File | Line(s) | Issue | Severity |
|------|---------|-------|----------|
| `ck-bootstrap.prompt.md` | 7 | References `CLAUDE.md` file directly | HIGH |
| `ck-bootstrap.prompt.md` | 7 | `**Ultrathink**` - CC thinking mode trigger | HIGH |
| `ck-bootstrap.prompt.md` | 20-129 | 13 "subagent" occurrences | HIGH |
| `ck-preview.prompt.md` | 28,42,65,82 | "Claude Code"/"CC" background task, `KillShell`, `/tasks` | HIGH |
| `ck-preview.prompt.md` | 64,69 | `Bash tool` CC-specific tool name | HIGH |
| `ck-review.prompt.md` | 7-45 | 4 "subagent" references | MEDIUM |
| `ck-plan-hard.prompt.md` | 45-52 | 2 "subagent" references | MEDIUM |
| `ck-plan-fast.prompt.md` | 42-45 | 1 "subagent" reference | MEDIUM |
| `ck-journal.prompt.md` | 6 | 1 "subagent" reference | LOW |
| `ck-test.prompt.md` | 7 | 1 "subagent" reference | LOW |
| `ck-help.prompt.md` | 9 | "ClaudeKit" product name | LOW |
| `ck-plan-validate.prompt.md` | 201 | "Claude" incidental mention | LOW |
| `ck-spec-constitution.prompt.md` | 50 | "CLAUDE only" meta-reference | LOW |

### 5. `skills/` - MOST ISSUES (30+ files, ~120 matches)

#### A. Direct Claude Code branding (MUST FIX):

| File | Issue |
|------|-------|
| `README.md` | Lines 2-134: Heavy Claude branding (Claude.ai, Claude Code, Claude API, `anthropics/skills`) |
| `INSTALLATION.md` | Line 3: "Claude Code skills", Line 311: `anthropics/claude-code/issues` |
| `install.sh` | Lines 3, 1202: "Claude Code Skills Installation" |
| `install.ps1` | Lines 2, 1096, 1102, 1149: "Claude Code Skills" |
| `agent_skills_spec.md` | Lines 30, 39: "Claude" specific |
| `planning/SKILL.md` | Line 63: `CLAUDE_CODE_TASK_LIST_ID` env var |

#### B. Anthropic API/model references:

| File | Issue |
|------|-------|
| `context-engineering/SKILL.md` | Lines 91-101: Claude usage limits, Anthropic OAuth API |
| `context-engineering/references/runtime-awareness.md` | Lines 3-199: `api.anthropic.com`, `claude login`, Keychain "Claude Code-credentials" |
| `context-engineering/references/context-degradation.md` | Lines 55-56: "Claude Opus 4.5", "Claude Sonnet 4.5" |
| `repomix/SKILL.md` | Lines 8, 156: Claude model references |
| `repomix/references/usage-patterns.md` | Lines 147-149: "Claude Code" section |
| `sequential-thinking/README.md` | Lines 7, 94, 179: "Claude" + "Anthropic" |
| `sequential-thinking/package.json` | Line 16: "Converted from Anthropic MCP Server" |
| `frontend-design/SKILL.md` | Line 75: "Claude is capable" |
| `git/references/commit-standards.md` | Lines 29-30: "Generated with Claude" |
| `mcp-management/scripts/.env.example` | Lines 3-4: `.claude/.mcp.json` |
| `docs-seeker/package.json` | Line 18: author "ClaudeKit" |

#### C. "subagent" / Task tool patterns (~90 matches):

| File | Matches | Notes |
|------|---------|-------|
| `cook/references/subagent-patterns.md` | 17 | **Entire file** is Task tool patterns |
| `fix/references/parallel-exploration.md` | 12 | Explore/Bash subagent dispatch |
| `scout/references/internal-scouting.md` | 8 | Explore subagent spawning |
| `scout/references/external-scouting.md` | 8 | Task tool subagent dispatch |
| `code-review/SKILL.md` | 8 | code-reviewer subagent patterns |
| `code-review/references/requesting-code-review.md` | 8 | subagent dispatch |
| `cook/SKILL.md` | 5 | "Required Subagents" section |
| `fix/SKILL.md` | 5 | Explore subagents, activation matrix |
| `fix/references/workflow-*.md` | 20+ | All 4 workflow files use subagents |
| `scout/SKILL.md` | 6 | Explore subagent architecture |
| `git/SKILL.md` + `references/*.md` | 6 | git-manager subagent |
| `frontend-design/references/*.md` | 3 | ui-ux-designer subagent |
| `mcp-management/SKILL.md` + `README.md` | 10 | mcp-manager subagent |
| `planning/SKILL.md` + `references/*.md` | 3 | subagent coordination |
| `context-engineering/SKILL.md` | 1 | Pass rules to subagents |
| `code-review/references/code-review-reception.md` | 1 | "CLAUDE.md violation" |

#### D. Variable names in code (LOW priority):

| File | Variable |
|------|----------|
| `common/api_key_helper.py:62-74` | `claude_env`, `claude_skills_env` |
| `devops/scripts/docker_optimize.py:22-23` | `CLAUDE_ROOT` |
| `databases/scripts/db_migrate.py:17-18` | `CLAUDE_ROOT` |
| `databases/scripts/db_performance_check.py:16-17` | `CLAUDE_ROOT` |
| `docs-seeker/scripts/utils/env-loader.js:50-53` | `claudeDir` |

---

## Summary Statistics

| Folder | Files w/ Issues | Total Matches | Severity |
|--------|----------------|---------------|----------|
| `collections/` | 0 | 0 | CLEAN |
| `agents/` | 2 | 4 | MEDIUM |
| `instructions/` | 0 | 0 | CLEAN |
| `prompts/` | 10 | ~30 | HIGH |
| `skills/` | 30+ | ~120 | HIGH |
| **Total** | **~42 files** | **~150+** | |

---

## Issue Categories (Priority Order)

### 1. Direct "Claude Code" branding (MUST FIX) - ~20 matches
Files: README.md, INSTALLATION.md, install.sh, install.ps1, ck-bootstrap, ck-preview

### 2. "subagent" / Task tool terminology (~90 matches)
30+ files use Claude Code's Task tool subagent architecture.
This is the LARGEST category and affects the core workflow patterns.

### 3. Anthropic-specific URLs/APIs (~15 matches)
- `api.anthropic.com`, `anthropics/claude-code/issues`
- `support.claude.com`, `claude.ai`, `anthropic.com`

### 4. Claude model names (~10 matches)
- "Claude Opus 4.5", "Claude Sonnet 4.5", "Haiku 4.5"

### 5. Variable names in code (~8 matches)
- `CLAUDE_ROOT`, `claude_env`, `claudeDir`, `claude_skills_env`

---

## 12 Files Requiring Significant Rewrite

1. `skills/README.md` - Entire file is Claude-branded
2. `skills/INSTALLATION.md` - Claude Code installation guide
3. `skills/install.sh` - Claude Code branded installer
4. `skills/install.ps1` - Claude Code branded installer
5. `skills/cook/references/subagent-patterns.md` - Entire file is Task tool patterns
6. `skills/scout/references/internal-scouting.md` - Explore subagent architecture
7. `skills/scout/references/external-scouting.md` - Task tool dispatch patterns
8. `skills/fix/references/parallel-exploration.md` - Subagent parallel patterns
9. `skills/context-engineering/references/runtime-awareness.md` - Anthropic OAuth/API
10. `skills/context-engineering/SKILL.md` - Claude usage limits
11. `prompts/ck-preview.prompt.md` - CC background task infrastructure
12. `prompts/ck-bootstrap.prompt.md` - CLAUDE.md + Ultrathink + subagents
