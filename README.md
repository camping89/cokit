# CoKit

Make GitHub Copilot smarter in 30 seconds.

CoKit provides 15 agents, 64 prompts, 4 instructions, 29 skills, and 6 collections to supercharge your Copilot experience.

## Quick Start

```bash
npx cokit-cli init -g
```

This installs all CoKit resources to `~/.copilot/` for global use.

## Installation Options

| Command | Description |
|---------|-------------|
| `npx cokit-cli init` | Interactive setup |
| `npx cokit-cli init -g` | Install global resources only |
| `npx cokit-cli init -a` | Install both project and global resources |

## Resources

## Agents

| Agent | Description |
|-------|-------------|
| [brainstormer](agents/brainstormer.agent.md) | >-. |
| [code-reviewer](agents/code-reviewer.agent.md) |  |
| [database-admin](agents/database-admin.agent.md) |  |
| [debugger](agents/debugger.agent.md) |  |
| [docs-manager](agents/docs-manager.agent.md) |  |
| [fullstack-developer](agents/fullstack-developer.agent.md) |  |
| [git-manager](agents/git-manager.agent.md) | Stage, commit, and push code changes with conventional commits. |
| [mcp-manager](agents/mcp-manager.agent.md) | Manage MCP (Model Context Protocol) server integrations - discover tools/prompts/resources, analyze ... |
| [planner](agents/planner.agent.md) |  |
| [project-manager](agents/project-manager.agent.md) | Use this agent when you need comprehensive project oversight and coordination. |
| [researcher](agents/researcher.agent.md) |  |
| [scout-external](agents/scout-external.agent.md) |  |
| [scout](agents/scout.agent.md) |  |
| [tester](agents/tester.agent.md) | Use this agent when you need to validate code quality through testing, including running unit and in... |
| [ui-ux-designer](agents/ui-ux-designer.agent.md) |  |

## Prompts

| Prompt | Description |
|--------|-------------|
| [ck-ask](prompts/ck-ask.prompt.md) | Answer technical and architectural questions. |
| [ck-bootstrap-auto-fast](prompts/ck-bootstrap-auto-fast.prompt.md) |  |
| [ck-bootstrap-auto-parallel](prompts/ck-bootstrap-auto-parallel.prompt.md) |  |
| [ck-bootstrap-auto](prompts/ck-bootstrap-auto.prompt.md) |  |
| [ck-bootstrap](prompts/ck-bootstrap.prompt.md) |  |
| [ck-brainstorm](prompts/ck-brainstorm.prompt.md) |  |
| [ck-ck-help](prompts/ck-ck-help.prompt.md) |  |
| [ck-code-auto](prompts/ck-code-auto.prompt.md) |  |
| [ck-code-no-test](prompts/ck-code-no-test.prompt.md) |  |
| [ck-code-parallel](prompts/ck-code-parallel.prompt.md) |  |
| [ck-code](prompts/ck-code.prompt.md) |  |
| [ck-coding-level](prompts/ck-coding-level.prompt.md) | Set your coding experience level for tailored explanations and output format. |
| [ck-cook-auto-fast](prompts/ck-cook-auto-fast.prompt.md) |  |
| [ck-cook-auto-parallel](prompts/ck-cook-auto-parallel.prompt.md) |  |
| [ck-cook-auto](prompts/ck-cook-auto.prompt.md) |  |
| [ck-cook](prompts/ck-cook.prompt.md) |  |
| [ck-debug](prompts/ck-debug.prompt.md) |  |
| [ck-design-3d](prompts/ck-design-3d.prompt.md) |  |
| [ck-design-describe](prompts/ck-design-describe.prompt.md) |  |
| [ck-design-fast](prompts/ck-design-fast.prompt.md) |  |
| [ck-design-good](prompts/ck-design-good.prompt.md) |  |
| [ck-design-screenshot](prompts/ck-design-screenshot.prompt.md) |  |
| [ck-design-video](prompts/ck-design-video.prompt.md) |  |
| [ck-docs-init](prompts/ck-docs-init.prompt.md) |  |
| [ck-docs-summarize](prompts/ck-docs-summarize.prompt.md) |  |
| [ck-docs-update](prompts/ck-docs-update.prompt.md) |  |
| [ck-fix-ci](prompts/ck-fix-ci.prompt.md) |  |
| [ck-fix-fast](prompts/ck-fix-fast.prompt.md) |  |
| [ck-fix-hard](prompts/ck-fix-hard.prompt.md) |  |
| [ck-fix-logs](prompts/ck-fix-logs.prompt.md) |  |
| [ck-fix-parallel](prompts/ck-fix-parallel.prompt.md) |  |
| [ck-fix-test](prompts/ck-fix-test.prompt.md) |  |
| [ck-fix-types](prompts/ck-fix-types.prompt.md) | Fix type errors |
| [ck-fix-ui](prompts/ck-fix-ui.prompt.md) |  |
| [ck-fix](prompts/ck-fix.prompt.md) |  |
| [ck-git-cm](prompts/ck-git-cm.prompt.md) |  |
| [ck-git-cp](prompts/ck-git-cp.prompt.md) |  |
| [ck-git-merge](prompts/ck-git-merge.prompt.md) | ⚠️ Merge code from one branch to another |
| [ck-git-pr](prompts/ck-git-pr.prompt.md) | Create a pull request |
| [ck-kanban](prompts/ck-kanban.prompt.md) |  |
| [ck-plan-archive](prompts/ck-plan-archive.prompt.md) |  |
| [ck-plan-ci](prompts/ck-plan-ci.prompt.md) |  |
| [ck-plan-cro](prompts/ck-plan-cro.prompt.md) |  |
| [ck-plan-fast](prompts/ck-plan-fast.prompt.md) |  |
| [ck-plan-hard](prompts/ck-plan-hard.prompt.md) |  |
| [ck-plan-parallel](prompts/ck-plan-parallel.prompt.md) |  |
| [ck-plan-two](prompts/ck-plan-two.prompt.md) |  |
| [ck-plan-validate](prompts/ck-plan-validate.prompt.md) |  |
| [ck-plan](prompts/ck-plan.prompt.md) |  |
| [ck-preview](prompts/ck-preview.prompt.md) |  |
| [ck-review-codebase](prompts/ck-review-codebase.prompt.md) |  |
| [ck-scout-ext](prompts/ck-scout-ext.prompt.md) |  |
| [ck-scout](prompts/ck-scout.prompt.md) |  |
| [ck-skill-add](prompts/ck-skill-add.prompt.md) |  |
| [ck-skill-create](prompts/ck-skill-create.prompt.md) |  |
| [ck-skill-fix-logs](prompts/ck-skill-fix-logs.prompt.md) |  |
| [ck-skill-optimize-auto](prompts/ck-skill-optimize-auto.prompt.md) |  |
| [ck-skill-optimize](prompts/ck-skill-optimize.prompt.md) |  |
| [ck-skill-plan](prompts/ck-skill-plan.prompt.md) |  |
| [ck-test-ui](prompts/ck-test-ui.prompt.md) |  |
| [ck-test](prompts/ck-test.prompt.md) |  |
| [ck-use-mcp](prompts/ck-use-mcp.prompt.md) |  |
| [ck-watzup](prompts/ck-watzup.prompt.md) | Review recent changes and wrap up the work |
| [ck-worktree](prompts/ck-worktree.prompt.md) | Create isolated git worktree for parallel development |

## Instructions

| Instruction | ApplyTo | Description |
|-------------|---------|-------------|
| [ck-frontend-design-pro](instructions/ck-frontend-design-pro.instructions.md) | `**/*.tsx, **/*.jsx, **/*.css` | Creates jaw-dropping, production-ready frontend interfaces AND delivers perfectl... |
| [ck-google-adk-python](instructions/ck-google-adk-python.instructions.md) | `**/*` | Guidelines for google-adk-python |
| [ck-research](instructions/ck-research.instructions.md) | `*` |  |
| [ck-template-skill](instructions/ck-template-skill.instructions.md) | `**/*` | Replace with description of the skill and when Claude should use it. |

## Skills

| Skill | Description |
|-------|-------------|
| [ck-ai-artist](skills/ck-ai-artist/SKILL.md) | Write and optimize prompts for AI-generated outcomes across text and image models. Use when crafting... |
| [ck-ai-multimodal](skills/ck-ai-multimodal/SKILL.md) | Process and generate multimedia content using Google Gemini API for better vision capabilities. Capa... |
| [ck-backend-development](skills/ck-backend-development/SKILL.md) | Build robust backend systems with modern technologies (Node.js, Python, Go, Rust), frameworks (NestJ... |
| [ck-better-auth](skills/ck-better-auth/SKILL.md) | Implement authentication and authorization with Better Auth - a framework-agnostic TypeScript authen... |
| [ck-chrome-devtools](skills/ck-chrome-devtools/SKILL.md) | Browser automation, debugging, and performance analysis using Puppeteer CLI scripts. Use for automat... |
| [ck-claude-code](skills/ck-claude-code/SKILL.md) | Activate when users ask about Claude Code installation, slash commands (/cook, , /fix, /test, /docs,... |
| [ck-code-review](skills/ck-code-review/SKILL.md) | Use when receiving code review feedback (especially if unclear or technically questionable), when co... |
| [ck-databases](skills/ck-databases/SKILL.md) | Work with MongoDB (document database, BSON documents, aggregation pipelines, Atlas cloud) and Postgr... |
| [ck-debugging](skills/ck-debugging/SKILL.md) | Systematic debugging framework ensuring root cause investigation before fixes. Includes four-phase d... |
| [ck-devops](skills/ck-devops/SKILL.md) | Deploy and manage cloud infrastructure on Cloudflare (Workers, R2, D1, KV, Pages, Durable Objects, B... |
| [ck-docs-seeker](skills/ck-docs-seeker/SKILL.md) | Search technical documentation using executable scripts to detect query type, fetch from llms.txt so... |
| [ck-frontend-design](skills/ck-frontend-design/SKILL.md) | Skill for frontend-design |
| [ck-frontend-development](skills/ck-frontend-development/SKILL.md) | Frontend development guidelines for React/TypeScript applications. Modern patterns including Suspens... |
| [ck-markdown-novel-viewer](skills/ck-markdown-novel-viewer/SKILL.md) | Skill for markdown-novel-viewer |
| [ck-mcp-builder](skills/ck-mcp-builder/SKILL.md) | Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact wi... |
| [ck-mcp-management](skills/ck-mcp-management/SKILL.md) | Manage Model Context Protocol (MCP) servers - discover, analyze, and execute tools/prompts/resources... |
| [ck-media-processing](skills/ck-media-processing/SKILL.md) | Process multimedia files with FFmpeg (video/audio encoding, conversion, streaming, filtering, hardwa... |
| [ck-mobile-development](skills/ck-mobile-development/SKILL.md) | Build modern mobile applications with React Native, Flutter, Swift/SwiftUI, and Kotlin/Jetpack Compo... |
| [ck-payment-integration](skills/ck-payment-integration/SKILL.md) | Implement payment integrations with SePay (Vietnamese payment gateway with VietQR, bank transfers, c... |
| [ck-planning](skills/ck-planning/SKILL.md) | Use when you need to plan technical solutions that are scalable, secure, and maintainable. |
| [ck-problem-solving](skills/ck-problem-solving/SKILL.md) | Apply systematic problem-solving techniques for complexity spirals (simplification cascades), innova... |
| [ck-repomix](skills/ck-repomix/SKILL.md) | Package entire code repositories into single AI-friendly files using Repomix. Capabilities include p... |
| [ck-sequential-thinking](skills/ck-sequential-thinking/SKILL.md) | Apply structured, reflective problem-solving for complex tasks requiring multi-step analysis, revisi... |
| [ck-shopify](skills/ck-shopify/SKILL.md) | Build Shopify applications, extensions, and themes using GraphQL/REST APIs, Shopify CLI, Polaris UI ... |
| [ck-skill-creator](skills/ck-skill-creator/SKILL.md) | Guide for creating effective skills, adding skill references, skill scripts or optimizing existing s... |
| [ck-threejs](skills/ck-threejs/SKILL.md) | Build immersive 3D web experiences with Three.js - WebGL/WebGPU library for scenes, cameras, geometr... |
| [ck-ui-styling](skills/ck-ui-styling/SKILL.md) | Create beautiful, accessible user interfaces with shadcn/ui components (built on Radix UI + Tailwind... |
| [ck-ui-ux-pro-max](skills/ck-ui-ux-pro-max/SKILL.md) | Skill for ui-ux-pro-max |
| [ck-web-frameworks](skills/ck-web-frameworks/SKILL.md) | Build modern full-stack web applications with Next.js (App Router, Server Components, RSC, PPR, SSR,... |

## Collections

| Collection | Description |
|------------|-------------|
| [CK Core Workflows](collections/ck-core.collection.yml) | Core CoKit workflows combining all essential agents, prompts, and skills for full-stack development ... |
| [CK Development Rules](collections/ck-development-rules.collection.yml) | Essential development rules and best practices including YAGNI, KISS, DRY principles, file naming, c... |
| [CK Documentation Management](collections/ck-documentation.collection.yml) | Documentation management workflows for maintaining project docs, codebase summaries, design guidelin... |
| [CK Git Workflow](collections/ck-git-workflow.collection.yml) | Git workflow automation including commit, push, merge, and pull request management. |
| [CK Orchestration Protocol](collections/ck-orchestration.collection.yml) | Workflow orchestration patterns for managing subagents, task delegation, and multi-phase implementat... |
| [CK UI/UX Design](collections/ck-ui-design.collection.yml) | UI/UX design workflows with frontend development, styling, multimodal AI for image generation, and d... |

## License

CC BY-NC 4.0 - See [LICENSE](LICENSE) for details.
