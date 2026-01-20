# CoKit: Comprehensive Guide

Complete reference for CoKit GitHub Copilot resource toolkit.

**Version:** 1.0.9
**Date:** 2026-01-20

---

## Table of Contents

1. [Quick Overview](#quick-overview)
2. [Resource Architecture](#resource-architecture)
3. [Installation Guide](#installation-guide)
4. [Feature Mapping](#feature-mapping)
5. [Integration Patterns](#integration-patterns)
6. [Best Practices](#best-practices)

---

## Quick Overview

CoKit transforms GitHub Copilot from basic autocomplete to a structured AI development assistant with:

- **9 Specialized Agents** - Planner, code-reviewer, debugger, tester, researcher, scout, git-manager, brainstormer, docs-manager
- **14 Prompt Templates** - Reusable workflows with `ck-` prefix (`/ck-fix`, `/ck-plan`, `/ck-cook`, etc.)
- **7 Skill Packages** - Deep expertise in debugging, code-review, planning, problem-solving, sequential-thinking, backend, frontend
- **5 Instructions** - Coding standards auto-applied by file pattern (backend, frontend, testing, development, research)
- **5 Collections** - Bundled resource sets for specific workflows (core, development-rules, documentation, git-workflow, orchestration)

### Installation

```bash
npx cokit-cli init          # Interactive setup
npx cokit-cli init -g       # Global resources only
npx cokit-cli init -a       # Both project and global
```

---

## Resource Architecture

### Prompts (`prompts/ck-*.prompt.md`)

**Purpose:** Entry points defining workflows and tasks.

**Format:**
```yaml
---
mode: agent
description: 'Clear task description'
---

# Workflow Title

Step-by-step instructions...
```

**CoKit Prompts (14 total):**

| Category | Prompts |
|----------|---------|
| Core Debugging | `/ck-fix` (debug & fix), `/ck-debug` (debug issues) |
| Planning & Design | `/ck-plan` (create plans), `/ck-brainstorm` (ideate) |
| Implementation | `/ck-code` (implement), `/ck-cook` (feature implementation) |
| Project Setup | `/ck-bootstrap` (new project) |
| Quality Assurance | `/ck-test` (write/run tests), `/ck-review-codebase` (code analysis) |
| Utilities | `/ck-scout` (find files), `/ck-ask` (Q&A), `/ck-git` (git workflows), `/ck-docs` (docs), `/ck-ck-help` (help) |

**Usage Example:**
```
User: /ck-fix The login endpoint returns 500 error

Copilot uses: ck-fix.prompt.md → debugger.agent.md → ck-debugging skill
Result: Systematic debugging plan and fix
```

### Agents (`agents/*.agent.md`)

**Purpose:** Specialized personas executing specific tasks referenced by prompts.

**CoKit Agents (9 total):**

| Agent | Specialization | Used By |
|-------|---|---|
| **planner** | Creates implementation plans from requirements | /ck-plan, /ck-bootstrap |
| **code-reviewer** | Comprehensive code review and quality gates | /ck-review-codebase |
| **debugger** | Investigates issues, diagnoses root causes | /ck-fix, /ck-debug |
| **tester** | Writes tests, validates implementation | /ck-test |
| **researcher** | Technology research, finds documentation | /ck-ask, /ck-scout |
| **scout** | Locates files in codebase by purpose | /ck-scout |
| **git-manager** | Handles commits, pushes, merges, PRs | /ck-git |
| **brainstormer** | Solution ideation, architecture discussion | /ck-brainstorm |
| **docs-manager** | Creates and updates documentation | /ck-docs |

### Instructions (`instructions/ck-*.instructions.md`)

**Purpose:** Coding standards auto-applied based on file patterns.

**Format:**
```yaml
---
applyTo: '**/*.tsx, components/**'
description: 'Frontend guidelines'
---

# Rules

When editing matching files:
- Use functional components
- Props interface required
```

**CoKit Instructions (5 total):**

- `ck-backend` - Node.js, Python, Go, Rust patterns
- `ck-frontend` - React, TypeScript, component patterns
- `ck-testing` - Test writing standards
- `ck-development` - YAGNI, KISS, DRY principles
- `ck-research` - Research methodology

### Skills (`skills/ck-*/SKILL.md`)

**Purpose:** Deep specialized expertise packages with supporting resources.

**Structure:**
```
skills/ck-skill-name/
├── SKILL.md                # Main instructions
├── references/             # Supporting documentation
└── examples/               # Concrete examples
```

**CoKit Skills (7 total):**

| Skill | Expertise |
|-------|-----------|
| **ck-debugging** | Systematic root cause analysis, not random fixes |
| **ck-code-review** | Verification gates, technical rigor, feedback protocols |
| **ck-planning** | Research → design → implementation workflow |
| **ck-problem-solving** | Complexity spirals, innovation blocks, systematic solutions |
| **ck-sequential-thinking** | Multi-step problem solving with revision capability |
| **ck-backend-development** | Backend frameworks (Express, Django, FastAPI, etc.) |
| **ck-frontend-development** | Frontend frameworks (React, Vue, Svelte, etc.) |

### Collections (`collections/ck-*.collection.yml`)

**Purpose:** Curated bundles of related resources for specific workflows.

**Format:**
```yaml
id: ck-collection-id
name: Collection Name
description: What this collection enables
items:
  - path: agents/agent.agent.md
  - path: prompts/prompt.prompt.md
  - path: skills/skill/
```

**CoKit Collections (5 total):**

| Collection | Contents | Use Case |
|---|---|---|
| **ck-core** | Essential agents, prompts, skills | Full-stack development |
| **ck-development-rules** | Development instructions and guidelines | Team consistency |
| **ck-documentation** | Docs-manager, ck-docs prompt, skills | Documentation workflows |
| **ck-git-workflow** | git-manager agent, ck-git prompt | Git automation |
| **ck-orchestration** | Planner, researcher, orchestration guidance | Complex task delegation |

---

## Installation Guide

### Quick Start (30 seconds)

```bash
cd your-project
npx cokit-cli init -a
```

You'll be prompted to choose:
- **Project only** (`.github/`)
- **Personal only** (`~/.copilot/`)
- **Both** (recommended)

### What Gets Installed

**If Project Selected:**
```
.github/
├── copilot-instructions.md    # Project AI guidelines
├── AGENTS.md                   # Agent behavior rules
├── prompts/ck-*.prompt.md      # 14 workflow templates
├── instructions/ck-*.instructions.md  # 5 coding standards
├── collections/ck-*.collection.yml    # 5 resource bundles
└── skills/ck-*/                # Optional project skills
```

**If Personal Selected:**
```
~/.copilot/skills/
├── ck-debugging/
├── ck-code-review/
├── ck-planning/
├── ck-problem-solving/
├── ck-sequential-thinking/
├── ck-backend-development/
└── ck-frontend-development/
```

### CLI Commands

| Command | Description |
|---------|-------------|
| `npx cokit-cli init` | Interactive setup wizard |
| `npx cokit-cli init -g` | Install personal skills only |
| `npx cokit-cli init -a` | Install both project and personal |
| `npx cokit-cli list` | Show installed components |
| `npx cokit-cli doctor` | Diagnose setup issues |
| `npx cokit-cli update` | Update to latest version |

---

## Feature Mapping

### Claude Code → CoKit (Reference)

| Feature | Claude Code | CoKit/Copilot | Notes |
|---------|-------------|---|---|
| **Commands** | `/fix:types`, `/plan:auto` | `/ck-fix`, `/ck-plan`, `/ck-cook`, etc. | 14 prompts vs sub-commands |
| **Skills** | `~/.claude/skills/` | `~/.copilot/skills/ck-*/` | Identical structure |
| **Instructions** | `.claude/instructions/` | `.github/instructions/ck-*.md` | Auto-applied by pattern |
| **Agents** | Task delegation | Agent references in prompts | Different invocation model |
| **Collections** | Not available | `.github/collections/` | NEW: Bundle resources |
| **Variables** | `$ARGUMENTS`, `$HOME` | User provides context in chat | Manual parameter passing |
| **Hooks** | SessionStart, UserPrompt, etc. | Not supported | Workaround: embed in prompts |
| **State** | Session state tracking | Stateless (per-message) | Manual workflow chaining |

---

## Integration Patterns

### Pattern 1: Fix & Debug Workflow

```
User: /ck-fix The API timeout is too short
  ↓
Prompt (ck-fix.prompt.md)
  ↓
Agent (debugger.agent.md)
  ↓
Skills Activated: ck-debugging, ck-sequential-thinking
  ↓
Output: Root cause analysis + fix
```

### Pattern 2: Feature Implementation

```
User: /ck-plan Build user authentication
  ↓
Prompt (ck-plan.prompt.md) + Agent (planner.agent.md)
  ↓
Skills: ck-planning, ck-sequential-thinking
  ↓
Output: Implementation plan

User: /ck-code Implement step 1
  ↓
Prompt (ck-code.prompt.md) + Agent (code-reviewer monitors)
  ↓
Skills: ck-backend-development or ck-frontend-development
  ↓
Output: Implemented code

User: /ck-test Write tests
  ↓
Prompt (ck-test.prompt.md) + Agent (tester.agent.md)
  ↓
Output: Test coverage
```

### Pattern 3: Code Review

```
User: /ck-review-codebase My auth changes
  ↓
Prompt (ck-review-codebase.prompt.md)
  ↓
Agent (code-reviewer.agent.md)
  ↓
Skills: ck-code-review, ck-development
  ↓
Output: Quality gates, security issues, improvements
```

---

## Best Practices

### 1. Workflow Chaining

CoKit supports manual chaining (Copilot is stateless):

```
/ck-plan feature  →  /ck-code step1  →  /ck-test  →  /ck-review-codebase
```

### 2. Context Management

Without `$ARGUMENTS`, provide context in chat:

```
DON'T:
/ck-fix $ARGUMENTS

DO:
/ck-fix The login endpoint returns 401 for valid credentials in auth.ts
```

### 3. Instructions Auto-Apply

Add `.github/instructions/` files to auto-guide specific file types:

```yaml
# .github/instructions/ck-custom-backend.instructions.md
---
applyTo: '**/*.service.ts'
---

When editing service files:
- Implement dependency injection
- Use async/await patterns
```

### 4. Collections for Teams

Use collections to bundle workflows for team consistency:

```bash
# Install specific collection
# Users select ck-core for full-stack development
# Automatic setup of related prompts, agents, skills
```

### 5. Skill Activation

Skills auto-activate based on task context:

- Editing `.tsx` files → `ck-frontend-development` activates
- Running tests → `ck-testing` instruction applies
- Debugging → `ck-debugging` skill loads

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Prompts not appearing | Run `npx cokit-cli list` to verify installation |
| Instructions not applying | Check `applyTo` glob pattern matches your files |
| Skills not activating | Verify skill SKILL.md frontmatter is correct |
| Commands show help instead of running | Use `/ck-prompt-name` (with `ck-` prefix) |

---

## Resources

- **Root README:** [CoKit Repository](../README.md)
- **Team Presentation:** [cokit-team-presentation.md](./cokit-team-presentation.md)
- **Processing Flow:** [copilot-processing-flow.md](./copilot-processing-flow.md)
- **Migration Guide:** [migration-guide.md](./migration-guide.md)
- **Roadmap:** [project-roadmap.md](./project-roadmap.md)
