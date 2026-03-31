# CoKit Project Overview

## Product Vision
Make GitHub Copilot smarter in 30 seconds via curated prompts, agents, and workflows.

## Problem
- Copilot lacks structured workflows for complex tasks
- Manual prompt engineering for each project

## Solution
CoKit CLI installs pre-built resources to `~/.copilot/`:
- **31 prompts**: CoKit (ck-*)
- **13 agents**: brainstormer, planner, tester, code-simplifier, fullstack-developer, ui-ux-designer, project-manager, etc.
- **30 skills**: debugging, planning, code-review, frontend-design, databases, devops, deploy, ship, security, etc.
- **5 collections**: bundled workflows

## Key Features

| Feature | Description |
|---------|-------------|
| Unified Workflow | `ck-*` commands for all development tasks |
| Sync Pipeline | Transform upstream commands to ck-* namespace |
| Navigation | Cross-command suggestions in all prompts |
| Install | Single `npx cokit-cli init` command |

## Target Users
- Developers using GitHub Copilot
- Teams needing structured AI workflows
- Projects requiring formal specifications

## Success Metrics
- Install time < 30 seconds
- Sync time < 30 seconds
- 27+ prompts available post-install
- 12+ agents available post-install
- 27+ skills available post-install

## Roadmap
See [project-roadmap.md](project-roadmap.md)

## Tech Stack
- Node.js >= 18
- ES Modules (.mjs)
- Dependencies: commander, prompts, chalk, globby, gray-matter, js-yaml
