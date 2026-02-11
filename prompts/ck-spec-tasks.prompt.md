---
agent: 'agent'
description: 'Generate actionable, dependency-ordered tasks.md from design artifacts'
handoffs:
  - label: Analyze For Consistency
    agent: ck-spec-analyze
    prompt: Run a project analysis for consistency
    send: true
  - label: Implement Project
    agent: ck-spec-implement
    prompt: Start the implementation in phases
    send: true
scripts:
  sh: spec-kit/scripts/bash/check-prerequisites.sh --json
  ps: spec-kit/scripts/powershell/check-prerequisites.ps1 -Json
---

## User Input

```text
${input}
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

1. **Setup**: Run `{SCRIPT}` from repo root and parse FEATURE_DIR and AVAILABLE_DOCS list. All paths must be absolute. For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\''m Groot' (or double-quote if possible: "I'm Groot").

2. **Load design documents**: Read from FEATURE_DIR:
   - **Required**: plan.md (tech stack, libraries, structure), spec.md (user stories with priorities)
   - **Optional**: data-model.md (entities), contracts/ (API endpoints), research.md (decisions), quickstart.md (test scenarios)
   - Note: Not all projects have all documents. Generate tasks based on what's available.

3. **Execute task generation workflow**:
   - Load plan.md and extract tech stack, libraries, project structure
   - Load spec.md and extract user stories with their priorities (P1, P2, P3, etc.)
   - If data-model.md exists: Extract entities and map to user stories
   - If contracts/ exists: Map endpoints to user stories
   - If research.md exists: Extract decisions for setup tasks
   - Generate tasks organized by user story (see Task Generation Rules below)
   - Generate dependency graph showing user story completion order
   - Create parallel execution examples per user story
   - Validate task completeness (each user story has all needed tasks, independently testable)

4. **Generate hybrid task structure**: Create master file + individual phase files:

   **4a. Create phase files** in `FEATURE_DIR/tasks/`:
   - `phase-01-setup.md` - Project initialization
   - `phase-02-foundation.md` - Blocking prerequisites for all user stories
   - `phase-03-us1-[slug].md` - User Story 1 (P1 priority)
   - `phase-04-us2-[slug].md` - User Story 2 (P2 priority)
   - ... (one file per user story, in priority order)
   - `phase-NN-polish.md` - Final phase: Cross-cutting concerns

   **Phase file structure**:
   ```markdown
   # Phase N: [Phase Title]

   **Status**: pending | in-progress | completed
   **Dependencies**: [List phase dependencies, e.g., "Phase 2 must complete first"]

   ## Goal
   [Brief description of what this phase delivers]

   ## Test Criteria
   [How to verify this phase is complete - independently testable]

   ## Tasks
   - [ ] TXXX [P?] [Story?] Description with file path
   - [ ] TXXX ...

   ## Checkpoint
   [What should be true when this phase completes]
   ```

   **4b. Create master tasks.md** in `FEATURE_DIR/`:
   Use `spec-kit/templates/tasks-template.md` as reference, generate:
   - Feature name and overview
   - Phase summary table with status and links:
     ```markdown
     | Phase | Title | Status | Tasks | Dependencies |
     |-------|-------|--------|-------|--------------|
     | 1 | [Setup](tasks/phase-01-setup.md) | pending | 3 | - |
     | 2 | [Foundation](tasks/phase-02-foundation.md) | pending | 6 | Phase 1 |
     | 3 | [US1: Title](tasks/phase-03-us1-slug.md) | pending | 7 | Phase 2 |
     ```
   - Dependency graph (text diagram showing phase order)
   - Parallel execution notes
   - Implementation strategy (MVP first, incremental delivery)
   - Quick reference: Total tasks, parallel opportunities, MVP scope

5. **Report**: Output paths to generated files and summary:
   - Files created: `tasks.md` + list of `tasks/phase-*.md` files
   - Total task count and count per phase
   - Parallel opportunities identified
   - Independent test criteria for each story
   - Suggested MVP scope (typically Phase 1-3: Setup + Foundation + US1)
   - Format validation: Confirm ALL tasks follow the checklist format

Context for task generation: {ARGS}

**Hybrid Structure Benefits**:
- Master `tasks.md` provides overview and navigation
- Individual phase files enable parallel work by multiple agents/developers
- Each phase file is self-contained with clear dependencies
- Easy to track progress per phase independently

The task files should be immediately executable - each task must be specific enough that an LLM can complete it without additional context.

## Task Generation Rules

**CRITICAL**: Tasks MUST be organized by user story to enable independent implementation and testing.

**Tests are OPTIONAL**: Only generate test tasks if explicitly requested in the feature specification or if user requests TDD approach.

### Checklist Format (REQUIRED)

Every task MUST strictly follow this format:

```text
- [ ] [TaskID] [P?] [Story?] Description with file path
```

**Format Components**:

1. **Checkbox**: ALWAYS start with `- [ ]` (markdown checkbox)
2. **Task ID**: Sequential number (T001, T002, T003...) in execution order
3. **[P] marker**: Include ONLY if task is parallelizable (different files, no dependencies on incomplete tasks)
4. **[Story] label**: REQUIRED for user story phase tasks only
   - Format: [US1], [US2], [US3], etc. (maps to user stories from spec.md)
   - Setup phase: NO story label
   - Foundational phase: NO story label  
   - User Story phases: MUST have story label
   - Polish phase: NO story label
5. **Description**: Clear action with exact file path

**Examples**:

- ✅ CORRECT: `- [ ] T001 Create project structure per implementation plan`
- ✅ CORRECT: `- [ ] T005 [P] Implement authentication middleware in src/middleware/auth.py`
- ✅ CORRECT: `- [ ] T012 [P] [US1] Create User model in src/models/user.py`
- ✅ CORRECT: `- [ ] T014 [US1] Implement UserService in src/services/user_service.py`
- ❌ WRONG: `- [ ] Create User model` (missing ID and Story label)
- ❌ WRONG: `T001 [US1] Create model` (missing checkbox)
- ❌ WRONG: `- [ ] [US1] Create User model` (missing Task ID)
- ❌ WRONG: `- [ ] T001 [US1] Create model` (missing file path)

### Task Organization

1. **From User Stories (spec.md)** - PRIMARY ORGANIZATION:
   - Each user story (P1, P2, P3...) gets its own phase
   - Map all related components to their story:
     - Models needed for that story
     - Services needed for that story
     - Endpoints/UI needed for that story
     - If tests requested: Tests specific to that story
   - Mark story dependencies (most stories should be independent)

2. **From Contracts**:
   - Map each contract/endpoint → to the user story it serves
   - If tests requested: Each contract → contract test task [P] before implementation in that story's phase

3. **From Data Model**:
   - Map each entity to the user story(ies) that need it
   - If entity serves multiple stories: Put in earliest story or Setup phase
   - Relationships → service layer tasks in appropriate story phase

4. **From Setup/Infrastructure**:
   - Shared infrastructure → Setup phase (Phase 1)
   - Foundational/blocking tasks → Foundational phase (Phase 2)
   - Story-specific setup → within that story's phase

### Phase Structure

- **Phase 1**: Setup (project initialization)
- **Phase 2**: Foundational (blocking prerequisites - MUST complete before user stories)
- **Phase 3+**: User Stories in priority order (P1, P2, P3...)
  - Within each story: Tests (if requested) → Models → Services → Endpoints → Integration
  - Each phase should be a complete, independently testable increment
- **Final Phase**: Polish & Cross-Cutting Concerns

---

## Suggested Next Steps

| Command | Description | When to Use |
|---------|-------------|-------------|
| `/ck-spec-analyze` | Cross-artifact consistency check | Before implementation, validate spec/plan/tasks alignment |
| `/ck-spec-implement` | Execute implementation | All tasks validated, ready to code |

**Workflow:** `/ck-spec-specify` → `/ck-spec-clarify` → `/ck-spec-plan` → `/ck-spec-tasks` → `/ck-spec-implement`
