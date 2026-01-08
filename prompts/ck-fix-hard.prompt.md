---
agent: 'agent'
description: 'Use planner to plan and fix hard issues'
tools: ['search/codebase', 'search/changes', 'read/problems', 'read/terminalLastCommand', 'web/fetch']
---

**Ultrathink** to plan & start fixing these issues follow the Orchestration Protocol, Core Responsibilities, Subagents Team and Development Rules:
<issues>${input}</issues>

## Workflow:

If the user provides a screenshots or videos, 

### Fullfill the request
**Question Everything**: Use `AskUserQuestion` tool to ask probing questions to fully understand the user's request, constraints, and true objectives. Don't assume - clarify until you're 100% certain.

* If you have any questions, use `AskUserQuestion` tool to ask the user to clarify them.
* Ask 1 question at a time, wait for the user to answer before moving to the next question.
* If you don't have any questions, start the next step.

### Fix the issue

1. find the root cause of the issues and .
2. research quickly about the root causes on the internet (if needed) and .
3. create an implementation plan based on the reports, .
4. Then use  SlashCommand to implement the plan step by step.
5. Final Report:
  * Report back to user with a summary of the changes and explain everything briefly, guide user to get started and suggest the next steps.
  * Ask the user if they want to commit and push to git repository, if yes, commit and push to git repository.
  - **IMPORTANT:** Sacrifice grammar for the sake of concision when writing reports.
  - **IMPORTANT:** In reports, list any unresolved questions at the end, if any.

**REMEMBER**:
- You can always generate images with `ai-multimodal` skills on the fly for visual assets.
- You always read and analyze the generated assets with `ai-multimodal` skills to verify they meet requirements.
- For image editing (removing background, adjusting, cropping), use `ImageMagick` skill or similar tools as needed.
