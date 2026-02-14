# Agent Patterns

Standard patterns for spawning and using agents in cook workflows.

## Task Tool Pattern
```
Task(type="[type]", prompt="[task description]", description="[brief]")
```

## Research Phase
```
Task(type="researcher", prompt="Research [topic]. Report ≤150 lines.", description="Research [topic]")
```
- Use multiple researchers in parallel for different topics
- Keep reports ≤150 lines with citations

## Scout Phase
```
Task(type="scout", prompt="Find files related to [feature] in codebase", description="Scout [feature]")
```
- Use `/scout:ext` (preferred) or `/scout` (fallback)

## Planning Phase
```
Task(type="planner", prompt="Create implementation plan based on reports: [reports]. Save to [path]", description="Plan [feature]")
```
- Input: researcher and scout reports
- Output: `plan.md` + `phase-XX-*.md` files

## UI Implementation
```
Task(type="ui-ux-designer", prompt="Implement [feature] UI per ./docs/design-guidelines.md", description="UI [feature]")
```
- For frontend work
- Follow design guidelines

## Testing
```
Task(type="tester", prompt="Run test suite for plan phase [phase-name]", description="Test [phase]")
```
- Must achieve 100% pass rate

## Debugging
```
Task(type="debugger", prompt="Analyze failures: [details]", description="Debug [issue]")
```
- Use when tests fail
- Provides root cause analysis

## Code Review
```
Task(type="code-reviewer", prompt="Review changes for [phase]. Check security, performance, YAGNI/KISS/DRY. Return score (X/10), critical, warnings, suggestions.", description="Review [phase]")
```

## Project Management
```
Task(type="project-manager", prompt="Update plan status in [path]. Mark [phase] as DONE. Update roadmap.", description="Update plan")
```

## Documentation
```
Task(type="docs-manager", prompt="Update docs for [phase]. Changed files: [list]", description="Update docs")
```

## Git Operations
```
Task(type="git-manager", prompt="Stage and commit changes with conventional commit message", description="Commit changes")
```

## Parallel Execution
```
Task(type="fullstack-developer", prompt="Implement [phase-file] with file ownership: [files]", description="Implement phase [N]")
```
- Launch multiple for parallel phases
- Include file ownership boundaries
