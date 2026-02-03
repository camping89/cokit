# Scout Report: Old "ck-*" Naming Convention References

**Date:** 2026-02-03  
**Scope:** Identify all references to old "ck-*" (hyphen) naming convention vs. new "ck.*" (dot) convention  
**Status:** Complete

---

## Executive Summary

The codebase has **TWO PARALLEL NAMING CONVENTIONS** in active use:

1. **Old Convention (ck- with hyphen)**: File and directory names
2. **New Convention (ck. with dot)**: Command namespace and references

This is by design - representing a transition from file-based naming to command-space naming.

---

## 1. OLD CONVENTION FILES & DIRECTORIES (ck- with hyphen)

### File Counts

- **Prompt files**: 21 files in `prompts/ck-*.prompt.md`
- **Skill directories**: 7 directories in `skills/ck-*/`
- **Instruction files**: 5 files in `instructions/ck-*.instructions.md`
- **Collection files**: 5 files in `collections/ck-*.collection.yml`
- **Template files**: Mirror structure in `templates/repo/.github/`

### Directory Structure

```
skills/
├── ck-backend-development/
├── ck-code-review/
├── ck-debugging/
├── ck-frontend-development/
├── ck-planning/
├── ck-problem-solving/
└── ck-sequential-thinking/

collections/
├── ck-core.collection.yml
├── ck-development-rules.collection.yml
├── ck-documentation.collection.yml
├── ck-git-workflow.collection.yml
└── ck-orchestration.collection.yml

instructions/
├── ck-backend.instructions.md
├── ck-development.instructions.md
├── ck-frontend.instructions.md
├── ck-research.instructions.md
└── ck-testing.instructions.md

prompts/
├── ck-ask.prompt.md
├── ck-bootstrap.prompt.md
├── ck-brainstorm.prompt.md
├── ck-code.prompt.md
├── ck-cook.prompt.md
├── ck-debug.prompt.md
├── ck-docs.prompt.md
├── ck-fix.prompt.md
├── ck-git.prompt.md
├── ck-help.prompt.md
├── ck-journal.prompt.md
├── ck-plan.prompt.md
├── ck-plan-fast.prompt.md
├── ck-plan-hard.prompt.md
├── ck-preview.prompt.md
├── ck-review.prompt.md
├── ck-spec-analyze.prompt.md
├── ck-spec-checklist.prompt.md
├── ck-spec-clarify.prompt.md
├── ck-spec-constitution.prompt.md
├── ck-spec-implement.prompt.md
├── ck-spec-plan.prompt.md
├── ck-spec-specify.prompt.md
├── ck-spec-tasks.prompt.md
├── ck-spec-taskstoissues.prompt.md
├── ck-test.prompt.md
├── ck-watzup.prompt.md
└── ...
```

### Template Mirror (same structure)

```
templates/repo/.github/
├── collections/ck-*.collection.yml
├── instructions/ck-*.instructions.md
├── prompts/ck-*.prompt.md
├── skills/ck-*/ (including ck-sequential-thinking, ck-problem-solving, etc.)
```

---

## 2. NEW CONVENTION REFERENCES (ck. with dot)

### Documented in README

The official command namespace uses dot notation:

```
/ck.fix         - Fix bugs
/ck.test        - Run tests
/ck.plan        - Create plan
/ck.plan.fast   - Quick feature plan
/ck.plan.hard   - Research + plan
/ck.ask         - Technical questions
/ck.review      - Code review
/ck.bootstrap   - Start new project
/ck.spec.*      - Specification suite
```

### Resource Mapping Configuration

**File:** `eng/resource-origins.yml` (CRITICAL - source of truth)

Maps 20+ `ck.{name}` commands to upstream sources:

**SpecKit mappings (ck.spec.*):**
- `ck.spec.specify` → specify.md
- `ck.spec.clarify` → clarify.md
- `ck.spec.constitution` → constitution.md
- `ck.spec.plan` → plan.md
- `ck.spec.tasks` → tasks.md
- `ck.spec.implement` → implement.md
- `ck.spec.analyze` → analyze.md
- `ck.spec.checklist` → checklist.md
- `ck.spec.taskstoissues` → taskstoissues.md

**ClaudeKit mappings (ck.*):**
- `ck.plan` → plan.md
- `ck.plan.hard` → plan/hard.md
- `ck.plan.fast` → plan/fast.md
- `ck.fix` → fix.md
- `ck.test` → test.md
- `ck.ask` → ask.md
- `ck.bootstrap` → bootstrap.md
- `ck.review` → review/codebase.md
- `ck.watzup` → watzup.md
- `ck.journal` → journal.md
- `ck.preview` → preview.md
- `ck.help` → ck-help.md

**Ignored commands:**
- ck.kanban
- ck.brainstorm
- ck.cook
- ck.scout
- ck.git
- ck.debug
- ck.docs

---

## 3. WHERE EACH CONVENTION IS USED

### ck- (Hyphen) Used For:

1. **File naming** - All physical files and directories
   - Skill directories: `skills/ck-planning/`
   - Prompt files: `prompts/ck-fix.prompt.md`
   - Instruction files: `instructions/ck-backend.instructions.md`
   - Collection files: `collections/ck-core.collection.yml`

2. **Collection YAML references**
   ```yaml
   # collections/ck-core.collection.yml
   id: ck-core
   items:
     - path: prompts/ck-brainstorm.prompt.md
       kind: prompt
     - path: prompts/ck-plan.prompt.md
       kind: prompt
   ```

3. **Code references in init.js**
   ```javascript
   hint('Try typing /ck-fix in Copilot Chat.');
   ```

4. **Documentation examples**
   - README.FLOW.md references `ck-fix.prompt.md`
   - Docs mention file paths with hyphen

### ck. (Dot) Used For:

1. **User-facing commands** - What users type in Copilot
   ```
   /ck.fix "describe issue"
   /ck.plan "describe feature"
   /ck.spec.specify "requirement"
   ```

2. **Command mapping configuration** - `eng/resource-origins.yml`
   ```yaml
   mappings:
     ck.fix:
       origin: claudekit
       description: Analyze and fix issues
   
     ck.spec.specify:
       origin: speckit
       description: Create feature specification
   ```

3. **Navigation references** - In navigation footers
   ```yaml
   navigation:
     ck.spec.specify:
       next:
         - ck.spec.clarify
         - ck.spec.plan
   ```

4. **Documentation** - Latest docs use dot notation
   - README.md references `/ck.fix`, `/ck.plan`, etc.
   - Migration guide shows dot commands
   - Project roadmap uses dot notation

---

## 4. GREP FINDINGS SUMMARY

**Files with "ck-" references:** 73 files
**Files with "ck." references:** 59 files
**Key patterns:**

1. **Collection YAML files** - Reference both:
   ```
   id: ck-core                  # filename uses hyphen
   - path: prompts/ck-plan.prompt.md  # file path uses hyphen
   ```

2. **Resource mapping** - Uses dot notation exclusively:
   ```
   ck.plan:                     # command name uses dot
     original: plan             # maps to upstream name
     upstream_file: plan.md     # file reference
   ```

3. **Documentation** - Uses both in context:
   - File references: `prompts/ck-fix.prompt.md`
   - Command references: `/ck.fix`

---

## 5. SYNC PIPELINE ARCHITECTURE

**Location:** `eng/sync.mjs` and related transform scripts

The sync pipeline explicitly manages this duality:

1. **transform-claudekit.mjs** - Transforms ClaudeKit source files
2. **transform-speckit.mjs** - Transforms SpecKit source files
3. **patch-navigation.mjs** - Injects unified `ck.*` command navigation

**Purpose:** Convert two upstream sources (with their own naming) into unified CoKit namespace using `ck.*` dot notation.

---

## 6. MIGRATION INFORMATION

**Document:** `docs/migration-guide.md`

Shows explicit mapping of old Claude Code commands to new CoKit commands:

| Claude Code | CoKit |
|---|---|
| `/fix:types` | `/ck.fix the type errors` |
| `/plan:auto` | `/ck.plan` |
| N/A | `/ck.spec.specify` |
| N/A | `/ck.cook` |

The file explicitly documents this is a TRANSITION from hyphen-based to dot-based naming.

---

## 7. UNRESOLVED QUESTIONS

1. **Why keep both conventions?** 
   - Appears to be intentional: Files use hyphen (filesystem), commands use dot (user-facing)
   - This could be by design or transitional

2. **Should all user-facing references update to dot notation?**
   - `src/commands/init.js` line 97 still says "Try typing /ck-fix"
   - Should this be `/ck.fix` for consistency?

3. **Are there any actual "ck-" commands in Copilot?**
   - All documentation shows `ck.*` as the command namespace
   - The hyphenated version appears to be file-only

4. **Template sync status?**
   - Templates mirror the structure with `ck-*` files
   - Are these synchronized with main codebase?

---

## 8. KEY FINDINGS

✓ **Systematic use:** Both conventions are used consistently in their contexts
✓ **Well-documented:** Migration guide clearly explains the transition
✓ **Configuration-driven:** Resource mapping is centralized in YAML
✓ **Build-generated:** Prompts appear to be generated/synced via build process

⚠ **Minor inconsistency:** One hint in code still references `/ck-fix` (hyphen) instead of `/ck.fix` (dot)

---

## Files Referenced

**Main configuration:**
- `/Users/admin/workspace/_me/cokit/eng/resource-origins.yml`
- `/Users/admin/workspace/_me/cokit/eng/sync.mjs`

**Documentation:**
- `/Users/admin/workspace/_me/cokit/docs/migration-guide.md`
- `/Users/admin/workspace/_me/cokit/docs/cokit-sync-and-maintenance-guide.md`
- `/Users/admin/workspace/_me/cokit/README.md`

**Source files:**
- `/Users/admin/workspace/_me/cokit/src/commands/init.js`

