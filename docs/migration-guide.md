# Migration Guide: Claude Code to CoKit

This guide helps Claude Code users adapt to GitHub Copilot with CoKit.

## Key Differences

| Feature | Claude Code | CoKit/Copilot |
|---------|-------------|---------------|
| Commands | `/fix:types`, `/plan:auto` | `/ck-fix`, `/ck-plan`, `/ck-cook`, etc. |
| Arguments | `$ARGUMENTS` variable | User provides in chat |
| Subagents | Task tool delegates to agents | Referenced in prompts |
| Hooks | Pre/post execution | Not supported |
| Skills | `~/.claude/skills/` | `~/.copilot/skills/ck-*/` |
| Prompts | `~/.claude/commands/` | `.github/prompts/ck-*.prompt.md` |
| Instructions | `.claude/instructions/` | `.github/instructions/ck-*.instructions.md` |
| Collections | Manual management | `.github/collections/ck-*.collection.yml` |

## What's Different

### No Sub-Commands

**Claude Code:**
```
/fix:types     # Fix type errors
/fix:tests     # Fix test failures
```

**Copilot:**
```
/ck-fix the type errors in auth.ts
/ck-fix the failing tests in user.test.ts
```

Provide context directly in your message.

### No $ARGUMENTS Variable

**Claude Code prompt:**
```markdown
Fix the issue: $ARGUMENTS
```

**Copilot prompt:**
```markdown
Fix the issue described by the user.
```

Users describe the issue in chat naturally.

### No Subagent Delegation

**Claude Code:**
```
Use Task tool to launch tester agent
```

**Copilot:**
```
Run tests and analyze results
```

Copilot handles everything in one agent.

### No Hooks

Claude Code hooks (pre/post commands) don't exist in Copilot.

**Workaround:** Include instructions in the prompt itself:
```markdown
Before fixing:
1. Read the error message
2. Find the root cause

After fixing:
1. Run tests
2. Verify the fix works
```

## Mapping Claude Skills & Agents to CoKit

| Claude Feature | CoKit Equivalent | Notes |
|---|---|---|
| debugging skill | ck-debugging + debugger agent | Same root cause methodology |
| code-review skill | ck-code-review + code-reviewer agent | Same verification principles |
| planning skill | ck-planning + planner agent | Structured workflow |
| docs-seeker skill | researcher agent | Documentation discovery |
| sequential-thinking skill | ck-sequential-thinking | Same step-by-step approach |
| N/A | ck-backend-development | NEW: Backend patterns |
| N/A | ck-frontend-development | NEW: Frontend patterns |
| N/A | ck-problem-solving | NEW: Systematic solutions |
| N/A | tester agent | NEW: Test validation |
| N/A | scout agent | NEW: Codebase navigation |

## What Works the Same

- **Core methodology** - Debugging, planning, review processes
- **YAGNI/KISS/DRY** - Same principles apply
- **Quality standards** - Same expectations
- **File structure** - Similar organization

## Quick Migration

1. Install CoKit:
   ```bash
   npx cokit-cli init -a
   ```

2. Use prompts directly:
   ```
   /ck-fix (describe your issue)
   /ck-plan (describe your feature)
   /ck-cook (implement a feature)
   /ck-bootstrap (setup new project)
   ```

3. Skills and agents work automatically:
   - Agents are referenced by prompts
   - Skills auto-activate based on context

## Tips for Claude Users

1. **Be descriptive** - Without $ARGUMENTS, include context in chat
2. **Use specialized prompts** - `/ck-cook` for implementation, `/ck-bootstrap` for setup
3. **Explicit instructions** - Put everything in the prompt
4. **Manual verification** - No automatic hooks
5. **Chain workflows** - Use `/ck-plan` → `/ck-code` → `/ck-test` → `/ck-review-codebase`

## Getting Help

- [README](../README.md) - Full documentation
- [Team Presentation](./cokit-team-presentation.md) - Detailed overview
- Run `npx cokit-cli doctor` for setup issues
- Check [Project Roadmap](./project-roadmap.md) for version history
