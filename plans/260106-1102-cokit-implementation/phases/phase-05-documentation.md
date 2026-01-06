# Phase 5: Simple Documentation

**Effort:** 3h | **Status:** Pending

## Objective

Create beginner-friendly docs that non-technical users can follow in 2 minutes.

## Principles

- **No jargon** - Plain English only
- **Screenshots everywhere** - Show, don't tell
- **Copy-paste ready** - Commands users can run directly
- **Quick wins** - Working in 30 seconds

## README.md Structure

```markdown
# CoKit 🚀

Make GitHub Copilot smarter in 30 seconds.

## Quick Start

```bash
npx cokit init
```

That's it! Now open VS Code and try `/fix` in Copilot Chat.

[Screenshot of Copilot Chat with /fix]

## What You Get

### Prompts (type in Copilot Chat)
| Command | What it does |
|---------|--------------|
| `/fix`  | Debug and fix code issues |
| `/plan` | Create implementation plans |
| `/review` | Review code before committing |
| `/test` | Write tests for your code |
| `/code` | Implement from a plan |
| `/docs` | Update documentation |

[GIF showing /fix in action]

### Skills (automatic)
CoKit teaches Copilot how to:
- Debug systematically (not randomly)
- Review code like a senior dev
- Plan before coding

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

## Troubleshooting

Run the doctor:
```bash
npx cokit doctor
```

[Screenshot of cokit doctor output]

### Common Issues

**"Copilot doesn't see my prompts"**
→ Restart VS Code after running `npx cokit init`

**"Skills not working"**
→ Enable in VS Code: Settings → `github.copilot.chat.useAgentSkills`

**"Command not found"**
→ Make sure you have Node.js installed

## Updating

```bash
npx cokit update
```

## License

CC BY-NC 4.0 - Free for personal/educational use.
```

## Additional Docs

### QUICK-START.md (1-page TL;DR)

```markdown
# 30-Second Setup

1. Run: `npx cokit init`
2. Open VS Code
3. Type `/fix` in Copilot Chat
4. Done! 🎉
```

### FAQ.md

| Question | Answer |
|----------|--------|
| What's the difference between repo and global? | Repo = this project only, Global = all your projects |
| Do I need to edit any files? | No, just run the command |
| Does this work with JetBrains? | Prompts yes, Skills maybe |
| How do I add my own prompts? | Copy any `.prompt.md` file and modify |

### docs/migration-guide.md

For Claude Code users - explains differences:
- No hooks (static config only)
- No multi-agent (manual prompt chaining)
- No $ARGUMENTS (user provides context)

## Visual Assets Needed

| Asset | Purpose |
|-------|---------|
| terminal-init.png | Running `npx cokit init` |
| vscode-after.png | VS Code with prompts visible |
| fix-prompt.gif | Using `/fix` in action |
| doctor-output.png | `cokit doctor` results |

## Tasks

- [ ] 5.1 Write README.md (beginner-focused)
- [ ] 5.2 Create QUICK-START.md one-pager
- [ ] 5.3 Create FAQ.md
- [ ] 5.4 Write migration guide (for Claude Code users)
- [ ] 5.5 Take screenshots after CLI works
- [ ] 5.6 Record GIFs after prompts work
- [ ] 5.7 Add npm badge + license badge
- [ ] 5.8 Test with non-technical user

## Validation

- [ ] Complete beginner can follow README
- [ ] No unexplained jargon
- [ ] All screenshots current
- [ ] All commands copy-paste ready
- [ ] FAQ covers issues from testing
- [ ] Mobile-readable (short lines, tables)
