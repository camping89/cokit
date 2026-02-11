# FAQ

## Installation

### What's the difference between repo and global?

| Type | Location | Scope | Share with Team |
|------|----------|-------|-----------------|
| Repo | `.github/` | This project only | Yes (via git) |
| Global | `~/.copilot/skills/` | All your projects | No |

### Do I need to edit any files?

No. Just run `npx cokit init` and you're done.

### Can I customize the prompts?

Yes! Edit any `.prompt.md` file in `.github/prompts/`.

### Does this work with JetBrains IDEs?

- **Prompts**: Yes
- **Skills**: Partial support (check JetBrains docs)

## Usage

### How do I use a prompt?

Type the prompt name in Copilot Chat:
```
/ck-fix my login function throws an error
```

### Why isn't Copilot responding to my prompts?

1. Restart VS Code after installing
2. Make sure Copilot extension is active
3. Run `npx cokit doctor` to check setup

### Can I add my own prompts?

Yes! Create a file like `.github/prompts/my-prompt.prompt.md`:
```yaml
---
mode: agent
description: What this prompt does
---
Your instructions here...
```

## Technical

### What files does CoKit create?

**Repo-level (`.github/`):**
- `copilot-instructions.md` - Project rules
- `AGENTS.md` - Agent behavior
- `agents/*.agent.md` - 9 agent files
- `prompts/ck-*.prompt.md` - 14 prompt files
- `skills/ck-*/SKILL.md` - 7 skill directories
- `instructions/ck-*.instructions.md` - 5 instruction files
- `collections/*.collection.yml` - 5 collection files

### Does CoKit modify my code?

No. It only creates configuration files for Copilot.

### How do I uninstall?

Delete the files:
```bash
rm -rf .github/prompts .github/skills .github/instructions
rm .github/copilot-instructions.md .github/AGENTS.md
```

For global:
```bash
rm -rf ~/.copilot/skills
```

## Troubleshooting

### "Permission denied" error

Use sudo (macOS/Linux) or run as admin (Windows):
```bash
sudo npx cokit init --global
```

### "Node.js not found"

Install Node.js 18+ from https://nodejs.org

### Skills not working

Enable in VS Code settings:
```json
{
  "github.copilot.chat.useAgentSkills": true
}
```
