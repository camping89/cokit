---
agent: 'agent'
description: 'Create a new agent skill'
tools: ['search/codebase', 'search/changes', 'web/fetch', 'read/problems']
---

Ultrathink.
Use `skill-creator` skill.

## Your mission
Create a new skill in  directory.

## Requirements
<user-prompt>${input}</user-prompt>

## Rules of Skill Creation:
Base on the requirements:
- Always keep in mind that `SKILL.md` and reference files should be token consumption efficient, so that **progressive disclosure** can be leveraged at best.
- `SKILL.md` is always short and concise, straight to the point, treat it as a quick reference guide.
- If you're given nothing, ask for clarifications and  to research about the topic.
- If you're given an URL, it's documentation page, explore every internal link and .
- If you receive a lot of URLs, use multiple s to explore them , .
- If you receive a lot of files, use multiple s to explore them , .
- If you're given a Github URL, use [](https://repomix.com/guide/usage) command to summarize ([install it](https://repomix.com/guide/installation) if needed) and spawn multiple s to explore it , .

**IMPORTANT:**
- Skills are not documentation, they are practical instructions for GitHub Copilot to use the tools, packages, plugins or APIs to achieve the tasks.
- Each skill teaches GitHub Copilot how to perform a specific development task, not what a tool does.
- GitHub Copilot can activate multiple skills automatically to achieve the user's request.
