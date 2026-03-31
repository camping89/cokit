---
phase: 2
status: pending
priority: high
effort: 1h
---

# Phase 2: Add New Skills + Agent

## Overview

Add 7 new skills and 1 new agent from ClaudeKit that are valuable for SE/QA/BE workflows and compatible with Copilot.

## New Skills (7)

| # | Skill | Source dir | Purpose | SE/QA/BE value |
|---|-------|-----------|---------|----------------|
| 1 | test | ~/.claude/skills/test/ | Run tests, coverage analysis, build verification | QA core |
| 2 | ship | ~/.claude/skills/ship/ | Release pipeline: test→review→commit→push→PR | SE release |
| 3 | deploy | ~/.claude/skills/deploy/ | Multi-platform deploy (Vercel, Cloudflare, Docker) | DevOps/BE |
| 4 | ck-security | ~/.claude/skills/ck-security/ | STRIDE + OWASP security audit | BE security |
| 5 | bootstrap | ~/.claude/skills/bootstrap/ | Scaffold new projects with research | SE productivity |
| 6 | frontend-development | ~/.claude/skills/frontend-development/ | React/TS patterns, Suspense, MUI | FE engineer |
| 7 | project-management | ~/.claude/skills/project-management/ | Track progress, manage tasks, reports | SE management |

## New Agent (1)

| Agent | Source | Target | Purpose |
|-------|--------|--------|---------|
| project-manager | ~/.claude/agents/project-manager.md | agents/project-manager.agent.md | Project oversight, task coordination |

## Implementation Steps

### Step 1: Copy New Skills
```bash
for skill in test ship deploy ck-security bootstrap frontend-development project-management; do
  cp -r ~/.claude/skills/$skill cokit/skills/$skill
done
```

### Step 2: Copy New Agent
```bash
cp ~/.claude/agents/project-manager.md cokit/agents/project-manager.agent.md
```

### Step 3: Verify Copilot Compatibility

For each new skill, check:
1. Frontmatter has `name` with `ck:` prefix
2. No references to `$ARGUMENTS` (should use `${input}`)
3. No Claude Code-specific tool references that Copilot can't handle
4. No web search dependencies (Copilot firewall blocks)

**Copilot-incompatible patterns to grep for:**
```bash
grep -r "WebSearch\|web_search" cokit/skills/{test,ship,deploy,ck-security,bootstrap,frontend-development,project-management}/ || echo "Clean"
grep -r "\$ARGUMENTS" cokit/skills/{test,ship,deploy,ck-security,bootstrap,frontend-development,project-management}/ || echo "Clean"
```

### Step 4: Handle Copilot Limitations

If any skill references features Copilot doesn't support:
- **WebSearch** → Remove or note as "requires MCP search server"
- **Multi-agent spawn** → Simplify to single-agent workflow steps
- **1M context** → Skills should work within 32-128k context

## Deduplication Check

Ensure no overlap with existing CoKit resources:

| New skill | Potential overlap | Resolution |
|-----------|------------------|------------|
| test | ck-test.prompt.md | Complement — prompt triggers agent, skill has deep testing logic |
| ship | ck-git.prompt.md | Complement — git is commits only, ship is full release pipeline |
| deploy | devops skill | Complement — devops is infra, deploy is app deployment |
| bootstrap | ck-bootstrap.prompt.md | Complement — prompt triggers, skill has research+scaffold logic |

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| ck-security uses WebSearch | Medium | Check and strip/adapt if needed |
| deploy skill needs terminal | Low | Copilot supports terminal in agent mode |
| project-management needs persistent state | Medium | File-based state in repo works |

## Success Criteria

- [ ] 7 new skill directories created in `cokit/skills/`
- [ ] 1 new agent file created in `cokit/agents/`
- [ ] All have Copilot-compatible frontmatter
- [ ] No Copilot-incompatible references
- [ ] No duplication with existing resources
