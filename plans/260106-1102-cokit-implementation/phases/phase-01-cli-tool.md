# Phase 1: CLI Tool (npm package)

**Effort:** 4h | **Status:** DONE (2026-01-06)

## Objective

Create `npx cokit` CLI that non-technical users can run without thinking.

## User Stories

```
As a developer, I want to run ONE command to set up Copilot workflows
So I don't have to manually copy files or read docs
```

## CLI Commands

### `npx cokit init`

Interactive setup wizard:
```
? What do you want to set up?
  › Project templates (.github/)     ← Default
    Personal skills (~/.copilot/)
    Both

? This will create files in .github/. Continue? (Y/n)

✓ Created .github/copilot-instructions.md
✓ Created .github/AGENTS.md
✓ Created .github/prompts/fix.prompt.md
✓ Created .github/prompts/plan.prompt.md
...
✓ Created .vscode/settings.json

🎉 Done! Open VS Code and start using Copilot.
   Try typing /fix in Copilot Chat.
```

### `npx cokit init --global`

```
? Install personal skills to ~/.copilot/skills/? (Y/n)

✓ Created ~/.copilot/skills/debugging/
✓ Created ~/.copilot/skills/code-review/
...

🎉 Skills installed! They'll work in all your projects.
```

### `npx cokit add <skill>`

```bash
npx cokit add debugging     # Add one skill
npx cokit add --list        # Show available skills
```

### `npx cokit doctor`

Diagnose setup issues:
```
Checking CoKit setup...

✓ .github/copilot-instructions.md exists
✓ .github/prompts/ has 6 prompts
✗ ~/.copilot/skills/ not found
  → Run: npx cokit init --global

✓ VS Code detected
✓ Copilot extension installed
✗ Agent Skills not enabled
  → Enable: Settings → github.copilot.chat.useAgentSkills
```

## Technical Implementation

### Package Structure

```
cokit/
├── package.json
├── bin/
│   └── cokit.js              # #!/usr/bin/env node entry
└── src/
    ├── index.js              # CLI router
    ├── commands/
    │   ├── init.js           # init command
    │   ├── add.js            # add command
    │   ├── list.js           # list command
    │   ├── update.js         # update command
    │   └── doctor.js         # doctor command
    └── utils/
        ├── copy.js           # Copy templates
        ├── prompt.js         # Interactive prompts
        ├── colors.js         # Console colors
        └── paths.js          # Platform-aware paths
```

### Dependencies (minimal)

```json
{
  "name": "cokit",
  "version": "1.0.0",
  "bin": { "cokit": "./bin/cokit.js" },
  "dependencies": {
    "commander": "^12.0.0",
    "prompts": "^2.4.2",
    "chalk": "^5.3.0"
  }
}
```

### Key Functions

**copy.js:**
```javascript
// Copy template directory to destination
// Handle existing files (prompt user)
// Skip .gitkeep files
```

**paths.js:**
```javascript
// Cross-platform path resolution
// Windows: %USERPROFILE%\.copilot\skills\
// Unix: ~/.copilot/skills/
```

## Tasks

- [x] 1.1 Initialize npm package with package.json
- [x] 1.2 Create bin/cokit.js entry point
- [x] 1.3 Implement `init` command with interactive prompts
- [x] 1.4 Implement `add` command for individual skills
- [x] 1.5 Implement `list` command
- [x] 1.6 Implement `doctor` command
- [x] 1.7 Add colorized output (chalk)
- [x] 1.8 Handle existing file conflicts (prompt user)
- [x] 1.9 Test on Windows + macOS + Linux
- [x] 1.10 Publish to npm

## Validation

- [x] `npx cokit` shows help without error
- [x] `npx cokit init` creates .github/ structure
- [x] `npx cokit init --global` creates ~/.copilot/skills/
- [x] Interactive prompts work (not just flags)
- [x] Colors display correctly in terminal
- [x] Windows paths work correctly
