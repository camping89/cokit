# CoKit

Make GitHub Copilot smarter in 30 seconds.

[![npm version](https://img.shields.io/npm/v/cokit.svg)](https://www.npmjs.com/package/cokit)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

## Quick Start

```bash
npx cokit init
```

That's it! Now open VS Code and try `/ck-fix` in Copilot Chat.

## What You Get

### Prompts (type in Copilot Chat)

| Command | What it does |
|---------|--------------|
| `/ck-fix` | Debug and fix code issues |
| `/ck-plan` | Create implementation plans |
| `/ck-review` | Review code before committing |
| `/ck-test` | Write tests for your code |
| `/ck-code` | Implement from a plan |
| `/ck-docs` | Update documentation |

> **Why `ck-` prefix?** Prevents conflicts with other tools. Easy to identify CoKit prompts.

### Skills (automatic)

CoKit teaches Copilot how to:
- Debug systematically (not randomly)
- Review code like a senior dev
- Plan before coding
- Find documentation efficiently
- Think through complex problems

## Installation Options

### Option 1: Project Only (Recommended)

```bash
npx cokit init
```

Creates files in `.github/` - share with your team via git.

### Option 2: Personal Skills

```bash
npx cokit init --global
```

Creates files in `~/.copilot/skills/` - works in all projects.

### Option 3: Both

```bash
npx cokit init --all
```

## Commands

| Command | Description |
|---------|-------------|
| `cokit init` | Set up CoKit in your project |
| `cokit add <skill>` | Add a specific skill |
| `cokit list` | Show available skills and prompts |
| `cokit doctor` | Check your setup |
| `cokit update` | Update to latest version |

## Troubleshooting

Run the doctor:

```bash
npx cokit doctor
```

### Common Issues

**"Copilot doesn't see my prompts"**
- Restart VS Code after running `npx cokit init`

**"Skills not working"**
- Enable in VS Code: Settings → `github.copilot.chat.useAgentSkills`

**"Command not found"**
- Make sure you have Node.js 18+ installed

## For Claude Code Users

Migrating from Claude Code? See [Migration Guide](docs/migration-guide.md).

Key differences:
- No hooks (static config only)
- No subagents (single Copilot agent)
- No `$ARGUMENTS` (user provides context in chat)

## Documentation

- [Quick Start](QUICK-START.md) - 30-second setup
- [FAQ](FAQ.md) - Common questions
- [Migration Guide](docs/migration-guide.md) - For Claude Code users

## License

CC BY-NC 4.0 - Free for personal and educational use.

Commercial use requires a license. Contact for details.
