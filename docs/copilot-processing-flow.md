# Copilot Processing Flow

How Copilot processes user input through CoKit resources to produce output.

> **CoKit Resources:** See [README.md](../README.md) for complete resource listing.

---

## CoKit Resource Types Overview

| Resource | Trigger | Purpose | File |
|----------|---------|---------|------|
| **Prompt** | User calls `/ck-prompt-name` | Workflow/task template | `prompts/ck-*.prompt.md` |
| **Agent** | Referenced by prompt | Execute specific tasks | `agents/*.agent.md` |
| **Instruction** | Auto (by file pattern) | Coding rules/standards | `instructions/ck-*.instructions.md` |
| **Skill** | Auto by context | Specialized knowledge | `skills/ck-*/SKILL.md` |
| **Collection** | User selects | Bundle related resources | `collections/ck-*.collection.yml` |

### CoKit Examples

**Prompts:** `/ck.ask`, `/ck.bootstrap`, `/ck.brainstorm`, `/ck.cook`, `/ck.debug`, `/ck.docs`, `/ck.fix`, `/ck.git`, `/ck.help`, `/ck.journal`, `/ck.plan`, `/ck.plan.fast`, `/ck.plan.hard`, `/ck.preview`, `/ck.review`, `/ck.scout`, `/ck.test`, `/ck.watzup`

**Agents:** planner, code-reviewer, debugger, tester, researcher, scout, git-manager, brainstormer, docs-manager

**Skills:** ck-debugging, ck-code-review, ck-planning, ck-problem-solving, ck-sequential-thinking, ck-backend-development, ck-frontend-development

**Instructions:** ck-backend, ck-frontend, ck-testing, ck-development, ck-research

**Collections:** ck-core, ck-development-rules, ck-documentation, ck-git-workflow, ck-orchestration

---

## Component Details

### 1. Prompt (`prompts/ck-*.prompt.md`)

**Role:** Entry point - Defines workflow/task

**Example: ck-fix.prompt.md**
```yaml
---
mode: agent
description: 'Debug and fix issues systematically'
---

# Fix Issues

You are debugging an issue. Follow systematic troubleshooting...

1. Read the error message
2. Search for root cause
3. Implement fix
4. Test the solution
```

**CoKit Examples:**
- `/ck.fix` - Debug and fix
- `/ck.plan` - Create implementation plan
- `/ck.cook` - Step-by-step feature implementation
- `/ck.review-codebase` - Scan and analyze code

**When to use:** User wants to execute a specific workflow

---

### 2. Agent (`agents/*.agent.md`)

**Role:** Executor - Specialized persona for specific tasks

**Example: planner.agent.md**
```yaml
---
description: 'Research, analyze, and create implementation plans'
---

# Planner Agent

You are a research-first planner...
- Conduct comprehensive research
- Design system architecture
- Create detailed implementation plans
```

**CoKit Agents:**
- `planner` - Creates implementation plans
- `code-reviewer` - Provides comprehensive code review
- `debugger` - Investigates and diagnoses issues
- `tester` - Writes and validates tests
- `researcher` - Finds and synthesizes documentation
- `scout` - Locates files in codebase
- `git-manager` - Handles commits and workflows
- `brainstormer` - Ideates solutions
- `docs-manager` - Creates and updates documentation

**When to use:** Referenced by prompts to specialize execution

---

### 3. Instruction (`instructions/ck-*.instructions.md`)

**Role:** Rules - Auto-applied coding standards

**Example: ck-frontend.instructions.md**
```yaml
---
applyTo: '**/*.tsx, **/*.jsx, components/**'
description: 'Frontend component guidelines'
---

# Frontend Guidelines

When editing React files:
- Use functional components
- Props interface required
- Use hooks instead of class methods
```

**CoKit Instructions:**
- `ck-backend` - Backend patterns (Node.js, Python, Go, Rust)
- `ck-frontend` - Frontend patterns (React, TypeScript)
- `ck-testing` - Testing standards and patterns
- `ck-development` - YAGNI/KISS/DRY principles
- `ck-research` - Research methodology guidelines

**When to use:** Auto-applied based on file patterns while editing

---

### 4. Skill (`skills/ck-*/SKILL.md`)

**Role:** Knowledge - Deep specialized expertise with supporting resources

**Example: ck-debugging/SKILL.md**
```
skills/ck.debugging/
├── SKILL.md                  # Main methodology
├── references/               # Case studies, patterns
└── examples/                 # Real debugging examples
```

**CoKit Skills:**
- `ck-debugging` - Systematic root cause analysis
- `ck-code-review` - Comprehensive review gates
- `ck-planning` - Research → design → implementation
- `ck-problem-solving` - Complexity spirals, innovation blocks
- `ck-sequential-thinking` - Multi-step problem solving
- `ck-backend-development` - Backend framework patterns
- `ck-frontend-development` - Frontend framework patterns

**When to use:** Activated automatically based on task context

---

### 5. Collection (`collections/ck-*.collection.yml`)

**Role:** Bundle - Groups related resources by workflow

**Example: ck-core.collection.yml**
```yaml
id: ck-core
name: CoKit Core Workflows
description: Essential agents, prompts, and skills
items:
  - path: agents/planner.agent.md
  - path: agents/code-reviewer.agent.md
  - path: prompts/ck.plan.prompt.md
  - path: prompts/ck.code.prompt.md
  - path: skills/ck.planning/
```

**CoKit Collections:**
- `ck-core` - Core workflows for full-stack development
- `ck-development-rules` - YAGNI/KISS/DRY principles
- `ck-documentation` - Documentation management workflows
- `ck-git-workflow` - Git commit, push, merge workflows
- `ck-orchestration` - Task delegation and workflow orchestration

**When to use:** Install/share resource bundles for specific workflows

---

## Quick Reference

| Resource | Trigger | Scope | Persistence | Purpose |
|----------|---------|-------|-------------|---------|
| Prompt | `/prompt-name` | Single task | Per invocation | Workflow |
| Agent | Prompt refs | Task exec | Per invocation | Execution |
| Instruction | Auto (glob) | File-based | Always active | Rules/Style |
| Skill | On-demand | Knowledge | When activated | Expertise |
| Collection | User install | Resource set | Permanent | Bundling |

---

## CoKit Processing Example

```
User types: /ck.fix
    ↓
Prompt (ck-fix.prompt.md) activates
    ↓
Agent (debugger.agent.md) executes
    ↓
Instructions (ck-*.instructions.md) auto-apply by file pattern
    ↓
Skills (ck-debugging, etc.) activate by context
    ↓
Output: Systematic debugging solution
```

## One-liner

> User calls **Prompt** (e.g., `/ck.fix`) → Prompt references **Agent** (e.g., `debugger`) → Agent auto-receives **Instructions** by file pattern → Agent activates **Skills** when needed → All can be bundled in **Collection** (e.g., `ck-core`).
