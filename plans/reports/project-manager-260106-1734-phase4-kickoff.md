# Phase 4 Kickoff: Prompt Files

**Date:** 2026-01-06 | **Phase:** 4 of 5 | **Effort:** 2h | **Status:** Ready to Start

---

## Phase Overview

Convert 6 core Claude Code commands to Copilot-compatible prompt files.

**Deliverables:**
- fix.prompt.md - Debug & fix code issues
- plan.prompt.md - Create implementation plans
- code.prompt.md - Implement from plans
- test.prompt.md - Run tests & analyze
- review.prompt.md - Review code quality
- docs.prompt.md - Update documentation

**Target Location:** `templates/repo/prompts/` (repo-level templates)

**Success Criteria:** 6 prompts created, tested, <50 lines each, 100% Copilot compatible

---

## Conversion Framework

### Prompt Frontmatter Template

```yaml
---
mode: agent
description: [One-line description]
---
# [Prompt Title]

[Brief intro paragraph]

## Process

1. **Step One**
   - Sub-point
   - Sub-point

2. **Step Two**
   - Sub-point
   - Sub-point

## Guidelines
- Key principle 1
- Key principle 2
```

### Key Conversion Rules

| Claude Code | Copilot | Action |
|------------|---------|--------|
| `/command` | `command.prompt.md` | Rename with `.prompt.md` suffix |
| `argument-hint` | Remove | Copilot users provide context in chat |
| `$ARGUMENTS` | User input | Reference "in the chat" or "you provided" |
| Sub-commands (`/fix:types`) | Inline instructions | Move to conditional sections |
| Subagent delegation | Direct instructions | User performs steps manually |
| Hooks/dynamic config | Removed | N/A - static config only |
| Copilot routing | Removed | Single agent limitation |

### Content Guidelines

- **Length:** <50 lines (fits in view without scrolling)
- **Structure:** 4-5 main steps max
- **Clarity:** Active voice, clear imperative mood
- **Context:** No assumptions about user knowledge
- **Examples:** Use 1-2 concrete examples per prompt

---

## Individual Prompt Specifications

### 4.1 fix.prompt.md

**Source:** `/Users/admin/.claude/commands/ck/fix.md`
**Purpose:** Debug and fix code issues systematically
**Complexity:** Medium (remove routing logic)

**Key Conversions:**
- Remove `$ARGUMENTS` (user describes issue in chat)
- Remove `/fix:types`, `/fix:tests`, `/fix:build` routing (use conditional steps)
- Remove "delegate to debugger" (user runs steps manually)
- Keep: "NO FIXES WITHOUT ROOT CAUSE" principle

**Outline:**
1. Identify Issue Type (error type, test failure, build error, etc.)
2. Investigate Root Cause (read errors, find examples, trace source)
3. Apply Fix (minimal changes, follow patterns)
4. Verify (run tests, check types, confirm resolution)

**Estimated Lines:** 35-40

---

### 4.2 plan.prompt.md

**Source:** `/Users/admin/.claude/commands/ck/plan.md`
**Purpose:** Create detailed implementation plans
**Complexity:** Medium (remove hooks/config injection)

**Key Conversions:**
- Remove `$ARGUMENTS` (user describes task in chat)
- Remove "Plan Context injection" hook references
- Remove `set-active-plan.cjs` references
- Simplify to static planning workflow
- Keep: YAGNI/KISS/DRY principles

**Outline:**
1. Understand Requirements (clarify scope, dependencies, assumptions)
2. Research (review codebase, check patterns, identify approach)
3. Design Solution (break into phases, list tasks, estimate effort)
4. Document Plan (create ./plans/{date}-{name}/plan.md with success criteria)

**Output Format:**
```
./plans/{YYYYMMDD}-{slug}/plan.md
```

**Estimated Lines:** 40-45

---

### 4.3 code.prompt.md

**Source:** `/Users/admin/.claude/commands/ck/code.md`
**Purpose:** Implement from existing plan
**Complexity:** High (remove subagent routing, agent delegation)

**Key Conversions:**
- Remove subagent delegation (`delegate to backend-developer`)
- Remove Task tool references
- Convert routing logic to sequential steps
- Remove report generation expectations (manual task)
- Keep: YAGNI/KISS/DRY, testing discipline

**Outline:**
1. Read Plan (load plan.md, identify current phase, list tasks)
2. Implement (work sequentially, follow patterns, check types)
3. Test (write tests, run suite, fix failures)
4. Review (check security, error handling, code quality)
5. Complete (update plan status, summarize changes, list remaining)

**Estimated Lines:** 45-50

---

### 4.4 test.prompt.md

**Source:** `/Users/admin/.claude/commands/ck/test.md`
**Purpose:** Run tests and analyze results
**Complexity:** Low (straightforward workflow)

**Key Conversions:**
- Keep command structure (test framework agnostic)
- Add flexibility for different test runners (npm test, pytest, etc.)
- Keep failure analysis process

**Outline:**
1. Run Tests (execute test command, capture output)
2. Analyze Results (count passed/failed/skipped, identify patterns)
3. Report (summary, failing tests with messages, suggested fixes)
4. If Tests Fail (read errors, find root cause, fix one at a time, re-run)

**Estimated Lines:** 30-35

---

### 4.5 review.prompt.md

**Source:** `/Users/admin/.claude/commands/ck/review/codebase.md` (adapted)
**Purpose:** Review code for quality and security issues
**Complexity:** Medium (categorized checklist)

**Key Conversions:**
- Simplify from multi-agent review to single review pass
- Remove reviewer role assignment
- Keep: Category-based checking (Security, Performance, Quality, Maintainability)

**Check Categories:**
- Security (input validation, no secrets, injection prevention, XSS prevention)
- Performance (no N+1 queries, caching, no memory leaks)
- Quality (YAGNI, KISS, DRY compliance, error handling, test coverage)
- Maintainability (clear naming, reasonable file size, complex logic documented)

**Output:** Issues listed by severity (Critical, Important, Minor)

**Estimated Lines:** 40-45

---

### 4.6 docs.prompt.md

**Source:** `/Users/admin/.claude/commands/ck/docs/update.md` (adapted)
**Purpose:** Update project documentation
**Complexity:** Low (straightforward workflow)

**Key Conversions:**
- Keep basic update workflow
- Add flexibility for different doc types (README, API docs, architecture)
- Remove expectation of automated doc generation

**Outline:**
1. Identify Changes (review commits, list new features, note API changes)
2. Update Docs (README for user changes, API docs for endpoints, architecture docs for structure)
3. Verify (check links, verify examples, check for outdated refs)

**Guidelines:**
- Keep concise
- Use examples
- Update table of contents

**Estimated Lines:** 30-35

---

## Validation Checklist

Before considering Phase 4 complete:

- [ ] All 6 prompts created in `templates/repo/prompts/`
- [ ] Each prompt has correct frontmatter: `mode: agent` + description
- [ ] No `$ARGUMENTS` variable references remain
- [ ] No subagent or Task tool references remain
- [ ] No hook-based patterns (static config only)
- [ ] Each prompt clearly lists steps 1-N
- [ ] Each prompt under 50 lines
- [ ] Decision logic converted to conditional text (not routing)
- [ ] All prompts tested in Copilot agent mode
- [ ] Examples added where helpful
- [ ] Language is clear and imperative

---

## Integration Points

### With Repo Templates (Phase 2)
- Prompts live in `templates/repo/.github/prompts/` (per architecture)
- CLI will copy these to new repos during `npx cokit init`
- Users can customize per repo if needed

### With Skills (Phase 3)
- Prompts reference skills but don't require them
- Skills provide methodology, prompts provide task automation
- No circular dependencies

### With Documentation (Phase 5)
- Phase 5 will include usage examples for each prompt
- Phase 5 will document how to customize prompts
- Phase 5 will explain when to use which prompt

---

## Effort Breakdown

| Task | Estimate | Notes |
|------|----------|-------|
| Create fix.prompt.md | 20min | Medium complexity, routing logic |
| Create plan.prompt.md | 20min | Medium complexity, simplify hooks |
| Create code.prompt.md | 25min | High complexity, most routing |
| Create test.prompt.md | 15min | Low complexity, straightforward |
| Create review.prompt.md | 20min | Medium complexity, checklist |
| Create docs.prompt.md | 15min | Low complexity, straightforward |
| Testing & validation | 15min | Run each in Copilot, verify output |
| **Total** | **2h** | Tight timeline, focused execution |

---

## Success Indicators

**Phase 4 is complete when:**

1. ✓ 6 prompt files created and committed
2. ✓ Each prompt tested in GitHub Copilot agent mode
3. ✓ All validation checklist items verified
4. ✓ No issues identified during testing
5. ✓ Each prompt clearly guides users through task
6. ✓ Prompts integrate seamlessly with Phase 2 templates
7. ✓ Ready for Phase 5 documentation work

---

## Known Constraints

- **Copilot Limitations:** Single agent, no hooks, no dynamic context injection
- **File Size:** Tight 2h timeline - focus on essentials
- **Testing:** Must test in actual GitHub Copilot, not simulation
- **Customization:** Minimize - keep templates simple, let users customize

---

## Kickoff Checklist

Before starting implementation:

- [ ] Review Phase 3 completion (already done ✓)
- [ ] Read this kickoff document completely
- [ ] Understand conversion rules and constraints
- [ ] Identify Copilot test environment
- [ ] Create `templates/repo/prompts/` directory structure
- [ ] Start with simplest prompt (test.prompt.md) for momentum
- [ ] Complete in order: test → docs → plan → review → fix → code
- [ ] Validate after each prompt in Copilot

---

## Next Steps After Phase 4

**Phase 5 (Documentation & README):** 3h
- Create simple README with screenshots
- Document each prompt with examples
- Add setup instructions for non-technical users
- Include troubleshooting guide
- Create Getting Started guide

**Expected Completion:** Same day (aggressive 16h sprint) or next business day

---

## Questions for Implementation Team

1. Should prompts be tested in VS Code Copilot or all supported IDEs?
2. If testing reveals Copilot limitations, how should we adapt?
3. Should we create prompt variants for different project types?
4. How much customization guidance should we include in Phase 5 docs?
5. Should we reserve time for prompt refinement after Phase 5 feedback?

---

## Resources

- **Prompt template location:** `templates/repo/prompts/`
- **Source files reference:** `/Users/admin/.claude/commands/ck/`
- **Architecture guide:** Phase 2 documentation
- **Copilot docs:** https://docs.github.com/en/copilot/
- **Phase 3 completion report:** `plans/reports/project-manager-260106-1734-phase3-completion.md`

---

**Ready to start Phase 4. Good luck!**
