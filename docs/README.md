# CoKit Documentation

Complete reference for CoKit - GitHub Copilot AI resource toolkit.

**Current Version:** 1.0.9
**Last Updated:** 2026-01-20

## Quick Navigation

- [Team Presentation](./cokit-team-presentation.md) - Detailed overview and architecture
- [Slides](./cokit-slides.md) - Condensed presentation format
- [Migration Guide](./migration-guide.md) - Claude Code users
- [Processing Flow](./copilot-processing-flow.md) - Resource interaction
- [Project Roadmap](./project-roadmap.md) - Version history and phases

## Resource Overview

CoKit includes **9 agents**, **14 prompts**, **5 instructions**, **7 skills**, and **5 collections**.

### Prompts (`prompts/ck-*.prompt.md`) - 14 total

Entry points for Copilot workflows with `ck-` prefix:

| Category | Prompts |
|----------|---------|
| Core | `/ck-fix`, `/ck-plan`, `/ck-code` |
| Implementation | `/ck-cook`, `/ck-bootstrap` |
| Quality | `/ck-test`, `/ck-review-codebase`, `/ck-debug` |
| Analysis | `/ck-scout`, `/ck-ask` |
| Collaboration | `/ck-brainstorm`, `/ck-docs`, `/ck-git` |
| Help | `/ck-ck-help` |

### Agents (`agents/*.agent.md`) - 9 total

Specialized personas executing specific tasks:

| Agent | Purpose |
|-------|---------|
| **planner** | Implementation planning and design |
| **code-reviewer** | Comprehensive code review |
| **debugger** | Issue investigation |
| **tester** | Test writing and validation |
| **researcher** | Technology research |
| **scout** | Codebase navigation |
| **git-manager** | Git workflows |
| **brainstormer** | Solution ideation |
| **docs-manager** | Documentation management |

### Instructions (`instructions/ck-*.instructions.md`) - 5 total

Coding standards auto-applied by file pattern:

- **ck-backend** - Backend development (Node.js, Python, Go, Rust)
- **ck-frontend** - Frontend development (React, TypeScript)
- **ck-testing** - Testing standards and patterns
- **ck-development** - YAGNI/KISS/DRY principles
- **ck-research** - Research methodology

### Skills (`skills/ck-*/`) - 7 total

Deep specialized expertise packages:

- **ck-debugging** - Systematic root cause analysis
- **ck-code-review** - Verification gates and protocols
- **ck-planning** - Research → design → implementation
- **ck-problem-solving** - Complexity spirals and solutions
- **ck-sequential-thinking** - Multi-step problem solving
- **ck-backend-development** - Backend framework patterns
- **ck-frontend-development** - Frontend framework patterns

### Collections (`collections/ck-*.collection.yml`) - 5 total

Curated resource bundles by workflow:

- **ck-core** - Core workflows for full-stack development
- **ck-development-rules** - YAGNI/KISS/DRY principles
- **ck-documentation** - Documentation management
- **ck-git-workflow** - Git workflow automation
- **ck-orchestration** - Task delegation patterns

## Installation

```bash
# Interactive setup
npx cokit-cli init

# Global resources only
npx cokit-cli init -g

# Both project and global
npx cokit-cli init -a
```

## How It Works

1. User calls prompt (e.g., `/ck-fix`)
2. Prompt activates specified agent (e.g., `debugger`)
3. Agent auto-receives instructions by file pattern
4. Agent activates skills based on task context
5. All resources can be bundled via collections

See [Processing Flow](./copilot-processing-flow.md) for detailed interaction diagrams.

## References

- **Root README:** [CoKit Repository](../README.md)
- **Comprehensive Guide:** [Mapping Guide](./cokit-comprehensive-mapping-guide.md)
- **Architecture:** See `./copilot-processing-flow.md`
