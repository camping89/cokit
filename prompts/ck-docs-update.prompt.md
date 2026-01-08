---
agent: 'agent'
description: 'Analyze the codebase and update documentation'
tools: ['search/codebase', 'search/changes']
---

## Phase 1: Parallel Codebase Scouting

**You (main agent) must 

1. Run `ls -la` to identify actual project directories
2. Spawn 2-4 `scout-external` (preferred, uses Gemini 2M context) or `scout` (fallback) via 
3. Target directories **that actually exist** - adapt to project structure, don't hardcode paths
4. Merge scout results into context summary

## Phase 2: Documentation Update (docs-manager Agent)

Pass the gathered file list to `docs-manager` agent to update documentation:
- `README.md`: Update README (keep it under 300 lines)
- `docs/project-overview-pdr.md`: Update project overview and PDR (Product Development Requirements)
- `./docs/codebase-summary.md`: Update codebase summary
- ``: Update codebase structure and code standards
- `docs/system-architecture.md`: Update system architecture
- `docs/project-roadmap.md`: Update project roadmap
- `docs/deployment-guide.md` [optional]: Update deployment guide
- `docs/design-guidelines.md` [optional]: Update design guidelines

## Additional requests
<additional_requests>
  ${input}
</additional_requests>

## Important
- Use `docs/` directory as the source of truth for documentation.

**IMPORTANT**: **Do not** start implementing.
