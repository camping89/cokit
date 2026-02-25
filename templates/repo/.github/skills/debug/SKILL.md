---
name: debug
description: Debug systematically with root cause analysis before fixes. Covers bugs, test failures, log analysis, CI/CD failures, database diagnostics, system investigation, performance issues, call stack tracing, multi-layer validation.
---

# Debugging & System Investigation

Comprehensive debugging framework combining systematic investigation, root cause tracing, defense-in-depth validation, verification protocols, and system-level diagnostics.

## Core Principle

**NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST**

Random fixes waste time and create new bugs. Find the root cause, fix at source, validate at every layer, verify before claiming success.

## When to Use

**Code-level:** Test failures, bugs, unexpected behavior, build failures, integration problems, before claiming work complete

**System-level:** CI/CD pipeline failures, log analysis, database diagnostics, performance bottlenecks, infrastructure issues

**Especially when:** Under time pressure, "quick fix" seems obvious, tried multiple fixes, don't fully understand issue, about to claim success

## Techniques

### 1. Systematic Debugging (`references/systematic-debugging.md`)

Four-phase framework:
- Phase 1: Root Cause Investigation (read errors, reproduce, check changes, gather evidence)
- Phase 2: Pattern Analysis (find working examples, compare, identify differences)
- Phase 3: Hypothesis and Testing (form theory, test minimally, verify)
- Phase 4: Implementation (create test, fix once, verify)

Complete each phase before proceeding. No fixes without Phase 1.

**Load when:** Any bug/issue requiring investigation and fix

### 2. Root Cause Tracing (`references/root-cause-tracing.md`)

Trace bugs backward through call stack to find original trigger. Fix at source, not at symptom.

**Includes:** `scripts/find-polluter.sh` for bisecting test pollution

**Load when:** Error deep in call stack, unclear where invalid data originated

### 3. Defense-in-Depth (`references/defense-in-depth.md`)

Validate at every layer data passes through. Four layers: Entry validation → Business logic → Environment guards → Debug instrumentation

**Load when:** After finding root cause, need to add comprehensive validation

### 4. Verification (`references/verification.md`)

Run verification commands and confirm output before claiming success.

**Iron law:** NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE

**Load when:** About to claim work complete, fixed, or passing

### 5. Investigation Methodology

For system-level issues (CI/CD, infrastructure, data pipeline):

1. **Scope** - Define what is broken and what is working
2. **Gather** - Collect logs, metrics, error outputs before touching anything
3. **Isolate** - Narrow to smallest reproducible case
4. **Hypothesize** - Form one theory, test it, reject or confirm
5. **Fix & Validate** - Fix at root, verify at every affected layer

**Load when:** Issue is not code-local — spans services, environments, or pipelines

### 6. Log & CI/CD Analysis

Use `gh` CLI and structured queries to diagnose pipeline failures:

```bash
# View failed CI run logs
gh run view <run-id> --log-failed

# List recent runs for a workflow
gh run list --workflow=<name> --limit 10

# Watch a running workflow
gh run watch <run-id>
```

For structured logs: filter by severity, timestamp range, and correlation ID before reading raw output.

**Load when:** CI/CD failure, deployment issue, or log-driven investigation

### 7. Performance Diagnostics

Identify bottlenecks before optimizing:
- Profile first — measure before guessing
- Check slow queries with `EXPLAIN ANALYZE` (PostgreSQL) or equivalent
- Identify N+1 query patterns in ORM usage
- Check memory allocation patterns for leaks
- Use `psql` for live database diagnostics

**Load when:** Slowness reported, timeout errors, resource exhaustion

### 8. Reporting Standards

For multi-component investigations, write a structured diagnostic report:

```
## Diagnostic Report
- **Issue:** [one-line description]
- **Root Cause:** [where and why it fails]
- **Evidence:** [logs, output, reproduction steps]
- **Fix Applied:** [what was changed]
- **Verification:** [command run + result]
- **Remaining Risk:** [any open questions]
```

Save to `plans/reports/debugger-{date}-{slug}.md`.

**Load when:** Investigation spans multiple components or will be shared with others

### 9. Task Management

For multi-component investigations, track progress with a checklist rather than holding state mentally:

```
- [ ] Reproduce the issue
- [ ] Identify root cause
- [ ] Fix applied
- [ ] Tests passing
- [ ] Verification complete
```

Add this checklist to the active plan or investigation report. Check items off as each step completes.

**Load when:** Investigation touches 3+ components or files

### 10. Frontend Verification

For visual bugs or UI regressions, use browser developer tools (or the `agent-browser` skill) to inspect rendering, network, and console errors directly in the browser.

Use `/ck-scout ext` to search for frontend-specific patterns before diving into devtools.

**Load when:** Visual regression, layout bug, client-side network error, or UI behavior that differs from expected

## Quick Reference

```
Code bug → systematic-debugging.md (Phase 1-4)
  Error deep in stack? → root-cause-tracing.md (trace backward)
  Found root cause? → defense-in-depth.md (add layers)
  About to claim success? → verification.md (verify first)

System issue → Investigation Methodology (5 steps)
  CI/CD failure? → Log & CI/CD Analysis (gh CLI)
  Slow/timeout? → Performance Diagnostics
  Multi-component? → Task Management checklist + Reporting Standards
  Visual/UI bug? → Frontend Verification (agent-browser / browser devtools)
```

## Tools Integration

| Tool | Use Case |
|------|----------|
| `execute` | Run test commands, build scripts, verification steps |
| `gh` CLI | CI/CD log analysis, PR checks, workflow runs |
| `psql` | Live database diagnostics and slow query analysis |
| `agent-browser` skill | Frontend visual verification and network inspection |
| `/ck-scout` | Search codebase for related patterns before investigating |

## Red Flags

Stop and follow process if thinking:
- "Quick fix for now, investigate later"
- "Just try changing X and see if it works"
- "It's probably X, let me fix that"
- "Should work now" / "Seems fixed"
- "Tests pass, we're done"

**All mean:** Return to systematic process.
