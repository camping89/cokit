# CoKit Project Roadmap

**Project:** CoKit - Claude Code to GitHub Copilot Port
**Start Date:** 2026-01-06
**Current Phase:** 4 of 5 (DONE)
**Overall Progress:** 80%

## Project Overview

CoKit makes it dead-simple for non-technical users to port Claude Code workflow patterns to GitHub Copilot with a single command: `npx cokit init`.

### Key Features
- 6 core prompt files (fix, plan, code, test, review, docs)
- 5 user-level skills (debugging, code-review, planning, docs-seeker, sequential-thinking)
- Repo-level templates (VS Code settings, agent instructions)
- Beginner-friendly CLI with zero configuration
- Cross-platform support (VS Code + JetBrains)

---

## Milestones & Phases

### Phase 1: CLI Tool (DONE)
**Status:** COMPLETE (2026-01-06)
**Effort:** 4h
**Deliverables:**
- npm package structure
- `cokit init`, `cokit add`, `cokit list` commands
- File copy utilities
- Interactive user prompts

### Phase 2: Repo-Level Templates (DONE)
**Status:** COMPLETE (2026-01-06)
**Effort:** 3h
**Deliverables:**
- `.github/copilot-instructions.md`
- `.github/AGENTS.md`
- `.github/instructions/` directory
- `.vscode/settings.json` template

### Phase 3: User-Level Skills (DONE)
**Status:** COMPLETE (2026-01-06)
**Effort:** 4h
**Deliverables:**
- 5 core skills ported
- `debugging/` skill with systematic troubleshooting
- `code-review/` skill with checklist patterns
- `planning/` skill with structured thinking
- `docs-seeker/` skill for documentation discovery
- `sequential-thinking/` skill for complex reasoning

### Phase 4: Prompt Files (DONE)
**Status:** COMPLETE (2026-01-06)
**Effort:** 2h
**Deliverables:**
- 6 core prompt files created in `templates/repo/prompts/`
- `fix.prompt.md` - Debug and fix code issues
- `plan.prompt.md` - Create implementation plans
- `code.prompt.md` - Implement from plan
- `test.prompt.md` - Run tests and analyze
- `review.prompt.md` - Code review with checklists
- `docs.prompt.md` - Update documentation
- All prompts follow Copilot format with `mode: agent`
- 0 critical issues

**Completion Details:**
```
✓ All 6 prompt files created
✓ Frontmatter format: mode: agent
✓ No $ARGUMENTS references
✓ No subagent delegation patterns
✓ Clear step-by-step processes
✓ Validation passed
```

### Phase 5: Documentation (PENDING)
**Status:** PENDING → IN PROGRESS
**Effort:** 3h
**Next Phase:** Final phase before release
**Deliverables:**
- README.md with quick-start (30 seconds)
- QUICK-START.md one-pager
- FAQ.md with troubleshooting
- Migration guide for Claude Code users
- Visual assets (screenshots, GIFs)
  - terminal-init.png
  - vscode-after.png
  - fix-prompt.gif
  - doctor-output.png
- npm badge + license badge
- User testing & validation

**Tasks:**
- [ ] 5.1 Write README.md (beginner-focused)
- [ ] 5.2 Create QUICK-START.md one-pager
- [ ] 5.3 Create FAQ.md
- [ ] 5.4 Write migration guide
- [ ] 5.5 Take screenshots
- [ ] 5.6 Record GIFs
- [ ] 5.7 Add badges
- [ ] 5.8 Test with non-technical user

---

## Progress Summary

| Phase | Title | Status | Effort | Progress | Date |
|-------|-------|--------|--------|----------|------|
| 1 | CLI Tool | DONE | 4h | 100% | 2026-01-06 |
| 2 | Repo Templates | DONE | 3h | 100% | 2026-01-06 |
| 3 | User Skills | DONE | 4h | 100% | 2026-01-06 |
| 4 | Prompt Files | DONE | 2h | 100% | 2026-01-06 |
| 5 | Documentation | PENDING | 3h | 0% | TBD |

**Total Effort:** 16h
**Completed:** 13h (81%)
**Remaining:** 3h (19%)

---

## Release Criteria

### Phase 4 Completion ✓ SATISFIED
- [x] All prompt files created and formatted
- [x] Validation checks passed
- [x] 0 critical issues
- [x] Ready for Phase 5

### Phase 5 Requirements (Before Release)
- [ ] Documentation complete
- [ ] Screenshots current and clear
- [ ] All links working
- [ ] Copy-paste ready commands
- [ ] Non-technical user testing passed
- [ ] No unresolved Q&A

---

## Changelog

### 2026-01-06

#### Phase 4 Complete: Prompt Files
- Created 6 core prompt files in Copilot format
- `fix.prompt.md` - Issue debugging and fixing workflow
- `plan.prompt.md` - Implementation planning tool
- `code.prompt.md` - Plan-to-code implementation
- `test.prompt.md` - Test execution and analysis
- `review.prompt.md` - Code review with security/quality checks
- `docs.prompt.md` - Documentation updates

**Format Details:**
- All prompts use `mode: agent` for multi-step tasks
- Removed `$ARGUMENTS` variable dependencies
- Replaced subagent patterns with explicit step-by-step processes
- All prompts <50 lines each
- Decision trees and guidelines preserved

**Quality Metrics:**
- Lines of code: ~320 total
- Critical issues: 0
- Format compliance: 100%
- Validation: PASSED

#### Status Update
- Plan frontmatter updated: `completed_phases: [1, 2, 3, 4]`
- Phase 4 marked as DONE
- Phase 5 (Documentation) now in focus

---

## Known Issues & Risks

### Phase 5 (Documentation)
- User testing timeline not yet scheduled
- Visual asset creation pending CLI completion
- GIF recording requires working prompt execution

### Technical Debt
- None identified at Phase 4

### Platform-Specific Notes
- Prompt format tested with VS Code Copilot Agent mode
- JetBrains IDE support pending (prompts only, no skills)
- Terminal GIF recording may require platform-specific tools

---

## Success Metrics

### User Experience Goals
- Non-technical users can complete `npx cokit init` in <1 minute
- Prompts work immediately after setup (no manual config)
- FAQ covers 80%+ of setup questions
- Doctor command diagnoses issues correctly

### Adoption Goals
- README comprehensible to non-developers
- Migration guide helps Claude Code users transition
- All commands copy-paste ready
- <5 minutes from discovery to working prompt

---

## Dependencies & External Factors

### GitHub Copilot Dependencies
- Copilot Agent Mode (Feb 2025+)
- VS Code with Copilot extension
- Agent Skills support (Dec 2025+)

### Development Dependencies
- Node.js 16+
- npm package registry
- Git (for repo-level templates)

---

## Next Steps (Phase 5)

**Immediate:**
1. Review Phase 5 requirements from phase-05-documentation.md
2. Start with README.md (most critical for users)
3. Take screenshots of working CLI and prompts
4. Prepare FAQ based on common issues

**Timeline:**
- README + QUICK-START: 1h
- FAQ + migration guide: 1h
- Visual assets + polish: 1h
- User testing: pending availability

---

## Unresolved Questions

1. What is the preferred screenshot tool for GIFs on macOS?
2. Should migration guide link to specific Claude Code docs?
3. Is there a preferred style for FAQ formatting?
4. Should badge links point to npm or GitHub releases?

---

**Last Updated:** 2026-01-06
**Project Manager:** project-manager agent
**Status:** Phase 4 COMPLETE → Phase 5 IN PROGRESS
