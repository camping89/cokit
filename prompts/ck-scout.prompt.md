---
agent: 'agent'
description: 'Scout given directories to respond to the user\'s requests'
tools: ['search/codebase', 'search/changes']
---

## Purpose

Search the codebase for files needed to complete the task using a fast, token efficient agent.

## Variables

USER_PROMPT: $1
SCALE: $2 (defaults to 3)
REPORT_OUTPUT_DIR: Use `Report:` from `## Naming` section

## Workflow:**How to prompt the agents:**
- IMPORTANT: Kick these agents off  using the , analyze and divide folders for each agent to scout intelligently and quickly.
- IMPORTANT: Instruct the agents to quickly search the codebase for files needed to complete the task. This isn't about a full blown search, just a quick search to find the files needed to complete the task.
- Instruct the  use a timeout of 3 minutes for each agent's bash call. Skip any agents that don't return within the timeout, don't restart them.

**How to write reports:**

- **IMPORTANT:** Sacrifice grammar for the sake of concision when writing reports.
- **IMPORTANT:** In reports, list any unresolved questions at the end, if any.
