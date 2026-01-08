---
agent: 'agent'
description: 'Path to file or directory to preview'
tools: ['search/codebase', 'read/terminalLastCommand']
---

Universal viewer using `markdown-novel-viewer` skill - pass ANY path and see it rendered nicely.

## Usage

- `/preview <file.md>` - View markdown file in novel-reader UI
- `/preview <directory/>` - Browse directory contents
- `/preview --stop` - Stop running server

## Examples

```bash
/preview plans/my-plan.md     # View markdown file
/preview plans/                    # Browse plans directory
/preview docs/                     # Browse docs directory
/preview any/path/to/file.md      # View any markdown file
/preview any/path/                 # Browse any directory
```

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

Otherwise, run the `markdown-novel-viewer` server as CC background task with `--foreground` flag (keeps process alive for CC task management):

```bash
# Determine if path is file or directory
INPUT_PATH="${path}"
if [[ -d "$INPUT_PATH" ]]; then
  # Directory mode - browse
  node $SKILL_DIR_PATH/scripts/server.cjs \
    --dir "$INPUT_PATH" \
    --host 0.0.0.0 \
    --open \
    --foreground
else
  # File mode - view markdown
  node $SKILL_DIR_PATH/scripts/server.cjs \
    --file "$INPUT_PATH" \
    --host 0.0.0.0 \
    --open \
    --foreground
fi
```

**Critical:** 