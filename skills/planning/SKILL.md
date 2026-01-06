---
name: planning
description: Create technical implementation plans through research, analysis, and design. Use when planning features, architecting systems, or breaking down complex requirements.
---

# Planning

Create detailed implementation plans before writing code.

## Core Principles

- **YAGNI**, **KISS**, **DRY**
- Plan quality determines implementation success
- Research before designing

## When to Use

- Planning new feature implementations
- Architecting system designs
- Evaluating technical approaches
- Breaking down complex requirements
- Assessing technical trade-offs

## Planning Workflow

### 1. Research & Analysis
- Understand requirements fully
- Research existing solutions
- Identify constraints and risks

### 2. Codebase Understanding
- Read existing code patterns
- Identify integration points
- Note dependencies

### 3. Solution Design
- Design architecture
- Consider alternatives
- Evaluate trade-offs

### 4. Plan Documentation
- Write clear plan document
- Break into phases
- Define success criteria

### 5. Review & Refine
- Verify completeness
- Check actionability
- Get stakeholder input

## Output Requirements

- **DO NOT** implement code - only create plans
- Plans must be self-contained
- Include code snippets for clarity
- Provide multiple options when applicable

## Plan Structure

```
plans/
└── YYMMDD-plan-name/
    ├── plan.md           # Main plan
    ├── phase-01-xxx.md   # Phase details
    ├── phase-02-xxx.md
    └── research/         # Research notes
```

## Quality Standards

- Thorough and specific
- Consider maintainability
- Address security concerns
- Detailed enough for any developer
- Validate against existing patterns

## References

See `./references/` for detailed guides:
- `research-phase.md` - Research methodology
- `solution-design.md` - Design patterns
- `plan-organization.md` - Plan structure
