# ClaudeKit vs CoKit Comparison - Executive Summary

**Report Generated:** 2026-03-30  
**Analysis Scope:** Complete comparison of ClaudeKit source vs CoKit port  
**Status:** CoKit is 48 days behind (last sync: 2026-02-03)

---

## Key Findings

### 1. Critical Issues (Act Now)

**All Shared Files Are Outdated**
- 23 skills: ALL outdated (33-54 days old)
- 12 agents: ALL outdated (33 days old)
- 1 mapping file: 48 days old
- 0 files are current

**Drift Timeline:**
- Worst: mermaidjs-v11 (54 days old, Feb 4 → Mar 30)
- Most common: 13 skills (47 days old, Feb 11 → Mar 30)
- Recent: 8 files (33 days old, Feb 25 → Mar 30)

### 2. Missing Components

**Agents Missing:** 3 of 14
- journal-writer (session journaling)
- mcp-manager (MCP management)
- project-manager (project tracking)

**Skills Missing:** 46 of 76
- 7 core planning skills (highest priority)
- 13 development tools (medium priority)
- 26 specialized skills (lower priority)

**Coverage:**
- Agents: 86% (12/14)
- Skills: 31% (24/76)
- Overall: 32% coverage

---

## Actionable Summary

### Phase 1: Critical (Do Immediately)
```
UPDATE (35 files total):
- 23 skills [all outdated]
- 12 agents [all outdated]
- 1 mapping file [regenerate]

TIME: ~2-3 hours

PORT (3 files):
- journal-writer agent
- mcp-manager agent
- project-manager agent

TIME: ~1 hour
```

### Phase 2: High-Priority (This Week)
```
PORT 7 CORE SKILLS:
- ck-plan
- ask
- ck-loop
- ck-autoresearch
- ck-predict
- ck-scenario
- ck-security

TIME: ~4 hours
```

### Phase 3: Medium-Priority (This Month)
```
PORT 13 DEVELOPMENT TOOLS:
- bootstrap, design, frontend-development
- deploy, test, ship
- project-management, team, docs
- coding-level, find-skills, skill-creator, chrome-devtools

TIME: ~8 hours
```

### Phase 4: Optional (When Needed)
```
PORT 26 SPECIALIZED SKILLS:
- AI/ML, Web/Design, Mobile, Backend, DevOps, Media, Workspace

TIME: Varies (20+ hours total)
```

---

## File Locations

### ClaudeKit Source Paths
```
~/.claude/agents/*.md                  (14 agents)
~/.claude/skills/*/                   (76 skill directories)
```

### CoKit Current Paths
```
/c/w/_me/cokit/agents/*.agent.md      (12 agents, outdated)
/c/w/_me/cokit/skills/*/              (24 skills, outdated)
/c/w/_me/cokit/prompts/*.prompt.md    (27 prompts)
/c/w/_me/cokit/eng/resource-origins.yml (metadata, outdated)
```

---

## Complete Inventory

### Agents (14 total)
| Name | ClaudeKit | CoKit | Status |
|------|-----------|-------|--------|
| brainstormer | ✓ | ✓ | Outdated (33d) |
| code-reviewer | ✓ | ✓ | Outdated (33d) |
| code-simplifier | ✓ | ✓ | Outdated (33d) |
| debugger | ✓ | ✓ | Outdated (33d) |
| docs-manager | ✓ | ✓ | Outdated (33d) |
| fullstack-developer | ✓ | ✓ | Outdated (33d) |
| git-manager | ✓ | ✓ | Outdated (33d) |
| journal-writer | ✓ | ✗ | **MISSING** |
| mcp-manager | ✓ | ✗ | **MISSING** |
| planner | ✓ | ✓ | Outdated (33d) |
| project-manager | ✓ | ✗ | **MISSING** |
| researcher | ✓ | ✓ | Outdated (33d) |
| tester | ✓ | ✓ | Outdated (33d) |
| ui-ux-designer | ✓ | ✓ | Outdated (33d) |
| scout (extra) | - | ✓ | Added locally |

### Skills - Shared (23 total) - ALL OUTDATED
```
agent-browser (47d)        context-engineering (47d)    mcp-management (47d)
backend-development (47d)  databases (47d)              problem-solving (47d)
brainstorm (33d)          devops (47d)                 repomix (47d)
code-review (33d)         docs-seeker (47d)            research (33d)
common (47d)              fix (33d)                    scout (33d)
cook (33d)                frontend-design (33d)        sequential-thinking (47d)
database (47d)            git (47d)                    ui-styling (47d)
debug/ck-debug            mermaidjs-v11 (54d)         web-testing (33d)
```

### Skills - Missing (46 total)

**High-Priority (7):**
ask, ck-autoresearch, ck-loop, ck-plan, ck-predict, ck-scenario, ck-security

**Medium-Priority (13):**
bootstrap, chrome-devtools, coding-level, deploy, design, docs, find-skills, frontend-development, project-management, ship, skill-creator, team, test

**Low-Priority (26):**
ai-artist, ai-multimodal, better-auth, copywriting, document-skills, gkg, google-adk-python, journal, kanban, llms, markdown-novel-viewer, mcp-builder, media-processing, mintlify, mobile-development, payment-integration, plans-kanban, preview, project-organization, react-best-practices, remotion, retro, security-scan, shader, shopify, stitch, tanstack, template-skill, threejs, ui-ux-pro-max, use-mcp, watzup, web-design-guidelines, web-frameworks, worktree, _shared

---

## Detailed Recommendations

### Immediate (Today)
1. Update all 23 shared skills from Mar 30 ClaudeKit
2. Update all 12 shared agents from Mar 30 ClaudeKit
3. Regenerate resource-origins.yml with current state
4. Commit changes: "chore: sync ClaudeKit Mar 30 updates (35 files)"

### This Week
1. Port 3 missing agents (2-3 hours)
2. Port 7 core planning skills (4 hours)
3. Test all updated & new skills
4. Update documentation

### Next 2 Weeks
1. Port 13 development tools (8 hours)
2. Expand test coverage
3. Document skill registry
4. Update README with coverage metrics

### Next Month
1. Port specialized skills as needed (26 total, optional)
2. Review & optimize resource-origins.yml
3. Create migration guide for other users
4. Set up automated sync process

---

## Statistics Summary

| Metric | Count | Coverage |
|--------|-------|----------|
| **Agents** | 12/14 | 86% |
| **Skills** | 24/76 | 31% |
| **Prompts** | 27/35+ | ~77% |
| **Days Behind** | 48 | N/A |
| **Files Outdated** | 35/35 | 100% |

---

## Detailed Reports

For complete details, see:
1. `/c/w/_me/cokit/plans/reports/Explore-260330-1007-claudekit-vs-cokit.md` - Full comparison
2. `/c/w/_me/cokit/plans/reports/Explore-260330-1007-sync-checklist.txt` - Action checklist
3. `/c/w/_me/cokit/plans/reports/Explore-260330-1007-file-inventory.txt` - Complete file list

