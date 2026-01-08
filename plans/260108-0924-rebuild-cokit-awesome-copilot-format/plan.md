---
title: 'Rebuild CoKit to Awesome Copilot Format'
description: 'Restructure CoKit to generate GitHub Copilot customizations from ClaudeKit content using Awesome Copilot format'
status: pending
priority: P1
effort: 16h
branch: master
tags: [cokit, copilot, restructure, migration]
created: 2026-01-08
---

# Rebuild CoKit to Awesome Copilot Format

## Executive Summary

Rebuild CoKit theo cau truc Awesome Copilot format de generate GitHub Copilot customizations tu ClaudeKit content. Project nay se chuyen doi 17 agents, 71 commands, 38+ skills, va 4 workflows thanh format tuong thich voi Copilot.

## Source Analysis

### ClaudeKit Content (~/.claude/)

| Category | Count | Source Path | Format |
|----------|-------|-------------|--------|
| Agents | 17 | `~/.claude/agents/*.md` | YAML frontmatter + markdown |
| Commands | 71 | `~/.claude/commands/ck/**/*.md` | Nested folders, `$ARGUMENTS` vars |
| Skills | 38 | `~/.claude/skills/*/SKILL.md` | SKILL.md + bundled assets |
| Workflows | 4 | `~/.claude/workflows/*.md` | Pure markdown |

### Awesome Copilot Target Format

| Category | Extension | Required Fields | Path |
|----------|-----------|-----------------|------|
| Agents | `.agent.md` | `description`, recommend `model`, `tools` | `agents/` |
| Prompts | `.prompt.md` | `agent`, `description` | `prompts/` |
| Instructions | `.instructions.md` | `description`, `applyTo` | `instructions/` |
| Skills | `SKILL.md` | `name`, `description` | `skills/*/` |
| Collections | `.collection.yml` | `id`, `name`, `description`, `items` | `collections/` |

## Conversion Mapping

```
ClaudeKit                    → Awesome Copilot
─────────────────────────────────────────────────
agents/*.md                  → agents/*.agent.md
commands/ck/**/*.md          → prompts/ck-*.prompt.md (flattened)
skills/simple (text only)    → instructions/*.instructions.md
skills/complex (with assets) → skills/*/SKILL.md
workflows/*.md               → collections/*.collection.yml
```

## Implementation Phases

### Phase 1: Restructure Folders (1h)
- Create Awesome Copilot directory structure
- Add `.schemas/collection.schema.json`
- Setup `eng/` build scripts folder

### Phase 2: Convert Agents (2h)
- Convert 17 agents to `.agent.md` format
- Add required frontmatter fields
- Map model names (opus → GPT-4.1, sonnet → GPT-4.0)

### Phase 3: Convert Commands to Prompts (4h)
- Flatten 71 nested commands
- Create `ck-` prefixed prompts
- Replace `$ARGUMENTS` with placeholder instructions

### Phase 4: Convert Skills to Instructions (4h)
- Analyze 38 skills for complexity
- Simple skills → instructions with `applyTo`
- Complex skills → skills folders with assets

### Phase 5: Create Collections (2h)
- Convert 4 workflows to collections
- Create curated collections (ck-core, ck-code, etc.)

### Phase 6: Update CLI & Build Scripts (2h)
- Update `src/commands/init.js`
- Add eng/ scripts (update-readme.mjs, validate-*.mjs)

### Phase 7: Update Documentation (1h)
- Create AGENTS.md
- Update README.md
- Add docs/ READMEs

## File Deliverables

| Phase | Files Created |
|-------|---------------|
| 1 | 6 directories + schema |
| 2 | 17 agent files |
| 3 | ~71 prompt files |
| 4 | ~25 instruction + ~13 skill folders |
| 5 | 5+ collection files |
| 6 | 7+ eng scripts |
| 7 | 4+ doc files |

## Dependencies

- Node.js 18+
- js-yaml package (for collection parsing)
- vfile-matter package (for frontmatter parsing)

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking CLI compatibility | High | Maintain backward-compatible init command |
| Content loss during conversion | Medium | Manual review of each conversion |
| Format validation failures | Low | Add validation scripts |

## Success Criteria

1. All 17 agents converted with valid frontmatter
2. All 71 commands converted to prompts with `ck-` prefix
3. Skills properly categorized (instructions vs skills)
4. Collections created from workflows
5. `npx cokit init` works correctly
6. Build scripts generate README.md

## Phase Details

Xem chi tiet trong cac file:
- [Phase 1: Restructure Folders](./phase-01-restructure-folders.md)
- [Phase 2: Convert Agents](./phase-02-convert-agents.md)
- [Phase 3: Convert Commands to Prompts](./phase-03-convert-commands-to-prompts.md)
- [Phase 4: Convert Skills to Instructions](./phase-04-convert-skills-to-instructions.md)
- [Phase 5: Create Collections](./phase-05-create-collections.md)
- [Phase 6: Update CLI & Build Scripts](./phase-06-update-cli-build-scripts.md)
- [Phase 7: Update Documentation](./phase-07-update-documentation.md)

## Unresolved Questions

1. Nen giu license CC BY-NC 4.0 hay chuyen sang MIT?
2. Co can tao MCP server rieng cho CoKit?
3. Cach xu ly `$ARGUMENTS` variable trong prompts - placeholder text hay remove?
