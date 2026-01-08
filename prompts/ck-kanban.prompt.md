---
agent: 'agent'
description: 'Plans directory (default: .s)'
tools: ['search/codebase', 'read/terminalLastCommand']
---

Plans dashboard with progress tracking and timeline visualization.

## Usage

- `/kanban` - View dashboard for .s directory
- `/kanban plans/` - View dashboard for specific directory
- `/kanban --stop` - Stop running server

## Features

- Plan cards with progress bars
- Phase status breakdown (completed, in-progress, pending)
- Timeline/Gantt visualization
- Activity heatmap
- Issue and branch links

## Execution

**IMPORTANT:**  This makes the server visible in `/tasks` and manageable via `KillShell`.

Check if this script is located in the current workspace or in  directory:
- If in current workspace: `$SKILL_DIR_PATH` = 
- If in home directory: `$SKILL_DIR_PATH` = 

### Stop Server

If `--stop` flag is provided:

```bash
node $SKILL_DIR_PATH/scripts/server.cjs --stop
```

### Start Server

Otherwise, run the kanban server as CC background task with `--foreground` flag (keeps process alive for CC task management):

```bash
# Determine plans directory
INPUT_DIR="${dir}"
PLANS_DIR="${INPUT_DIR:-.s}"

# Start kanban dashboard
node $SKILL_DIR_PATH/scripts/server.cjs \
  --dir "$PLANS_DIR" \
  --host 0.0.0.0 \
  --open \
  --foreground
```

**Critical:** ## Future Plans

The `/kanban` command will evolve into **VibeKanban-inspired** AI agent orchestration:

### Phase 1 (Current - MVP)
- ✅ Task board with progress tracking
- ✅ Visual representation of plans/tasks
- ✅ Click to view plan details

### Phase 2 (Worktree Integration)
- Create tasks → spawn git worktrees
- Assign agents to tasks
- Track agent progress per worktree

### Phase 3 (Full Orchestration)
- Parallel agent execution monitoring
- Code diff/review interface
- PR creation workflow
- Agent output streaming
- Conflict detection

Track progress: https://github.com/claudekit/claudekit-engineer/issues/189
