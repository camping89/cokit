---
agent: 'agent'
description: 'Analyze and fix UI issues'
argument-hint: 'Describe the UI issue'
---

## Required Skills
1. **`frontend-design`** - Design patterns and implementation

Read and analyze `./docs/design-guidelines.md` then fix the following issues:
<issue>${input}</issue>

## Workflow
1. Activate `frontend-design` skill to understand design patterns and best practices.
2. Implement the fix step by step following design guidelines.
3. Take screenshots of the fix and analyze to verify it matches the design guideline and addresses all issues.
   - If the issues are not addressed, repeat the process until all issues are addressed.
4. Test the fix and compile the code to make sure it works.
   - If there are issues or failed tests, fix all of them and repeat until all tests pass.
5. Final Report:
   * Summary of changes, guide user to get started, suggest next steps.
   * Ask the user if they want to commit and push to git repository.

---

## Suggested Next Steps

| Command | Description |
|---------|-------------|
| `/ck-test` | Run tests and analyze results |
| `/ck-git` | Commit changes |
