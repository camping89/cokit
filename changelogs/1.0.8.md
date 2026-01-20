# CoKit Cleanup Changelog

Summary of resources removed and consolidated during cleanup session.

## Deleted Agents (6)

- mcp-manager
- scout-external
- ui-ux-designer
- project-manager
- fullstack-developer
- database-admin

## Deleted Prompts (~31)

### Variant Prompts (removed - kept base prompts only)

- ck-bootstrap-express, ck-bootstrap-fast, ck-bootstrap-nextjs
- ck-code-auto, ck-code-fast
- ck-cook-auto, ck-cook-fast
- ck-fix-auto, ck-fix-build, ck-fix-deep, ck-fix-fast, ck-fix-lint, ck-fix-test, ck-fix-ts, ck-fix-types
- ck-plan-auto, ck-plan-enhance, ck-plan-fast, ck-plan-parallel, ck-plan-sequential, ck-plan-simple, ck-plan-validate
- ck-scout-ext, ck-test-ui

### Other Prompts

- ck-skill-create, ck-skill-install, ck-skill-list, ck-skill-optimize, ck-skill-update
- ck-coding-level, ck-kanban, ck-use-mcp, ck-watzup, ck-worktree
- ck-design-3d, ck-design-describe, ck-design-fast, ck-design-good, ck-design-screenshot, ck-design-video

## Consolidated Prompts

### ck-git (merged 4 → 1)

| Old | New |
|-----|-----|
| ck-git-cm | `/ck-git commit` |
| ck-git-cp | `/ck-git push` |
| ck-git-merge | `/ck-git merge [to] [from]` |
| ck-git-pr | `/ck-git pr [to] [from]` |

### ck-docs (merged 3 → 1)

| Old | New |
|-----|-----|
| ck-docs-init | `/ck-docs init` |
| ck-docs-summarize | `/ck-docs summarize [topics]` |
| ck-docs-update | `/ck-docs update` |

## Deleted Instructions (2)

- ck-google-adk-python
- ck-frontend-design-pro

## Deleted Skills (18)

- ck-ai-artist, ck-repomix, ck-markdown-novel-viewer
- ck-chrome-devtools, ck-databases, ck-devops, ck-docs-seeker
- ck-frontend-design, ck-ui-styling, ck-ui-ux-pro-max
- ck-mcp-builder, ck-mcp-management
- ck-media-processing, ck-mobile-development, ck-payment-integration
- ck-skill-creator, ck-web-frameworks, ck-shopify, ck-threejs, ck-better-auth

## Other Changes

- Renamed "ClaudeKit" → "Cokit"
- Deleted ck-ui-design collection

## Final Counts

| Resource | Before | After | Removed |
|----------|--------|-------|---------|
| Agents | 15 | 9 | 6 |
| Prompts | ~45 | 14 | ~31 |
| Instructions | 7 | 5 | 2 |
| Skills | 25+ | 7 | 18+ |
| Collections | 6 | 5 | 1 |
