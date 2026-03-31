# ClaudeKit vs CoKit Comprehensive Comparison

**Date:** 2026-03-30  
**Source:** ClaudeKit (~/.claude/)  
**Port:** CoKit (c:\w\_me\cokit\)  
**Last ClaudeKit Update:** 2026-03-30 09:05  
**Last CoKit Sync:** 2026-02-03 (per resource-origins.yml)

---

## Executive Summary

CoKit has **~48 days of drift** from ClaudeKit source.

**Key Findings:**
- **23 shared skills** - ALL outdated in CoKit (last updated Feb 4-Feb 25)
- **12 agents in sync** - Minor drift (mostly Feb 25, source is Mar 30)
- **2 agents missing** - journal-writer, mcp-manager, project-manager
- **46 skills missing** - Not yet ported from ClaudeKit
- **27 prompts** - Partial coverage

---

## 1. SKILLS COMPARISON

### 1.1 Skills in Both (23 total) - ALL OUTDATED

**Critical Age Gap (6+ weeks old in CoKit):**
- mermaidjs-v11: Feb 4 vs Mar 30 (54 days)
- agent-browser: Feb 11 vs Mar 30 (47 days)
- backend-development: Feb 11 vs Mar 30 (47 days)
- context-engineering: Feb 11 vs Mar 30 (47 days)
- databases: Feb 11 vs Mar 30 (47 days)
- devops: Feb 11 vs Mar 30 (47 days)
- docs-seeker: Feb 11 vs Mar 30 (47 days)
- git: Feb 11 vs Mar 30 (47 days)
- mcp-management: Feb 11 vs Mar 30 (47 days)
- problem-solving: Feb 11 vs Mar 30 (47 days)
- repomix: Feb 11 vs Mar 30 (47 days)
- sequential-thinking: Feb 11 vs Mar 30 (47 days)
- ui-styling: Feb 11 vs Mar 30 (47 days)

**Moderate Age Gap (3-4 weeks):**
- brainstorm, code-review, cook, fix, frontend-design, research, scout, web-testing: Feb 25 vs Mar 30 (33 days)

---

### 1.2 Skills MISSING from CoKit (46 total)

**Core Planning & Analysis (7):**
- ck-plan (9.4KB)
- ck-loop (autonomous iteration)
- ck-autoresearch (metrics-driven)
- ck-predict (expert debate)
- ck-scenario (edge cases)
- ck-security (STRIDE+OWASP)
- ask (Q&A)

**Development Tools (13):**
- bootstrap, design (12KB), frontend-development (11KB), deploy, test, ship, project-management, team (16KB), docs, coding-level, find-skills, skill-creator, chrome-devtools

**Specialized Skills (26):**
- AI/ML: ai-artist, ai-multimodal, google-adk-python, llms, media-processing
- Web: web-frameworks, web-design-guidelines, stitch, threejs, react-best-practices
- Design: ui-ux-pro-max, shader
- Mobile: mobile-development
- Backend: better-auth, payment-integration, shopify, tanstack
- DevOps: gkg, mcp-builder, use-mcp, mintlify
- Media: markdown-novel-viewer, remotion
- Workspace: journal, kanban, plans-kanban, retro, project-organization
- Utilities: copywriting, security-scan, worktree, template-skill, _shared (shared utilities)


---

## 2. AGENTS COMPARISON

### 2.1 Agents in Both (12 total) - ALL OUTDATED

| Agent | CoKit Date | Source Date | Gap |
|-------|-----------|-------------|-----|
| brainstormer | Feb 25 | Mar 30 | 33 days |
| code-reviewer | Feb 25 | Mar 30 | 33 days |
| code-simplifier | Feb 25 | Mar 30 | 33 days |
| debugger | Feb 25 | Mar 30 | 33 days |
| docs-manager | Feb 25 | Mar 30 | 33 days |
| fullstack-developer | Feb 25 | Mar 30 | 33 days |
| git-manager | Feb 25 | Mar 30 | 33 days |
| planner | Feb 25 | Mar 30 | 33 days |
| researcher | Feb 25 | Mar 30 | 33 days |
| tester | Feb 25 | Mar 30 | 33 days |
| ui-ux-designer | Feb 25 | Mar 30 | 33 days |
| scout (extra) | Feb 11 | Mar 30 | 47 days |

Note: "scout" is also in CoKit agents (added locally, not in ClaudeKit agents/)

### 2.2 Agents MISSING from CoKit (3 total)

1. **journal-writer** - Write journal entries analyzing session changes
2. **mcp-manager** - Manage MCP servers
3. **project-manager** - Project tracking and management

---

## 3. PROMPTS/COMMANDS STATUS

### 3.1 CoKit Current Prompts (27 files)

```
ck-ask.prompt.md
ck-bootstrap.prompt.md
ck-brainstorm.prompt.md
ck-cook.prompt.md
ck-debug.prompt.md
ck-docs.prompt.md
ck-fix.prompt.md (base)
ck-fix-ci.prompt.md (variant)
ck-fix-fast.prompt.md (variant)
ck-fix-hard.prompt.md (variant)
ck-fix-logs.prompt.md (variant)
ck-fix-test.prompt.md (variant)
ck-fix-types.prompt.md (variant)
ck-fix-ui.prompt.md (variant)
ck-git.prompt.md
ck-help.prompt.md
ck-plan.prompt.md (base)
ck-plan-fast.prompt.md (variant)
ck-plan-hard.prompt.md (variant)
ck-plan-red-team.prompt.md (variant)
ck-plan-validate.prompt.md (variant)
ck-review.prompt.md
ck-scout.prompt.md
ck-simplify.prompt.md
ck-test.prompt.md
ck-watzup.prompt.md
```

Note: ClaudeKit commands directory doesn't exist on current system - commands are part of skills/

---

## 4. DETAILED SKILL INVENTORY

### CLAUDEKIT SKILLS (80 total)

**By Directory (76 skill directories + utilities):**
_shared, agent-browser, ai-artist, ai-multimodal, ask, backend-development, better-auth, bootstrap, brainstorm, chrome-devtools, ck-autoresearch, ck-debug, ck-loop, ck-plan, ck-predict, ck-scenario, ck-security, code-review, coding-level, common, context-engineering, cook, copywriting, databases, deploy, design, devops, docs, docs-seeker, document-skills, find-skills, fix, frontend-design, frontend-development, git, gkg, google-adk-python, journal, kanban, llms, markdown-novel-viewer, mcp-builder, mcp-management, media-processing, mermaidjs-v11, mintlify, mobile-development, payment-integration, plans-kanban, preview, problem-solving, project-management, project-organization, react-best-practices, remotion, repomix, research, retro, scout, security-scan, sequential-thinking, shader, ship, shopify, skill-creator, stitch, tanstack, team, template-skill, test, threejs, ui-styling, ui-ux-pro-max, use-mcp, watzup, web-design-guidelines, web-frameworks, web-testing, worktree

### COKIT SKILLS (25 total)

**Implemented Directories:**
agent-browser, backend-development, brainstorm, code-review, common, context-engineering, cook, databases, debug, devops, docs-seeker, fix, frontend-design, git, mcp-management, mermaidjs-v11, planning, problem-solving, repomix, research, scout, sequential-thinking, ui-styling, web-testing

**Note:** "debug" maps to ClaudeKit's "ck-debug", "planning" likely maps to planning-related skills

---

## 5. SYNC GAPS SUMMARY

### Missing Skills Breakdown

**High-Priority (Core Functionality - 7):**
1. ck-plan - Intelligent plan creation
2. ask - Answer technical questions
3. ck-loop - Autonomous iteration
4. ck-autoresearch - Metrics-driven research
5. ck-predict - Expert debate system
6. ck-scenario - Edge case generation
7. ck-security - Security audit

**Medium-Priority (Development - 13):**
1. bootstrap - Project bootstrapping
2. design - Design system (12KB)
3. frontend-development - React/TypeScript (11KB)
4. deploy - Multi-platform deploy
5. test - Testing framework
6. ship - Release pipeline
7. project-management - Project tracking
8. team - Team orchestration (16KB)
9. docs - Doc generation
10. coding-level - Experience tuning
11. find-skills - Skill discovery
12. skill-creator - Skill creation
13. chrome-devtools - Browser automation

**Low-Priority (Specialized - 26):**
- AI/ML (5): ai-artist, ai-multimodal, google-adk-python, llms, media-processing
- Web (5): web-frameworks, web-design-guidelines, stitch, threejs, react-best-practices
- Design (2): ui-ux-pro-max, shader
- Mobile (1): mobile-development
- Backend (4): better-auth, payment-integration, shopify, tanstack
- DevOps (4): gkg, mcp-builder, use-mcp, mintlify
- Media (2): markdown-novel-viewer, remotion
- Workspace (5): journal, kanban, plans-kanban, retro, project-organization
- Utilities (6): copywriting, security-scan, worktree, template-skill, _shared, document-skills

### Missing Agents (3)

1. journal-writer (session journaling)
2. mcp-manager (MCP management)
3. project-manager (project oversight)

---

## 6. RESOURCE-ORIGINS.YML FINDINGS

**Current Status:**
- Last updated: 2026-02-03 12:56:52Z
- Source path: ~/.claude/commands (doesn't exist)
- 16 documented mappings
- 1 ignored: ck.kanban

**Issues:**
1. Source path points to non-existent commands directory
2. 48+ days of drift
3. No mappings for: ck-plan, ck-loop, ck-autoresearch, ck-predict, etc.
4. Mappings may reference old skill paths

---

## 7. RECOMMENDATIONS

### Immediate (Update Drift)
1. Update all 23 shared skills from Mar 30 source
2. Update all 12 shared agents from Mar 30 source
3. Regenerate resource-origins.yml with current mappings

### Short-term (Phase 1 - Critical Skills)
1. Port ck-plan skill
2. Port ask skill
3. Port missing agents (3)
4. Add missing ck-* core skills (loop, autoresearch, predict, scenario, security)

### Medium-term (Phase 2 - Development Tools)
1. bootstrap, design, frontend-development
2. deploy, test, ship
3. project-management, team, docs
4. skill-creator, find-skills

### Long-term (Phase 3 - Specialized)
1. AI/ML tools (ai-artist, ai-multimodal, etc.)
2. Web/design systems (web-frameworks, stitch, etc.)
3. DevOps tools (deploy, gkg, mcp-builder)
4. Workspace tools (journal, kanban, retro)

---

## Files Summary

**Total Counts:**
| Item | ClaudeKit | CoKit | Gap |
|------|-----------|-------|-----|
| Skills (directories) | 76 | 24 | 52 missing |
| Agents | 14 | 12 | 2 missing |
| Prompts/Commands | ~35+ | 27 | ~8 missing |
| Days of drift | 0 | 48 | Update needed |

**Files Locations (Absolute Paths):**

ClaudeKit:
- Agents: ~/.claude/agents/*.md
- Skills: ~/.claude/skills/*/SKILL.md
- Agents: 14 total files

CoKit:
- Agents: /c/w/_me/cokit/agents/*.agent.md (12 files)
- Skills: /c/w/_me/cokit/skills/*/SKILL.md (24 files)
- Prompts: /c/w/_me/cokit/prompts/*.prompt.md (27 files)
- Mappings: /c/w/_me/cokit/eng/resource-origins.yml

