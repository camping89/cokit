# CoKit Documentation

## Overview

CoKit converts ClaudeKit resources to Awesome Copilot format for GitHub Copilot.

## Resource Types

### Agents (`agents/`)
Specialized AI agents for specific tasks like code review, debugging, planning.

Format: `*.agent.md`
```yaml
---
description: 'Agent description'
model: GPT-4.1
---
```

### Prompts (`prompts/`)
Task-specific prompts with `ck-` prefix.

Format: `*.prompt.md`
```yaml
---
agent: 'agent'
description: 'Prompt description'
---
```

### Instructions (`instructions/`)
Coding standards auto-applied by file pattern.

Format: `*.instructions.md`
```yaml
---
description: 'Instruction description'
applyTo: '**/*.tsx, **/*.jsx'
---
```

### Skills (`skills/`)
Folder-based resources with bundled assets.

Format: `skills/*/SKILL.md`
```yaml
---
name: 'skill-name'
description: 'Skill description'
---
```

### Collections (`collections/`)
Curated groups of related resources.

Format: `*.collection.yml`
```yaml
id: collection-id
name: Collection Name
description: Collection description
tags: [tag1, tag2]
items:
  - path: agents/example.agent.md
    kind: agent
```

## CLI Usage

```bash
# Install globally
npx cokit-cli init -g

# Install to project
npx cokit-cli init

# Interactive mode
npx cokit-cli init
```

## Build Commands

```bash
npm run build           # Generate README.md
npm run convert:all     # Convert all ClaudeKit resources
```
