---
name: scout
description: Fast codebase scouting using parallel agents. Use for file discovery, task context gathering, quick searches across directories. Supports internal and external search agents.
---

# Scout

Fast, token-efficient codebase scouting using parallel agents to find files needed for tasks.

## Arguments
- Default: Scout using built-in search agents in parallel (`./references/internal-scouting.md`)
- `ext`: Scout using external Gemini/OpenCode CLI tools in parallel (`./references/external-scouting.md`)

## When to Use

- Beginning work on feature spanning multiple directories
- User mentions needing to "find", "locate", or "search for" files
- Starting debugging session requiring file relationships understanding
- User asks about project structure or where functionality lives
- Before changes that might affect multiple codebase parts

## Quick Start

1. Analyze user prompt to identify search targets
2. Use a wide range of Grep and Glob patterns to find relevant files and estimate scale of the codebase
3. Spawn parallel agents with divided directories
4. Collect results into concise report

## Configuration

Read from `$HOME/.copilot/.ck.json`:
- `gemini.model` - Gemini model (default: `gemini-3-flash-preview`)

## Workflow

### 1. Analyze Task
- Parse user prompt for search targets
- Identify key directories, patterns, file types, lines of code
- Determine optimal SCALE value of agents to spawn

### 2. Divide and Conquer
- Split codebase into logical segments per agent
- Assign each agent specific directories or patterns
- Ensure no overlap, maximize coverage

### 3. Register Scout Tasks

**Skip this step if agent count <= 2.**

- Check for existing scout tasks in the current session to avoid duplicates.
- Create a markdown checklist — one entry per agent — including scope metadata (directories, patterns assigned).
- Example checklist entry: `- [ ] Agent 1: src/api/*, src/models/* — searching for auth-related files`
- Reference: `references/task-management-scouting.md` for checklist format and metadata fields.

### 4. Spawn Parallel Agents

Load appropriate reference based on decision tree:
- **Internal (Default):** `references/internal-scouting.md` (search agents)
- **External:** `references/external-scouting.md` (Gemini/OpenCode)

**Notes:**
- Update each task to in_progress before spawning its agent.
- Prompt detailed instructions for each agent with exact directories or files it should read.
- Remember that each agent has less than 200K tokens of context window.
- Amount of agents to-be-spawned depends on the current system resources available and amount of files to be scanned.
- Each agent must return a detailed summary report to a main agent.

### 5. Collect Results
- Timeout: 3 minutes per agent (skip non-responders).
- Update completed tasks to done; log timed-out agents in the report under "Unresolved Questions".
- Aggregate findings into single report.
- List unresolved questions at end.

## Report Format

```markdown
# Scout Report

## Relevant Files
- `path/to/file.ts` - Brief description
- ...

## Unresolved Questions
- Any gaps in findings
```

## References

- `references/internal-scouting.md` - Using search agents
- `references/external-scouting.md` - Using Gemini/OpenCode CLI
- `references/task-management-scouting.md` - Checklist format and scope metadata for scout tasks
