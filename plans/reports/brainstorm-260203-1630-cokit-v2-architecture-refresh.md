# Brainstorm Report: Cokit v2 Architecture Refresh

**Date:** 2026-02-03
**Status:** Ready for Planning

---

## Problem Statement

1. **Port refresh**: Current cokit manually ported from ClaudeKit once; ClaudeKit evolved significantly
2. **Merge SpecKit**: Add GitHub SpecKit's spec-driven development workflow into cokit
3. **Low maintenance**: Auto-sync with human-in-the-loop review
4. **Single install**: `npx cokit init` delivers everything
5. **Target**: GitHub Copilot (`~/.copilot/`)

---

## Final Decisions

| Decision | Choice |
|----------|--------|
| Prefix format | `ck.*` (dot notation, e.g., `ck.plan`, `ck.specify`) |
| Namespace | Unified `ck.*` for both SpecKit and ClaudeKit |
| Origin tracking | `eng/resource-origins.yml` maps each command to source |
| Model field | Remove entirely (let Copilot use default) |
| Workflow start | Always `ck.brainstorm` first (question everything) |
| Navigation | Auto-suggest next steps after each command |
| Hooks/scripts | Create Copilot equivalents (future phase) |

---

## Sources

| Source | Location | Sync Method |
|--------|----------|-------------|
| ClaudeKit | `~/.claude/` (pre-installed) | Read directly |
| SpecKit | `upstream/speckit/` | Git subtree |

---

## Architecture: Transform + Patch Pipeline

```
┌──────────────────────────────────────────────────────────────────┐
│                     SYNC PIPELINE (npm run sync)                 │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. PULL                                                         │
│     └── git subtree pull speckit                                 │
│     └── (claudekit read from ~/.claude/)                         │
│                                                                  │
│  2. TRANSFORM (per-source)                                       │
│     └── speckit: /speckit.* → /ck.*                             │
│     └── claudekit: /* → /ck.*                                   │
│     └── $ARGUMENTS → ${input}                                    │
│     └── Remove model field                                       │
│     └── Update handoffs to use ck.* commands                     │
│                                                                  │
│  3. PATCH (unified navigation)                                   │
│     └── Inject "## Suggested Next Steps" to every prompt         │
│     └── Reference ALL ck.* commands (cross-source awareness)     │
│     └── Enable looping between specify ↔ brainstorm ↔ plan       │
│                                                                  │
│  4. GENERATE                                                     │
│     └── Write to prompts/, agents/, skills/                      │
│     └── Update resource-origins.yml with any new commands        │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Command Mapping

### From SpecKit

| Original | Cokit | Description |
|----------|-------|-------------|
| `speckit.specify` | `ck.specify` | Create feature specification |
| `speckit.clarify` | `ck.clarify` | Resolve spec ambiguities |
| `speckit.constitution` | `ck.constitution` | Project governance |
| `speckit.plan` | `ck.plan.spec` | SpecKit's plan (if needed) |
| `speckit.tasks` | `ck.tasks` | Generate task list |
| `speckit.implement` | `ck.implement` | Execute tasks |
| `speckit.analyze` | `ck.analyze` | Consistency check |
| `speckit.checklist` | `ck.checklist` | Quality validation |

### From ClaudeKit

| Original | Cokit | Description |
|----------|-------|-------------|
| `brainstorm` | `ck.brainstorm` | Explore & debate solutions |
| `plan` | `ck.plan` | Intelligent plan creation |
| `plan/hard` | `ck.plan.hard` | Deep research + plan |
| `plan/fast` | `ck.plan.fast` | Quick plan, no research |
| `cook` | `ck.cook` | Implement feature |
| `fix` | `ck.fix` | Analyze & fix issues |
| `test` | `ck.test` | Run tests |

---

## Default Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                 RECOMMENDED FLOW (Always brainstorm first)       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  User has idea                                                  │
│       │                                                         │
│       ▼                                                         │
│  ┌─────────────┐                                                │
│  │ck.brainstorm│ ← Question everything, explore options         │
│  └──────┬──────┘                                                │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────┐                                                │
│  │ ck.specify  │ ← Formalize into spec                         │
│  └──────┬──────┘                                                │
│         │ Has [NEEDS CLARIFICATION]?                            │
│         ▼                                                       │
│  ┌─────────────┐                                                │
│  │ ck.clarify  │ ← Resolve ambiguities                         │
│  └──────┬──────┘                                                │
│         │◄────────────────────────┐                             │
│         ▼                         │ Loop back if approach       │
│  ┌─────────────┐                  │ needs rethinking            │
│  │ck.brainstorm│ (impl approach)  │                             │
│  └──────┬──────┘                  │                             │
│         │                         │                             │
│         ▼                         │                             │
│  ┌─────────────┐                  │                             │
│  │ ck.plan     │──────────────────┘                             │
│  └──────┬──────┘                                                │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────┐                                                │
│  │ ck.cook     │                                                │
│  └──────┬──────┘                                                │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────┐                                                │
│  │ ck.test     │                                                │
│  └─────────────┘                                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Key insight:** `/ck.specify` does NOT brainstorm - it formalizes. Always brainstorm first to explore options, then specify to lock in direction.

---

## Navigation Patch (Injected to All Prompts)

```markdown
## Suggested Next Steps

| After this command | Consider |
|--------------------|----------|
| `ck.brainstorm` | `/ck.specify` (formalize) or `/ck.plan.fast` (quick impl) |
| `ck.specify` | `/ck.clarify` (if ambiguous) or `/ck.brainstorm` (explore impl) or `/ck.plan` |
| `ck.clarify` | `/ck.specify` (update spec) or `/ck.plan` (if clear) |
| `ck.plan` | `/ck.cook` (implement) or `/ck.brainstorm` (rethink) |
| `ck.cook` | `/ck.test` or `/ck.fix` |

**All commands:** ck.brainstorm, ck.specify, ck.clarify, ck.constitution, ck.plan, ck.plan.hard, ck.plan.fast, ck.tasks, ck.cook, ck.fix, ck.test
```

---

## Key Files

| File | Purpose |
|------|---------|
| `docs/cokit-sync-and-maintenance-guide.md` | **CRITICAL** - Maintainer guide |
| `eng/resource-origins.yml` | Command → source mapping |
| `eng/sync.mjs` | Main sync orchestrator |
| `eng/transform-claudekit.mjs` | ClaudeKit transform rules |
| `eng/transform-speckit.mjs` | SpecKit transform rules |
| `eng/patch-navigation.mjs` | Unified navigation injection |

---

## Future Upgrade Strategy

1. **Run `npm run sync`** - Pulls latest, transforms, patches
2. **Check `unknown_commands`** in resource-origins.yml
3. **Add new commands** to mappings if discovered
4. **Review git diff** - Human approves changes
5. **Commit**

See `docs/cokit-sync-and-maintenance-guide.md` for detailed procedures.

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| ClaudeKit breaking changes | Medium | Transform script handles gracefully |
| SpecKit format changes | Low | Subtree allows easy diff review |
| Command name conflicts | Medium | Documented in resource-origins.yml |
| Navigation patch outdated | Low | Single file to update |

---

## Success Metrics

- ✅ `npx cokit init` works standalone
- ✅ `npm run sync` completes < 30 seconds
- ✅ All commands available as `ck.*`
- ✅ Cross-navigation between SpecKit and ClaudeKit features
- ✅ Loop between specify ↔ brainstorm works
- ✅ New devs can maintain via guide

---

## Sources

- [GitHub awesome-copilot](https://github.com/github/awesome-copilot)
- [GitHub Copilot Supported Models](https://docs.github.com/en/copilot/reference/ai-models/supported-models)
- [GitHub Spec-Kit](https://github.com/github/spec-kit)
- [SpecKit Spec-Driven Development](https://github.com/github/spec-kit/blob/main/spec-driven.md)

---

## Next Step

Create implementation plan with `/plan` command.
