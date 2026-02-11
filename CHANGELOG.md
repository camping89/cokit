# Changelog

All notable changes to CoKit are documented in this file.

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
