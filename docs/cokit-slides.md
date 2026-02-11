# CoKit - Slide Deck

---

## Slide 1: Title

# CoKit

**Make GitHub Copilot Smarter in 30 Seconds**

`npx cokit init`

---

## Slide 2: The Problem

### Copilot Without CoKit

- ❌ Inconsistent debugging (random fixes)
- ❌ No code review standards
- ❌ No planning framework
- ❌ Each dev gets different AI behavior

---

## Slide 3: The Solution

### Copilot With CoKit

- ✅ Structured debugging methodology
- ✅ Consistent code review process
- ✅ Planning before coding
- ✅ Team-wide AI behavior via git

---

## Slide 4: One Command

```bash
npx cokit-cli init
```

That's it. No install. No config. No account.

---

## Slide 5: How It Works

```
Developer publishes    →    npm Registry    →    User runs npx
         ↓                                            ↓
npm publish                               Downloads cokit-cli
                                                    ↓
                                          Creates files in project
                                          (.github/, skills)
                                                    ↓
                                          Ready to use in VS Code
```

---

## Slide 6: What Users Get

### 27 Prompts (ClaudeKit + SpecKit)

**Development workflows (ck-*):**
- `/ck-fix`, `/ck-plan`, `/ck-cook`, `/ck-test`, `/ck-review`, `/ck-bootstrap`, `/ck-brainstorm`, etc.

**Spec-driven workflows (ck-spec-*):**
- `/ck-spec-specify`, `/ck-spec-clarify`, `/ck-spec-plan`, `/ck-spec-tasks`, `/ck-spec-implement`, etc.

All unified in single namespace with cross-navigation.

---

## Slide 7: What Users Get (cont.)

### 27 Skills + 12 Agents (Auto-Activate)

**Skills (27 total):**
- debugging, code-review, planning, problem-solving, sequential-thinking
- backend-development, frontend-design, databases, devops, git, mcp-management
- research, scout, and more specialized expertise

**Agents (12 total):**
- Original 9: planner, code-reviewer, debugger, tester, researcher, scout, git-manager, brainstormer, docs-manager
- New 3: code-simplifier, fullstack-developer, ui-ux-designer

---

## Slide 8: Two Installation Options

| Option | Command | Location |
|--------|---------|----------|
| **Project** | `npx cokit-cli init` | `.github/` |
| **Personal** | `npx cokit-cli init -g` | `~/.copilot/` |
| **Both** | `npx cokit-cli init -a` | Both |

---

## Slide 9: CLI Commands

```bash
npx cokit-cli init      # Setup wizard
npx cokit-cli doctor    # Troubleshoot
npx cokit-cli list      # Show installed
npx cokit-cli update    # Get latest
```

---

## Slide 10: User Experience

```
$ npx cokit-cli init

🚀 CoKit Setup (v1.0.9)

? What do you want to set up?
  › Project templates (.github/)
    Personal skills (~/.copilot/)
    Both

✓ Created .github/copilot-instructions.md
✓ Created .github/AGENTS.md
✓ Created .github/prompts/ (14 prompts)
✓ Created .github/instructions/ (5 files)
✓ Created .github/collections/ (5 bundles)

🎉 Done! Try /ck-fix in Copilot Chat.
```

---

## Slide 11: Implementation Plan

| Phase | What | Time |
|-------|------|------|
| 1 | CLI tool | 4h |
| 2 | Project templates | 3h |
| 3 | Skills (7), Agents (9), Instructions (5), Collections (5) | 6h |
| 4 | Prompts (14) | 3h |
| 5 | Documentation | 3h |
| 6 | Cleanup phase | 2h |
| **Total** | | **21h** |

---

## Slide 12: Tech Stack

```
Node.js CLI
├── commander    (CLI framework)
├── prompts      (Interactive input)
└── chalk        (Colors)
```

**Zero runtime dependencies for users**

---

## Slide 13: Release Process

```bash
# We do once:
npm publish (publishes cokit-cli to npmjs.com)

# Users do:
npx cokit-cli init    # Always gets latest version
```

---

## Slide 14: What's NOT Included

| Feature | Status |
|---------|--------|
| Runtime hooks | ❌ No equivalent |
| Multi-agent | ❌ Single agent only |
| Session state | ❌ Stateless |

**Workaround:** Manual prompt chaining

---

## Slide 15: License

### CC BY-NC 4.0

✅ Personal / Educational / Non-profit

❌ Commercial / Corporate

---

## Slide 16: Summary

1. **Problem:** Copilot is inconsistent
2. **Solution:** CoKit adds structure (v1.0.9)
3. **Install:** `npx cokit-cli init`
4. **Resources:** 9 agents, 14 prompts, 7 skills, 5 instructions, 5 collections
5. **Repo:** github.com/camping89/cokit

---

## Slide 17: Questions?

**Repository:** https://github.com/camping89/cokit

**Full docs:** `docs/cokit-team-presentation.md`

**Quick start:** `npx cokit-cli init -g`
