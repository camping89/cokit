# Phase 4: Prompt Files

**Effort:** 2h | **Status:** Pending

## Objective

Port 6 core Claude Code commands to Copilot prompt files.

## Target Prompts

| Command | Copilot Prompt | Complexity |
|---------|---------------|------------|
| /fix | fix.prompt.md | Medium (remove routing) |
| /plan | plan.prompt.md | Medium (remove hooks) |
| /code | code.prompt.md | High (remove subagents) |
| /test | test.prompt.md | Low |
| /review | review.prompt.md | Medium |
| /docs | docs.prompt.md | Low |

## Prompt Conversion Rules

### Frontmatter

**Claude Code format:**
```yaml
---
description: Analyze and fix issues
argument-hint: [issues]
---
```

**Copilot format:**
```yaml
---
mode: agent
description: Analyze and fix issues
---
```

**Changes:**
- Add `mode: agent` for multi-step tasks
- Remove `argument-hint` (no $ARGUMENTS)
- User provides context in chat

### Content Conversion

- Remove `$ARGUMENTS` variable
- Remove sub-command routing (`/fix:types` -> inline instructions)
- Remove subagent delegation
- Add explicit step-by-step process
- Keep decision trees as guidance

## Tasks

### 4.1 Create fix.prompt.md

**Source:** `/Users/admin/.claude/commands/ck/fix.md`

**Target:** `templates/repo/prompts/fix.prompt.md`

```yaml
---
mode: agent
description: Debug and fix code issues
---
# Fix Issue

Analyze the described issue and fix it systematically.

## Process

1. **Identify Issue Type**
   - Type errors → Check TypeScript config, type definitions
   - UI/UX issues → Check styles, layout, responsiveness
   - Test failures → Run tests, analyze failures
   - Build errors → Check dependencies, config

2. **Investigate Root Cause**
   - Read error messages completely
   - Find working examples in codebase
   - Trace back to source of problem

3. **Apply Fix**
   - Make minimal changes
   - Follow existing patterns
   - Update related tests

4. **Verify**
   - Run tests
   - Check types compile
   - Confirm issue resolved

## Guidelines
- No fixes without understanding root cause
- One fix at a time
- Verify before claiming done
```

### 4.2 Create plan.prompt.md

**Source:** `/Users/admin/.claude/commands/ck/plan.md`

**Target:** `templates/repo/prompts/plan.prompt.md`

```yaml
---
mode: agent
description: Create implementation plan for features
---
# Create Plan

Create a detailed implementation plan for the described task.

## Process

1. **Understand Requirements**
   - Clarify scope and constraints
   - Identify dependencies
   - Note assumptions

2. **Research**
   - Review relevant codebase areas
   - Check existing patterns
   - Identify technical approach

3. **Design Solution**
   - Break into phases
   - List tasks per phase
   - Estimate effort

4. **Document Plan**
   - Create plan file in ./plans/
   - Include success criteria
   - List open questions

## Output
Create `./plans/{date}-{name}/plan.md` with:
- Overview (1-3 sentences)
- Phases table
- Success criteria checklist
- Unresolved questions

## Principles
- YAGNI: Don't over-engineer
- KISS: Prefer simple solutions
- DRY: Identify reusable patterns
```

### 4.3 Create code.prompt.md

**Source:** `/Users/admin/.claude/commands/ck/code.md`

**Target:** `templates/repo/prompts/code.prompt.md`

```yaml
---
mode: agent
description: Implement from existing plan
---
# Implement Plan

Implement the specified plan phase.

## Process

1. **Read Plan**
   - Load plan.md completely
   - Identify current phase
   - List tasks to complete

2. **Implement**
   - Work through tasks sequentially
   - Follow existing patterns
   - Run type checks frequently

3. **Test**
   - Write tests for new code
   - Run full test suite
   - Fix any failures

4. **Review**
   - Check for security issues
   - Verify error handling
   - Ensure code quality

5. **Complete**
   - Update plan status
   - Summarize changes
   - List remaining work

## Guidelines
- Follow YAGNI/KISS/DRY
- Keep files under 200 lines
- Document complex logic
- No TODO without issue tracking
```

### 4.4 Create test.prompt.md

**Source:** `/Users/admin/.claude/commands/ck/test.md`

**Target:** `templates/repo/prompts/test.prompt.md`

```yaml
---
mode: agent
description: Run tests and analyze results
---
# Run Tests

Run the test suite and analyze results.

## Process

1. **Run Tests**
   - Execute test command (npm test, pytest, etc.)
   - Capture full output

2. **Analyze Results**
   - Count passed/failed/skipped
   - Identify failure patterns
   - Check for flaky tests

3. **Report**
   - Summary: X passed, Y failed, Z skipped
   - List failing tests with error messages
   - Suggest fixes for failures

## If Tests Fail
- Read error message completely
- Find root cause before fixing
- Fix one issue at a time
- Re-run to verify fix
```

### 4.5 Create review.prompt.md

**Source:** `/Users/admin/.claude/commands/ck/review/codebase.md` (adapted)

**Target:** `templates/repo/prompts/review.prompt.md`

```yaml
---
mode: agent
description: Review code for issues
---
# Code Review

Review the specified code for quality and issues.

## Check Categories

### Security
- [ ] Input validation
- [ ] No hardcoded secrets
- [ ] SQL injection prevention
- [ ] XSS prevention

### Performance
- [ ] No N+1 queries
- [ ] Appropriate caching
- [ ] No memory leaks

### Quality
- [ ] YAGNI compliance
- [ ] KISS compliance
- [ ] DRY compliance
- [ ] Error handling
- [ ] Test coverage

### Maintainability
- [ ] Clear naming
- [ ] Reasonable file size
- [ ] Documentation for complex logic

## Output
List issues by severity:
- **Critical**: Must fix before merge
- **Important**: Should fix soon
- **Minor**: Nice to have
```

### 4.6 Create docs.prompt.md

**Source:** `/Users/admin/.claude/commands/ck/docs/update.md` (adapted)

**Target:** `templates/repo/prompts/docs.prompt.md`

```yaml
---
mode: agent
description: Update project documentation
---
# Update Documentation

Update documentation for recent changes.

## Process

1. **Identify Changes**
   - Review recent commits
   - List new features
   - Note API changes

2. **Update Docs**
   - README.md for user-facing changes
   - API docs for endpoint changes
   - Architecture docs for structural changes

3. **Verify**
   - Links work
   - Examples accurate
   - No outdated references

## Guidelines
- Keep concise
- Use examples
- Update table of contents
```

## Validation

- [ ] All prompts have `mode: agent`
- [ ] No `$ARGUMENTS` references
- [ ] No subagent/Task tool references
- [ ] Clear step-by-step processes
- [ ] Each prompt <50 lines
