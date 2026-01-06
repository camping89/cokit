# CoKit: Team Presentation

**Date:** January 6, 2026
**Presenter:** [Your Name]
**Repository:** https://github.com/camping89/cokit

---

## 1. What is CoKit?

**One-liner:** Make GitHub Copilot smarter with one command.

**Problem:** Developers using GitHub Copilot get inconsistent results because Copilot lacks:
- Structured debugging approaches
- Code review standards
- Planning frameworks
- Project-specific context

**Solution:** CoKit ports proven Claude Code workflow patterns to GitHub Copilot via:
- Pre-built prompts (`/fix`, `/plan`, `/review`)
- Skills that teach Copilot best practices
- Project templates for team consistency

---

## 2. How Users Install It

### The Complete Flow

```
┌────────────────────────────────────────────────────────────────┐
│                     PUBLISHING (We do once)                    │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│   Developer                     npm Registry                   │
│   ┌─────────┐                  ┌─────────────┐                │
│   │ cokit/  │  npm publish     │             │                │
│   │ repo    │ ───────────────► │  npmjs.com  │                │
│   └─────────┘                  │  /cokit     │                │
│                                └─────────────┘                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
                              │
                              │ Package now available globally
                              ▼
┌────────────────────────────────────────────────────────────────┐
│                     USER EXPERIENCE                            │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│   Step 1: User runs command                                    │
│   ┌─────────────────────────────────────────────────────────┐ │
│   │ $ npx cokit init                                        │ │
│   └─────────────────────────────────────────────────────────┘ │
│                              │                                 │
│                              ▼                                 │
│   Step 2: npx downloads from npm (automatic, temporary)        │
│   ┌─────────────────────────────────────────────────────────┐ │
│   │ npm Registry ──► temp folder ──► executes ──► cleanup   │ │
│   └─────────────────────────────────────────────────────────┘ │
│                              │                                 │
│                              ▼                                 │
│   Step 3: Interactive CLI guides user                          │
│   ┌─────────────────────────────────────────────────────────┐ │
│   │ 🚀 CoKit Setup                                          │ │
│   │                                                         │ │
│   │ ? What do you want to set up?                           │ │
│   │   › Project templates (.github/)                        │ │
│   │     Personal skills (~/.copilot/)                       │ │
│   │     Both                                                │ │
│   └─────────────────────────────────────────────────────────┘ │
│                              │                                 │
│                              ▼                                 │
│   Step 4: Files created in user's project                      │
│   ┌─────────────────────────────────────────────────────────┐ │
│   │ ✓ .github/copilot-instructions.md                       │ │
│   │ ✓ .github/AGENTS.md                                     │ │
│   │ ✓ .github/prompts/fix.prompt.md                         │ │
│   │ ✓ .github/prompts/plan.prompt.md                        │ │
│   │ ✓ .vscode/settings.json                                 │ │
│   │                                                         │ │
│   │ 🎉 Done! Try /fix in Copilot Chat.                      │ │
│   └─────────────────────────────────────────────────────────┘ │
│                              │                                 │
│                              ▼                                 │
│   Step 5: User opens VS Code, types /fix                       │
│   ┌─────────────────────────────────────────────────────────┐ │
│   │ Copilot Chat: "I'll help you debug systematically..."   │ │
│   └─────────────────────────────────────────────────────────┘ │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Why npx (not npm install)?

| Aspect | npm install -g | npx (our choice) |
|--------|----------------|------------------|
| Steps | 2 commands | 1 command |
| Global clutter | Yes | No |
| Always latest | Manual update | Automatic |
| User complexity | Higher | Lower |

---

## 3. What Gets Installed

### Option A: Project Templates (`.github/`)

```
your-project/
├── .github/
│   ├── copilot-instructions.md    # Project-wide AI instructions
│   ├── AGENTS.md                   # Agent behavior guidelines
│   ├── instructions/
│   │   ├── frontend.instructions.md
│   │   ├── backend.instructions.md
│   │   └── testing.instructions.md
│   ├── prompts/
│   │   ├── fix.prompt.md           # /fix command
│   │   ├── plan.prompt.md          # /plan command
│   │   ├── code.prompt.md          # /code command
│   │   ├── test.prompt.md          # /test command
│   │   ├── review.prompt.md        # /review command
│   │   └── docs.prompt.md          # /docs command
│   └── skills/
│       └── (project-specific skills)
└── .vscode/
    └── settings.json               # Copilot settings
```

**Use case:** Team projects - everyone gets same AI behavior via git.

### Option B: Personal Skills (`~/.copilot/`)

```
~/.copilot/
└── skills/
    ├── debugging/                  # Systematic debugging
    ├── code-review/                # Review protocols
    ├── planning/                   # Implementation planning
    ├── docs-seeker/                # Documentation finder
    └── sequential-thinking/        # Problem decomposition
```

**Use case:** Personal productivity - works across all projects.

---

## 4. CLI Commands

| Command | Description |
|---------|-------------|
| `npx cokit init` | Interactive setup wizard |
| `npx cokit init --global` | Install personal skills only |
| `npx cokit init --all` | Both project + personal |
| `npx cokit add <skill>` | Add specific skill |
| `npx cokit list` | Show installed components |
| `npx cokit doctor` | Diagnose setup issues |
| `npx cokit update` | Update to latest version |

---

## 5. Prompts Included

| Prompt | What it does | Example usage |
|--------|--------------|---------------|
| `/fix` | Debug and fix issues | "The login is broken" |
| `/plan` | Create implementation plan | "Add user authentication" |
| `/code` | Implement from plan | "Implement step 1 from plan.md" |
| `/test` | Write/run tests | "Test the auth module" |
| `/review` | Code review | "Review my changes" |
| `/docs` | Update documentation | "Document the API" |

---

## 6. Skills Included

| Skill | What Copilot learns |
|-------|---------------------|
| **debugging** | Systematic root cause analysis, not random fixes |
| **code-review** | Security checks, performance review, best practices |
| **planning** | Break down features, identify risks, estimate effort |
| **docs-seeker** | Find relevant documentation automatically |
| **sequential-thinking** | Step-by-step problem decomposition |

---

## 7. Technical Architecture

```
cokit/
├── package.json                  # npm package config
├── bin/
│   └── cokit.js                  # CLI entry point
├── src/
│   ├── index.js                  # Command router
│   ├── commands/
│   │   ├── init.js               # Setup wizard
│   │   ├── add.js                # Add skills
│   │   ├── list.js               # Show installed
│   │   ├── doctor.js             # Troubleshoot
│   │   └── update.js             # Update version
│   └── utils/
│       ├── copy.js               # File operations
│       ├── prompt.js             # Interactive prompts
│       └── paths.js              # Cross-platform paths
├── templates/
│   └── repo/                     # Project templates
├── skills/                       # User-level skills
├── README.md
└── LICENSE                       # CC BY-NC 4.0
```

### Dependencies (minimal)

```json
{
  "dependencies": {
    "commander": "^12.0.0",    // CLI framework
    "prompts": "^2.4.2",       // Interactive prompts
    "chalk": "^5.3.0"          // Colorized output
  }
}
```

---

## 8. Implementation Plan

| Phase | Description | Effort | Status |
|-------|-------------|--------|--------|
| 1 | CLI tool (npm package) | 4h | ✅ Complete |
| 2 | Repo templates (.github/) | 3h | ✅ Complete |
| 3 | User skills (5 core) | 4h | ✅ Complete |
| 4 | Prompt files (6 prompts) | 2h | ✅ Complete |
| 5 | Documentation + README | 3h | ✅ Complete |
| **Total** | | **16h** | ✅ Phase 1 Done |

---

## 9. Release Process

```bash
# Development
git clone https://github.com/camping89/cokit
cd cokit
npm install

# Testing locally
npm link                    # Makes 'cokit' available locally
cokit init                  # Test the CLI

# Publishing
npm login                   # One-time login
npm version patch           # Bump version (1.0.0 → 1.0.1)
npm publish                 # Push to npm registry

# Users get it via
npx cokit init              # Always fetches latest
```

---

## 10. What's NOT Included (Limitations)

| Claude Code Feature | Status | Reason |
|---------------------|--------|--------|
| Runtime hooks | ❌ Skip | Copilot has no equivalent |
| Multi-agent delegation | ❌ Skip | Single agent only |
| $ARGUMENTS variables | ❌ Skip | User provides context in chat |
| Session state | ❌ Skip | Copilot is stateless |

**Workaround:** Users manually chain prompts (`/plan` → `/code` → `/test` → `/review`)

---

## 11. Success Metrics

- [x] `npx cokit init` works without errors
- [x] Non-technical user can setup in < 2 minutes
- [x] All 6 prompts functional in Copilot Chat
- [x] Skills auto-activate based on context
- [x] README understandable by beginners
- [x] `cokit doctor` catches common issues

---

## 12. License

**CC BY-NC 4.0** (Creative Commons Attribution-NonCommercial)

✅ Allowed:
- Personal use
- Educational use
- Non-profit organizations

❌ Not allowed:
- Commercial products
- Corporate internal use
- Revenue-generating applications

---

## Questions?

**Repository:** https://github.com/camping89/cokit
**Plan details:** `plans/260106-1102-cokit-implementation/`
