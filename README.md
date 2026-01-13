# CoKit

Make GitHub Copilot smarter in 30 seconds.

CoKit provides 15 agents, 64 prompts, 7 instructions, 27 skills, and 6 collections to supercharge your Copilot experience.

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
| [brainstormer](agents/brainstormer.agent.md) | Brainstorm software solutions, evaluate architectural approaches, debate technical decisions. |
| [code-reviewer](agents/code-reviewer.agent.md) | Comprehensive code review and quality assessment. |
| [database-admin](agents/database-admin.agent.md) | Work with database systems - querying, performance, optimization, indexes, backups, replication. |
| [debugger](agents/debugger.agent.md) | Investigate issues, analyze system behavior, diagnose performance problems, collect and analyze logs. |
| [docs-manager](agents/docs-manager.agent.md) | Manage technical documentation, implementation standards, update docs based on code changes. |
| [fullstack-developer](agents/fullstack-developer.agent.md) | Execute implementation phases from parallel plans. |
| [git-manager](agents/git-manager.agent.md) | Stage, commit, and push code changes with conventional commits. |
| [mcp-manager](agents/mcp-manager.agent.md) | Manage MCP server integrations - discover tools/prompts/resources, analyze relevance for tasks. |
| [planner](agents/planner.agent.md) | Research, analyze, and create comprehensive implementation plans for features and architectures. |
| [project-manager](agents/project-manager.agent.md) | Comprehensive project oversight and coordination. |
| [researcher](agents/researcher.agent.md) | Conduct comprehensive research on software topics, investigate technologies, find documentation. |
| [scout](agents/scout.agent.md) | Quickly locate relevant files across a large codebase to complete a specific task. |
| [scout-external](agents/scout-external.agent.md) | Locate files using external agentic tools (Gemini, OpenCode, etc.). |
| [tester](agents/tester.agent.md) | Validate code quality through testing - unit, integration, coverage, error handling, performance. |
| [ui-ux-designer](agents/ui-ux-designer.agent.md) | UI/UX design - interface designs, wireframes, design systems, user research, responsive layouts. |

## Prompts

| Prompt | Description |
|--------|-------------|
| [ck-ask](prompts/ck-ask.prompt.md) | Answer technical and architectural questions. |
| [ck-bootstrap](prompts/ck-bootstrap.prompt.md) | Bootstrap a new project step by step |
| [ck-bootstrap-auto](prompts/ck-bootstrap-auto.prompt.md) | Bootstrap a new project automatically |
| [ck-bootstrap-auto-fast](prompts/ck-bootstrap-auto-fast.prompt.md) | Quickly bootstrap a new project automatically |
| [ck-bootstrap-auto-parallel](prompts/ck-bootstrap-auto-parallel.prompt.md) | Bootstrap project with parallel execution |
| [ck-brainstorm](prompts/ck-brainstorm.prompt.md) | Brainstorm a feature |
| [ck-ck-help](prompts/ck-ck-help.prompt.md) | CoKit usage guide - just type naturally |
| [ck-code](prompts/ck-code.prompt.md) | Start coding & testing an existing plan |
| [ck-code-auto](prompts/ck-code-auto.prompt.md) | [AUTO] Start coding & testing an existing plan |
| [ck-code-no-test](prompts/ck-code-no-test.prompt.md) | Start coding an existing plan (no testing) |
| [ck-code-parallel](prompts/ck-code-parallel.prompt.md) | Execute parallel or sequential phases based on plan structure |
| [ck-coding-level](prompts/ck-coding-level.prompt.md) | Set your coding experience level for tailored explanations |
| [ck-cook](prompts/ck-cook.prompt.md) | Implement a feature [step by step] |
| [ck-cook-auto](prompts/ck-cook-auto.prompt.md) | Implement a feature automatically |
| [ck-cook-auto-fast](prompts/ck-cook-auto-fast.prompt.md) | No research. Only scout, plan & implement |
| [ck-cook-auto-parallel](prompts/ck-cook-auto-parallel.prompt.md) | Plan parallel phases & execute with fullstack-developer agents |
| [ck-debug](prompts/ck-debug.prompt.md) | Debugging technical issues and providing solutions |
| [ck-design-3d](prompts/ck-design-3d.prompt.md) | Create immersive interactive 3D designs with Three.js |
| [ck-design-describe](prompts/ck-design-describe.prompt.md) | Describe a design based on screenshot/video |
| [ck-design-fast](prompts/ck-design-fast.prompt.md) | Create a quick design |
| [ck-design-good](prompts/ck-design-good.prompt.md) | Create an immersive design |
| [ck-design-screenshot](prompts/ck-design-screenshot.prompt.md) | Create a design based on screenshot |
| [ck-design-video](prompts/ck-design-video.prompt.md) | Create a design based on video |
| [ck-docs-init](prompts/ck-docs-init.prompt.md) | Analyze the codebase and create initial documentation |
| [ck-docs-summarize](prompts/ck-docs-summarize.prompt.md) | Analyze the codebase and summarize documentation |
| [ck-docs-update](prompts/ck-docs-update.prompt.md) | Analyze the codebase and update documentation |
| [ck-fix](prompts/ck-fix.prompt.md) | Analyze and fix issues [INTELLIGENT ROUTING] |
| [ck-fix-ci](prompts/ck-fix-ci.prompt.md) | Analyze Github Actions logs and fix issues |
| [ck-fix-fast](prompts/ck-fix-fast.prompt.md) | Analyze and fix small issues [FAST] |
| [ck-fix-hard](prompts/ck-fix-hard.prompt.md) | Use planner to plan and fix hard issues |
| [ck-fix-logs](prompts/ck-fix-logs.prompt.md) | Analyze logs and fix issues |
| [ck-fix-parallel](prompts/ck-fix-parallel.prompt.md) | Analyze & fix issues with parallel fullstack-developer agents |
| [ck-fix-test](prompts/ck-fix-test.prompt.md) | Run test suite and fix issues |
| [ck-fix-types](prompts/ck-fix-types.prompt.md) | Fix type errors |
| [ck-fix-ui](prompts/ck-fix-ui.prompt.md) | Analyze and fix UI issues |
| [ck-git-cm](prompts/ck-git-cm.prompt.md) | Stage all files and create a commit |
| [ck-git-cp](prompts/ck-git-cp.prompt.md) | Stage, commit and push all code in the current branch |
| [ck-git-merge](prompts/ck-git-merge.prompt.md) | Merge code from one branch to another |
| [ck-git-pr](prompts/ck-git-pr.prompt.md) | Create a pull request |
| [ck-kanban](prompts/ck-kanban.prompt.md) | Plans directory management |
| [ck-plan](prompts/ck-plan.prompt.md) | Intelligent plan creation with prompt enhancement |
| [ck-plan-archive](prompts/ck-plan-archive.prompt.md) | Write journal entries and archive plans |
| [ck-plan-ci](prompts/ck-plan-ci.prompt.md) | Analyze Github Actions logs and plan fixes |
| [ck-plan-cro](prompts/ck-plan-cro.prompt.md) | Create a CRO plan for the given content |
| [ck-plan-fast](prompts/ck-plan-fast.prompt.md) | No research. Only analyze and create an implementation plan |
| [ck-plan-hard](prompts/ck-plan-hard.prompt.md) | Research, analyze, and create an implementation plan |
| [ck-plan-parallel](prompts/ck-plan-parallel.prompt.md) | Create detailed plan with parallel-executable phases |
| [ck-plan-two](prompts/ck-plan-two.prompt.md) | Research & create an implementation plan with 2 approaches |
| [ck-plan-validate](prompts/ck-plan-validate.prompt.md) | Validate plan with critical questions interview |
| [ck-preview](prompts/ck-preview.prompt.md) | Preview file or directory |
| [ck-review-codebase](prompts/ck-review-codebase.prompt.md) | Scan & analyze the codebase |
| [ck-scout](prompts/ck-scout.prompt.md) | Scout given directories to respond to the user's requests |
| [ck-scout-ext](prompts/ck-scout-ext.prompt.md) | Use external agentic tools to scout given directories |
| [ck-skill-add](prompts/ck-skill-add.prompt.md) | Add new reference files or scripts to a skill |
| [ck-skill-create](prompts/ck-skill-create.prompt.md) | Create a new agent skill |
| [ck-skill-fix-logs](prompts/ck-skill-fix-logs.prompt.md) | Fix the agent skill based on logs.txt file |
| [ck-skill-optimize](prompts/ck-skill-optimize.prompt.md) | Optimize an existing agent skill |
| [ck-skill-optimize-auto](prompts/ck-skill-optimize-auto.prompt.md) | Optimize an existing agent skill [auto] |
| [ck-skill-plan](prompts/ck-skill-plan.prompt.md) | Plan to create a new agent skill |
| [ck-test](prompts/ck-test.prompt.md) | Run tests locally and analyze the summary report |
| [ck-test-ui](prompts/ck-test-ui.prompt.md) | Run UI tests on a website & generate a detailed report |
| [ck-use-mcp](prompts/ck-use-mcp.prompt.md) | Utilize tools of Model Context Protocol (MCP) servers |
| [ck-watzup](prompts/ck-watzup.prompt.md) | Review recent changes and wrap up the work |
| [ck-worktree](prompts/ck-worktree.prompt.md) | Create isolated git worktree for parallel development |

## Instructions

| Instruction | ApplyTo | Description |
|-------------|---------|-------------|
| [ck-backend](instructions/ck-backend.instructions.md) | `**/*.py, *.go, *.rs, *.java, *.cs, api/**` | Backend development rules |
| [ck-development](instructions/ck-development.instructions.md) | `**/*` | YAGNI/KISS/DRY principles |
| [ck-frontend](instructions/ck-frontend.instructions.md) | `**/*.tsx, *.jsx, *.vue, *.svelte, components/**` | Frontend component guidelines |
| [ck-frontend-design-pro](instructions/ck-frontend-design-pro.instructions.md) | `**/*.tsx, *.jsx, *.css` | Production-ready frontend with perfect images |
| [ck-google-adk-python](instructions/ck-google-adk-python.instructions.md) | `**/*` | Google ADK Python guidelines |
| [ck-research](instructions/ck-research.instructions.md) | `*` | Research guidelines |
| [ck-testing](instructions/ck-testing.instructions.md) | `**/*.test.*, *.spec.*, test_*.py, *_test.go` | Testing standards |

## Skills

| Skill | Description |
|-------|-------------|
| [ck-ai-artist](skills/ck-ai-artist/SKILL.md) | Write and optimize prompts for AI-generated outcomes across text and image models. Use when crafting... |
| [ck-backend-development](skills/ck-backend-development/SKILL.md) | Build robust backend systems with modern technologies (Node.js, Python, Go, Rust), frameworks (NestJ... |
| [ck-better-auth](skills/ck-better-auth/SKILL.md) | Implement authentication and authorization with Better Auth - a framework-agnostic TypeScript authen... |
| [ck-chrome-devtools](skills/ck-chrome-devtools/SKILL.md) | Browser automation, debugging, and performance analysis using Puppeteer CLI scripts. Use for automat... |
| [ck-code-review](skills/ck-code-review/SKILL.md) | Use when receiving code review feedback (especially if unclear or technically questionable), when co... |
| [ck-databases](skills/ck-databases/SKILL.md) | Work with MongoDB (document database, BSON documents, aggregation pipelines, Atlas cloud) and Postgr... |
| [ck-debugging](skills/ck-debugging/SKILL.md) | Systematic debugging framework ensuring root cause investigation before fixes. Includes four-phase d... |
| [ck-devops](skills/ck-devops/SKILL.md) | Deploy and manage cloud infrastructure on Cloudflare (Workers, R2, D1, KV, Pages, Durable Objects, B... |
| [ck-docs-seeker](skills/ck-docs-seeker/SKILL.md) | Search technical documentation using executable scripts to detect query type, fetch from llms.txt so... |
| [ck-frontend-design](skills/ck-frontend-design/SKILL.md) | Create distinctive, production-grade frontend interfaces with high design quality. Use when building... |
| [ck-frontend-development](skills/ck-frontend-development/SKILL.md) | Frontend development guidelines for React/TypeScript applications. Modern patterns including Suspens... |
| [ck-markdown-novel-viewer](skills/ck-markdown-novel-viewer/SKILL.md) | Render markdown files with calm, book-like reading experience via background HTTP server. Features n... |
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
| [ck-ui-ux-pro-max](skills/ck-ui-ux-pro-max/SKILL.md) | Frontend UI/UX design intelligence - activate FIRST when user requests beautiful, stunning, or aesth... |
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
