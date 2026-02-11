# Skills Folder Audit: Claude/Anthropic References

## Summary

Scanned all files in `C:\w\_me\cokit\skills\` recursively. Found **150+ matches** across multiple categories. Classified below by type.

---

## Category 1: Direct Claude Code References (Platform-Specific)

These reference Claude Code as a platform, CLI tool, or environment. **Would need adaptation for Copilot.**

| File | Line | Content | Type |
|------|------|---------|------|
| `agent_skills_spec.md` | 30 | "Description of what the skill does and when Claude should use it" | Claude-specific instruction |
| `agent_skills_spec.md` | 39 | "Currently only supported in Claude Code" | Explicit Claude Code only |
| `install.ps1` | 2 | "Installs all dependencies for Claude Code skills" | Claude Code branding |
| `install.ps1` | 1096 | `Write-Host "  .claude\skills\INSTALLATION.md"` | `.claude` directory path |
| `install.ps1` | 1102 | `"Claude Code Skills Installation Script for Windows"` | Claude Code branding |
| `install.ps1` | 1149 | `"Claude Code Skills Installation (Windows)"` | Claude Code branding |
| `install.sh` | 3 | "Installs all dependencies for Claude Code skills" | Claude Code branding |
| `install.sh` | 1202 | `"Claude Code Skills Installation"` | Claude Code branding |
| `INSTALLATION.md` | 3 | "This guide explains how to install dependencies for Claude Code skills." | Claude Code branding |
| `INSTALLATION.md` | 311 | `https://github.com/anthropics/claude-code/issues` | Anthropic GitHub link |
| `README.md` | 2 | "Skills are folders of instructions...that Claude loads dynamically" | Claude-specific description |
| `README.md` | 5-7 | Links to `support.claude.com` articles | Claude support links |
| `README.md` | 12 | "Claude's skills system" | Claude-specific |
| `README.md` | 14 | "SKILL.md file containing the instructions...that Claude uses" | Claude-specific |
| `README.md` | 22 | "capabilities may be available in Claude" | Claude-specific |
| `README.md` | 72 | "Build complex claude.ai HTML artifacts" | claude.ai reference |
| `README.md` | 81 | "# Try in Claude Code, Claude.ai, and the API" | Claude ecosystem |
| `README.md` | 83-84 | "## Claude Code" + "register...as a Claude Code Plugin" | Claude Code feature |
| `README.md` | 86 | `/plugin marketplace add anthropics/skills` | Claude Code CLI command |
| `README.md` | 89 | "ask Claude Code to do something" | Claude Code reference |
| `README.md` | 91-95 | "## Claude.ai" section | claude.ai platform |
| `README.md` | 97-99 | "## Claude API" + Anthropic's pre-built skills | Anthropic API |
| `README.md` | 113 | "instructions here that Claude will follow" | Claude-specific |
| `README.md` | 128 | "instructions...that Claude will follow" | Claude-specific |
| `README.md` | 132-134 | "teach Claude how to get better" + Notion Skills for Claude | Claude-specific |
| `planning\SKILL.md` | 63 | `CLAUDE_CODE_TASK_LIST_ID` env var | Claude Code specific env var |
| `context-engineering\references\runtime-awareness.md` | 3 | "optimize Claude Code sessions" | Claude Code specific |
| `context-engineering\references\runtime-awareness.md` | 43 | `"Claude Code-credentials"` in Keychain | Claude Code specific |
| `context-engineering\references\runtime-awareness.md` | 199 | `Run \`claude login\`` | Claude Code CLI command |
| `mcp-management\scripts\.env.example` | 3-4 | `.claude/.mcp.json` config path | `.claude` directory |
| `code-review\references\code-review-reception.md` | 30 | "explicit CLAUDE.md violation" | CLAUDE.md reference |

## Category 2: Anthropic API / Brand References

| File | Line | Content | Type |
|------|------|---------|------|
| `context-engineering\SKILL.md` | 101 | `https://api.anthropic.com/api/oauth/usage` | Anthropic API endpoint |
| `context-engineering\references\runtime-awareness.md` | 32 | `GET https://api.anthropic.com/api/oauth/usage` | Anthropic API endpoint |
| `context-engineering\references\runtime-awareness.md` | 37 | `anthropic-beta: oauth-2025-04-20` header | Anthropic API header |
| `README.md` | 8 | `https://anthropic.com/engineering/...` | Anthropic blog link |
| `README.md` | 77 | "Apply Anthropic's official brand colors" | Anthropic branding |
| `README.md` | 86 | `anthropics/skills` | Anthropic GitHub org |
| `sequential-thinking\README.md` | 179 | "Original MCP server by Anthropic" | Attribution |
| `sequential-thinking\package.json` | 16 | `"author": "Converted from Anthropic MCP Server"` | Attribution |
| `INSTALLATION.md` | 311 | `https://github.com/anthropics/claude-code/issues` | Anthropic GitHub |

## Category 3: Claude Model Name References (Incidental)

| File | Line | Content | Type |
|------|------|---------|------|
| `context-engineering\references\context-degradation.md` | 55 | "Claude Opus 4.5" | Model name |
| `context-engineering\references\context-degradation.md` | 56 | "Claude Sonnet 4.5" | Model name |
| `context-engineering\SKILL.md` | 91 | "Claude Usage Limits: 5h=45%, 7d=32%" | Usage tracking |
| `repomix\SKILL.md` | 8 | "LLMs like Claude, ChatGPT, and Gemini" | Incidental mention |
| `repomix\SKILL.md` | 156 | "Claude Sonnet 4.5: ~200K tokens" | Model capacity |
| `repomix\references\usage-patterns.md` | 147-149 | "### Claude Code" + "paste into Claude" | Usage pattern |
| `frontend-design\SKILL.md` | 75 | "Claude is capable of extraordinary creative work" | Motivational |

## Category 4: Task Tool / Subagent References (Claude Code Architecture)

These are **heavily Claude Code specific** - the "Task tool" and "subagent" pattern is a Claude Code feature.

**Files with subagent/Task tool references (count):**

| File | Match Count | Notes |
|------|-------------|-------|
| `cook\references\subagent-patterns.md` | 17 | Entire file is subagent patterns |
| `fix\SKILL.md` | 7 | Core workflow uses subagents |
| `fix\references\parallel-exploration.md` | 12 | Parallel Explore subagent patterns |
| `fix\references\workflow-deep.md` | 12 | Deep fix workflow with subagents |
| `fix\references\workflow-standard.md` | 11 | Standard fix workflow with subagents |
| `fix\references\workflow-quick.md` | 5 | Quick fix workflow with subagents |
| `fix\references\skill-activation-matrix.md` | 4 | Subagent activation rules |
| `code-review\SKILL.md` | 8 | Review via subagent |
| `code-review\references\requesting-code-review.md` | 10 | Subagent dispatch pattern |
| `scout\SKILL.md` | 8 | Scouting via Explore subagents |
| `scout\references\internal-scouting.md` | 8 | Explore subagent patterns |
| `scout\references\external-scouting.md` | 10 | Bash subagent patterns |
| `mcp-management\SKILL.md` | 8 | MCP via subagent |
| `mcp-management\README.md` | 6 | Subagent architecture |
| `git\SKILL.md` | 2 | git-manager subagent |
| `git\references\workflow-push.md` | 1 | git-manager subagent |
| `git\references\workflow-pr.md` | 1 | git-manager subagent |
| `git\references\workflow-merge.md` | 1 | git-manager subagent |
| `git\references\workflow-commit.md` | 1 | git-manager subagent |
| `context-engineering\SKILL.md` | 1 | Pass rules to subagents |
| `context-engineering\references\runtime-awareness.md` | 1 | Delegate to subagents |
| `planning\SKILL.md` | 1 | Subagent coordination |
| `planning\references\plan-organization.md` | 1 | Subagent plan context |
| `cook\SKILL.md` | 2 | Required subagents table |
| `cook\README.md` | 1 | subagent-patterns.md reference |
| `cook\references\workflow-steps.md` | 2 | Subagent in workflow |
| `frontend-design\SKILL.md` | 1 | ui-ux-designer subagent |
| `frontend-design\references\workflow-screenshot.md` | 1 | subagent |
| `frontend-design\references\workflow-quick.md` | 1 | subagent |
| `frontend-design\references\workflow-describe.md` | 1 | subagent |
| `sequential-thinking\README.md` | 1 | When Claude Should Use |

## Category 5: Variable/Path Names Containing "claude" (Code-Level)

| File | Line | Content | Type |
|------|------|---------|------|
| `common\api_key_helper.py` | 62 | `claude_env = project_dir / '.copilot' / '.env'` | Variable named "claude" but path is `.copilot` |
| `common\api_key_helper.py` | 63-66 | `if claude_env.exists()` / `Using API key from {claude_env}` | Variable usage |
| `common\api_key_helper.py` | 70-74 | `claude_skills_env` variable | Variable named "claude" but path is `.copilot` |
| `devops\scripts\docker_optimize.py` | 22-23 | `CLAUDE_ROOT = Path(...)` | Variable name |
| `databases\scripts\db_performance_check.py` | 16-17 | `CLAUDE_ROOT = Path(...)` | Variable name |
| `databases\scripts\db_migrate.py` | 17-18 | `CLAUDE_ROOT = Path(...)` | Variable name |
| `docs-seeker\scripts\utils\env-loader.js` | 50-53 | `claudeDir` variable + `.env` path | Variable name |
| `docs-seeker\package.json` | 18 | `"author": "ClaudeKit"` | Author attribution |

## Category 6: Gemini CLI Integration (Claude-Specific Context)

| File | Line | Content | Type |
|------|------|---------|------|
| `mcp-management\references\gemini-cli-integration.md` | 100 | "Search for Claude AI documentation" | Example prompt |
| `mcp-management\references\gemini-cli-integration.md` | 215 | "fallback to scripts/subagent" | Subagent fallback |

---

## Files That Are Entirely Claude Code Specific

These files/skills make no sense for Copilot without significant rewrite:

1. **`cook\references\subagent-patterns.md`** - Entire file is Claude Code Task tool patterns
2. **`scout\references\internal-scouting.md`** - Built around Explore subagent type
3. **`scout\references\external-scouting.md`** - Task tool spawning patterns
4. **`fix\references\parallel-exploration.md`** - Parallel Explore/Bash subagent patterns
5. **`context-engineering\references\runtime-awareness.md`** - Claude Code OAuth, Keychain, `claude login`
6. **`context-engineering\SKILL.md`** - Claude usage limits tracking via Anthropic API
7. **`planning\SKILL.md`** (line 63) - `CLAUDE_CODE_TASK_LIST_ID` env var
8. **`code-review\references\requesting-code-review.md`** - Dispatch pattern via Task tool
9. **`README.md`** - Multiple sections about Claude Code, claude.ai, Claude API
10. **`install.ps1`** / **`install.sh`** - Branded as "Claude Code Skills Installation"
11. **`INSTALLATION.md`** - Links to anthropics/claude-code GitHub
12. **`agent_skills_spec.md`** - "Currently only supported in Claude Code"

## Unresolved Questions

- Should `api_key_helper.py` variable names (`claude_env`, `claude_skills_env`) be renamed even though paths already point to `.copilot`? Seems like partial migration was done.
- The `CLAUDE_ROOT` variable in `devops/scripts/docker_optimize.py`, `databases/scripts/db_performance_check.py`, `databases/scripts/db_migrate.py` - should these be renamed?
- `docs-seeker/package.json` author "ClaudeKit" - rename to "Cokit"?
- Git commit standards (`git\references\commit-standards.md`) explicitly ban "Generated with Claude" / "Co-Authored-By: Claude" - keep as-is or generalize?
