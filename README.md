# CoKit

Make GitHub Copilot smarter in 30 seconds.

CoKit provides 9 agents, 14 prompts, 5 instructions, 7 skills, and 5 collections to supercharge your Copilot experience.

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
| [debugger](agents/debugger.agent.md) | Investigate issues, analyze system behavior, diagnose performance problems, collect and analyze logs. |
| [docs-manager](agents/docs-manager.agent.md) | Manage technical documentation, implementation standards, update docs based on code changes. |
| [git-manager](agents/git-manager.agent.md) | Stage, commit, and push code changes with conventional commits. |
| [planner](agents/planner.agent.md) | Research, analyze, and create comprehensive implementation plans for features and architectures. |
| [researcher](agents/researcher.agent.md) | Conduct comprehensive research on software topics, investigate technologies, find documentation. |
| [scout](agents/scout.agent.md) | Quickly locate relevant files across a large codebase to complete a specific task. |
| [tester](agents/tester.agent.md) | Validate code quality through testing - unit, integration, coverage, error handling, performance. |

## Prompts

| Prompt | Description |
|--------|-------------|
| [ck-ask](prompts/ck-ask.prompt.md) | Answer technical and architectural questions. |
| [ck-bootstrap](prompts/ck-bootstrap.prompt.md) | Bootstrap a new project step by step |
| [ck-brainstorm](prompts/ck-brainstorm.prompt.md) | Brainstorm a feature |
| [ck-ck-help](prompts/ck-ck-help.prompt.md) | CoKit usage guide - just type naturally |
| [ck-code](prompts/ck-code.prompt.md) | Start coding & testing an existing plan |
| [ck-cook](prompts/ck-cook.prompt.md) | Implement a feature [step by step] |
| [ck-debug](prompts/ck-debug.prompt.md) | Debugging technical issues and providing solutions |
| [ck-docs](prompts/ck-docs.prompt.md) | Documentation workflow - init, summarize, or update docs |
| [ck-fix](prompts/ck-fix.prompt.md) | Analyze and fix issues [INTELLIGENT ROUTING] |
| [ck-git](prompts/ck-git.prompt.md) | Git workflow - commit, push, merge, or create PR |
| [ck-plan](prompts/ck-plan.prompt.md) | Intelligent plan creation with prompt enhancement |
| [ck-review-codebase](prompts/ck-review-codebase.prompt.md) | Scan & analyze the codebase |
| [ck-scout](prompts/ck-scout.prompt.md) | Scout given directories to respond to the user's requests |
| [ck-test](prompts/ck-test.prompt.md) | Run tests locally and analyze the summary report |

## Instructions

| Instruction | ApplyTo | Description |
|-------------|---------|-------------|
| [ck-backend](instructions/ck-backend.instructions.md) | `**/*.py, *.go, *.rs, *.java, *.cs, api/**` | Backend development rules |
| [ck-development](instructions/ck-development.instructions.md) | `**/*` | YAGNI/KISS/DRY principles |
| [ck-frontend](instructions/ck-frontend.instructions.md) | `**/*.tsx, *.jsx, *.vue, *.svelte, components/**` | Frontend component guidelines |
| [ck-research](instructions/ck-research.instructions.md) | `*` | Research guidelines |
| [ck-testing](instructions/ck-testing.instructions.md) | `**/*.test.*, *.spec.*, test_*.py, *_test.go` | Testing standards |

## Skills

| Skill | Description |
|-------|-------------|
| [ck-backend-development](skills/ck-backend-development/SKILL.md) | Build robust backend systems with modern technologies (Node.js, Python, Go, Rust), frameworks (NestJ... |
| [ck-code-review](skills/ck-code-review/SKILL.md) | Use when receiving code review feedback (especially if unclear or technically questionable), when co... |
| [ck-debugging](skills/ck-debugging/SKILL.md) | Systematic debugging framework ensuring root cause investigation before fixes. Includes four-phase d... |
| [ck-frontend-development](skills/ck-frontend-development/SKILL.md) | Frontend development guidelines for React/TypeScript applications. Modern patterns including Suspens... |
| [ck-planning](skills/ck-planning/SKILL.md) | Use when you need to plan technical solutions that are scalable, secure, and maintainable. |
| [ck-problem-solving](skills/ck-problem-solving/SKILL.md) | Apply systematic problem-solving techniques for complexity spirals (simplification cascades), innova... |
| [ck-sequential-thinking](skills/ck-sequential-thinking/SKILL.md) | Apply structured, reflective problem-solving for complex tasks requiring multi-step analysis, revisi... |

## Collections

| Collection | Description |
|------------|-------------|
| [CK Core Workflows](collections/ck-core.collection.yml) | Core CoKit workflows combining all essential agents, prompts, and skills for full-stack development ... |
| [CK Development Rules](collections/ck-development-rules.collection.yml) | Essential development rules and best practices including YAGNI, KISS, DRY principles, file naming, c... |
| [CK Documentation Management](collections/ck-documentation.collection.yml) | Documentation management workflows for maintaining project docs, codebase summaries, design guidelin... |
| [CK Git Workflow](collections/ck-git-workflow.collection.yml) | Git workflow automation including commit, push, merge, and pull request management. |
| [CK Orchestration Protocol](collections/ck-orchestration.collection.yml) | Workflow orchestration patterns for managing subagents, task delegation, and multi-phase implementat... |

## License

CC BY-NC 4.0 - See [LICENSE](LICENSE) for details.
