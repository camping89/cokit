# CoKit

Make GitHub Copilot smarter in 30 seconds.

CoKit provides 9 agents, 21 prompts, 5 instructions, 7 skills, and 5 collections to supercharge your Copilot experience.

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

## Prompts

### ClaudeKit Commands (`ck.*`) - Flexible Development

For day-to-day development, quick fixes, and exploration.

| Prompt | Description |
|--------|-------------|
| [ck.plan](prompts/ck-plan.prompt.md) | Intelligent plan creation with prompt enhancement |
| [ck.plan.hard](prompts/ck-plan-hard.prompt.md) | Deep research + comprehensive implementation plan |
| [ck.plan.fast](prompts/ck-plan-fast.prompt.md) | Quick plan without research phase |
| [ck.fix](prompts/ck-fix.prompt.md) | Analyze and fix issues |
| [ck.test](prompts/ck-test.prompt.md) | Run tests and analyze results |
| [ck.ask](prompts/ck-ask.prompt.md) | Answer technical questions |
| [ck.bootstrap](prompts/ck-bootstrap.prompt.md) | Bootstrap a new project step by step |
| [ck.review](prompts/ck-review.prompt.md) | Scan and analyze codebase |
| [ck.watzup](prompts/ck-watzup.prompt.md) | Review recent changes |
| [ck.journal](prompts/ck-journal.prompt.md) | Write journal entries |
| [ck.preview](prompts/ck-preview.prompt.md) | Preview markdown files |
| [ck.help](prompts/ck-help.prompt.md) | CoKit usage guide |

### SpecKit Commands (`ck.spec.*`) - Spec-Driven Development

For complex features requiring formal specifications. From [GitHub SpecKit](https://github.com/github/spec-kit).

| Prompt | Description |
|--------|-------------|
| [ck.spec.specify](prompts/ck-spec-specify.prompt.md) | Create feature specification from natural language |
| [ck.spec.clarify](prompts/ck-spec-clarify.prompt.md) | Ask clarification questions for specs |
| [ck.spec.constitution](prompts/ck-spec-constitution.prompt.md) | Create/update project constitution |
| [ck.spec.plan](prompts/ck-spec-plan.prompt.md) | Generate implementation plan from spec |
| [ck.spec.tasks](prompts/ck-spec-tasks.prompt.md) | Generate tasks from plan |
| [ck.spec.implement](prompts/ck-spec-implement.prompt.md) | Execute tasks from plan |
| [ck.spec.analyze](prompts/ck-spec-analyze.prompt.md) | Cross-artifact consistency analysis |
| [ck.spec.checklist](prompts/ck-spec-checklist.prompt.md) | Generate requirements validation checklist |
| [ck.spec.taskstoissues](prompts/ck-spec-taskstoissues.prompt.md) | Convert tasks to GitHub issues |

See [Commands Usage Guide](docs/cokit-commands-usage-guide.md) for when to use each workflow.

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
| [ck-backend-development](skills/ck-backend-development/SKILL.md) | Build robust backend systems with modern technologies |
| [ck-code-review](skills/ck-code-review/SKILL.md) | Code review feedback and quality assessment |
| [ck-debugging](skills/ck-debugging/SKILL.md) | Systematic debugging with root cause analysis |
| [ck-frontend-development](skills/ck-frontend-development/SKILL.md) | Frontend development for React/TypeScript |
| [ck-planning](skills/ck-planning/SKILL.md) | Plan scalable, secure, maintainable solutions |
| [ck-problem-solving](skills/ck-problem-solving/SKILL.md) | Systematic problem-solving techniques |
| [ck-sequential-thinking](skills/ck-sequential-thinking/SKILL.md) | Structured multi-step analysis |

## Collections

| Collection | Description |
|------------|-------------|
| [CK Core Workflows](collections/ck-core.collection.yml) | Core CoKit workflows for full-stack development |
| [CK Development Rules](collections/ck-development-rules.collection.yml) | YAGNI, KISS, DRY principles |
| [CK Documentation](collections/ck-documentation.collection.yml) | Documentation management workflows |
| [CK Git Workflow](collections/ck-git-workflow.collection.yml) | Git workflow automation |
| [CK Orchestration](collections/ck-orchestration.collection.yml) | Workflow orchestration patterns |

## Development

```bash
# Sync upstream sources (SpecKit + ClaudeKit)
npm run sync

# Transform only (no git pull)
npm run sync:transform

# Preview changes
npm run sync:dry-run
```

## License

CC BY-NC 4.0 - See [LICENSE](LICENSE) for details.
