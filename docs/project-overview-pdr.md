# CoKit Project Overview

## Product Vision
Make GitHub Copilot smarter in 30 seconds via curated prompts, agents, and workflows.

## Problem
- Copilot lacks structured workflows for complex tasks
- No spec-driven development support
- Manual prompt engineering for each project

## Solution
CoKit CLI installs pre-built resources to `~/.copilot/`:
- **27 prompts**: ClaudeKit (ck-*) + SpecKit (ck-spec-*)
- **12 agents**: brainstormer, planner, tester, code-simplifier, fullstack-developer, ui-ux-designer, etc.
- **27 skills**: debugging, planning, code-review, frontend-design, databases, devops, etc.
- **5 collections**: bundled workflows

## Key Features

| Feature | Description |
|---------|-------------|
| Two Workflows | `ck-*` (flexible) vs `ck-spec-*` (spec-driven) |
| Sync Pipeline | Auto-merge upstream ClaudeKit + SpecKit |
| Navigation | Cross-command suggestions in all prompts |
| Global Install | Single `npx cokit-cli init -g` command |

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
