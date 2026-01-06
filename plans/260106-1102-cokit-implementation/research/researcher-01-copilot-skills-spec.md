# Research Report: GitHub Copilot Agent Skills Specification

**Date:** January 6, 2026 | **Version:** 1.0

## Executive Summary

GitHub Copilot Agent Skills is a modular, extensible system for enhancing Claude Code (Anthropic's agentic coding tool) with specialized capabilities. Skills are self-contained packages containing a required `SKILL.md` file with YAML frontmatter + Markdown instructions, plus optional bundled resources (scripts, references, assets). Skills enable progressive disclosure of context, auto-discovery via semantic matching, and fine-grained tool access control via `allowed-tools`. The specification launched October 2025 (v1.0) and currently supports basic resource bundling with emerging support for metadata-driven customization.

## Key Findings

### 1. SKILL.md File Format

**Required structure:** YAML frontmatter + Markdown body

**Frontmatter (required fields):**
- `name` - Hyphen-case, lowercase alphanumeric + hyphens, must match directory name
- `description` - Explains purpose and activation triggers for Claude

**Frontmatter (optional fields):**
- `license` - License identifier (e.g., "MIT") or file reference (e.g., "LICENSE.txt")
- `version` - Semantic version string (e.g., "1.0.0")
- `allowed-tools` - Array of pre-approved tool names (Bash, Read, Write, Edit, etc.) for execution control
- `metadata` - String key-value map for client-specific custom properties

**Markdown body:** Unrestricted content, typically structured as:
- Feature descriptions and use cases
- Step-by-step workflows
- Quick reference guides
- References to bundled resources
- Best practices and common patterns

**Size constraint:** <100 lines recommended (leverage progressive disclosure by splitting into multiple reference files)

### 2. Skill Discovery Mechanism

**Auto-activation trigger:**
- Claude Code analyzes user query intent semantically
- Matches intent against skill descriptions and bundled resource metadata
- Activates multiple skills if needed to fulfill user request
- Skills load progressively (only referenced resources pulled into context)

**Directory structure for discovery:**
- User-level: `$HOME/.claude/skills/{skill-name}/SKILL.md` (automatic discovery)
- Repo-level: Not natively supported (must use hooks/configuration workarounds)

**Activation criteria:**
- Description must contain concrete use cases/keywords matching user query
- Descriptions should be concise but rich in actionable trigger phrases
- Example: "When building mobile apps, implementing mobile UX patterns, optimizing for mobile constraints..."

### 3. Resource Bundling & Progressive Disclosure

**Optional subdirectories inside skill folder:**

| Directory | Purpose | Example |
|-----------|---------|---------|
| `scripts/` | Executable code (Node.js/Python preferred over Bash) | analyze.js, fetch-docs.js, utils/ |
| `references/` | Documentation loaded contextually as needed | patterns.md, errors.md, workflows.md |
| `assets/` | Static files used in output | templates, icons, fonts |

**Progressive disclosure principle:**
- SKILL.md acts as index/entry point only (<100 lines)
- Referenced files loaded only when Claude selects them based on user need
- Reduces token consumption compared to monolithic documentation
- Enables deep expertise without bloating initial context

**Environment variable precedence for scripts:**
1. Process environment variables
2. `$HOME/.claude/skills/{skill-name}/.env`
3. `$HOME/.claude/skills/.env`
4. `$HOME/.claude/.env`

### 4. Tool Access Control (allowed-tools)

**Purpose:** Pre-approve specific tools for skill execution to prevent tool-related errors

**Supported values (examples):** Bash, Read, Write, Edit, Grep, WebSearch, WebFetch

**Behavior:**
- If `allowed-tools` specified, only listed tools execute within skill context
- Unapproved tools are skipped/blocked with runtime warnings
- Improves reliability and security posture

**Real-world example (ai-multimodal skill):**
```yaml
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
```

### 5. User-Level vs. Repo-Level Locations

**User-level skills:**
- Located: `$HOME/.claude/skills/` (e.g., `/Users/admin/.claude/skills/`)
- Scope: Available to all projects
- Discovery: Automatic by Claude Code
- Use case: General-purpose domain expertise, common patterns

**Repo-level skills:**
- Not natively supported by Agent Skills Spec
- Workaround: Use hooks (SessionStart, PreToolUse) to inject skill content or symlink from ~/.claude/skills/
- Planned feature: future specification updates may add native repo-level skill paths

### 6. Limitations & Known Issues

**Current constraints:**
- Skill discovery is semantic (no keyword-based exact matching)
- Repo-level skills require manual configuration via hooks
- No built-in skill versioning or dependency management
- YAML frontmatter strict typing (no nested objects, only strings + arrays)
- No native skill marketplace/registry integration (requires custom distribution)
- Scripts must handle their own dependency management (no global package registry)
- Tool access control (`allowed-tools`) relatively new, edge cases possible

**Token consumption:**
- While progressive disclosure reduces overhead, deeply nested references still require careful planning
- Large scripts still consume tokens if loaded into context

**Platform considerations:**
- Bash scripts discouraged for cross-platform (Windows) compatibility
- Python/Node.js scripts preferred with `requirements.txt` or `package.json`

## Best Practices

1. **Description depth:** Include concrete use cases so semantic matching activates correctly
2. **File organization:** Keep SKILL.md <100 lines; split references into focused .md files <100 lines each
3. **Scripts:** Use Node.js or Python; include `.env.example`; write unit tests
4. **Resource references:** Use links/paths in SKILL.md to guide Claude to relevant bundled files
5. **License clarity:** Always specify; recommend MIT for open skills
6. **Versioning:** Use semantic versioning in optional `version` field for tracking updates

## Specification Details

**Version:** 1.0 (Public Launch October 16, 2025)

**Minimal skill example:**
```
my-skill/
  ├── SKILL.md
```

**Complex skill example (docs-seeker):**
```
docs-seeker/
  ├── SKILL.md
  ├── package.json
  ├── scripts/
  │   ├── analyze-llms-txt.js
  │   ├── detect-topic.js
  │   ├── fetch-docs.js
  │   ├── tests/
  │   └── utils/
  ├── references/
  │   ├── advanced.md
  │   ├── context7-patterns.md
  │   └── errors.md
  └── workflows/
      ├── library-search.md
      ├── repo-analysis.md
      └── topic-search.md
```

## Sources

- **Agent Skills Spec** (Official): `/Users/admin/.claude/skills/agent_skills_spec.md` (v1.0, Oct 2025)
- **Real-world implementations:**
  - Research skill: `/Users/admin/.claude/skills/research/SKILL.md`
  - Backend Development: `/Users/admin/.claude/skills/backend-development/SKILL.md`
  - AI Multimodal: `/Users/admin/.claude/skills/ai-multimodal/SKILL.md`
  - Skill Creator: `/Users/admin/.claude/skills/skill-creator/SKILL.md`
  - Docs Seeker: `/Users/admin/.claude/skills/docs-seeker/` (complex structure)
  - Claude Code: `/Users/admin/.claude/skills/claude-code/SKILL.md` (references other skills)

## Unresolved Questions

1. What is the exact semantic matching algorithm Claude uses for skill activation?
2. Is there a planned timeline for native repo-level skill support?
3. How are skill conflicts handled when multiple skills describe identical functionality?
4. What is the max recommended size for bundled scripts before performance degradation?
5. Can skills be nested (skill referencing another skill)?
