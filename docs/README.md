# CoKit Documentation Index

**Version:** 1.4.0 | **Updated:** 2026-04-07

## Reading Order by Role

### Users (Getting Started)
| # | Doc | Purpose |
|---|-----|---------|
| 1 | [../README.md](../README.md) | Installation & sample workflows |
| 2 | [cokit-commands-usage-guide.md](cokit-commands-usage-guide.md) | When to use `ck-*` vs `ck-spec-*` |

### Team Members (Understanding CoKit)
| # | Doc | Purpose |
|---|-----|---------|
| 1 | [project-overview-pdr.md](project-overview-pdr.md) | Vision, goals, success metrics |
| 2 | [system-architecture.md](system-architecture.md) | Sync pipeline, data flow |
| 3 | [codebase-summary.md](codebase-summary.md) | File structure overview |

### Contributors (Development)
| # | Doc | Purpose |
|---|-----|---------|
| 1 | [code-standards.md](code-standards.md) | Coding conventions, commit format |
| 2 | [cokit-sync-and-maintenance-guide.md](cokit-sync-and-maintenance-guide.md) | Running sync, adding commands |
| 3 | [project-roadmap.md](project-roadmap.md) | Future plans, phases |

### Reference (As Needed)
| Doc | Read When |
|-----|-----------|
| [copilot-processing-flow.md](copilot-processing-flow.md) | Understanding prompt processing |
| [migration-guide.md](migration-guide.md) | Users switching from other AI tools to Copilot |
| [upstream-porting-rules.md](upstream-porting-rules.md) | AI/dev rules for porting upstream → CoKit |

---

## Quick Reference

### What's in CoKit?
| Resource | Count | Location |
|----------|-------|----------|
| Prompts | 31 | `prompts/ck-*.prompt.md` |
| Agents | 13 | `agents/*.agent.md` |
| Skills | 31 | `skills/*/` |
| Instructions | 5 | `instructions/ck-*.instructions.md` |
| Collections | 5 | `collections/ck-*.collection.yml` |

### Workflow
| Workflow | Commands | Best For |
|----------|----------|----------|
| CoKit | `ck-*` | Daily dev, quick fixes, full pipeline |

### Key Commands
```
/ck-fix          → Fix bugs
/ck-plan-fast    → Quick feature
/ck-plan-hard    → Research + plan
/ck-spec-specify → Formal specification
```

---

## TL;DR

**New user?** Read README → commands-usage-guide

**Joining team?** Read project-overview → system-architecture

**Contributing?** Read code-standards → sync-maintenance-guide
