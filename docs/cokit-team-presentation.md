# CoKit: Team Presentation

**Date:** January 20, 2026 (Updated from cleanup phase)
**Presenter:** [Your Name]
**Repository:** https://github.com/camping89/cokit
**Version:** 1.0.9

---

## 1. What is CoKit?

**One-liner:** Make GitHub Copilot smarter with one command.

**Problem:** Developers using GitHub Copilot get inconsistent results because Copilot lacks:
- Structured debugging approaches
- Code review standards
- Planning frameworks
- Project-specific context

**Solution:** CoKit ports proven Claude Code workflow patterns to GitHub Copilot via:
- 14 prompts with `ck-` prefix (fix, plan, code, cook, test, review, docs, bootstrap, brainstorm, debug, scout, ask, git, etc.) using `mode: agent`
- 7 skills teaching Copilot best practices (debugging, code-review, planning, problem-solving, sequential-thinking, backend-development, frontend-development)
- 9 specialized agents for different tasks
- 5 instructions (backend, frontend, testing, development, research)
- 5 collections bundling related resources
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
│   └─────────┘                  │  /cokit-cli │                │
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
│   │ $ npx cokit-cli init                                    │ │
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
│   │ ✓ .github/prompts/ck-*.prompt.md (14 prompts)           │ │
│   │ ✓ .github/instructions/ck-*.instructions.md (5 files)   │ │
│   │ ✓ .github/collections/ck-*.collection.yml (5 bundles)   │ │
│   │ ✓ .vscode/settings.json                                 │ │
│   │                                                         │ │
│   │ 🎉 Done! Try /ck.fix in Copilot Chat.                   │ │
│   └─────────────────────────────────────────────────────────┘ │
│                              │                                 │
│                              ▼                                 │
│   Step 5: User opens VS Code, types /ck.fix or /ck.plan       │
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
    ├── debugging/                  # Systematic debugging framework
    ├── code-review/                # Code review & verification protocols
    ├── planning/                   # Implementation planning & design
    ├── docs-seeker/                # Documentation discovery & research
    └── sequential-thinking/        # Structured problem decomposition
```

**Use case:** Personal productivity - works across all projects.

**Availability:** All 5 skills follow Copilot Agent Skills format with SKILL.md + references/

---

## 4. CLI Commands

| Command | Description |
|---------|-------------|
| `npx cokit-cli init` | Interactive setup wizard |
| `npx cokit-cli init -g` | Install personal skills only |
| `npx cokit-cli init -a` | Both project + personal |
| `npx cokit-cli add <skill>` | Add specific skill |
| `npx cokit-cli list` | Show installed components |
| `npx cokit-cli doctor` | Diagnose setup issues |
| `npx cokit-cli update` | Update to latest version |

---

## 5. Prompts Included (14 total)

| Prompt | What it does | Example usage |
|--------|--------------|---------------|
| `/ck.fix` | Debug and fix issues | "The login is broken" |
| `/ck.plan` | Create implementation plan | "Add user authentication" |
| `/ck.code` | Implement from plan | "Implement step 1 from plan.md" |
| `/ck.cook` | Feature implementation step by step | "Cook the auth feature" |
| `/ck.test` | Write/run tests | "Test the auth module" |
| `/ck.review-codebase` | Scan & analyze codebase | "Review the api folder" |
| `/ck.docs` | Documentation management | "Document the API" |
| `/ck.bootstrap` | Project bootstrap | "Bootstrap a new React app" |
| `/ck.brainstorm` | Feature ideation | "Brainstorm payment features" |
| `/ck.debug` | Debugging technical issues | "Debug the crash on startup" |
| `/ck.scout` | Find files across codebase | "Scout for auth handlers" |
| `/ck.ask` | Technical questions | "How does auth work?" |
| `/ck.git` | Git workflow | "Create a commit" |
| `/ck.help` | CoKit usage guide | "How do I use CoKit?" |

---

## 6. Specialized Skills & Agents

All 7 skills available at `~/.copilot/skills/ck-*/` with supporting resources:

| Skill | What Copilot learns |
|-------|---------------------|
| **ck-debugging** | Systematic root cause analysis, not random fixes |
| **ck-code-review** | Verification gates, technical rigor, feedback protocols |
| **ck-planning** | Research → design → implementation planning workflow |
| **ck-problem-solving** | Complexity spirals, innovation blocks, systematic solutions |
| **ck-sequential-thinking** | Structured multi-step problem solving with revision |
| **ck-backend-development** | Node.js, Python, Go, Rust backend patterns |
| **ck-frontend-development** | React, TypeScript, component patterns, performance |

## 7. Specialized Agents (9 total)

| Agent | Specialization |
|-------|----------------|
| **planner** | Implementation planning and design |
| **code-reviewer** | Comprehensive code review and quality |
| **debugger** | Issue investigation and root cause analysis |
| **tester** | Test writing and validation |
| **researcher** | Technology research and documentation discovery |
| **scout** | Codebase navigation and file location |
| **git-manager** | Commit management and git workflows |
| **brainstormer** | Solution ideation and architecture discussion |
| **docs-manager** | Documentation creation and maintenance |

---

## 8. Technical Architecture

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
├── agents/                       # 9 specialized agents
│   ├── planner.agent.md
│   ├── code-reviewer.agent.md
│   ├── tester.agent.md
│   └── ...
├── prompts/                      # 14 prompt templates
│   ├── ck-fix.prompt.md
│   ├── ck-plan.prompt.md
│   └── ...
├── instructions/                 # 5 coding standards
│   ├── ck-backend.instructions.md
│   ├── ck-frontend.instructions.md
│   └── ...
├── skills/                       # 7 capability packages
│   ├── ck-debugging/
│   ├── ck-code-review/
│   └── ...
├── collections/                  # 5 resource bundles
│   ├── ck-core.collection.yml
│   └── ...
├── templates/
│   └── repo/                     # Project templates
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

## 9. Implementation Plan

| Phase | Description | Effort | Status |
|-------|-------------|--------|--------|
| 1 | CLI tool (npm package) | 4h | ✅ Complete |
| 2 | Repo templates (.github/) | 3h | ✅ Complete |
| 3 | User skills (7 + agents, instructions, collections) | 6h | ✅ Complete |
| 4 | Prompt files (14 prompts) | 3h | ✅ Complete |
| 5 | Documentation + README | 3h | ✅ Complete |
| 6 | Cleanup phase (remove non-coding resources) | 2h | ✅ Complete |
| **Total** | | **21h** | ✅ All Phases Complete |

---

## 10. Release Process

```bash
# Development
git clone https://github.com/camping89/cokit
cd cokit
npm install

# Testing locally
npm link                    # Makes 'cokit-cli' available locally
cokit-cli init              # Test the CLI

# Publishing
npm login                   # One-time login
npm version patch           # Bump version (1.0.8 → 1.0.9)
npm publish                 # Push to npm registry

# Users get it via
npx cokit-cli init          # Always fetches latest
```

---

## 11. What's NOT Included (Limitations)

| Claude Code Feature | Status | Reason |
|---------------------|--------|--------|
| Runtime hooks | ❌ Skip | Copilot has no equivalent |
| Multi-agent delegation | ❌ Skip | Single agent only |
| $ARGUMENTS variables | ❌ Skip | User provides context in chat |
| Session state | ❌ Skip | Copilot is stateless |

**Workaround:** Users manually chain prompts (`/ck.plan` → `/ck.code` → `/ck.test` → `/ck.review-codebase`)

---

## 12. Success Metrics

- [x] `npx cokit-cli init` works without errors
- [x] Non-technical user can setup in < 2 minutes
- [x] All 14 prompts functional in Copilot Chat
- [x] All 7 skills auto-activate based on context
- [x] All 9 agents available for delegation
- [x] README understandable by beginners
- [x] `cokit-cli doctor` catches common issues

---

## 13. License

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

## 14. Recent Updates

**v1.0.9 (2026-01-20) - Documentation Update:**
- Comprehensive documentation update (all 7 docs)
- Fixed all broken links and references
- Verified resource counts across all docs
- Created changelogs folder structure

**v1.0.8 (2026-01-20) - Cleanup Phase:**
- Removed non-coding resources
- Consolidated documentation
- Updated all resource references
- Enhanced agent capabilities
- Added missing prompt and skill documentation

---

## Questions?

**Repository:** https://github.com/camping89/cokit
**Documentation:** `docs/`
**Installation:** `npx cokit-cli init`
