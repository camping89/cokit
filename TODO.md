# TODO

## Completed

- [x] Make git operations optional in spec prompts (not all projects are git repos)
  - Updated `ck-spec-specify.prompt.md`: Git branch checks now optional, specs directory is primary source
  - Updated `ck-spec-taskstoissues.prompt.md`: Added clear error if not a git repo
  - `ck-spec-implement.prompt.md`: Already handles git check correctly for .gitignore

## Pending Tasks

### 1. Clean up redundant skills
- [ ] Review and remove duplicate/unused skills
- [ ] Consolidate overlapping functionality
- [ ] Document which skills to keep vs remove

### 2. Define unified workflow for cross-prompt suggestions
- [ ] Current issue: ClaudeKit prompts only suggest ClaudeKit next steps, SpecKit only suggests SpecKit
- [ ] Design a unified flow that allows cross-workflow suggestions
- [ ] Example: After `/ck.spec.implement` → suggest `/ck.test` OR `/ck:cook` depending on context
- [ ] Create flow diagram showing all prompts and their relationships
- [ ] Update "Suggested Next Steps" sections in all prompts to be context-aware

### 3. Investigate .venv requirement in new projects
- [ ] Check why .venv is created when project has no Python code
- [ ] Determine if .venv is needed for running skills
- [ ] If yes: Document this requirement clearly
- [ ] If no: Remove unnecessary .venv creation from bootstrap/setup
