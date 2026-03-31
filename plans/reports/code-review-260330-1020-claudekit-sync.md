# Code Review: ClaudeKit-CoKit Sync v1.3.0

**Reviewer:** code-reviewer | **Date:** 2026-03-30 | **Scope:** New prompts, config, docs, version bump

## Overall Assessment

Clean sync update. Format consistency good. One count bug found. No security or breaking change issues -- this is a resource sync, not logic change.

---

## Critical Issues

None.

---

## High Priority

### H1. Skill count mismatch: docs say 30, actual is 31

**Files affected:**
- `README.md` line 81: "Skills | 30"
- `docs/codebase-summary.md` line 5: "30 skills"
- `docs/project-overview-pdr.md` line 14: "30 skills"
- `docs/README.md` line 50: "Skills | 30"
- `docs/copilot-processing-flow.md` line 25: "Skills (30 total)"

**Actual count:** 31 skill directories on disk (24 pre-existing + 7 new). The `planning` skill was pre-existing but appears to have been missed in the count.

**Fix:** Update all 5 files from "30" to "31".

---

## Medium Priority

### M1. CHANGELOG says "Synced 23 skills and 12 agents" -- verify agent count

12 agents were listed as synced (11 existing + project-manager new). But the CHANGELOG groups "12 agents" under the Updated section while "1 new agent: project-manager" is under Added. This implies 12 agents were synced (updated) + 1 new = 13 total. The 11 existing agents listed in the task description match 12 agents minus project-manager... but task says 11 existing agents, CHANGELOG says 12. Minor ambiguity -- confirm "12 agents" means the 11 pre-existing + scout (which was already in CoKit but also synced).

**Impact:** Low -- CHANGELOG wording is slightly confusing but not incorrect if scout was re-synced.

### M2. New prompts are thin compared to existing ones

New prompts (`ck-ship`, `ck-deploy`, `ck-security`, `ck-project`, `ck-frontend`) are 20-25 lines each. Existing prompts like `ck-cook` (96 lines) and `ck-review` (58 lines) have much more workflow detail -- intent detection tables, agent delegation, process steps.

This is not blocking. The new prompts delegate to skills which presumably contain the workflow detail. But it creates an inconsistent user experience: some prompts are self-contained workflows, others are thin wrappers.

**Suggestion:** Consider adding workflow overview sections to new prompts in a future pass for consistency.

### M3. `ck-frontend` prompt hardcodes "React/TypeScript"

Line 13: "Covers components, Suspense, lazy loading, useSuspenseQuery, MUI v7 styling, TanStack Router"

This is very React-specific. If the underlying `frontend-development` skill supports other frameworks, the prompt description may mislead users into thinking it's React-only.

**Impact:** Low -- matches the skill content. Note for future if framework coverage expands.

---

## Low Priority

### L1. resource-origins.yml: `ck.security` maps to `skills/ck-security/SKILL.md`

The skill dir is named `ck-security` (with `ck-` prefix) while all other skills use bare names (`ship`, `deploy`, `test`). Inconsistent naming, likely inherited from ClaudeKit source name `ck-security`. Not blocking but could cause confusion during future maintenance.

### L2. Navigation graph completeness

New commands `ck.ship`, `ck.deploy`, `ck.security`, `ck.project`, `ck.frontend` have navigation entries. Verified: all have `next` mappings. However, none of these new commands appear as `next` suggestions from existing commands. For example, `ck.cook` doesn't suggest `ck.ship` as a next step; `ck.review` doesn't suggest `ck.security`.

**Suggestion:** Consider adding reverse navigation links in a future update.

---

## Positive Observations

- YAML validates clean
- New prompt frontmatter format is consistent (`agent`, `description`, `argument-hint` fields present)
- All 7 new skill directories contain SKILL.md files
- package.json version bump matches CHANGELOG header
- CHANGELOG format is consistent with prior entries
- Suggested Next Steps tables in new prompts follow existing pattern

---

## Recommended Actions

1. **[High]** Fix skill count from 30 to 31 in 5 doc files
2. **[Low]** Consider renaming `ck-security` skill dir to `security` for consistency (requires updating resource-origins.yml mapping)
3. **[Low]** Add reverse navigation entries so existing commands suggest new ones

---

## Unresolved Questions

1. Was the `planning` skill intentionally excluded from the sync (no changes in diff)? If it should have been synced, that's a missed update.
2. CHANGELOG "Synced ... 12 agents" -- is scout counted as a synced agent even though it already existed in CoKit? (task description lists 11 existing agents, not 12)
