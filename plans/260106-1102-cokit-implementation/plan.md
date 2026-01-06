---
title: "CoKit: Claude Code to GitHub Copilot Port"
description: "Full port of Claude Code workflow patterns to GitHub Copilot with easy CLI"
status: pending
priority: P1
effort: 16h
branch: main
tags: [cokit, copilot, port, cli, npm]
created: 2026-01-06
---

# CoKit Implementation Plan

## Overview

Port Claude Code patterns to GitHub Copilot with **dead-simple CLI**:
```bash
npx cokit init          # Setup in current project
npx cokit init --global # Setup personal skills
```

## User Experience Priority

Target: **Non-technical users** who want AI workflow without complexity.
- One command to install
- Simple README with screenshots
- No config files to edit manually

## Architecture

```
cokit/
├── package.json                  # npm package config
├── bin/
│   └── cokit.js                  # CLI entry point
├── src/
│   ├── cli.js                    # Command parser
│   ├── commands/
│   │   ├── init.js               # npx cokit init
│   │   ├── add.js                # npx cokit add <skill>
│   │   ├── list.js               # npx cokit list
│   │   └── update.js             # npx cokit update
│   └── utils/
│       ├── copy.js               # File operations
│       └── prompt.js             # User prompts
├── templates/
│   └── repo/                     # Repo-level templates
│       ├── .github/
│       │   ├── copilot-instructions.md
│       │   ├── AGENTS.md
│       │   ├── instructions/
│       │   ├── prompts/
│       │   └── skills/
│       └── .vscode/
│           └── settings.json     # VS Code Copilot config
├── skills/                       # User-level skills
│   ├── debugging/
│   ├── code-review/
│   ├── planning/
│   ├── docs-seeker/
│   └── sequential-thinking/
├── README.md                     # Simple getting started
└── LICENSE
```

## Key Mappings

| Claude Code | Copilot | Location |
|-------------|---------|----------|
| CLAUDE.md | copilot-instructions.md | `.github/` |
| skills/ | skills/ | `.github/skills/` or `~/.copilot/skills/` |
| agents/*.md | AGENTS.md | `.github/` (merged sections) |
| commands/*.md | prompts/*.prompt.md | `.github/prompts/` |
| workflows/*.md | instructions/*.instructions.md | `.github/instructions/` |
| hooks | N/A | Skip - no equivalent |

## Limitations (From Research)

- **No hooks:** Static config only, no runtime injection
- **No multi-agent:** Single agent, manual prompt chaining
- **No $ARGUMENTS:** User provides context in chat
- **No session state:** Stateless between interactions

## Phases

| Phase | Description | Effort | Link |
|-------|-------------|--------|------|
| 1 | CLI tool (npm package) | 4h | [phase-01](./phases/phase-01-cli-tool.md) |
| 2 | Repo templates | 3h | [phase-02](./phases/phase-02-repo-level-templates.md) |
| 3 | User skills (5 core) | 4h | [phase-03](./phases/phase-03-user-level-skills.md) |
| 4 | Prompt files (6 core) | 2h | [phase-04](./phases/phase-04-prompt-files.md) |
| 5 | Simple docs + README | 3h | [phase-05](./phases/phase-05-documentation.md) |

## CLI Commands

```bash
npx cokit init              # Init repo templates (.github/)
npx cokit init --global     # Init user skills (~/.copilot/skills/)
npx cokit init --all        # Both repo + user
npx cokit add <skill>       # Add specific skill
npx cokit list              # Show installed skills/prompts
npx cokit update            # Update to latest version
npx cokit doctor            # Check setup + troubleshoot
```

## Success Criteria

- [ ] `npx cokit init` works without prior install
- [ ] Interactive prompts guide non-technical users
- [ ] README has screenshots and GIFs
- [ ] All 5 core skills ported
- [ ] All 6 core prompts ported
- [ ] VS Code settings template included
- [ ] `cokit doctor` diagnoses common issues

## Dependencies

- GitHub Copilot Agent Mode (Feb 2025+)
- VS Code with Copilot extension
- Agent Skills support (Dec 2025+)

## Unresolved Questions

1. Does `~/.copilot/skills/` discovery work in JetBrains IDEs?
2. Can skills reference scripts with relative paths across platforms?
3. How does Copilot handle conflicting skills at repo vs user level?
