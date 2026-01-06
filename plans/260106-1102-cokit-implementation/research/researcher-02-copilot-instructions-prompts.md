# Research Report: GitHub Copilot Custom Instructions & Prompt Files

**Conducted:** 2026-01-06 | **Sources:** 10+ GitHub Official Docs & Blog Articles

## Executive Summary

GitHub Copilot supports 4 primary customization file types: `copilot-instructions.md` (repo-wide), `*.instructions.md` (scoped), `*.prompt.md` (reusable tasks), and `AGENTS.md` (nested precedence). All use Markdown + YAML frontmatter. Key innovation: path-scoped instructions w/ `applyTo` glob patterns. AGENTS.md now officially standardized under Linux Foundation (Aug 2025). File precedence: nested > root > explicit user input overrides all.

## 1. copilot-instructions.md

**Location:** `.github/copilot-instructions.md` (workspace root)
**Scope:** Repository-wide, applies to all Copilot agents & code review
**Format:** Plain Markdown (no frontmatter required)
**Use Case:** General coding standards, team guidelines, deprecated libraries, architectural patterns

**Best Practice:**
- Reserve for team-wide conventions
- Keep concise & focused
- Include preferred frameworks, testing requirements, security considerations

## 2. *.instructions.md Files

**Location:** `.github/instructions/` folder
**Scope:** Path-specific via `applyTo` glob patterns
**Format:**
```yaml
---
applyTo: "src/api/**/*.ts"
excludeAgent: "code-review"  # Optional: "coding-agent" or "code-review"
description: "API layer guidelines"
---
# Your instructions
```

**applyTo Patterns:**
- Glob syntax supported (e.g., `**/*.py`, `app/models/**/*.rb`)
- Multiple patterns: comma-separated
- Files without `applyTo` are ignored
- Takes precedence over `copilot-instructions.md` when matched

**excludeAgent Property:**
- `excludeAgent: "code-review"` → Hidden from code review
- `excludeAgent: "coding-agent"` → Hidden from coding agent
- Omit property = both agents can use it

**Best Practices:**
- Scope guidance to individual areas (frontend, security, backend)
- Use separate files per language/concern
- Apply only coding agent to deployment/infrastructure code
- Apply only code-review to PR-specific checks

## 3. *.prompt.md Files

**Location:** `.github/prompts/` folder
**Scope:** Reusable task-specific templates, invoked via `/<filename>` slash command
**Format:**
```yaml
---
mode: 'agent'
description: 'Generate a new React form component'
model: 'GPT-4o'  # Optional
tools: ['githubRepo', 'search/codebase']  # Optional
---
# Your prompt instructions
```

**Variables:**
- `${input:varName:Placeholder text}` - User input fields
- `{selectedText}` - Currently selected code in editor
- Supports dynamic context injection

**Key Features:**
- Executable as slash commands (`/react-form-component`)
- Available in VS Code, Visual Studio, JetBrains
- Model specification allows GPT-4o override
- Tool specification enables search, repo access

**Best Practices:**
- Create task-specific templates (code gen, testing, docs)
- Use clear description for discoverability
- Leverage `{selectedText}` for context-aware prompts
- Reference via `#prompt:` in chat

## 4. AGENTS.md

**Location:** Any directory level (root recommended, nested supported)
**Scope:** Directory tree downward; nested files override parent
**Format:** Plain Markdown (any heading structure), no frontmatter required

**Precedence Rules (Highest to Lowest):**
1. Explicit user chat prompt
2. Closest/most-deeply-nested AGENTS.md
3. Root AGENTS.md
4. `.github/copilot-instructions.md`

**Nesting Behavior:**
- Agents read nearest AGENTS.md in directory tree
- Monorepos: Place nested AGENTS.md in package folders
- Real example: OpenAI repo has 88 AGENTS.md files
- Scope = entire directory tree rooted at file location

**Implementation Notes:**
- Plain text, no structured format required
- Works alongside copilot-instructions.md & .instructions.md
- Compatible with CLAUDE.md & GEMINI.md
- **Note:** Known VS Code bug (Issue #271489) - only root-level currently respected in some versions; nested support inconsistent

**Standardization:**
- Now stewarded by Agentic AI Foundation (Linux Foundation)
- Formalized August 2025
- Spreading rapidly across OSS projects

## 5. File Structure Hierarchy

```
.github/
├── copilot-instructions.md          # Repo-wide base instructions
├── instructions/
│   ├── api.instructions.md          # applyTo: "src/api/**/*.ts"
│   ├── tests.instructions.md        # applyTo: "**/*.test.ts"
│   └── security.instructions.md     # excludeAgent: "code-review"
└── prompts/
    ├── generate-component.prompt.md
    ├── write-tests.prompt.md
    └── document-api.prompt.md

AGENTS.md                            # Root-level, applies to all
packages/
├── web/
│   └── AGENTS.md                    # Nested, overrides root for /web
├── api/
    └── AGENTS.md                    # Nested, overrides root for /api
```

## 6. Key Innovations (2025)

**Path-Scoped Instructions (Sep 2025):**
- `applyTo` glob patterns enable granular control
- Reduces need for monolithic instruction files
- Automatic application based on file context

**Agent-Specific Instructions (Nov 2025):**
- `excludeAgent` property allows per-agent configuration
- Different rules for coding-agent vs code-review

**Coding Agent AGENTS.md Support (Aug 2025):**
- Previously chat-only, now applies to all agents
- Formal standardization under Linux Foundation

## 7. Organization-Level Configuration

**GitHub Admin Settings:**
- Enable/disable Copilot org-wide
- Public code matching policies
- Seat management & license assignment

**VS Code Workspace Settings (.vscode/settings.json):**
```json
{
  "github.copilot.enable": {
    "*": true,
    "markdown": false
  },
  "github.copilot.chat.codeGeneration.useInstructionFiles": true,
  "chat.promptFilesLocations": [
    ".github/prompts",
    ".prompts"
  ]
}
```

## 8. Current Limitations & Compatibility

**IDE Support:**
- Prompt files: VS Code, Visual Studio, JetBrains only
- Instructions: All IDEs via GitHub.com
- Code review: GitHub.com only

**Known Issues:**
- Nested AGENTS.md parsing inconsistent (VS Code issue #271489)
- Organization-level instruction rollout incomplete
- Custom agent precedence edge cases documented

## 9. Unresolved Questions

1. Does `applyTo` support negative patterns (exclude) or only positive matching?
2. Performance impact of 80+ nested AGENTS.md files in large monorepos?
3. Interaction order when multiple `*.instructions.md` match same file?
4. Can `excludeAgent` be used in `copilot-instructions.md` or only `*.instructions.md`?
5. How does `tools` field in prompt frontmatter interact with available MCP servers?

## Sources

- [GitHub Copilot agent-specific instructions](https://github.blog/changelog/2025-11-12-copilot-code-review-and-coding-agent-now-support-agent-specific-instructions/)
- [Path-scoped custom instruction support](https://github.blog/changelog/2025-09-03-copilot-code-review-path-scoped-custom-instruction-file-support/)
- [Unlocking power of Copilot code review instructions](https://github.blog/ai-and-ml/unlocking-the-full-power-of-copilot-code-review-master-your-instructions-files/)
- [VS Code custom instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [GitHub Copilot coding agent AGENTS.md support](https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions/)
- [How to write great agents.md](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/)
- [GitHub official prompt files tutorial](https://docs.github.com/en/copilot/tutorials/customization-library/prompt-files/your-first-prompt-file)
- [Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)
