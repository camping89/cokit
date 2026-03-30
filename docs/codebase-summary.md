# CoKit Codebase Summary

## Overview

CoKit is a CLI tool that enhances GitHub Copilot with 17 prompts, 12 agents, 5 instructions, 27 skills, and 5 collections. It transforms ClaudeKit commands into a unified ck-* namespace.

**Repository:** https://github.com/camping89/cokit.git
**Version:** 1.2.6
**License:** CC BY-NC 4.0
**Node Requirements:** >= 18.0.0
**Last Updated:** 2026-02-25

## Architecture

CoKit uses a **sync pipeline architecture** that transforms ClaudeKit resources:

```
ClaudeKit Source (~/.claude/)
    ↓
Transform Module (transform-claudekit.mjs)
    ↓
Patch Navigation (Inject workflow footers)
    ↓
Output: Unified ck-* Prompts
```

### Sync Pipeline (eng/sync.mjs)
- **Flow:** Load config → Transform ClaudeKit → Patch navigation → Write output
- **Configuration:** resource-origins.yml (mappings, navigation, ignore list)
- **Dry-run Support:** Preview changes without writing files

## Source Code Structure

### Core Files (600 LOC total)

| File | Size | Purpose |
|------|------|---------|
| `src/index.js` | 35 LOC | CLI entry point; registers commands (init, add, list, doctor, update) |
| `bin/cokit.js` | 4 LOC | Binary wrapper; delegates to src/index.js |
| `eng/sync.mjs` | 85 LOC | Main sync orchestrator; orchestrates transformation |
| `eng/transform-claudekit.mjs` | 220 LOC | ClaudeKit transformer; resolves files, applies transformations |
| `eng/patch-navigation.mjs` | 69 LOC | Navigation patcher; injects "Suggested Next Steps" footers |

### Directory Structure

```
cokit/
├── bin/
│   └── cokit.js                    # Binary entry point
├── src/
│   ├── index.js                    # CLI program setup
│   ├── commands/                   # Command implementations
│   │   ├── init.js                 # Installation logic
│   │   ├── add.js                  # Add resources
│   │   ├── list.js                 # List resources
│   │   ├── doctor.js               # System diagnostics
│   │   └── update.js               # Update check
│   └── utils/
│       └── update-checker.js        # Version checking
├── eng/
│   ├── sync.mjs                    # Sync orchestrator
│   ├── transform-claudekit.mjs      # ClaudeKit transformer
│   ├── patch-navigation.mjs         # Navigation footer injection
│   └── resource-origins.yml         # Configuration (mappings, navigation)
├── prompts/                        # Output: Transformed prompts (33 files)
├── agents/                         # Agent definitions (12 files)
├── instructions/                   # Instruction sets (5 files)
├── skills/                         # Skill packs (27 directories)
├── collections/                    # Collection definitions (5 files)
├── docs/                           # Documentation
└── package.json                    # Dependencies & scripts

```

## Key Components

### 1. CLI Entry (src/index.js)
Registers 5 commands using Commander.js:
- **init** - Install CoKit resources globally or to project
- **add** - Add specific resources
- **list** - List installed resources
- **doctor** - Diagnose setup issues
- **update** - Check for new versions

### 2. Sync Pipeline (eng/sync.mjs)
**Flow:**
1. Load resource-origins.yml configuration
2. Transform ClaudeKit sources
3. Apply navigation patches to all prompts
4. Write output files or show dry-run preview
5. Update sync timestamps

**Config Structure:**
```yaml
version: '2.0'
sources:
  claudekit: {path, last_sync}
ignore: []            # Commands to skip
mappings: {}          # Command mappings (16 entries)
unknown_commands: []  # Tracking unknown sources
navigation: {}        # Workflow navigation rules
```

### 3. Transform Modules

#### ClaudeKit Transformer (transform-claudekit.mjs)
**Input:** ~/.claude/commands/ (user's local ClaudeKit)
**Transformations:**
- Rename: `/*` → `ck-*` namespace
- Replace: `$ARGUMENTS` → `${input}`
- Remove `model` field from frontmatter
- Update handoff references to ck-* commands
- Transform command references in content

**Functions:**
- `resolveClaudekitPath()` - Expand ~ paths
- `findCommandFile()` - Locate command files (handles variations)
- `transformFile()` - Apply all transformations
- `transformCommandReference()` - Update handoff commands
- `transformContentReferences()` - Replace content references

### 4. Navigation Patcher (patch-navigation.mjs)
Injects workflow navigation footers into transformed prompts.

**Features:**
- Custom navigation rules from config
- Default suggestions based on command type
- Table format: `| /command | Description |`
- All commands listed at footer

**Default Patterns:**
- `brainstorm` → suggest: plan, plan.fast
- `plan` → suggest: cook, test
- `cook` → suggest: test, fix
- `test` → suggest: fix, review

### 5. Configuration (eng/resource-origins.yml)
Maintains mappings and sync metadata.

**Key Sections:**
- `version` - Config format version
- `synced_at` - Last sync timestamp
- `sources.claudekit` - ClaudeKit local path (~/.claude/commands)
- `ignore` - Commands to skip
- `mappings` - 16 command mappings with origins and descriptions
- `navigation` - Workflow navigation rules
- `unknown_commands` - Tracking array for unmapped sources

## Prompt Inventory

### ClaudeKit Commands (16)
16 prompts from ~/.claude/commands/ (plan, plan.hard, plan.fast, fix, test, ask, bootstrap, review, watzup, help, brainstorm, cook, scout, git, debug, docs)

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| chalk | ^5.3.0 | Terminal color output |
| commander | ^12.0.0 | CLI framework |
| prompts | ^2.4.2 | Interactive prompts |
| globby | ^16.1.0 | File globbing (dev) |
| gray-matter | ^4.0.3 | YAML frontmatter parsing (dev) |
| js-yaml | ^4.1.1 | YAML parsing (dev) |

## Scripts

```bash
npm run sync              # Transform and generate prompts
npm run sync:transform   # Same as sync
npm run sync:dry-run     # Preview changes without writing
npm run test             # Run tests
npm run build            # Update README
```

## Data Flow

### Sync Operation
1. **Config Load** - Read resource-origins.yml
2. **Transform** - ClaudeKit: Glob ~/.claude/commands → Transform → Output ck-* prompts
3. **Patch Navigation** - Inject workflow footers
5. **Write Output** - Create prompt files (prompts/ directory)
6. **Update Config** - Record sync timestamps

### File Transformation
```
Input (ClaudeKit)
├── Frontmatter: {name: "plan", ...}
├── Content: "Run $ARGUMENTS using /fix command"
↓
Transform
├── Rename: ck-plan
├── Replace: $ARGUMENTS → ${input}
├── Update: /fix → /ck-fix
├── Remove: model field
↓
Output (ck-*)
├── Frontmatter: {name: "ck-plan", ...}
├── Content: "Run ${input} using /ck-fix command"
├── Navigation Footer: "Suggested Next Steps"
```

## Error Handling

- **Missing ClaudeKit:** Warns if ~/.claude/commands not found, continues gracefully
- **File Not Found:** Logs warning per missing file, adds to skipped array
- **Transform Errors:** Logs errors per command, collects in results.errors
- **Unknown Commands:** Tracks in config.unknown_commands for manual mapping

## Notable Features

1. **Flexible Source Resolution:** Handles file path variations (index.md, nested dirs)
2. **Ignore List:** Skip commands via resource-origins.yml
3. **Dry-run Mode:** Preview all changes before writing
4. **Navigation Workflow:** Suggested next steps guide users through prompts
5. **Graceful Degradation:** Continues if source unavailable
7. **Frontmatter Management:** Preserves metadata, removes model field
8. **Content Reference Updates:** Transforms all command references to ck-* namespace

## Version History

- **v1.2.6** - 25 prompts (with SpecKit, now removed)
- **v1.2.0** - Initial Copilot port with full resource set
- **v1.1.0** - 21 prompts, SpecKit sync pipeline (now removed)
- **v1.0.9** - Comprehensive documentation update
- **v1.0.8** - Initial release

## Future Considerations

- Integration with GitHub Copilot API
- Resource validation and linting
- Custom instruction support
- Skill marketplace integration
- Cloud sync capabilities
