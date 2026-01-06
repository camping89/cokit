# CoKit: Comprehensive Claude Code → GitHub Copilot Mapping Guide

**Version:** 1.0.0
**Date:** 2026-01-06
**Purpose:** Complete reference for porting Claude Code patterns to GitHub Copilot

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Terminology Glossary](#2-terminology-glossary)
3. [Detailed Feature Mapping](#3-detailed-feature-mapping)
4. [Installation Levels](#4-installation-levels)
5. [Workflow Patterns](#5-workflow-patterns)
6. [File Format Specifications](#6-file-format-specifications)
7. [Migration Guide](#7-migration-guide)

---

## 1. Executive Summary

### What is Claude Code?

Claude Code is Anthropic's CLI tool for AI-assisted software development. It features:
- **Hooks system** for runtime event handling
- **Multi-agent architecture** with specialized subagents
- **Skills** as modular capability packages
- **Commands** as user-invokable shortcuts
- **Session state** tracking (todos, active plans)

### What is GitHub Copilot (2025)?

GitHub Copilot evolved from autocomplete to an AI agent:
- **Agent Mode** (Feb 2025): Autonomous coding tasks
- **Custom Instructions** (Aug 2025): Repository-level guidance
- **AGENTS.md** (Aug 2025): Agent-specific instructions
- **Agent Skills** (Dec 2025): Modular capability packages
- **Prompt Files**: Reusable task templates

### Key Architectural Difference

| Aspect | Claude Code | GitHub Copilot |
|--------|-------------|----------------|
| Execution | CLI + Runtime hooks | IDE-embedded, static config |
| Agent model | Multi-agent delegation | Single agent context |
| State | Session state tracking | Stateless |
| Customization | Dynamic (hooks inject context) | Static (files read at start) |

---

## 2. Terminology Glossary

### Claude Code Terms

#### CLAUDE.md
**What:** Root configuration file that Claude Code reads for project/user instructions.
**Location:** `~/.claude/CLAUDE.md` (user) or `./CLAUDE.md` (project)
**Purpose:** Define role, responsibilities, workflow references, documentation standards.
**Format:** Markdown with natural language instructions.

#### Skills
**What:** Modular capability packages containing instructions + supporting resources.
**Location:** `~/.claude/skills/{skill-name}/`
**Structure:**
```
skills/debugging/
├── SKILL.md          # Main instructions with YAML frontmatter
├── references/       # Supporting documentation
└── scripts/          # Helper scripts (bash, python, etc.)
```
**Activation:** Claude automatically loads relevant skills based on task context.

#### Agents (Subagents)
**What:** Specialized AI personas for specific tasks (planner, tester, reviewer).
**Location:** `~/.claude/agents/{agent-name}.md`
**Purpose:** Define behavior, tools, and constraints for delegated tasks.
**Invocation:** Main agent delegates via `Task` tool: "Use planner agent to..."

#### Commands
**What:** User-invokable shortcuts that expand into full prompts.
**Location:** `~/.claude/commands/{namespace}/{command}.md`
**Invocation:** User types `/fix` → expands to full fix workflow prompt.
**Features:** Support `$ARGUMENTS` variable, can chain to sub-commands.

#### Workflows
**What:** Process documentation defining how agents should work together.
**Location:** `~/.claude/workflows/{workflow-name}.md`
**Purpose:** Define step-by-step processes (implementation, testing, review).

#### Hooks
**What:** Shell commands executed at specific runtime events.
**Location:** `~/.claude/settings.json` → `hooks` section
**Events:**
- `SessionStart` - When session begins
- `UserPromptSubmit` - Before processing each user message
- `PreToolUse` - Before executing a tool
- `PreCompact` - Before context compaction
- `SessionEnd` - When session ends

**Example:**
```json
{
  "hooks": {
    "UserPromptSubmit": [{
      "hooks": [{
        "type": "command",
        "command": "node ~/.claude/hooks/dev-rules-reminder.cjs"
      }]
    }]
  }
}
```

#### StatusLine
**What:** Real-time status display in terminal showing session state.
**Purpose:** Display active plan, todos, token usage, etc.

---

### GitHub Copilot Terms

#### copilot-instructions.md
**What:** Repository-wide instructions that apply to all Copilot interactions.
**Location:** `.github/copilot-instructions.md`
**Purpose:** Define coding standards, project context, preferences.
**Format:** Markdown (natural language instructions).
**Source:** [GitHub Docs - Custom Instructions](https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)

#### Instructions Files (*.instructions.md)
**What:** Path-specific instructions applied based on file patterns.
**Location:** `.github/instructions/{name}.instructions.md`
**Purpose:** Different rules for different file types (frontend vs backend).
**Format:** Markdown with YAML frontmatter containing `applyTo` glob.

**Example:**
```yaml
---
applyTo: "**/*.tsx,**/*.jsx"
---
# React Component Guidelines
- Use functional components with hooks
- Prefer composition over inheritance
```

**Source:** [VS Code Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)

#### AGENTS.md
**What:** Agent-specific instructions for Copilot coding agent.
**Location:** `./AGENTS.md` (root) or nested in subdirectories
**Purpose:** Guide agent behavior for autonomous coding tasks.
**Precedence:** Nearest AGENTS.md in directory tree takes precedence.
**Source:** [GitHub Changelog - AGENTS.md](https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions/)

#### Agent Skills
**What:** Modular capability packages (equivalent to Claude Code skills).
**Location:**
- `.github/skills/{skill-name}/` (repository)
- `~/.copilot/skills/{skill-name}/` (user-level)

**Structure:**
```
skills/debugging/
├── SKILL.md          # Instructions with YAML frontmatter
├── references/       # Supporting docs
└── scripts/          # Helper scripts
```

**Source:** [GitHub Copilot Agent Skills](https://github.blog/changelog/2025-12-18-github-copilot-now-supports-agent-skills/)

#### Prompt Files (*.prompt.md)
**What:** Reusable task-specific prompts (equivalent to Claude Code commands).
**Location:** `.github/prompts/{name}.prompt.md`
**Purpose:** Standardized prompts for common tasks.
**Format:** Markdown with YAML frontmatter using `mode: agent` format.

**Available Prompts (Phase 4):**
- `fix.prompt.md` - Debug and fix code issues
- `plan.prompt.md` - Create implementation plans
- `code.prompt.md` - Implement from existing plans
- `test.prompt.md` - Run tests and analyze results
- `review.prompt.md` - Review code for quality issues
- `docs.prompt.md` - Update project documentation

**Example:**
```yaml
---
mode: agent
description: Fix code issues intelligently
---
Analyze the issue and provide a fix following project standards.
```

**Source:** [VS Code Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files)

#### Agent Mode
**What:** Copilot operating autonomously on multi-step coding tasks.
**Capabilities:** Read files, propose edits, run commands, monitor tests.
**Trigger:** Enable in VS Code settings or use specific prompts.
**Source:** [Introducing Copilot Agent Mode](https://code.visualstudio.com/blogs/2025/02/24/introducing-copilot-agent-mode)

---

## 3. Detailed Feature Mapping

### 3.1 CLAUDE.md → copilot-instructions.md

| Aspect | Detail |
|--------|--------|
| **Claude Code** | `~/.claude/CLAUDE.md` or `./CLAUDE.md` |
| **Copilot** | `.github/copilot-instructions.md` |
| **Why this mapping** | Both serve as root configuration defining project-wide instructions. Both are Markdown files read at session start. |
| **Evidence** | GitHub Docs: "Create a file named `.github/copilot-instructions.md`... Add natural language instructions to the file, in Markdown format." |
| **Source** | [GitHub Docs](https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot) |
| **Best Practices** | Keep concise (<2000 tokens). Focus on project-specific guidance. Reference other files rather than duplicating content. |
| **Key Differences** | Claude Code supports `$HOME` variables and file references. Copilot is static - no variable expansion. |

**Migration Example:**

```markdown
# Claude Code (CLAUDE.md)
Your role is to analyze requirements...
## Workflows
- Primary workflow: `$HOME/.claude/workflows/primary-workflow.md`
- Development rules: `$HOME/.claude/workflows/development-rules.md`

# Copilot (copilot-instructions.md)
Your role is to analyze requirements...
## Workflows
Follow these development rules:
- YAGNI, KISS, DRY principles
- Read ./docs/code-standards.md before implementation
- Keep files under 200 lines
```

---

### 3.2 Skills → Agent Skills

| Aspect | Detail |
|--------|--------|
| **Claude Code** | `~/.claude/skills/{name}/SKILL.md` |
| **Copilot** | `.github/skills/{name}/SKILL.md` or `~/.copilot/skills/{name}/SKILL.md` |
| **Why this mapping** | Identical concept - modular capability packages. Same file structure (SKILL.md + resources). Copilot explicitly adopted this pattern. |
| **Evidence** | GitHub Changelog: "Agent Skills are folders containing instructions, scripts, and resources that Copilot automatically loads when relevant." |
| **Source** | [GitHub Agent Skills](https://github.blog/changelog/2025-12-18-github-copilot-now-supports-agent-skills/) |
| **Best Practices** | One skill per capability. Include concrete examples. Reference scripts with relative paths. Keep SKILL.md focused, details in references/. |
| **Key Differences** | Claude Code: `version`, `languages` fields in frontmatter. Copilot: Only `name`, `description` required. Claude Code skills can invoke tools; Copilot skills are advisory. |

**SKILL.md Format Comparison:**

```yaml
# Claude Code SKILL.md
---
name: debugging
description: Systematic debugging framework...
version: 3.0.0
languages: all
---

# Copilot SKILL.md
---
name: debugging
description: Systematic debugging framework...
---
```

---

### 3.3 Agents → AGENTS.md

| Aspect | Detail |
|--------|--------|
| **Claude Code** | `~/.claude/agents/{name}.md` (multiple files, each a specialized agent) |
| **Copilot** | `./AGENTS.md` (single file or nested files) |
| **Why this mapping** | Both define agent behavior and constraints. AGENTS.md is Copilot's designated file for agent instructions. |
| **Evidence** | GitHub Changelog: "You can create a single AGENTS.md file in the root of your repository, or create nested AGENTS.md files which apply to specific parts of your project." |
| **Source** | [AGENTS.md Support](https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions/) |
| **Best Practices** | Merge agent behaviors into sections. Use headers for different task types. Keep actionable, not philosophical. |
| **Key Differences** | **Critical:** Claude Code delegates to separate agents with isolated context. Copilot has ONE agent that follows guidelines. No delegation possible. |

**Migration Strategy:**

```markdown
# Claude Code (separate files)
# agents/planner.md
---
name: planner
description: Create implementation plans...
model: opus
---
You are an expert planner...

# agents/tester.md
---
name: tester
description: Run and analyze tests...
---
You are a testing expert...

# Copilot (merged AGENTS.md)
# AGENTS.md

## When Planning
- Research before proposing solutions
- Create plans in ./plans directory
- Use decomposition and working backwards

## When Testing
- Write comprehensive unit tests
- Don't use mocks to fake passing tests
- All tests must pass before completion

## When Reviewing
- Check security vulnerabilities
- Verify error handling
- Ensure test coverage
```

---

### 3.4 Commands → Prompt Files

| Aspect | Detail |
|--------|--------|
| **Claude Code** | `~/.claude/commands/{namespace}/{name}.md` |
| **Copilot** | `.github/prompts/{name}.prompt.md` |
| **Why this mapping** | Both are user-invokable shortcuts expanding to full prompts. Same purpose, similar structure. |
| **Evidence** | VS Code Docs: "Prompt files are Markdown files and use the `.prompt.md` extension... stored in the `.github/prompts` folder." |
| **Source** | [VS Code Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files) |
| **Best Practices** | Use `mode: agent` for multi-step tasks. Keep focused on one task type. Include examples of expected input/output. |
| **Key Differences** | Claude Code: `$ARGUMENTS` variable, sub-command routing (`/fix:types`). Copilot: No variables, flat structure. User provides context in chat. |

**Migration Example:**

```markdown
# Claude Code (commands/ck/fix.md)
---
description: Analyze and fix issues [INTELLIGENT ROUTING]
argument-hint: [issues]
---
Analyze issues: <issues>$ARGUMENTS</issues>

## Decision Tree
**Type Errors** → `/fix:types`
**UI Issues** → `/fix:ui`

# Copilot (prompts/fix.prompt.md)
---
mode: agent
description: Analyze and fix code issues
---
Analyze the described issue and fix it.

## Process
1. Identify issue type (type errors, UI, tests, CI/CD)
2. Search relevant files
3. Analyze root cause
4. Apply minimal fix
5. Verify fix works
```

---

### 3.5 Workflows → Instructions Files

| Aspect | Detail |
|--------|--------|
| **Claude Code** | `~/.claude/workflows/{name}.md` |
| **Copilot** | `.github/instructions/{name}.instructions.md` |
| **Why this mapping** | Both define process rules. Instructions files can be path-specific, making them suitable for workflow rules that apply to certain contexts. |
| **Evidence** | VS Code Docs: "Create multiple .instructions.md files that apply to specific file types or tasks." |
| **Source** | [VS Code Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions) |
| **Best Practices** | Use `applyTo` to scope rules. Split by concern (frontend, backend, testing). Keep actionable. |
| **Key Differences** | Claude Code workflows are referenced dynamically. Copilot instructions are static, applied based on file pattern match. |

**Migration Example:**

```yaml
# Claude Code (workflows/development-rules.md)
# Development Rules
- File Naming: Use kebab-case
- File Size: Keep under 200 lines
- Use `code-reviewer` agent after implementation

# Copilot (instructions/development.instructions.md)
---
applyTo: "**/*"
---
# Development Rules
- File Naming: Use kebab-case
- File Size: Keep under 200 lines
- Review code for security before committing
```

---

### 3.6 Hooks → No Equivalent

| Aspect | Detail |
|--------|--------|
| **Claude Code** | `settings.json` → `hooks` section |
| **Copilot** | **No equivalent** |
| **Why no mapping** | Copilot has no runtime hook system. It reads static files, not event-driven execution. |
| **Evidence** | Extensive search of Copilot docs reveals no hook/event system. |
| **Source** | N/A |
| **Best Practices** | Include all context in static files. Accept manual workflow. Consider GitHub Actions for CI-level automation. |
| **Key Differences** | Claude Code can inject context dynamically per-prompt. Copilot cannot. This is the biggest architectural gap. |

**Workaround Strategy:**

| Hook Event | Copilot Alternative |
|------------|---------------------|
| `SessionStart` | Include all context in copilot-instructions.md |
| `UserPromptSubmit` | Use prompt files, manually invoke |
| `PreToolUse` | Include warnings in instructions |
| `PreCompact` | N/A - Copilot handles context differently |
| `SessionEnd` | GitHub Actions for cleanup |

---

### 3.7 Multi-Agent Delegation → No Equivalent

| Aspect | Detail |
|--------|--------|
| **Claude Code** | Main agent delegates to subagents via `Task` tool |
| **Copilot** | **No equivalent** - single agent only |
| **Why no mapping** | Copilot architecture is single-agent. No subagent spawning capability. |
| **Evidence** | Copilot Agent Mode docs describe one agent doing multi-step tasks, not delegating to other agents. |
| **Source** | [Agent Mode](https://code.visualstudio.com/blogs/2025/02/24/introducing-copilot-agent-mode) |
| **Best Practices** | Merge agent behaviors into AGENTS.md sections. User manually switches "modes" via different prompts. |
| **Key Differences** | Claude Code: Orchestration pattern (main → subagent → report back). Copilot: Single agent follows all guidelines. |

**Workaround: Prompt Chaining**

```
# Instead of automatic delegation:
User → "Plan this feature" → Uses /plan prompt
User → "Now implement it" → Uses /code prompt
User → "Now test it" → Uses /test prompt
User → "Now review it" → Uses /review prompt
```

---

### 3.8 Session State → No Equivalent

| Aspect | Detail |
|--------|--------|
| **Claude Code** | Tracks todos, active plans, session variables |
| **Copilot** | **No equivalent** - stateless |
| **Why no mapping** | Copilot doesn't persist state between interactions. Each request is independent. |
| **Evidence** | No documentation of session state management in Copilot. |
| **Best Practices** | Manual tracking in files (plan.md, TODO.md). Reference state explicitly in prompts. |
| **Key Differences** | Claude Code maintains context across interactions. Copilot starts fresh (though has conversation history in chat). |

---

## 4. Installation Levels

CoKit supports two installation levels. Users can choose one or both.

### 4.1 Repository Level (Project-Specific)

**What:** Install CoKit templates into a specific project's `.github/` folder.

**When to use:**
- Project has specific requirements
- Team collaboration (everyone gets same config)
- Version control of AI instructions

**Structure (Phase 4):**
```
your-project/
├── .github/
│   ├── copilot-instructions.md    # Project instructions
│   ├── AGENTS.md                   # Agent guidelines
│   ├── instructions/
│   │   ├── frontend.instructions.md
│   │   ├── backend.instructions.md
│   │   └── testing.instructions.md
│   ├── prompts/
│   │   ├── fix.prompt.md           # Debug and fix issues
│   │   ├── plan.prompt.md          # Create implementation plans
│   │   ├── code.prompt.md          # Implement from plans
│   │   ├── test.prompt.md          # Run and analyze tests
│   │   ├── review.prompt.md        # Code review
│   │   └── docs.prompt.md          # Update documentation
│   └── skills/
│       ├── debugging/
│       ├── code-review/
│       ├── planning/
│       ├── docs-seeker/
│       └── sequential-thinking/
└── docs/
    ├── code-standards.md
    └── system-architecture.md
```

**Installation:**
```bash
# From project root
curl -fsSL https://raw.githubusercontent.com/camping89/cokit/main/install.sh | bash -s -- --level=repo
```

---

### 4.2 User Level (Cross-Project)

**What:** Install CoKit skills to `~/.copilot/skills/` for use across all projects.

**When to use:**
- Personal productivity skills (debugging, planning)
- Skills not project-specific
- Share skills across multiple projects

**Phase 3 Status:** All 5 core skills now available following Copilot Agent Skills format.

**Structure:**
```
~/.copilot/
└── skills/
    ├── debugging/
    │   ├── SKILL.md
    │   ├── references/
    │   │   ├── systematic-debugging.md
    │   │   ├── root-cause-tracing.md
    │   │   └── verification.md
    │   └── scripts/
    ├── code-review/
    │   ├── SKILL.md
    │   └── references/
    │       ├── code-review-reception.md
    │       └── verification-before-completion.md
    ├── planning/
    │   ├── SKILL.md
    │   └── references/
    │       ├── research-phase.md
    │       ├── solution-design.md
    │       └── plan-organization.md
    ├── docs-seeker/
    │   ├── SKILL.md
    │   └── references/
    │       ├── search-patterns.md
    │       └── source-evaluation.md
    └── sequential-thinking/
        ├── SKILL.md
        └── references/
            ├── core-patterns.md
            └── advanced-techniques.md
```

**Installation:**
```bash
# Install to user directory
curl -fsSL https://raw.githubusercontent.com/camping89/cokit/main/install.sh | bash -s -- --level=user
```

---

### 4.3 Both Levels

**When to use:**
- User skills for personal productivity
- Repo templates for project-specific guidance

**Installation:**
```bash
# Install both
curl -fsSL https://raw.githubusercontent.com/camping89/cokit/main/install.sh | bash -s -- --level=all
```

---

### 4.4 Installation Comparison

| Aspect | Repo Level | User Level |
|--------|-----------|------------|
| Location | `.github/` | `~/.copilot/` |
| Scope | Single project | All projects |
| Version controlled | Yes | No (personal) |
| Team sharing | Yes | No |
| Portability | With project | With user |
| Contains | Instructions, 6 prompts (Phase 4), skills | 5 core skills (Phase 3) |
| Prompts | fix, plan, code, test, review, docs (Phase 4) | Not included (repo-level only) |
| Skills available | debugging, code-review, planning, docs-seeker, sequential-thinking | Same as repo level |
| References | Each skill includes 2-3 reference docs | Each skill includes 2-3 reference docs |

---

## 5. Workflow Patterns

Since Copilot lacks hooks, workflows are more manual. This section defines patterns for daily development.

### 5.1 Why No Hooks Matters

**Claude Code with hooks:**
```
User types message
  → UserPromptSubmit hook injects dev-rules reminder
  → Agent processes with injected context
  → PreToolUse hook validates tool calls
  → Agent completes task with guardrails
```

**Copilot without hooks:**
```
User types message
  → Copilot reads static instruction files
  → Agent processes (no dynamic injection)
  → Agent completes task
```

**Impact:** You must include ALL context in static files or prompts. No dynamic reminders.

---

### 5.2 Daily Development Workflow

#### Morning Setup

```
1. Open project in VS Code
2. Review plan.md for today's tasks (if exists)
3. Optionally run /plan prompt to create daily plan

Example prompt: "Review the codebase and create a plan for implementing [feature]"
```

#### Feature Development

```
1. Start with /plan prompt
   "I need to implement [feature]. Create an implementation plan."

2. Work on implementation
   - Copilot assists with code completion
   - Reference docs/code-standards.md periodically

3. When stuck, use /fix prompt
   "I'm getting this error: [error]. Help me debug."

4. Before committing, use /review prompt
   "Review the changes in [files] for issues."
```

#### Debugging Flow

```
1. Use /debug prompt or invoke debugging skill
   "I have a bug where [description]. Help me debug systematically."

2. Copilot will (guided by debugging skill):
   - Ask for error messages
   - Search relevant files
   - Trace root cause
   - Propose fix

3. Verify fix manually
   - Run tests
   - Check behavior
```

#### Code Review Flow

```
1. Before PR, use /review prompt
   "Review all changes in this branch for security, performance, and best practices."

2. Address feedback

3. Run tests

4. Create PR
```

---

### 5.3 Prompt Chaining (Simulating Multi-Agent)

Claude Code automatically delegates. With Copilot, chain prompts manually:

```
# Planning Phase
You: "/plan Implement user authentication"
Copilot: Returns implementation plan

# Implementation Phase
You: "/code Implement step 1 from the plan: [paste step]"
Copilot: Implements code

# Testing Phase
You: "/test Write tests for the authentication module"
Copilot: Writes tests

# Review Phase
You: "/review Review the authentication implementation"
Copilot: Reviews and suggests improvements
```

---

### 5.4 Context Management

Without hooks, manage context manually:

**Start of session:**
```
"I'm working on [project]. Key files are:
- docs/code-standards.md (coding rules)
- docs/system-architecture.md (architecture)
- Current task: [description]"
```

**When context gets stale:**
```
"Let me re-establish context:
- Project: [name]
- Current task: [description]
- Files changed: [list]
- Current issue: [problem]"
```

---

### 5.5 Workflow Comparison

| Task | Claude Code | Copilot + CoKit |
|------|-------------|-----------------|
| Start session | Hooks auto-inject context | User provides context or uses /plan |
| Plan feature | `/plan` → Delegates to planner agent | `/plan` prompt → Manual follow-up |
| Implement | Agent follows workflow, delegates testing | Implement, manually run /test |
| Debug | `/fix` → Auto-routes to specialized handler | `/fix` or `/debug` prompt |
| Review | Automatic after implementation | Manual `/review` prompt |
| Commit | `/commit` → git-manager agent | Manual git operations |

---

### 5.6 Available Prompt Files (Phase 4)

6 prompt files for common workflows, all using `mode: agent` format:

| Prompt | Purpose | When to Use | File |
|--------|---------|-------------|------|
| `/plan` | Create implementation plan | Starting new feature | plan.prompt.md |
| `/code` | Implement from plan | During development | code.prompt.md |
| `/fix` | Debug and fix issues | When encountering bugs | fix.prompt.md |
| `/review` | Code review | Before committing | review.prompt.md |
| `/test` | Write/run tests | After implementation | test.prompt.md |
| `/docs` | Update documentation | After feature complete | docs.prompt.md |

---

## 6. File Format Specifications

### 6.1 copilot-instructions.md

```markdown
# Project Instructions

Brief project description and context.

## Coding Standards
- List key standards
- Reference ./docs/code-standards.md for details

## Architecture
- High-level architecture notes
- Reference ./docs/system-architecture.md

## Preferences
- Preferred patterns
- Things to avoid
```

**Max recommended size:** ~2000 tokens

---

### 6.2 *.instructions.md

```yaml
---
applyTo: "glob-pattern"           # Required: e.g., "**/*.ts"
excludeAgent: "coding-agent"      # Optional: exclude from specific agent
---

# Instructions Title

Instructions content in Markdown.
```

---

### 6.3 AGENTS.md

```markdown
# Agent Guidelines

## General Behavior
- Overall guidelines

## When [Task Type]
- Specific guidelines for this task type

## When [Another Task Type]
- Guidelines for another task type
```

---

### 6.4 *.prompt.md

```yaml
---
mode: agent                       # Optional: "agent" for multi-step tasks
description: Brief description    # Optional: shown in prompt picker
---

Prompt content in Markdown.

## Context
What context to gather.

## Process
1. Step one
2. Step two

## Output
Expected output format.
```

---

### 6.5 SKILL.md

```yaml
---
name: skill-name                  # Required: lowercase, hyphens
description: What and when        # Required: max 1024 chars
---

# Skill Name

## When to Use
- Trigger conditions

## Instructions
Detailed instructions.

## References
- [Doc name](./references/doc.md)

## Scripts
- [Script name](./scripts/script.sh)
```

---

## 7. Migration Guide

### Step 1: Inventory Current Setup

List your Claude Code customizations:
```bash
ls ~/.claude/skills/
ls ~/.claude/commands/
ls ~/.claude/agents/
ls ~/.claude/workflows/
```

### Step 2: Prioritize

Decide what to migrate:
1. **Must have:** Skills you use daily
2. **Nice to have:** Occasionally used commands
3. **Skip:** Claude-specific features (hooks, multi-agent)

### Step 3: Convert Files

For each category:

| Source | Target | Conversion |
|--------|--------|------------|
| CLAUDE.md | copilot-instructions.md | Remove $HOME refs, inline workflow content |
| skills/ | .github/skills/ or ~/.copilot/skills/ | Copy, remove unsupported frontmatter fields |
| agents/ | AGENTS.md | Merge into sections |
| commands/ | .github/prompts/ | Remove $ARGUMENTS, flatten structure |
| workflows/ | .github/instructions/ | Add applyTo frontmatter |

### Step 4: Test

1. Open project in VS Code
2. Enable Copilot
3. Test each prompt file
4. Verify skills are discovered
5. Adjust based on behavior

### Step 5: Iterate

Copilot behavior differs from Claude Code. Expect to:
- Reword instructions for clarity
- Add more explicit guidance
- Simplify complex workflows

---

## Appendix: Quick Reference

### File Locations

| Purpose | Claude Code | Copilot |
|---------|-------------|---------|
| Global instructions | ~/.claude/CLAUDE.md | .github/copilot-instructions.md |
| Agent guidelines | ~/.claude/agents/*.md | .github/agents.md |
| Skills (repo) | N/A | .github/skills/ |
| Skills (user) | ~/.claude/skills/ | ~/.copilot/skills/ |
| Commands/Prompts | ~/.claude/commands/ | .github/prompts/ |
| Path instructions | ~/.claude/workflows/ | .github/instructions/ |

### Frontmatter Fields

| Field | instructions.md | prompt.md | SKILL.md |
|-------|-----------------|-----------|----------|
| applyTo | Required | N/A | N/A |
| excludeAgent | Optional | N/A | N/A |
| mode | N/A | Optional | N/A |
| description | N/A | Optional | Required |
| name | N/A | N/A | Required |

---

**Document Location:** `docs/cokit-comprehensive-mapping-guide.md`

**Related Files:**
- `plans/reports/brainstorm-260106-1029-cokit-claude-to-copilot-mapping.md` - Initial analysis
- `https://github.com/camping89/cokit` - Project repository
