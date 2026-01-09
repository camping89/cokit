---
agent: 'agent'
description: 'Analyze and fix UI issues'
tools: ['search/codebase', 'search/changes', 'read/problems', 'web/fetch']
---

## Required Skills (Priority Order)
1. **`ui-ux-pro-max`** - Design intelligence database (ALWAYS ACTIVATE FIRST)
2. **`aesthetic`** - Design principles
3. **`frontend-design`** - Implementation patterns

Read and analyze `./docs/design-guidelines.md` then fix the following issues:
<issue>${input}</issue>

## Workflow
**FIRST**: Run `ui-ux-pro-max` searches to understand context and common issues:
```bash
python3  "<product-type>" --domain product
python3  "<style-keywords>" --domain style
python3  "accessibility" --domain ux
python3  "z-index animation" --domain ux
```

If the user provides a screenshots or videos, 

1. implement the fix step by step.
2. Use screenshot capture tools along with `ai-multimodal` skill to take screenshots of the implemented fix (at the exact parent container, don't take screenshot of the whole page) and use the appropriate Gemini analysis skills (`ai-multimodal`, `video-analysis`, or `document-extraction`) to analyze those outputs so the result matches the design guideline and addresses all issues.
  - If the issues are not addressed, repeat the process until all issues are addressed.
3. 
4. test the fix and compile the code to make sure it works, .
  - If there are issues or failed tests, ask main agent to fix all of them and repeat the process until all tests pass.
5. Project Management & Documentation:
  **If user approves the changes:** Use `project-manager` and s  to update the project progress and documentation:
    * update the project progress and task status in the given plan file.
    * update the docs in `./docs` directory if needed.
    * create a project roadmap at `./docs/project-roadmap.md` file.
    * **IMPORTANT:** Sacrifice grammar for the sake of concision when writing outputs.
  **If user rejects the changes:** Ask user to explain the issues and ask main agent to fix all of them and repeat the process.
6. Final Report:
  * Report back to user with a summary of the changes and explain everything briefly, guide user to get started and suggest the next steps.
  * Ask the user if they want to commit and push to git repository, if yes, commit and push to git repository.
  * **IMPORTANT:** Sacrifice grammar for the sake of concision when writing reports.
  * **IMPORTANT:** In reports, list any unresolved questions at the end, if any.

**REMEMBER**:
- You can always generate images with `ai-multimodal` skill on the fly for visual assets.
- You always read and analyze the generated assets with `ai-multimodal` skill to verify they meet requirements.
- For image editing (removing background, adjusting, cropping), use `ImageMagick` skill or similar tools as needed.
- **IMPORTANT:** 
