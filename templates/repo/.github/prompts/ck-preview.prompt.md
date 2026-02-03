---
description: 'Path to markdown file, plan directory, or plans collection'
arguments:
  - name: path
    description: Path to file or directory to preview
    required: false
name: ck.preview
---

Universal viewer using `markdown-novel-viewer` skill - pass ANY path and see it rendered nicely.

## Usage

- `/ck.preview <file.md>` - View markdown file in novel-reader UI
- `/ck.preview <directory/>` - Browse directory contents
- `/ck.preview --stop` - Stop running server

## Examples

```bash
/ck.preview plans/my-plan/ck.plan.md     # View markdown file
/ck.preview plans/                    # Browse plans directory
/ck.preview docs/                     # Browse docs directory
/ck.preview any/path/to/file.md      # View any markdown file
/ck.preview any/path/                 # Browse any directory
```

## Execution

**IMPORTANT:** Run server as Claude Code background task using `run_in_background: true` with the Bash tool. This makes the server visible in `/tasks` and manageable via `KillShell`.

The skill is located at `$HOME/.copilot/skills/markdown-novel-viewer/`.

### Stop Server

If `--stop` flag is provided:

```bash
node $HOME/.copilot/skills/markdown-novel-viewer/scripts/server.cjs --stop
```

### Start Server

Otherwise, run the `markdown-novel-viewer` server as CC background task with `--foreground` flag (keeps process alive for CC task management):

```bash
# Determine if path is file or directory
INPUT_PATH="{{path}}"
if [[ -d "$INPUT_PATH" ]]; then
  # Directory mode - browse
  node $HOME/.copilot/skills/markdown-novel-viewer/scripts/server.cjs \
    --dir "$INPUT_PATH" \
    --host 0.0.0.0 \
    --open \
    --foreground
else
  # File mode - view markdown
  node $HOME/.copilot/skills/markdown-novel-viewer/scripts/server.cjs \
    --file "$INPUT_PATH" \
    --host 0.0.0.0 \
    --open \
    --foreground
fi
```

**Critical:** When calling the Bash tool:
- Set `run_in_background: true` to run as CC background task
- Set `timeout: 300000` (5 minutes) to prevent premature termination
- Parse JSON output and report URL to user

Example Bash tool call:
```json
{
  "command": "node $HOME/.copilot/skills/markdown-novel-viewer/scripts/server.cjs --dir \"path\" --host 0.0.0.0 --open --foreground",
  "run_in_background": true,
  "timeout": 300000,
  "description": "Start preview server in background"
}
```

After starting, parse the JSON output (e.g., `{"success":true,"url":"http://localhost:3456/view?file=...","networkUrl":"http://192.168.1.x:3456/view?file=..."}`) and report:
- Local URL for browser access
- Network URL for remote device access (if available)
- Inform user that server is now running as CC background task (visible in `/tasks`)

**CRITICAL:** MUST display the FULL URL including path and query string (e.g., `http://localhost:3456/view?file=/path/to/file.md`). NEVER truncate to just `host:port` (e.g., `http://localhost:3456`). The full URL is required for direct file access.

---

## Suggested Next Steps

| Command | Description |
|---------|-------------|
| `/ck.brainstorm` | Explore ideas |
| `/ck.plan` | Create plan |

**All commands:** `ck.ask`, `ck.bootstrap`, `ck.fix`, `ck.help`, `ck.journal`, `ck.plan`, `ck.plan.fast`, `ck.plan.hard`, `ck.preview`, `ck.review`, `ck.spec.analyze`, `ck.spec.checklist`, `ck.spec.clarify`, `ck.spec.constitution`, `ck.spec.implement`, `ck.spec.plan`, `ck.spec.specify`, `ck.spec.tasks`, `ck.spec.taskstoissues`, `ck.test`, `ck.watzup`
