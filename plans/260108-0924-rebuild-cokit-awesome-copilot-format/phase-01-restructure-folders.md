# Phase 1: Restructure Folders

## Context Links
- [Main Plan](./plan.md)
- Reference: `C:\w\_demo\awesome-copilot-main\` (Awesome Copilot structure)

## Overview

| Priority | Status | Effort |
|----------|--------|--------|
| P1 | pending | 1h |

## Key Insights

1. Awesome Copilot dung cau truc flat voi 5 directories chinh
2. Moi category co README rieng trong `docs/`
3. Build scripts nam trong `eng/` folder
4. Schema validation cho collections

## Requirements

### Target Directory Structure

```
C:\w\_me\cokit\
├── agents/                  # *.agent.md files
├── prompts/                 # *.prompt.md files
├── instructions/            # *.instructions.md files
├── skills/                  # */SKILL.md folders
├── collections/             # *.collection.yml files
├── docs/                    # Category READMEs
│   ├── README.agents.md
│   ├── README.prompts.md
│   ├── README.instructions.md
│   ├── README.skills.md
│   └── README.collections.md
├── eng/                     # Build scripts
│   ├── constants.mjs
│   ├── update-readme.mjs
│   ├── validate-collections.mjs
│   ├── validate-skills.mjs
│   ├── create-collection.mjs
│   ├── create-skill.mjs
│   └── yaml-parser.mjs
├── .schemas/                # JSON schemas
│   └── collection.schema.json
├── templates/               # Keep for init command (repo templates)
│   └── repo/
│       ├── .github/
│       └── .vscode/
├── src/                     # CLI source (keep existing)
├── bin/                     # CLI entrypoint (keep existing)
├── AGENTS.md                # Project instructions for AI
├── README.md                # Main readme
└── package.json
```

## Related Code Files

| File | Purpose | Action |
|------|---------|--------|
| `package.json` | Dependencies | Add js-yaml, vfile-matter |
| `.gitignore` | Git ignore | Update for new structure |

## Implementation Steps

### Step 1: Create Core Directories

```bash
# From C:\w\_me\cokit\
mkdir agents
mkdir prompts
mkdir instructions
mkdir collections
mkdir eng
mkdir .schemas
```

### Step 2: Create Collection Schema

Create `.schemas/collection.schema.json`:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Collection Manifest",
  "type": "object",
  "required": ["id", "name", "description", "items"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-z0-9-]+$",
      "maxLength": 50
    },
    "name": {
      "type": "string",
      "maxLength": 100
    },
    "description": {
      "type": "string",
      "maxLength": 500
    },
    "tags": {
      "type": "array",
      "items": { "type": "string", "pattern": "^[a-z0-9-]+$" },
      "maxItems": 10
    },
    "items": {
      "type": "array",
      "minItems": 1,
      "maxItems": 50,
      "items": {
        "type": "object",
        "required": ["path", "kind"],
        "properties": {
          "path": { "type": "string" },
          "kind": { "enum": ["prompt", "instruction", "agent", "skill"] }
        }
      }
    }
  }
}
```

### Step 3: Update package.json

Add dependencies:

```json
{
  "dependencies": {
    "commander": "^12.0.0",
    "prompts": "^2.4.2",
    "chalk": "^5.3.0",
    "js-yaml": "^4.1.0",
    "vfile-matter": "^5.0.0"
  },
  "scripts": {
    "build": "node eng/update-readme.mjs",
    "collection:validate": "node eng/validate-collections.mjs",
    "collection:create": "node eng/create-collection.mjs",
    "skill:validate": "node eng/validate-skills.mjs",
    "skill:create": "node eng/create-skill.mjs"
  }
}
```

### Step 4: Update .gitignore

```gitignore
node_modules/
*.log
.DS_Store
# Keep templates and build output
!templates/
!docs/README.*.md
```

### Step 5: Create Placeholder Files

Create empty placeholder files de Git track directories:

```bash
touch agents/.gitkeep
touch prompts/.gitkeep
touch instructions/.gitkeep
touch collections/.gitkeep
```

## Success Criteria

- [ ] All 6 directories created
- [ ] `.schemas/collection.schema.json` valid JSON
- [ ] `package.json` updated with new deps and scripts
- [ ] `.gitignore` updated
- [ ] Directory structure matches Awesome Copilot format

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Git conflicts | Low | Low | Create fresh directories |
| Missing dependencies | Low | Medium | Test npm install |
