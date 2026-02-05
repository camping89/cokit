# CoKit - JIRA Task Breakdown

**Project:** CoKit - Internal Copilot Enhancement Tool
**Scope:** Internal use, GitHub Copilot only
**Format:** Epic → Story → Sub-task (feature-based)

---

## Q1 2026 - Foundation & Core Product (Jan-Mar)

**Theme:** Build CLI tool + core resources, ship v1.0

### EPIC-1: CLI Tool
**Status:** Done | **SP:** 8

---

**STORY-1.1: Build one-command install for Copilot resources** (SP: 5)
**Timeline:** 1/Jan/26 => 10/Jan/26

> **Description:**
>
> **As a** developer using GitHub Copilot,
> **I want** a single CLI command to install all CoKit resources (prompts, agents, skills, instructions, collections),
> **so that** I can enhance my Copilot with structured workflows in under 30 seconds without manual configuration.
>
> **Context:**
> CoKit needs a CLI entry point (`npx cokit-cli init`) that copies all resources to `~/.copilot/`. Supports 3 modes: global (`-g`), project (`-a` with `.github/` templates), and interactive (user picks via prompts).
>
> **Acceptance Criteria:**
> - [ ] `npx cokit-cli init -g` installs all resources to `~/.copilot/` (prompts, agents, skills, instructions, collections)
> - [ ] `npx cokit-cli init -a` installs global + project-level templates (`.github/copilot-instructions.md`, `.github/AGENTS.md`, `.vscode/settings.json`)
> - [ ] `npx cokit-cli init` (no flags) shows interactive prompts for user to pick install mode
> - [ ] Cross-platform paths work correctly on Windows, macOS, Linux
> - [ ] CLI shows progress and install result (files copied count, target directory)
> - [ ] Exit code 0 on success, non-zero on error
>
> **Sub-tasks:**
>
> **TASK-1.1.1: Implement global install mode (`npx cokit-cli init -g`)** | 1/Jan/26 => 5/Jan/26
> Add handler for `-g`/`--global` flag. Copy all resources (prompts/, agents/, skills/, instructions/, collections/) to `~/.copilot/` directory. Use `commander` for CLI parsing, `fs-extra` for file operations. Output: files copied count, target path.
>
> **TASK-1.1.2: Implement project install mode (`-a` with .github/ templates)** | 6/Jan/26 => 7/Jan/26
> Add handler for `-a`/`--all` flag. Run global install + copy project-level templates to `.github/` (copilot-instructions.md, AGENTS.md) and `.vscode/settings.json` in CWD. If `.github/` already exists, ask user to confirm overwrite.
>
> **TASK-1.1.3: Implement interactive setup with user prompts** | 8/Jan/26 => 9/Jan/26
> When running `cokit-cli init` with no flags, show interactive menu using `prompts` library. Let user pick: Global only / Global + Project / Cancel. Map selection to the matching handler (TASK-1.1.1 or TASK-1.1.2).
>
> **TASK-1.1.4: Support cross-platform paths (Windows/macOS/Linux)** | 9/Jan/26 => 10/Jan/26
> Use `path.join()` and `os.homedir()` instead of hardcoded paths. Handle Windows backslash vs Unix forward slash. Test on all 3 OS: `~/.copilot/` (macOS/Linux) and `%USERPROFILE%/.copilot/` (Windows).

---

**STORY-1.2: Add resource management commands (add/list/doctor/update)** (SP: 3)
**Timeline:** 12/Jan/26 => 21/Jan/26

> **Description:**
>
> **As a** CoKit user,
> **I want** commands to manage installed resources (add specific ones, list installed, diagnose issues, check updates),
> **so that** I can maintain and troubleshoot my CoKit setup without reinstalling everything.
>
> **Context:**
> After init, users need to manage resources: add specific ones, see what's installed, diagnose setup issues, and check for new versions.
>
> **Acceptance Criteria:**
> - [ ] `cokit-cli add <resource>` installs a specific resource to `~/.copilot/`
> - [ ] `cokit-cli list` shows all installed resources (grouped by type: prompts, agents, skills, etc.)
> - [ ] `cokit-cli doctor` checks and reports issues (missing files, broken paths, version mismatch)
> - [ ] `cokit-cli update` compares local version vs npm registry, notifies if new version available
>
> **Sub-tasks:**
>
> **TASK-1.2.1: Implement `add` command to install specific resources** | 12/Jan/26 => 14/Jan/26
> Create `cokit-cli add <type> <name>` command. Types: prompt, agent, skill, instruction, collection. Resolve resource from package bundle, copy to `~/.copilot/<type>/`. Validate resource exists before copy, show clear error if not found.
>
> **TASK-1.2.2: Implement `list` command to show installed resources** | 15/Jan/26 => 16/Jan/26
> Create `cokit-cli list` command. Scan `~/.copilot/` directory, group files by type (prompts, agents, skills, instructions, collections). Output as table with columns: Type, Name, Version. Show total count at bottom.
>
> **TASK-1.2.3: Implement `doctor` command to diagnose setup issues** | 16/Jan/26 => 19/Jan/26
> Create `cokit-cli doctor` command. Check: (1) `~/.copilot/` directory exists, (2) all expected files present, (3) file permissions OK, (4) no corrupted files. Output checklist with pass/fail for each check. Suggest fix for each issue found.
>
> **TASK-1.2.4: Implement `update` command to check for new versions** | 19/Jan/26 => 21/Jan/26
> Create `cokit-cli update` command. Fetch latest version from npm registry (`npm view cokit-cli version`). Compare with installed version from local package.json. If outdated: show diff and suggest `npx cokit-cli init -g` to update.

---

### EPIC-2: Copilot Prompts
**Status:** Done | **SP:** 5

---

**STORY-2.1: Build core Copilot prompts for fix/plan/test/review/docs** (SP: 3)
**Timeline:** 22/Jan/26 => 30/Jan/26

> **Description:**
>
> **As a** developer using GitHub Copilot Agent Mode,
> **I want** pre-built prompts for common development workflows (fix bugs, plan features, run tests, review code, update docs),
> **so that** I can execute structured AI-assisted workflows via slash commands like `/ck.fix`, `/ck.plan` without writing prompts from scratch.
>
> **Context:**
> Core prompts are the backbone of CoKit. Each prompt file uses Copilot format (`mode: agent`) with step-by-step instructions, agent delegation, and real examples. These 5 commands cover 80%+ of daily dev workflows.
>
> **Acceptance Criteria:**
> - [ ] `/ck.fix` prompt: analyze bug, find root cause, implement fix, verify
> - [ ] `/ck.plan` prompt: research → design → plan with phases, output plan.md
> - [ ] `/ck.test` prompt: run test suite, analyze failures, report coverage
> - [ ] `/ck.review` prompt: review code quality, security, performance, output feedback
> - [ ] `/ck.docs` prompt: update docs based on code changes
> - [ ] All prompts use `mode: agent` frontmatter, no `$ARGUMENTS` references
> - [ ] Each prompt has real CoKit examples (agent names, skill activation)
>
> **Sub-tasks:**
>
> **TASK-2.1.1: Create `/ck.fix` prompt for bug fixing workflow** | 22/Jan/26 => 23/Jan/26
> Create `ck-fix.prompt.md` with `mode: agent` frontmatter. Workflow: (1) receive bug description from user, (2) delegate scout agent to find relevant files, (3) delegate debugger agent to analyze root cause, (4) implement fix, (5) delegate tester agent to verify fix. Include real example: "Fix login button not responding".
>
> **TASK-2.1.2: Create `/ck.plan` prompt for implementation planning** | 23/Jan/26 => 26/Jan/26
> Create `ck-plan.prompt.md`. Workflow: (1) receive feature description, (2) delegate researcher agent to research approach, (3) delegate planner agent to create plan.md with phases, (4) output plan file in `plans/` directory. Include planning methodology: research → design → phases → tasks.
>
> **TASK-2.1.3: Create `/ck.test` prompt for test execution & analysis** | 26/Jan/26 => 27/Jan/26
> Create `ck-test.prompt.md`. Workflow: (1) detect test framework (Vitest/Jest/Mocha), (2) run test suite, (3) analyze failures with stack traces, (4) suggest fixes for failing tests, (5) report coverage summary. Delegate tester agent for analysis.
>
> **TASK-2.1.4: Create `/ck.review` prompt for code review** | 27/Jan/26 => 29/Jan/26
> Create `ck-review.prompt.md`. Workflow: (1) identify changed files (git diff), (2) delegate code-reviewer agent to review each file, (3) check: code quality, security vulnerabilities, performance issues, naming conventions, (4) output structured feedback with severity levels (Critical/Warning/Info).
>
> **TASK-2.1.5: Create `/ck.docs` prompt for documentation updates** | 29/Jan/26 => 30/Jan/26
> Create `ck-docs.prompt.md`. Workflow: (1) scan recent code changes, (2) identify docs that need updates, (3) delegate docs-manager agent to update relevant docs in `docs/` directory, (4) verify links and cross-references. Focus: README, API docs, architecture docs.

---

**STORY-2.2: Build utility prompts for ask/bootstrap/help** (SP: 2)
**Timeline:** 2/Feb/26 => 6/Feb/26

> **Description:**
>
> **As a** developer new to CoKit,
> **I want** utility prompts for Q&A, new project scaffolding, and command reference,
> **so that** I can quickly get help, start new projects, and look up commands when needed.
>
> **Context:**
> Utility prompts support the core workflows. `/ck.ask` for quick technical Q&A, `/ck.bootstrap` scaffolds new projects with best practices, `/ck.help` lists all available commands.
>
> **Acceptance Criteria:**
> - [ ] `/ck.ask` prompt: receive question, research, answer with code examples
> - [ ] `/ck.bootstrap` prompt: scaffold new project (directory structure, config files, initial setup)
> - [ ] `/ck.help` prompt: list all ck.* commands with short description and usage examples
> - [ ] All prompts use `mode: agent` frontmatter
>
> **Sub-tasks:**
>
> **TASK-2.2.1: Create `/ck.ask` prompt for technical Q&A** | 2/Feb/26 => 3/Feb/26
> Create `ck-ask.prompt.md`. Workflow: (1) receive technical question from user, (2) delegate researcher agent to search docs/web, (3) answer concisely with code examples and source links. No file creation needed, text response only. Optimize for quick answers < 30 seconds.
>
> **TASK-2.2.2: Create `/ck.bootstrap` prompt for new project scaffolding** | 3/Feb/26 => 5/Feb/26
> Create `ck-bootstrap.prompt.md`. Workflow: (1) ask user for project type (Node.js/React/Python/etc.), (2) create directory structure, (3) init package.json/config files, (4) setup linting/formatting, (5) init git repo. Include templates for common stacks. Delegate planner agent for architecture decisions.
>
> **TASK-2.2.3: Create `/ck.help` prompt for command reference** | 5/Feb/26 => 6/Feb/26
> Create `ck-help.prompt.md`. Output formatted list of all available `ck.*` commands: name, one-line description, usage example, when to use. Group by category: Core (fix/plan/test/review/docs), Utility (ask/bootstrap/help), Productivity (cook/brainstorm/scout). Include "Which Workflow?" decision tree.

---

### EPIC-3: Agents & Skills
**Status:** Done | **SP:** 8

---

**STORY-3.1: Build specialized agents for planning, review, debug, test workflows** (SP: 3)
**Timeline:** 9/Feb/26 => 20/Feb/26

> **Description:**
>
> **As a** CoKit prompt author,
> **I want** 9 specialized agents that prompts can delegate tasks to,
> **so that** each workflow step is handled by a dedicated agent with the right context and expertise.
>
> **Context:**
> Agents are specialized AI assistants that prompts delegate work to. Example: `/ck.plan` delegates to planner agent, `/ck.review` delegates to code-reviewer agent. Each agent has its own instructions and output format.
>
> **Acceptance Criteria:**
> - [ ] 9 agents created: planner, code-reviewer, debugger, tester, researcher, scout, git-manager, brainstormer, docs-manager
> - [ ] Each agent has a `.md` file in `agents/` with role description, capabilities, output format
> - [ ] Agents are correctly referenced in prompts (ck.plan → planner, ck.review → code-reviewer, etc.)
> - [ ] Agent instructions are detailed enough for Copilot Agent Mode to understand and execute
>
> **Sub-tasks:**
>
> **TASK-3.1.1: Create planner agent for implementation planning** | 9/Feb/26 => 11/Feb/26
> Create `agents/planner.md`. Role: receive feature request, research codebase, create implementation plan with phases. Output format: plan.md with sections (Overview, Phases, Tasks, Dependencies, Risks). Delegated from `/ck.plan` prompt. Capabilities: file reading, codebase search, plan generation.
>
> **TASK-3.1.2: Create code-reviewer agent for code quality checks** | 11/Feb/26 => 13/Feb/26
> Create `agents/code-reviewer.md`. Role: review code changes, check quality/security/performance. Output format: structured feedback with severity (Critical/Warning/Info), file:line references, suggested fixes. Delegated from `/ck.review` prompt. Activates `ck-code-review` skill.
>
> **TASK-3.1.3: Create debugger agent for systematic troubleshooting** | 13/Feb/26 => 16/Feb/26
> Create `agents/debugger.md`. Role: analyze bugs/errors, find root cause, suggest fixes. Methodology: reproduce → isolate → identify → fix → verify. Output format: root cause analysis + fix recommendation. Delegated from `/ck.fix` prompt. Activates `ck-debugging` skill.
>
> **TASK-3.1.4: Create tester agent for test execution** | 16/Feb/26 => 18/Feb/26
> Create `agents/tester.md`. Role: run test suites, analyze failures, report coverage. Auto-detect test framework (Vitest/Jest/Mocha/pytest). Output format: test summary (passed/failed/skipped), failure details with stack traces, coverage %. Delegated from `/ck.test` prompt.
>
> **TASK-3.1.5: Create researcher, scout, git-manager, brainstormer, docs-manager agents** | 18/Feb/26 => 20/Feb/26
> Create 5 agent files in `agents/`: (1) `researcher.md` - research topics/docs/web, (2) `scout.md` - fast codebase exploration, (3) `git-manager.md` - git operations/conventional commits, (4) `brainstormer.md` - solution brainstorming with trade-offs, (5) `docs-manager.md` - documentation management. Each agent has its own role, capabilities, and output format.

---

**STORY-3.2: Build domain skills for coding, debugging, planning tasks** (SP: 3)
**Timeline:** 23/Feb/26 => 6/Mar/26

> **Description:**
>
> **As a** Copilot user working on specialized tasks,
> **I want** domain skills that provide deep expertise for debugging, code review, planning, and development,
> **so that** agents and prompts can leverage deep domain knowledge when handling complex tasks.
>
> **Context:**
> Skills are knowledge modules that agents activate when they need specific expertise. Example: debugger agent activates `ck-debugging` skill to use systematic troubleshooting methodology. Skills live in the `skills/` directory.
>
> **Acceptance Criteria:**
> - [ ] 7 skills created with `ck-` prefix: debugging, code-review, planning, problem-solving, sequential-thinking, backend-development, frontend-development
> - [ ] Each skill has README.md with purpose, activation trigger, methodology/patterns
> - [ ] Skills cover: systematic debugging, code review gates, planning methodology, problem-solving frameworks, structured reasoning, backend patterns (Node.js/Python/Go), frontend patterns (React/TypeScript)
> - [ ] Skills can be referenced and activated from agent instructions
>
> **Sub-tasks:**
>
> **TASK-3.2.1: Create debugging & code-review skills** | 23/Feb/26 => 26/Feb/26
> Create `skills/ck-debugging/` and `skills/ck-code-review/` directories, each with README.md. Debugging skill: 4-phase methodology (reproduce → isolate → identify → fix), common patterns, logging strategies. Code-review skill: review checklist, severity classification, security gates (OWASP top 10), performance patterns.
>
> **TASK-3.2.2: Create planning & problem-solving skills** | 26/Feb/26 => 2/Mar/26
> Create `skills/ck-planning/` and `skills/ck-problem-solving/` directories. Planning skill: research → design → phases methodology, plan template, estimation guidelines. Problem-solving skill: frameworks for complexity spirals, assumption testing, decision matrices, trade-off analysis.
>
> **TASK-3.2.3: Create sequential-thinking skill for structured reasoning** | 2/Mar/26 => 4/Mar/26
> Create `skills/ck-sequential-thinking/` directory. Skill for step-by-step analysis with revision capability. Patterns: hypothesis → test → revise, chain-of-thought templates, decision trees. Used when multi-step reasoning or complex problem decomposition is needed.
>
> **TASK-3.2.4: Create backend-dev, frontend-development skills** | 4/Mar/26 => 6/Mar/26
> Create `skills/ck-backend-development/` and `skills/ck-frontend-development/` directories. Backend: Node.js/Express patterns, Python/FastAPI patterns, Go patterns, API design, database patterns, error handling. Frontend: React/TypeScript patterns, component architecture, state management, styling (CSS/Tailwind), testing (Vitest/Playwright).

---

**STORY-3.3: Build context instructions & resource bundles per workflow** (SP: 2)
**Timeline:** 9/Mar/26 => 13/Mar/26

> **Description:**
>
> **As a** developer working on a specific domain (backend, frontend, testing),
> **I want** context instructions that auto-inject domain rules + resource collections that bundle resources by workflow,
> **so that** Copilot gets the right coding standards and best practices for each task type without manual config.
>
> **Context:**
> Instructions are context files auto-loaded based on file type (e.g., `.ts` files → frontend instruction). Collections bundle related resources (prompts + agents + skills) for specific workflows. Both help Copilot work "smarter" without user configuration.
>
> **Acceptance Criteria:**
> - [ ] 5 instructions: backend, frontend, testing, development, research - each with trigger conditions and coding standards
> - [ ] 5 collections: core, development-rules, documentation, git-workflow, orchestration - each bundles related resources
> - [ ] Instructions auto-load when Copilot detects matching file types
> - [ ] Collections can be installed individually or bundled
>
> **Sub-tasks:**
>
> **TASK-3.3.1: Create 5 context instructions (backend, frontend, testing, development, research)** | 9/Mar/26 => 11/Mar/26
> Create 5 files in `instructions/`: (1) `ck-backend.md` - Node.js/Python coding standards, API patterns, error handling, (2) `ck-frontend.md` - React/TS conventions, component patterns, styling rules, (3) `ck-testing.md` - test naming, coverage thresholds, mocking patterns, (4) `ck-development.md` - general dev rules, git conventions, PR standards, (5) `ck-research.md` - research methodology, source evaluation, documentation format.
>
> **TASK-3.3.2: Create 5 resource collections (core, dev-rules, docs, git-workflow, orchestration)** | 11/Mar/26 => 13/Mar/26
> Create 5 files in `collections/`: (1) `ck-core.yml` - bundle essential prompts + agents, (2) `ck-development-rules.yml` - dev instructions + planning skills, (3) `ck-documentation.yml` - docs prompt + docs-manager agent, (4) `ck-git-workflow.yml` - git prompt + git-manager agent, (5) `ck-orchestration.yml` - all agents + delegation patterns. Each collection lists resource names + types.

---

### EPIC-4: NPM Package & Distribution
**Status:** Done | **SP:** 3

---

**STORY-4.1: Publish CoKit to npm with all resources bundled** (SP: 3)
**Timeline:** 16/Mar/26 => 25/Mar/26

> **Description:**
>
> **As a** developer,
> **I want** to install CoKit via `npx cokit-cli init` without cloning the repo or manual setup,
> **so that** I can use CoKit instantly with just 1 command.
>
> **Context:**
> npm package is the main distribution channel. Need to bundle all resources (prompts, agents, skills, instructions, collections) into npm package, apply `ck-` namespace prefix, and include version checker.
>
> **Acceptance Criteria:**
> - [ ] package.json configured for npm registry (name: `cokit-cli`, bin, files, keywords)
> - [ ] All resources bundled in package: `prompts/`, `agents/`, `skills/`, `instructions/`, `collections/`
> - [ ] Resources use consistent `ck-` namespace prefix
> - [ ] CLI includes update checker: compare installed version vs npm latest
> - [ ] `npx cokit-cli init -g` works end-to-end from npm registry
> - [ ] Package size reasonable (< 5MB unpacked)
>
> **Sub-tasks:**
>
> **TASK-4.1.1: Configure package.json for npm registry** | 16/Mar/26 => 17/Mar/26
> Setup package.json: name `cokit-cli`, bin entry pointing to `bin/cokit.js`, files array including all resource directories, keywords for discoverability (copilot, github, cli, ai-workflow). Set engine `>=18`, license, repository URL. Verify `npm pack` output is correct.
>
> **TASK-4.1.2: Bundle all prompts, skills, instructions in package** | 17/Mar/26 => 18/Mar/26
> Ensure `files` field in package.json includes: `bin/`, `src/`, `prompts/`, `agents/`, `skills/`, `instructions/`, `collections/`. Verify `npm pack --dry-run` lists all files. Check that dev files are excluded (.github/, tests/, docs/). Target unpacked size < 5MB.
>
> **TASK-4.1.3: Apply `ck-` namespace prefix to all resources** | 19/Mar/26 => 23/Mar/26
> Rename all resources to `ck-` prefix: prompts → `ck-*.prompt.md`, skills → `ck-*/`, agents → `ck-*/`, instructions → `ck-*.md`, collections → `ck-*.yml`. Update internal references (prompt cross-links, agent skill activations). Verify no broken references after rename.
>
> **TASK-4.1.4: Add update checker to CLI** | 23/Mar/26 => 25/Mar/26
> Implement version check when user runs any command. Fetch latest version from npm registry (GET `https://registry.npmjs.org/cokit-cli/latest`). Cache check result for 24h (file-based cache in `~/.copilot/.cokit-cache`). Show non-blocking warning if outdated: "Update available: x.x.x → y.y.y. Run: npx cokit-cli init -g".

---

### EPIC-5: Project Documentation
**Status:** Done | **SP:** 5

---

**STORY-5.1: Document architecture, code standards & system overview** (SP: 3)
**Timeline:** 25/Mar/26 => 31/Mar/26

> **Description:**
>
> **As a** contributor or maintainer of CoKit,
> **I want** technical docs about architecture, code standards, and system overview,
> **so that** I understand the project structure, conventions, and can contribute code that follows standards.
>
> **Context:**
> Technical docs live in `docs/` directory. Need 4 main docs: project overview (PDR), system architecture (data flow, component diagram), code standards (naming, structure), and codebase summary (file map).
>
> **Acceptance Criteria:**
> - [ ] Project overview (PDR): vision, problem, solution, target users, success metrics
> - [ ] System architecture: sync pipeline diagram, CLI flow, component map, namespace convention
> - [ ] Code standards: file naming (kebab-case), structure conventions, coding patterns
> - [ ] Codebase summary: directory structure, key files, resource counts
> - [ ] All docs in `docs/` directory, cross-linked with each other
>
> **Sub-tasks:**
>
> **TASK-5.1.1: Write project overview (PDR)** | 25/Mar/26 => 26/Mar/26
> Create `docs/project-overview-pdr.md`. Sections: Product Vision, Problem Statement, Solution, Key Features (table), Target Users, Success Metrics (install time < 30s, sync time < 30s), Tech Stack, Roadmap link. Keep concise < 50 lines, link to detailed docs.
>
> **TASK-5.1.2: Write system architecture doc** | 26/Mar/26 => 27/Mar/26
> Create `docs/system-architecture.md`. Sections: Overview (ASCII diagram), Data Flow (sync pipeline + CLI install), Key Components (table: file → purpose), Namespace Convention (ck.* vs ck.spec.*). Include 3 ASCII diagrams: Sources → Sync Pipeline → Output → CLI.
>
> **TASK-5.1.3: Write code standards doc** | 27/Mar/26 => 30/Mar/26
> Create `docs/code-standards.md`. Sections: file naming (kebab-case), directory structure conventions, ES Modules patterns, CLI code patterns (commander usage), resource file format (prompt frontmatter, agent markdown, skill README). Include examples for each convention.
>
> **TASK-5.1.4: Write codebase summary** | 30/Mar/26 => 31/Mar/26
> Create `docs/codebase-summary.md`. Sections: directory tree (annotated), resource counts (21 prompts, 9 agents, 7 skills, 5 instructions, 5 collections), key files map (bin/cokit.js, src/index.js, eng/sync.mjs), dependency list. Can be auto-generated or manually maintained.

---

**STORY-5.2: Write getting-started guide & command reference for users** (SP: 2)
**Timeline:** 31/Mar/26 => 3/Apr/26

> **Description:**
>
> **As a** first-time CoKit user,
> **I want** an easy-to-read README with quick-start guide, command reference, and migration guide,
> **so that** I can install and use CoKit within 5 minutes without reading detailed docs.
>
> **Context:**
> User-facing docs must be beginner-friendly. README is the main entry point, commands usage guide lists all commands with examples, migration guide helps Claude Code users switch to Copilot.
>
> **Acceptance Criteria:**
> - [ ] README.md: quick-start (30 seconds), sample workflows, command reference table, "Which Workflow?" decision tree
> - [ ] Commands usage guide: each command with when to use, example, sample output
> - [ ] Migration guide: mapping Claude Code → CoKit commands, key differences, step-by-step migration
> - [ ] All commands in docs are copy-paste ready (tested in terminal)
> - [ ] Docs understandable by non-technical users
>
> **Sub-tasks:**
>
> **TASK-5.2.1: Write README with quick-start guide (30 seconds)** | 31/Mar/26 => 1/Apr/26
> Create root `README.md`. Sections: headline (1 sentence), Installation (3 commands table), Usage (code block with example), Sample Workflows (Quick Fix 5min, Small Feature 30min, Medium Feature 2-4h, Complex Feature multi-day), Command Reference (2 tables: daily + spec-driven), "Which Workflow?" decision tree, What's Included (resource counts table). Target: user can run it within 30 seconds of reading.
>
> **TASK-5.2.2: Write commands usage guide** | 1/Apr/26 => 2/Apr/26
> Create `docs/cokit-commands-usage-guide.md`. Each command: name, when to use, syntax, example input, example output, tips. Group by: Core Workflows, Spec-Driven, Utility, Productivity. Include "workflow chaining" examples (plan → implement → test → review). All commands copy-paste ready.
>
> **TASK-5.2.3: Write migration guide from Claude Code** | 2/Apr/26 => 3/Apr/26
> Create `docs/migration-guide.md`. Sections: (1) command mapping table (Claude Code command → CoKit equivalent), (2) key differences (Claude Code = CLI tool, CoKit = Copilot extension), (3) step-by-step migration (install CoKit, verify prompts, test workflows), (4) FAQ for Claude Code users. Target audience: developers familiar with Claude Code who want to use Copilot.

---

**Q1 Total: 5 Epics | 10 Stories | 29 SP | All Done**

---

## Q2 2026 - Integration & Expansion (Apr-Jun)

**Theme:** Spec-driven workflows, extended commands, tooling skills

### EPIC-6: SpecKit Evaluation
**Status:** Done | **SP:** 3 | **Type:** SPIKE

**STORY-6.1: [SPIKE] Research SpecKit integration feasibility** (SP: 3)
- Research spec-driven development framework
- Evaluate git subtree as integration approach
- Document integration plan with phases

---

### EPIC-7: Spec-Driven Workflow
**Status:** Done | **SP:** 8

**STORY-7.1: Build sync engine to merge ClaudeKit + SpecKit into unified commands** (SP: 5)
- Build sync orchestrator (eng/sync.mjs)
- Implement ClaudeKit & SpecKit transformers
- Implement navigation patcher for cross-command suggestions
- Add npm scripts (sync, sync:pull, sync:transform, sync:dry-run)

**STORY-7.2: Build spec-driven prompts for formal requirement workflows** (SP: 3)
- Create `/ck.spec.specify` prompt for formal specifications
- Create `/ck.spec.clarify` prompt for resolving ambiguities
- Create `/ck.spec.plan` prompt for implementation planning
- Create `/ck.spec.tasks` prompt for task breakdown
- Create `/ck.spec.implement` prompt for task execution

---

### EPIC-8: Extended Commands
**Status:** Done | **SP:** 5

**STORY-8.1: Build productivity prompts for cook/brainstorm/scout/journal** (SP: 3)
- Create `/ck.cook` prompt for feature development
- Create `/ck.brainstorm` prompt for solution brainstorming
- Create `/ck.scout` prompt for codebase exploration
- Create `/ck.journal` prompt for session logging
- Create `/ck.watzup` prompt for recent changes review

**STORY-8.2: Build interactive command search tool for discoverability** (SP: 2)
- Build interactive HTML search page (command-finder.html)
- Add visual documentation with screenshots

---

### EPIC-9: Tooling Skills
**Status:** Done | **SP:** 3

**STORY-9.1: Build tooling skills for doc lookup, diagrams & codebase packing** (SP: 3)
- Create docs-seeker skill (context7 doc lookup)
- Create mermaidjs-v11 skill (diagram generation)
- Create repomix skill (codebase packing)
- Create agent-browser skill (web automation)
- Create context-engineering skill (token optimization)

---

### EPIC-10: Testing & Quality Assurance
**Status:** To Do | **SP:** 8

**STORY-10.1: Add test coverage for all CLI commands** (SP: 3)
- Setup Vitest test framework
- Write tests for `init` command (global, project, interactive modes)
- Write tests for `add`, `list`, `doctor`, `update` commands
- Write tests for file copy utilities & path resolution

**STORY-10.2: Add test coverage for sync pipeline transforms** (SP: 3)
- Write tests for ClaudeKit transformer
- Write tests for SpecKit transformer
- Write tests for navigation patcher
- Write tests for sync orchestrator (dry-run validation)

**STORY-10.3: [SPIKE] Evaluate E2E testing approach for CLI tools** (SP: 2)
- Research E2E testing patterns for Node.js CLI tools
- Document recommended testing strategy

---

**Q2 Total: 5 Epics | 8 Stories | 27 SP | 4 Done, 1 To Do**

---

## Q3 2026 - Quality & Internal Adoption (Jul-Sep)

**Theme:** CI/CD, team onboarding, skill quality

### EPIC-11: CI/CD Pipeline
**Status:** To Do | **SP:** 5

**STORY-11.1: Automate lint/test/publish via GitHub Actions** (SP: 3)
- Setup CI workflow (lint, test, build on PR)
- Setup CD workflow (npm publish on version tag)
- Add release automation (changelog generation, version bump)

**STORY-11.2: Enforce code quality with pre-commit hooks & CI checks** (SP: 2)
- Setup pre-commit hooks for lint & format
- Add sync pipeline validation step in CI

---

### EPIC-12: Internal Team Onboarding
**Status:** To Do | **SP:** 5

**STORY-12.1: Write internal getting-started guide & FAQ** (SP: 2)
- Write step-by-step getting-started guide for internal team
- Write FAQ covering common use cases & troubleshooting
- Document best practices per project type

**STORY-12.2: Create screenshots & demo GIFs for onboarding** (SP: 3)
- Capture terminal install screenshot
- Capture VS Code after-install screenshot
- Record demo GIFs for fix & bootstrap workflows
- Update README with live visual assets

---

### EPIC-13: Skill Effectiveness
**Status:** To Do | **SP:** 5 | **Type:** RESEARCH

**STORY-13.1: [RESEARCH] Collect feedback & identify skill gaps from team** (SP: 3)
- Survey team on skill quality & usefulness
- Identify low-value skills to deprecate
- Identify missing skills requested by team

**STORY-13.2: Refine top-used skills & fill gaps from audit** (SP: 2)
- Improve top-used skills based on feedback
- Create new skills from gap analysis

---

### EPIC-14: Copilot Agent Mode Deep Dive
**Status:** To Do | **SP:** 3 | **Type:** SPIKE

**STORY-14.1: [SPIKE] Explore advanced Copilot Agent Mode for better prompts** (SP: 3)
- Research latest Copilot Agent Mode features & limitations
- Test advanced agent patterns (multi-step, tool use)
- Update prompts based on findings

---

**Q3 Total: 4 Epics | 6 Stories | 18 SP | All To Do**

---

## Q4 2026 - Maturity & Maintenance (Oct-Dec)

**Theme:** Optimize, stabilize, plan next year

### EPIC-15: Sync Pipeline v2
**Status:** To Do | **SP:** 5

**STORY-15.1: [SPIKE] Profile sync performance & evaluate incremental sync** (SP: 2)
- Profile current sync pipeline performance
- Evaluate incremental sync (only process changed files)

**STORY-15.2: Speed up sync with incremental builds & conflict detection** (SP: 3)
- Implement incremental sync (if justified from SPIKE)
- Add conflict detection & reporting
- Improve dry-run output with diff preview

---

### EPIC-16: CLI UX Enhancements
**Status:** To Do | **SP:** 5

**STORY-16.1: Show actionable errors & progress in CLI output** (SP: 3)
- Improve error messages with specific fix suggestions
- Add progress indicators for long operations
- Implement `cokit diff` command (compare local vs latest)

**STORY-16.2: Add auto-fix & version check to doctor command** (SP: 2)
- Add auto-fix capability for common issues
- Add Copilot extension version compatibility check

---

### EPIC-17: 2027 Roadmap Planning
**Status:** To Do | **SP:** 3 | **Type:** RESEARCH

**STORY-17.1: [RESEARCH] Review 2026 adoption & draft 2027 roadmap** (SP: 3)
- Review 2026 internal adoption metrics & feedback
- Evaluate Copilot roadmap for new features to leverage
- Draft 2027 CoKit roadmap

---

### EPIC-18: Maintenance & Tech Debt
**Status:** To Do | **SP:** 5

**STORY-18.1: Update npm dependencies & refactor CLI based on year learnings** (SP: 5)
- Update all npm dependencies to latest versions
- Test compatibility with latest Node.js LTS
- Refactor CLI code based on year-long usage patterns
- Update all documentation to reflect current state

---

**Q4 Total: 4 Epics | 5 Stories | 18 SP | All To Do**

---

## Summary

| Quarter | Theme | Epics | Stories | SP | Status |
|---------|-------|-------|---------|-----|--------|
| **Q1** | Foundation & Core | 5 | 10 | 29 | All Done |
| **Q2** | Integration & Expansion | 5 | 8 | 27 | 4 Done, 1 To Do |
| **Q3** | Quality & Adoption | 4 | 6 | 18 | All To Do |
| **Q4** | Maturity & Maintenance | 4 | 5 | 18 | All To Do |
| **Total** | | **18** | **29** | **92** | |

### SPIKE & RESEARCH Summary

| ID | Type | Title | Q |
|----|------|-------|---|
| STORY-6.1 | SPIKE | Research SpecKit integration feasibility | Q2 ✅ |
| STORY-10.3 | SPIKE | Evaluate E2E testing approach for CLI tools | Q2 |
| STORY-13.1 | RESEARCH | Collect feedback & identify skill gaps from team | Q3 |
| STORY-14.1 | SPIKE | Explore advanced Copilot Agent Mode for better prompts | Q3 |
| STORY-15.1 | SPIKE | Profile sync performance & evaluate incremental sync | Q4 |
| STORY-17.1 | RESEARCH | Review 2026 adoption & draft 2027 roadmap | Q4 |

---

**Generated:** 2026-02-09
**Scope:** Internal use, GitHub Copilot only
