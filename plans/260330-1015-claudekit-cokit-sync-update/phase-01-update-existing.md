---
phase: 1
status: pending
priority: high
effort: 1.5h
---

# Phase 1: Update Existing Skills + Agents

## Overview

Copy latest versions of 23 skills + 12 agents from ClaudeKit source. ClaudeKit already has Copilot-compatible frontmatter, so this is a direct copy operation.

## Key Insight

ClaudeKit skills now have: `ck:` prefix in name, `license: MIT`, `argument-hint`, `metadata.author/version`. CoKit has old versions missing these fields. Direct copy brings CoKit up to date.

## Skills to Update (23)

Copy entire skill directory from `~/.claude/skills/{name}/` → `cokit/skills/{name}/`

| # | Skill | CoKit dir name | Days behind |
|---|-------|---------------|-------------|
| 1 | agent-browser | agent-browser | 47 |
| 2 | backend-development | backend-development | 47 |
| 3 | brainstorm | brainstorm | 33 |
| 4 | code-review | code-review | 33 |
| 5 | common | common | 47 |
| 6 | context-engineering | context-engineering | 47 |
| 7 | cook | cook | 33 |
| 8 | databases | databases | 47 |
| 9 | ck-debug | debug | 33 |
| 10 | devops | devops | 47 |
| 11 | docs-seeker | docs-seeker | 47 |
| 12 | fix | fix | 33 |
| 13 | frontend-design | frontend-design | 33 |
| 14 | git | git | 47 |
| 15 | mcp-management | mcp-management | 47 |
| 16 | mermaidjs-v11 | mermaidjs-v11 | 54 |
| 17 | planning | planning | 47 |
| 18 | problem-solving | problem-solving | 47 |
| 19 | repomix | repomix | 47 |
| 20 | research | research | 33 |
| 21 | scout | scout | 33 |
| 22 | sequential-thinking | sequential-thinking | 47 |
| 23 | ui-styling | ui-styling | 47 |
| 24 | web-testing | web-testing | 33 |

**Note:** `ck-debug` in ClaudeKit → `debug` in CoKit. Keep CoKit directory name.

## Agents to Update (12)

Copy from `~/.claude/agents/{name}.md` → `cokit/agents/{name}.agent.md`

| # | Agent | Source | Target |
|---|-------|--------|--------|
| 1 | brainstormer | brainstormer.md | brainstormer.agent.md |
| 2 | code-reviewer | code-reviewer.md | code-reviewer.agent.md |
| 3 | code-simplifier | code-simplifier.md | code-simplifier.agent.md |
| 4 | debugger | debugger.md | debugger.agent.md |
| 5 | docs-manager | docs-manager.md | docs-manager.agent.md |
| 6 | fullstack-developer | fullstack-developer.md | fullstack-developer.agent.md |
| 7 | git-manager | git-manager.md | git-manager.agent.md |
| 8 | planner | planner.md | planner.agent.md |
| 9 | researcher | researcher.md | researcher.agent.md |
| 10 | scout | scout.md | scout.agent.md |
| 11 | tester | tester.md | tester.agent.md |
| 12 | ui-ux-designer | ui-ux-designer.md | ui-ux-designer.agent.md |

## Implementation Steps

### Step 1: Copy Skills
```bash
# For each skill directory, rsync from ClaudeKit to CoKit
# Handle ck-debug → debug name mapping
for skill in agent-browser backend-development brainstorm code-review common context-engineering cook databases devops docs-seeker fix frontend-design git mcp-management mermaidjs-v11 problem-solving repomix research scout sequential-thinking ui-styling web-testing; do
  cp -r ~/.claude/skills/$skill/* cokit/skills/$skill/
done

# Special case: ck-debug → debug
cp -r ~/.claude/skills/ck-debug/* cokit/skills/debug/
```

### Step 2: Copy Agents
```bash
for agent in brainstormer code-reviewer code-simplifier debugger docs-manager fullstack-developer git-manager planner researcher tester ui-ux-designer; do
  cp ~/.claude/agents/$agent.md cokit/agents/$agent.agent.md
done
# scout agent (if exists in ClaudeKit)
cp ~/.claude/agents/scout.md cokit/agents/scout.agent.md 2>/dev/null || true
```

### Step 3: Verify Copilot Frontmatter
Check each copied skill has required Copilot fields:
- `name` with `ck:` prefix
- `description`
- `license: MIT` (optional but recommended)

### Step 4: Handle planning skill
Check if `~/.claude/skills/planning/` exists or if it maps to `ck-plan`. The CoKit `planning` directory may be a CoKit-native skill that should be preserved or replaced.

## Post-Copy Verification

```bash
# Count files
ls cokit/skills/*/SKILL.md | wc -l  # Should be 24
ls cokit/agents/*.agent.md | wc -l  # Should be 12

# Check frontmatter
grep -l "^name:" cokit/skills/*/SKILL.md | wc -l
```

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| ClaudeKit references `$ARGUMENTS` | Low | Skills use `${input}` already in latest |
| Skill references Claude-specific features | Medium | Post-copy grep for `claude code`, `Claude` references |
| planning dir naming conflict | Low | Verify mapping before overwrite |

## Success Criteria

- [ ] 24 skill directories updated with latest content
- [ ] 12 agent files updated
- [ ] All skills have Copilot-compatible frontmatter
- [ ] No broken references
