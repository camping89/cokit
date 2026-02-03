---
title: "Cokit v2 Sync Pipeline Implementation"
description: "Automated sync pipeline merging ClaudeKit + SpecKit into unified ck.* namespace"
status: pending
priority: P1
effort: 8h
branch: master
tags: [sync-pipeline, speckit, claudekit, automation, v2]
created: 2026-02-03
---

# Cokit v2 Sync Pipeline Implementation

## Overview

Implement automated sync pipeline that merges ClaudeKit (`~/.claude/`) and SpecKit (git subtree) into unified `ck.*` command namespace for GitHub Copilot.

## Architecture

```
ClaudeKit (~/.claude/)     SpecKit (upstream/speckit/)
         │                          │
         └──────────┬───────────────┘
                    │
              eng/sync.mjs
                    │
    ┌───────────────┼───────────────┐
    │               │               │
 transform      transform      patch-navigation
 claudekit      speckit           (unified)
    │               │               │
    └───────────────┴───────────────┘
                    │
              prompts/, agents/, skills/
              (all ck.* namespace)
```

## Phases

| Phase | Description | Status | Effort |
|-------|-------------|--------|--------|
| 1 | [Git subtree setup](phase-01-git-subtree-setup.md) | pending | 30m |
| 2 | [Resource origins mapping](phase-02-resource-origins-mapping.md) | pending | 30m |
| 3 | [Transform scripts](phase-03-transform-scripts.md) | pending | 4h |
| 4 | [Package.json updates](phase-04-package-json-updates.md) | pending | 15m |
| 5 | [Initial sync execution](phase-05-initial-sync-execution.md) | pending | 1h |
| 6 | [Testing and validation](phase-06-testing-and-validation.md) | pending | 1.5h |

## Key Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Prefix format | `ck.*` | Dot notation (ck.plan, ck.specify) |
| Placeholder | `${input}` | Copilot-compatible format |
| Model field | Remove | Let Copilot use default |
| Libraries | globby, gray-matter, js-yaml | Industry standard, well-maintained |
| Git subtree | `--squash` | Cleaner history, simpler merges |

## Dependencies

- ClaudeKit installed at `~/.claude/`
- SpecKit repo: `https://github.com/github/spec-kit.git`
- Node.js >= 18 (ES modules support)

## Success Criteria

- [ ] `npm run sync` completes < 30 seconds
- [ ] All ck.* commands available in prompts/
- [ ] Navigation footer injected in all prompts
- [ ] `resource-origins.yml` tracks all command sources
- [ ] No manual edits needed in generated files

## Reference Documents

- [Brainstorm Report](../reports/brainstorm-260203-1630-cokit-v2-architecture-refresh.md)
- [Maintenance Guide](../../docs/cokit-sync-and-maintenance-guide.md)
- [Git Subtree Patterns](research/researcher-01-git-subtree-patterns.md)
- [Node.js Transform Patterns](research/researcher-02-nodejs-transform-patterns.md)

---

## Validation Summary

**Validated:** 2026-02-03
**Questions asked:** 7

### Confirmed Decisions

| Decision | User Choice |
|----------|-------------|
| Command scope | Port all commands from ~/.claude/ |
| Dependencies | Add globby, gray-matter, js-yaml as devDependencies |
| Conflict resolution | ClaudeKit wins, SpecKit gets `.spec` suffix |
| Migration strategy | Backup first, full overwrite (git tracks history) |
| Unknown commands | Auto-discover and log to unknown_commands |
| SpecKit versioning | Track `main` branch (pin to tag later) |
| Dry-run mode | Skip (use git diff for review instead) |

### Action Items

- [x] All decisions confirmed - no plan changes needed
- [ ] Proceed to implementation
