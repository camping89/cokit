# GitHub Copilot Rules

Rules để tạo và verify các file types cho GitHub Copilot.

## File Types

| File | Extension | Location |
|------|-----------|----------|
| [Agents](README.agents.md) | `.agent.md` | `.github/agents/` |
| [Skills](README.skills.md) | `SKILL.md` | `.github/skills/*/` |
| [Prompts](README.prompts.md) | `.prompt.md` | `.github/prompts/` |
| [Instructions](README.instructions.md) | `copilot-instructions.md` | `.github/` |
| [File-Specific Instructions](README.file-instructions.md) | `.instructions.md` | `.github/instructions/` |
| [Collections](README.collections.md) | `.collection.yml` | `.github/collections/` |

## Directory Structure

```
.github/
├── copilot-instructions.md
├── agents/
│   └── *.agent.md
├── prompts/
│   └── *.prompt.md
├── instructions/
│   └── *.instructions.md
├── skills/
│   └── skill-name/
│       └── SKILL.md
└── collections/
    └── *.collection.yml
```

## Sources

- [Custom Agents Configuration - GitHub Docs](https://docs.github.com/en/copilot/reference/custom-agents-configuration)
- [Agent Skills in VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
- [Prompt Files in VS Code](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [Awesome Copilot Repository](https://github.com/github/awesome-copilot)
