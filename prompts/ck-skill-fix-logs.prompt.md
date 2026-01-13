---
agent: 'agent'
description: 'Fix the agent skill based on `logs.txt` file.'
tools: ['search/codebase', 'search/changes', 'web/fetch', 'read/problems', 'read/terminalLastCommand']
---

Think harder.
Use `skill-creator` skill.

## Your mission
Fix the agent skill based on the current `logs.txt` file (in the project root directory).

## Requirements
<user-prompt>${input}</user-prompt>

## Rules of Skill Fixing:
Base on the requirements:
- If you're given nothing, ask for clarifications and  to research about the topic.
- If you're given an URL, it's documentation page, explore every internal link and .
- If you receive a lot of URLs, use multiple s to explore them , .
- If you receive a lot of files, use multiple s to explore them , .
- If you're given a Github URL, use [](https://repomix.com/guide/usage) command to summarize ([install it](https://repomix.com/guide/installation) if needed) and spawn multiple s to explore it , .
