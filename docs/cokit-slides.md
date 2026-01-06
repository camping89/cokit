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
npx cokit init
```

That's it. No install. No config. No account.

---

## Slide 5: How It Works

```
You publish once    →    npm Registry    →    User runs npx
     ↓                                              ↓
npm publish                               Downloads automatically
                                                    ↓
                                          Creates files in project
                                                    ↓
                                          Ready to use in VS Code
```

---

## Slide 6: What Users Get

### 6 Prompts
| Command | Action |
|---------|--------|
| `/fix` | Debug issues |
| `/plan` | Create plans |
| `/code` | Implement |
| `/test` | Write tests |
| `/review` | Review code |
| `/docs` | Update docs |

---

## Slide 7: What Users Get (cont.)

### 5 Skills (Auto-Activate)

- **debugging** - Root cause analysis
- **code-review** - Security + best practices
- **planning** - Break down features
- **docs-seeker** - Find documentation
- **sequential-thinking** - Step-by-step logic

---

## Slide 8: Two Installation Options

| Option | Command | Location |
|--------|---------|----------|
| **Project** | `npx cokit init` | `.github/` |
| **Personal** | `npx cokit init --global` | `~/.copilot/` |
| **Both** | `npx cokit init --all` | Both |

---

## Slide 9: CLI Commands

```bash
npx cokit init      # Setup wizard
npx cokit doctor    # Troubleshoot
npx cokit list      # Show installed
npx cokit update    # Get latest
```

---

## Slide 10: User Experience

```
$ npx cokit init

🚀 CoKit Setup

? What do you want to set up?
  › Project templates
    Personal skills
    Both

✓ Created .github/copilot-instructions.md
✓ Created .github/prompts/fix.prompt.md
...

🎉 Done! Try /fix in Copilot Chat.
```

---

## Slide 11: Implementation Plan

| Phase | What | Time |
|-------|------|------|
| 1 | CLI tool | 4h |
| 2 | Project templates | 3h |
| 3 | Skills (5) | 4h |
| 4 | Prompts (6) | 2h |
| 5 | Documentation | 3h |
| **Total** | | **16h** |

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
npm publish

# Users do:
npx cokit init    # Always gets latest
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
2. **Solution:** CoKit adds structure
3. **Install:** `npx cokit init`
4. **Timeline:** 16 hours
5. **Repo:** github.com/camping89/cokit

---

## Slide 17: Questions?

**Repository:** https://github.com/camping89/cokit

**Full docs:** `docs/cokit-team-presentation.md`

**Plan:** `plans/260106-1102-cokit-implementation/`
