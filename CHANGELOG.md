# Changelog

All notable changes to CoKit are documented in this file.

## [1.4.0] - 2026-04-07

### Changed
- Standardized `ck-` prefix across all skills (32 dirs) and agents (13 files)
- Templates synced with prefixed resource names
- Updated all cross-references in prompts, skills, agents, and docs

### Fixed
- Deleted stale template dirs (markdown-novel-viewer, plans-kanban)
- Synced chrome-devtools template with Copilot-compatible paths

## [1.3.1] - 2026-04-07

### Added
- chrome-devtools skill (ported from upstream with SKILL.md, references, scripts)

### Removed
- SpecKit workflow from landing page (removed from index.html)
- markdown-novel-viewer skill (incomplete — only contained node_modules)
- plans-kanban skill (incomplete — only contained node_modules)
- 6 stale documentation files (team-presentation, slides, comprehensive-mapping-guide, orchestration-layer vi/en, FAQ)

### Fixed
- chrome-devtools: renamed `ck:chrome-devtools` → `chrome-devtools` (consistent with all other skills)
- chrome-devtools: replaced all `.claude/` paths with `.copilot/` for Copilot compatibility
- chrome-devtools: fixed broken skill location detection (project-scope `.github/` + user-scope `~/.copilot/`)
- chrome-devtools: fixed `author: claudekit` → `author: cokit`
- Skill count 30 → 31 across README, index.html, and docs
- Version references in docs still showing 1.3.0

### Updated
- Landing page flowchart with ship, deploy, security commands
- Landing page command table with 5 new commands
- Project-manager added to agents list in index.html
- Templates refreshed with v1.3.0 resources

## [1.3.0] - 2026-03-30

### Added
- 7 new skills: test, ship, deploy, security, bootstrap, frontend-development, project-management
- 1 new agent: project-manager
- 5 new prompts: ck-ship, ck-deploy, ck-security, ck-project, ck-frontend
- New resource-origins mappings and navigation entries for new commands

### Updated
- Synced 23 existing skills and 12 existing agents with latest upstream content
- All skills now have Copilot-compatible frontmatter (ck: prefix, license, argument-hint, metadata)
- Ensured Copilot compatibility across all agents, skills, and prompts
- External tools marked `(if available)` for optional dependencies

## [1.2.7] - 2026-02-25

### Removed
- Removed `-g`/`--global` and `-a`/`--all` flags from `init` command — now always interactive
- Removed `-g`/`--global` flag from `add` command

### Changed
- Updated all CLI references across docs, README, FAQ, index.html, and source code

## [1.2.6] - 2026-02-25

### Added
- Added `ck-plan-red-team` variant command (adversarial plan review from ClaudeKit)

### Changed
- Fixed `@agent-name` convention across all skills, prompts, templates, and INIT.md — now uses backtick format (e.g., `` `code-reviewer` agent ``)
- Updated all 12 agents with ClaudeKit enhancements (skills activation, memory maintenance, hook-injected report naming)
- Added "(if installed)" qualifier to `repomix` references across 6 agent files and 1 template
- Added "(if available)" qualifier to `ai-multimodal`, `ui-ux-pro-max`, `media-processing` skill references
- Fixed `document-skills` → `docs-seeker` in researcher agent (removed duplicate)
- Fixed prompt references: `SlashCommand(/scout)` → `/ck-scout`, removed stale `SlashCommand` suffixes
- Replaced `project-manager` agent references (doesn't exist in CoKit) with direct actions

### Removed
- Removed "Team Mode" sections from all 11 agents (not supported by Copilot subagent model)

## [1.2.5] - 2026-02-23

### Removed
- Removed `ck-journal` and `ck-preview` prompts (and templates)
- Removed flowchart nodes/edges and table entries for journal/preview in landing page

### Changed
- Updated prompt counts across all docs (27 → 25 prompts)
- Updated resource-origins.yml mappings (removed ck.journal, ck.preview)

## [1.2.4] - 2026-02-12

### Added
- Added `/ck-spec-tasks` to suggested next steps in `ck-plan`, `ck-plan-fast`, `ck-plan-hard` prompts
- Added `ck-spec-tasks` node to flowchart between plan and cook stages

### Changed
- Redesigned hero section: side-by-side layout with inline video player (replaces floating button + modal)
- Video plays inline on click with overlay, pauses back to poster state on end
- Updated flowchart edges: plan → spec-tasks → cook (previously plan → cook directly)
- Updated `cokit-sync-and-maintenance-guide.md` navigation table and ASCII diagram
- Bumped version to 1.2.4 across landing page, README, package.json, and docs

## [1.2.3] - 2026-02-12

### Added
- Video intro for landing page
- Variant commands visualization in flowchart and Deep Dive sections

### Changed
- Improved flowchart UX with zoom controls, hash navigation, and better node spacing
- Added drag-to-pan, styled scrollbar, and vertical scroll for flowchart
- Cross-referenced `ck-*` and `ck-spec-*` commands in suggested next steps
- Synced templates with latest source files

## [1.2.2] - 2026-02-11

### Changed
- Removed all Claude Code references from agents, prompts, and skills for full Copilot compatibility
- Replaced Claude Code tool names (Glob, Grep, Read, WebSearch, Task tool) with generic terms across 45 files
- Rewrote `ck-preview` execution section: `run_in_background`/`KillShell` replaced with `execute/runInTerminal`, fixed variable syntax `{{path}}` to `${input}`
- Removed invalid frontmatter fields (`scripts`, `handoffs`, `agent_scripts`) from 8 spec-kit prompt files
- Removed unsupported `version` and `license` fields from 25 SKILL.md files
- Fixed `problem-solving` skill name to lowercase (Copilot spec requires lowercase, hyphens only)
- Replaced Claude Code agent patterns (`Explore` agents, `TaskCreate`, `TaskUpdate`) with generic instructions in 4 skills

## [1.2.1] - 2026-02-10

### Changed
- Added install hint in hero section (cd into project folder first)
- Bumped version to 1.2.1

## [1.2.0] - 2026-02-10

### Added
- 3 new agents: `code-simplifier`, `fullstack-developer`, `ui-ux-designer`
- Additional prompts expanding command coverage to 28 total
- 20 new skill directories (27 total, up from 7)

### Changed
- Updated all documentation to reflect v1.2.0 resource counts
- Updated version references across 15 documentation files

### Fixed
- General cleanup and housekeeping

## [1.1.0] - 2026-02-03

### Added
- SpecKit sync pipeline merging ClaudeKit + SpecKit into unified `ck.*` namespace
- v2 sync engine (`eng/sync.mjs`) with ETL transform pipeline
- ClaudeKit transformer (`eng/transform-claudekit.mjs`)
- SpecKit transformer (`eng/transform-speckit.mjs`)
- Navigation patcher (`eng/patch-navigation.mjs`) for workflow suggestions
- Config validator (`eng/validate-config.mjs`)
- Conversion scripts: `convert-agents.mjs`, `convert-commands.mjs`, `convert-skills.mjs`
- Rewrite and cleanup scripts: `rewrite-single-agent.mjs`, `clean-claude-references.mjs`
- User-focused README and documentation index (`docs/README.md`)
- `resource-origins.yml` as single source of truth for command mappings

### Changed
- Prompts now use unified `ck.*` namespace (previously mixed naming)
- Prepared package for npm publishing as `cokit-cli`

## [1.0.9] - 2026-01-20

### Changed
- Comprehensive documentation update and changelog restructuring
- Consolidated project docs in `docs/` directory

## [1.0.8] - 2026-01-13

### Changed
- Updated agent and prompt descriptions
- Major cleanup: removed non-coding resources and Claude Code references

## [1.0.7] - 2026-01-13

### Added
- Core agents, prompts, and skills
- VS Code settings configuration

### Changed
- Added permission checks and improved prompt instructions

## [1.0.5] - 2026-01-09

### Added
- Update checker with 24-hour cache (`utils/update-checker.js`)
- All resources included in npm publish (prompts, skills, instructions)
- Rules documentation for Copilot files

### Changed
- Updated templates and git commit tooling
- Cleaned up unused resources (claude-code, ai-multimodal)

## [1.0.1] - 2026-01-07

### Added
- `ck-` prefix to all prompts, instructions, and skills for namespace consistency

## [1.0.0] - 2026-01-06

### Added
- Initial release
- CLI tool with `init`, `add`, `list`, `doctor`, `update` commands
- Phase 1: CLI implementation (`src/`)
- Phase 2: Repo-level templates (`.github/`, `.vscode/`)
- Phase 3: User-level skills (`skills/`)
- Phase 4: Prompt files (`prompts/`)
- Phase 5: Project documentation (`docs/`)
- CC BY-NC 4.0 license
