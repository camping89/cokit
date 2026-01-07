# Migration Guide: Claude Code to CoKit

This guide helps Claude Code users adapt to GitHub Copilot with CoKit.

## Key Differences

| Feature | Claude Code | CoKit/Copilot |
|---------|-------------|---------------|
| Commands | `/fix:types`, `/plan:auto` | `/ck-fix`, `/ck-plan` |
| Arguments | `$ARGUMENTS` variable | User provides in chat |
| Subagents | Task tool with agents | Single Copilot agent |
| Hooks | Pre/post execution | Not supported |
| Skills | `~/.claude/skills/` | `~/.copilot/skills/ck-*/` |
| Prompts | `~/.claude/commands/` | `.github/prompts/ck-*.prompt.md` |

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

## Mapping Claude Skills to CoKit

| Claude Skill | CoKit Skill | Notes |
|--------------|-------------|-------|
| debugging | ck-debugging | Same methodology |
| code-review | ck-code-review | Same principles |
| planning | ck-planning | Simplified workflow |
| docs-seeker | ck-docs-seeker | Same search patterns |
| sequential-thinking | ck-sequential-thinking | Same approach |

## What Works the Same

- **Core methodology** - Debugging, planning, review processes
- **YAGNI/KISS/DRY** - Same principles apply
- **Quality standards** - Same expectations
- **File structure** - Similar organization

## Quick Migration

1. Install CoKit:
   ```bash
   npx cokit init --all
   ```

2. Use prompts directly:
   ```
   /ck-fix (describe your issue)
   /ck-plan (describe your feature)
   ```

3. Skills work automatically - no changes needed.

## Tips for Claude Users

1. **Be descriptive** - Without $ARGUMENTS, include context in chat
2. **One step at a time** - No multi-agent orchestration
3. **Explicit instructions** - Put everything in the prompt
4. **Manual verification** - No automatic hooks

## Getting Help

- [FAQ](../FAQ.md) - Common questions
- [README](../README.md) - Full documentation
- Run `npx cokit doctor` for setup issues
