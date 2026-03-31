---
status: completed
created: 2026-03-30
slug: claudekit-cokit-sync-update
phases: 3
estimated_effort: 3-4h
blockedBy: []
blocks: []
---

# ClaudeKit → CoKit Sync Update

## Overview

Sync CoKit with latest ClaudeKit (48 days of drift). ClaudeKit skills already have Copilot-compatible frontmatter (`ck:` prefix, `license`, `argument-hint`, `metadata`), so this is primarily a copy+verify operation.

## Scope

1. **Update 23 existing skills** — Copy latest from `~/.claude/skills/`
2. **Update 12 existing agents** — Copy latest from `~/.claude/agents/`
3. **Add 7 new skills** — test, ship, deploy, security, bootstrap, frontend-development, project-management
4. **Add 1 new agent** — project-manager
5. **Update resource-origins.yml** — Add new mappings
6. **Update prompts** — Run sync pipeline for prompt regeneration
7. **Update docs** — Reflect new resource counts

## Key Insight

ClaudeKit already transforms skills for Copilot format (adds `ck:` prefix, `license: MIT`, `argument-hint`, `metadata`). CoKit has OLD versions without these fields. Sync = copy latest + verify Copilot compatibility.

## What NOT to Sync (Copilot incompatible or too niche)

- **Multi-agent**: team, ck-loop, ck-autoresearch, ck-predict (need 1M context + multi-agent)
- **AI/ML external**: ai-artist, ai-multimodal, google-adk-python (need external API keys)
- **Too niche**: shader, remotion, shopify, tanstack, better-auth, gkg, stitch, mintlify
- **Meta/internal**: skill-creator, find-skills, template-skill, _shared, document-skills
- **Workspace persistence**: journal, kanban, plans-kanban, retro (Copilot no persistent state)
- **Overlap**: ask (=ck-ask prompt), ck-plan (=ck-plan prompt), design (=frontend-design), watzup (=ck-watzup prompt), preview, docs (=docs-seeker)

## Phases

| # | Phase | Status | Effort |
|---|-------|--------|--------|
| 1 | [Update existing skills + agents](phase-01-update-existing.md) | completed | 1.5h |
| 2 | [Add new skills + agent](phase-02-add-new-resources.md) | completed | 1h |
| 3 | [Update pipeline, config, docs](phase-03-update-pipeline-and-docs.md) | completed | 0.5h |

## Success Criteria

- All 23+7 skills have latest content from ClaudeKit with Copilot frontmatter
- All 12+1 agents updated
- `npm run sync --dry-run` passes
- resource-origins.yml reflects current state
- Docs updated with correct counts
