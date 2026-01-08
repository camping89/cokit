# Phase 5: Create Collections

## Context Links
- [Main Plan](./plan.md)
- [Phase 4: Convert Skills](./phase-04-convert-skills-to-instructions.md)

## Overview

| Priority | Status | Effort |
|----------|--------|--------|
| P2 | pending | 2h |

## Key Insights

1. ClaudeKit workflows la markdown files mo ta quy trinh
2. Collections la YAML files group related prompts/instructions/agents
3. Moi collection toi da 50 items
4. Featured collections hien thi dau README

## Requirements

### Source Workflows (4 files)

| Workflow | Description | Target Collection |
|----------|-------------|-------------------|
| `primary-workflow.md` | Main dev workflow | `ck-development.collection.yml` |
| `development-rules.md` | Coding standards | `ck-code-quality.collection.yml` |
| `documentation-management.md` | Docs workflow | `ck-documentation.collection.yml` |
| `orchestration-protocol.md` | Agent coordination | `ck-orchestration.collection.yml` |

### Additional Collections

| Collection | Purpose | Items |
|------------|---------|-------|
| `ck-core.collection.yml` | Essential prompts | 6 core prompts |
| `ck-fixing.collection.yml` | Bug fixing | fix variants |
| `ck-planning.collection.yml` | Planning tools | plan variants |
| `ck-frontend.collection.yml` | Frontend dev | frontend skills |
| `ck-backend.collection.yml` | Backend dev | backend skills |

## Collection Schema

```yaml
id: collection-name          # Required, lowercase-with-hyphens
name: Collection Display Name # Required, max 100 chars
description: Brief description of collection purpose # Required, max 500 chars
tags: [tag1, tag2]           # Optional, max 10 tags
items:                       # Required, 1-50 items
  - path: prompts/file.prompt.md
    kind: prompt             # prompt | instruction | agent | skill
    usage: Optional usage notes
display:
  ordering: alpha            # alpha | manual
  show_badge: true
  featured: false            # Show in main README
```

## Implementation Steps

### Step 1: Create Core Collection

Create `collections/ck-core.collection.yml`:

```yaml
id: ck-core
name: CoKit Core
description: Essential CoKit prompts for everyday development tasks including debugging, planning, testing, and documentation.
tags: [cokit, essential, development, productivity]
items:
  - path: prompts/ck-fix.prompt.md
    kind: prompt
    usage: Use for debugging and fixing code issues
  - path: prompts/ck-plan.prompt.md
    kind: prompt
    usage: Create implementation plans before coding
  - path: prompts/ck-code.prompt.md
    kind: prompt
    usage: Implement features from plans
  - path: prompts/ck-test.prompt.md
    kind: prompt
    usage: Write tests for your code
  - path: prompts/ck-review.prompt.md
    kind: prompt
    usage: Review code before committing
  - path: prompts/ck-docs.prompt.md
    kind: prompt
    usage: Update project documentation
display:
  ordering: manual
  show_badge: true
  featured: true
```

### Step 2: Create Development Collection

Create `collections/ck-development.collection.yml`:

```yaml
id: ck-development
name: CoKit Development Workflow
description: Complete development workflow from ClaudeKit including planning, implementation, testing, and code review practices.
tags: [cokit, workflow, development, best-practices]
items:
  # Planning
  - path: prompts/ck-plan.prompt.md
    kind: prompt
  - path: prompts/ck-plan-fast.prompt.md
    kind: prompt
  - path: prompts/ck-plan-hard.prompt.md
    kind: prompt

  # Implementation
  - path: prompts/ck-code.prompt.md
    kind: prompt
  - path: prompts/ck-code-auto.prompt.md
    kind: prompt

  # Testing
  - path: prompts/ck-test.prompt.md
    kind: prompt

  # Review
  - path: agents/ck-code-reviewer.agent.md
    kind: agent

  # Instructions
  - path: instructions/ck-debugging.instructions.md
    kind: instruction
  - path: instructions/ck-code-review.instructions.md
    kind: instruction
display:
  ordering: manual
  featured: true
```

### Step 3: Create Fixing Collection

Create `collections/ck-fixing.collection.yml`:

```yaml
id: ck-fixing
name: CoKit Bug Fixing
description: Comprehensive bug fixing toolkit with variants for different scenarios - quick fixes, complex issues, CI failures, and more.
tags: [cokit, debugging, bugfix, troubleshooting]
items:
  - path: prompts/ck-fix.prompt.md
    kind: prompt
    usage: Main fix command with intelligent routing
  - path: prompts/ck-fix-fast.prompt.md
    kind: prompt
    usage: Quick fixes for simple issues
  - path: prompts/ck-fix-hard.prompt.md
    kind: prompt
    usage: Complex issues requiring deep analysis
  - path: prompts/ck-fix-parallel.prompt.md
    kind: prompt
    usage: Multiple independent issues
  - path: prompts/ck-fix-ci.prompt.md
    kind: prompt
    usage: CI/CD pipeline failures
  - path: prompts/ck-fix-types.prompt.md
    kind: prompt
    usage: TypeScript type errors
  - path: prompts/ck-fix-ui.prompt.md
    kind: prompt
    usage: UI/UX issues
  - path: prompts/ck-fix-logs.prompt.md
    kind: prompt
    usage: Log analysis and error tracing
  - path: prompts/ck-fix-test.prompt.md
    kind: prompt
    usage: Test failures
  - path: agents/ck-debugger.agent.md
    kind: agent
  - path: instructions/ck-debugging.instructions.md
    kind: instruction
display:
  ordering: manual
  show_badge: true
```

### Step 4: Create Planning Collection

Create `collections/ck-planning.collection.yml`:

```yaml
id: ck-planning
name: CoKit Planning
description: Planning and research tools for creating implementation plans, conducting technical research, and managing project scope.
tags: [cokit, planning, research, architecture]
items:
  - path: prompts/ck-plan.prompt.md
    kind: prompt
  - path: prompts/ck-plan-fast.prompt.md
    kind: prompt
  - path: prompts/ck-plan-hard.prompt.md
    kind: prompt
  - path: prompts/ck-plan-parallel.prompt.md
    kind: prompt
  - path: prompts/ck-plan-validate.prompt.md
    kind: prompt
  - path: agents/ck-planner.agent.md
    kind: agent
  - path: agents/ck-researcher.agent.md
    kind: agent
  - path: instructions/ck-planning.instructions.md
    kind: instruction
  - path: instructions/ck-research.instructions.md
    kind: instruction
display:
  ordering: manual
  show_badge: true
```

### Step 5: Create Frontend Collection

Create `collections/ck-frontend.collection.yml`:

```yaml
id: ck-frontend
name: CoKit Frontend Development
description: Frontend development tools including UI/UX design, styling, and framework-specific guidelines.
tags: [cokit, frontend, ui, react, vue, css]
items:
  - path: instructions/ck-frontend-design.instructions.md
    kind: instruction
  - path: instructions/ck-frontend-design-pro.instructions.md
    kind: instruction
  - path: instructions/ck-frontend-development.instructions.md
    kind: instruction
  - path: instructions/ck-ui-styling.instructions.md
    kind: instruction
  - path: instructions/ck-ui-ux-pro-max.instructions.md
    kind: instruction
  - path: instructions/ck-threejs.instructions.md
    kind: instruction
  - path: prompts/ck-design-fast.prompt.md
    kind: prompt
  - path: prompts/ck-design-good.prompt.md
    kind: prompt
  - path: agents/ck-ui-ux-designer.agent.md
    kind: agent
display:
  ordering: alpha
```

### Step 6: Create Backend Collection

Create `collections/ck-backend.collection.yml`:

```yaml
id: ck-backend
name: CoKit Backend Development
description: Backend development tools including API design, database management, and server-side best practices.
tags: [cokit, backend, api, database, devops]
items:
  - path: instructions/ck-backend-development.instructions.md
    kind: instruction
  - path: instructions/ck-databases.instructions.md
    kind: instruction
  - path: instructions/ck-devops.instructions.md
    kind: instruction
  - path: instructions/ck-dotnet-backend.instructions.md
    kind: instruction
  - path: agents/ck-database-admin.agent.md
    kind: agent
  - path: agents/ck-fullstack-developer.agent.md
    kind: agent
display:
  ordering: alpha
```

### Step 7: Create Git Collection

Create `collections/ck-git.collection.yml`:

```yaml
id: ck-git
name: CoKit Git Operations
description: Git workflow tools for commits, pull requests, merges, and branch management.
tags: [cokit, git, pr, commit, workflow]
items:
  - path: prompts/ck-git-pr.prompt.md
    kind: prompt
    usage: Create pull requests
  - path: prompts/ck-git-cm.prompt.md
    kind: prompt
    usage: Create commits
  - path: prompts/ck-git-cp.prompt.md
    kind: prompt
    usage: Cherry pick commits
  - path: prompts/ck-git-merge.prompt.md
    kind: prompt
    usage: Merge branches
  - path: agents/ck-git-manager.agent.md
    kind: agent
display:
  ordering: manual
```

### Step 8: Validate Collections

Create validation script or use existing `eng/validate-collections.mjs`.

## Success Criteria

- [ ] All 4 workflows converted to collections
- [ ] 5+ additional curated collections created
- [ ] All collections have valid schema
- [ ] Featured collections marked appropriately
- [ ] Item paths reference existing files
- [ ] Max 50 items per collection

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Invalid item paths | High | Medium | Validate after all phases |
| Too many items | Low | Low | Split into sub-collections |
| Missing referenced files | Medium | Medium | Create placeholder files |
