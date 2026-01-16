---
agent: 'agent'
description: 'Documentation workflow - init, summarize, or update docs'
tools: ['search/codebase', 'search/changes']
---

# Documentation Workflow

## Usage

- `/ck-docs` or `/ck-docs init` - Create initial documentation
- `/ck-docs summarize [topics]` - Summarize codebase documentation
- `/ck-docs update` - Update existing documentation

## Commands

### init (default)
Analyze codebase and create initial documentation:

1. **Scout codebase** - Run `ls -la` to identify project directories
2. **Create docs** in `docs/` directory:
   - `project-overview-pdr.md` - Project overview and PDR
   - `codebase-summary.md` - Codebase summary
   - `code-standards.md` - Code structure and standards
   - `system-architecture.md` - System architecture
3. **Update** `README.md` (keep under 300 lines)

### summarize [topics]
Analyze codebase based on `./docs/codebase-summary.md` and respond with summary report.

Arguments:
- `topics` - Focused topics (default: all)

### update
Analyze codebase and update existing documentation:

1. **Scout codebase** for changes
2. **Update docs** in `docs/` directory:
   - `README.md` (keep under 300 lines)
   - `project-overview-pdr.md`
   - `codebase-summary.md`
   - `code-standards.md`
   - `system-architecture.md`
   - `project-roadmap.md`
   - `deployment-guide.md` [optional]
   - `design-guidelines.md` [optional]

## Notes
- Use `docs/` directory as source of truth
- Do not scan entire codebase unless explicitly requested
- **DO NOT** start implementing - documentation only
