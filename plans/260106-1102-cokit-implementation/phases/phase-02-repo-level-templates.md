# Phase 2: Repo-Level Templates

**Effort:** 3h | **Status:** DONE (2026-01-06)

## Objective

Create `.github/` structure templates for repo-level installation.

## Directory Structure

```
templates/repo/
├── copilot-instructions.md
├── AGENTS.md
├── instructions/
│   ├── development.instructions.md
│   ├── frontend.instructions.md
│   ├── backend.instructions.md
│   └── testing.instructions.md
├── prompts/
│   └── (covered in Phase 4)
├── skills/
│   └── (subset of user-level skills)
└── .cokit-version
```

## Tasks

### 2.1 Create copilot-instructions.md

**File:** `templates/repo/copilot-instructions.md`

**Content (port from CLAUDE.md pattern):**
```markdown
# Project Instructions

## Role
You are an expert software engineer following YAGNI, KISS, DRY principles.

## Coding Standards
- Read ./docs/code-standards.md before implementation
- Keep files under 200 lines
- Use kebab-case for file names

## Architecture
- Reference ./docs/system-architecture.md for decisions
- Follow existing patterns in codebase

## Quality
- Write tests for new features
- Review code for security before committing
- No TODO/FIXME without tracking issue
```

**Conversion notes:**
- Remove `$HOME` references (static only)
- Inline critical workflow rules
- Reference project docs with relative paths

### 2.2 Create AGENTS.md

**File:** `templates/repo/AGENTS.md`

**Content (merge from agents/*.md):**
```markdown
# Agent Guidelines

## General
- Follow YAGNI, KISS, DRY principles
- Be honest, concise, straight to the point
- Verify before claiming success

## When Planning
- Research before proposing solutions
- Create plans in ./plans directory
- Use decomposition and working backwards
- Break complex tasks into phases

## When Implementing
- Read plan completely before coding
- Mark tasks complete as done
- Run type checking after changes
- Do not skip testing

## When Testing
- Write comprehensive unit tests
- Cover happy path, edge cases, error cases
- All tests must pass before proceeding
- No mocks to fake passing tests

## When Reviewing
- Check security vulnerabilities
- Verify error handling
- Ensure test coverage
- Push back on invalid suggestions

## When Debugging
- NO FIXES WITHOUT ROOT CAUSE FIRST
- Trace backward through call stack
- Verify fix with fresh test run
```

### 2.3 Create Instructions Files

#### 2.3.1 development.instructions.md

**File:** `templates/repo/instructions/development.instructions.md`

```yaml
---
applyTo: "**/*"
---
# Development Rules

- YAGNI: Don't add features until needed
- KISS: Prefer simple solutions
- DRY: Extract repeated code
- File size: Keep under 200 lines
- Naming: kebab-case for files, camelCase for variables
- No hardcoded secrets
- Verify before claiming complete
```

#### 2.3.2 frontend.instructions.md

```yaml
---
applyTo: "**/*.tsx,**/*.jsx,**/*.vue,**/*.svelte"
---
# Frontend Guidelines

- Use functional components with hooks
- Prefer composition over inheritance
- Extract reusable components
- Handle loading/error states
- Accessibility: Use semantic HTML
- Responsive: Mobile-first approach
```

#### 2.3.3 backend.instructions.md

```yaml
---
applyTo: "**/*.ts,**/*.py,**/*.go,**/api/**"
excludeAgent: "code-review"
---
# Backend Guidelines

- Validate all inputs
- Handle errors explicitly
- Log at appropriate levels
- Use transactions for data integrity
- Rate limit external API calls
- Document API endpoints
```

#### 2.3.4 testing.instructions.md

```yaml
---
applyTo: "**/*.test.ts,**/*.spec.ts,**/*.test.js"
---
# Testing Guidelines

- One concept per test
- Descriptive test names
- Arrange-Act-Assert pattern
- Mock external dependencies only
- No flaky tests
- Cover edge cases
```

### 2.4 Create Repo-Level Skills (Subset)

Include lightweight versions of core skills in repo:
- `debugging/` (simplified, no scripts)
- `code-review/` (simplified)

Full skills with scripts go to user-level only.

### 2.5 Create Marker File

**File:** `templates/repo/.cokit-version`

```
1.0.0
# CoKit installation marker - do not delete
# https://github.com/camping89/cokit
```

## Validation

- [x] copilot-instructions.md is <2000 tokens
- [x] AGENTS.md covers all merged agent behaviors
- [x] Instructions files have valid `applyTo` patterns
- [x] .cokit-version enables upgrade detection
- [x] No `$HOME` or `$ARGUMENTS` references
- [x] No Claude-specific tool references (Task, TodoWrite)
