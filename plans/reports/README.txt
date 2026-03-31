CLAUDEKIT vs COKIT COMPARISON REPORTS
======================================

Generated: 2026-03-30
Analysis: Complete inventory and sync comparison

REPORT FILES
============

1. Explore-260330-1007-SUMMARY.md (START HERE)
   - Executive summary with key findings
   - Actionable phases (immediate → optional)
   - Quick statistics and recommendations
   - Best for: Quick understanding of the situation

2. Explore-260330-1007-claudekit-vs-cokit.md
   - Detailed comparison with age gaps
   - Breakdown by priority
   - resource-origins.yml analysis
   - Best for: Understanding the full scope

3. Explore-260330-1007-sync-checklist.txt
   - Organized action items
   - Phase-by-phase breakdown
   - Checkbox format for tracking
   - Best for: Planning the sync operation

4. Explore-260330-1007-file-inventory.txt
   - Complete file paths for all components
   - Statistics and counts
   - Absolute paths for both systems
   - Best for: Reference during implementation

KEY STATS AT A GLANCE
=====================

Status: CoKit is 48 days behind ClaudeKit (Feb 3 → Mar 30)

Agents:       12/14 (86% coverage)    - 3 missing
Skills:       24/76 (31% coverage)    - 52 missing
Files:        35/35 (100% outdated)   - all need update

IMMEDIATE ACTIONS (Phase 1)
===========================

UPDATE (3-4 hours work):
  [ ] 23 skills (all outdated)
  [ ] 12 agents (all outdated)
  [ ] resource-origins.yml mapping

PORT (1 hour work):
  [ ] journal-writer agent
  [ ] mcp-manager agent
  [ ] project-manager agent

NEXT STEPS (Phase 2-4)
=====================

High-Priority:   7 core planning skills
Medium-Priority: 13 development tools
Low-Priority:    26 specialized skills

See SUMMARY.md for detailed phasing and time estimates.

CRITICAL FINDINGS
=================

1. Worst Offender:
   - mermaidjs-v11 is 54 days old (Feb 4 → Mar 30)

2. Most Common:
   - 13 skills are 47 days old (Feb 11 → Mar 30)

3. Newest Files:
   - 8 files are 33 days old (Feb 25 → Mar 30)

4. No Current Files:
   - Every single shared file is outdated

FILE LOCATIONS
==============

ClaudeKit source:
  ~/.claude/agents/*.md                    (14 agents)
  ~/.claude/skills/*/SKILL.md              (76 skill dirs)

CoKit current:
  /c/w/_me/cokit/agents/*.agent.md        (12 agents)
  /c/w/_me/cokit/skills/*/SKILL.md        (24 skills)
  /c/w/_me/cokit/prompts/*.prompt.md      (27 prompts)
  /c/w/_me/cokit/eng/resource-origins.yml (mappings)

RECOMMENDATIONS
===============

NOW:    Read SUMMARY.md (10 min read)
THEN:   Use sync-checklist.txt to plan work
DURING: Reference file-inventory.txt for paths
REVIEW: Read detailed claudekit-vs-cokit.md for context

All reports are in: /c/w/_me/cokit/plans/reports/

