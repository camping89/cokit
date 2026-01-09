# Copilot Processing Flow

How Copilot processes user input through resources to produce output.

> **Flow diagrams:** See [README.FLOW.md](README.FLOW.md) for visual diagrams.

---

## Resource Types Overview

| Resource | Trigger | Purpose | File |
|----------|---------|---------|------|
| **Prompt** | User calls `/prompt-name` | Workflow/task template | `*.prompt.md` |
| **Agent** | Referenced by prompt | Execute specific tasks | `*.agent.md` |
| **Instruction** | Auto (by file pattern) | Coding rules/standards | `*.instructions.md` |
| **Skill** | User/Agent activates | Specialized knowledge | `skills/*/SKILL.md` |
| **Collection** | User selects | Bundle related resources | `*.collection.yml` |

---

## Component Details

### 1. Prompt (`*.prompt.md`)

**Role:** Entry point - Defines workflow/task

```yaml
---
mode: agent                    # Mode: agent, ask, edit
description: 'Task description'
tools: ['search/codebase']     # Allowed tools
---

# Prompt content
Your task is: ${input}
Follow these steps...
```

**When to use:** User wants to execute a specific task

---

### 2. Agent (`*.agent.md`)

**Role:** Executor - Executes tasks per prompt

```yaml
---
description: 'Agent specialization'
model: GPT-4.1
tools: ['codebase', 'terminal']
---

# Agent persona & capabilities
You are a code reviewer...
```

**When to use:** Referenced by prompt, not called directly

---

### 3. Instruction (`*.instructions.md`)

**Role:** Rules - Auto-applied coding standards

```yaml
---
applyTo: '**/*.tsx'            # Glob pattern
description: 'React rules'
---

# Rules for React files
- Use functional components
- Props interface required
```

**When to use:** Auto-applied when editing files matching pattern

---

### 4. Skill (`skills/*/SKILL.md`)

**Role:** Knowledge - Deep specialized expertise

```
skills/
└── frontend-design/
    ├── SKILL.md              # Main instructions
    ├── templates/            # Code templates
    └── examples/             # Reference examples
```

**When to use:** Activated when specific expertise needed

---

### 5. Collection (`*.collection.yml`)

**Role:** Bundle - Groups related resources

```yaml
id: web-development
name: Web Development Kit
items:
  - path: agents/frontend.agent.md
  - path: prompts/ck-design.prompt.md
  - path: skills/react/
```

**When to use:** Install/share resource bundles by topic

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

## One-liner

> User calls **Prompt** → Prompt uses **Agent** → Agent auto-receives **Instructions** by file pattern → Agent activates **Skills** when needed → All can be bundled in **Collection**.
