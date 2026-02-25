# ClaudeKit → CoKit Porting Rules

**Purpose:** Definitive reference for porting ClaudeKit (Claude Code) content to CoKit (GitHub Copilot).
**Audience:** AI agents and developers performing sync/port operations.
**Last Updated:** 2026-02-25

---

## 0. Porting Workflow

**IMPORTANT:** Always follow this order when porting from ClaudeKit.

### Step 1: Inventory CoKit
Map what CoKit already has — prompts, agents, skills, instructions. This is the source of truth.

### Step 2: Diff against ClaudeKit
Compare ClaudeKit's commands/agents/skills with CoKit inventory. Identify:
- **Updates** — existing CoKit files that need content sync
- **New variants** — ClaudeKit has a new sub-command (e.g., `/plan:red-team`) → create as `/ck-plan-red-team` variant
- **New top-level** — entirely new prompt/agent/skill → create in CoKit

### Step 3: Verify Copilot compatibility
Before porting, **websearch** to check if Copilot now supports features that were previously unavailable. Copilot evolves fast — what didn't work last month may work now.

Key things to re-check periodically:
- Subagent spawning & orchestration (`code.visualstudio.com/docs/copilot/agents/subagents`)
- Agent-to-agent communication (currently NOT supported — may change)
- Persistent memory API (currently NOT supported — may change)
- Plan mode / approval flows (currently NOT supported — may change)
- File ownership / task management APIs (currently NOT supported — may change)
- New frontmatter fields (check `code.visualstudio.com/docs/copilot/customization/custom-agents`)

### Step 4: Apply conversion rules (sections below)

### Step 5: Validate with grep patterns (section 9)

### Step 6: Update version & docs (section 8)

---

## 1. Syntax Conversions

| ClaudeKit | CoKit | Notes |
|-----------|-------|-------|
| `$ARGUMENTS` | `${input}` | Copilot prompt variable |
| `@agent-name` | `` `agent-name` agent `` | No `@` prefix in Copilot |
| `.claude/` paths | `$HOME/.copilot/` | Global config directory |
| `~/.claude/` | `$HOME/.copilot/` | Same as above |
| `subagent` | `agent` | Copilot terminology |

## 2. Command References

| ClaudeKit | CoKit | Notes |
|-----------|-------|-------|
| `/fix:types` | `/ck-fix-types` | Colon → hyphen |
| `/fix:tests` | `/ck-fix-test` | Colon → hyphen |
| `/scout:ext` | `/ck-scout ext` | Colon → space (argument) |
| `/plan --hard` | `/ck-plan-hard` | Flag → separate command |
| `/plan --fast` | `/ck-plan-fast` | Flag → separate command |
| `SlashCommand(/scout)` | `/ck-scout` | Remove `SlashCommand()` wrapper |

**New variant?** If ClaudeKit adds a new sub-command (e.g., `/plan:red-team`), create it as a variant prompt file in CoKit (`ck-plan-red-team.prompt.md`). Variants don't count toward prompt total.

## 3. Tool/API Conversions

| ClaudeKit | CoKit | Notes |
|-----------|-------|-------|
| `AskUserQuestion` | Natural conversation | Just ask the user directly |
| `Task(subagent_type="X")` | Natural language delegation | Describe what agent should do |
| `TaskCreate/TaskUpdate/TaskList` | Checklist/todo tracking | No task management API |
| `SendMessage` | Direct communication | No message passing API |
| `EnterPlanMode/ExitPlanMode` | N/A | Copilot doesn't have plan mode |

**NOTE:** Websearch these before each port session — Copilot may add equivalents.

## 4. Frontmatter Fields

### Remove (unsupported by Copilot)
- `name:` — Copilot infers from filename
- `model:` — Copilot handles model selection
- `memory:` — No persistent memory API
- `version:` — Not a valid field
- `license:` — Not a valid field
- `scripts:` — Not valid in prompts
- `handoffs:` — Not valid in prompts
- `agent_scripts:` — Not valid

### Keep/Modify
- `description:` — Keep, but single line only (no examples)
- `agent: 'agent'` — Required for agent-mode prompts
- `tools:` — Keep valid tool references
- `argument-hint:` — Keep for user guidance

## 5. Agent-Specific Rules

### CoKit agents (12)
`brainstormer`, `code-reviewer`, `code-simplifier`, `debugger`, `docs-manager`, `fullstack-developer`, `git-manager`, `planner`, `researcher`, `scout`, `tester`, `ui-ux-designer`

### ClaudeKit agents that DON'T exist in CoKit
| ClaudeKit Agent | CoKit Replacement |
|-----------------|-------------------|
| `project-manager` | Direct action (describe what to do) |
| `journal-writer` | Remove or convert to manual journaling |
| `mcp-manager` | Remove or use `mcp-management` skill |

### Agent file conventions
- Remove `## Team Mode` sections — Copilot subagents don't support task claiming, peer communication, or file ownership
- Add skills activation directive referencing `$HOME/.copilot/skills/*`

## 6. External Tool Qualifiers

If a skill/tool exists in CoKit's `skills/*/SKILL.md` → it's available, no qualifier needed.
If NOT → add qualifier:

| Tool | Qualifier | Reason |
|------|-----------|--------|
| `repomix` | "(if installed)" | External npm package, has CoKit skill but needs CLI install |
| `ai-multimodal` | "(if available)" | External Gemini skill, not in CoKit |
| `ui-ux-pro-max` | "(if available)" | Not in CoKit skills |
| `media-processing` | "(if available)" | Not in CoKit skills |
| `chrome-devtools` | Use `agent-browser` | Renamed in CoKit |
| `document-skills` | Use `docs-seeker` | Different name in CoKit |

**Before porting:** Check if any missing skill has been added to CoKit since last port. If so, remove the qualifier.

## 7. Prompt Classification

- **Prompts** = top-level commands counted in "25 prompts" (e.g., `/ck-plan`, `/ck-fix`, `/ck-cook`)
- **Variant commands** = sub-routes, NOT counted (e.g., `/ck-plan-fast`, `/ck-plan-hard`, `/ck-plan-validate`, `/ck-plan-red-team`)

New variant → update flowchart + Deep Dive in `index.html`, do NOT bump prompt count.

## 8. Version & Docs Update Checklist

### Always update
- [ ] `package.json` + `package-lock.json` (`npm install --package-lock-only`)
- [ ] `CHANGELOG.md` — new entry
- [ ] `index.html` — hero badge + footer version
- [ ] `README.md` — "What's New" section
- [ ] `docs/project-roadmap.md` — version + last updated

### Sync if outdated (check version string)
- [ ] `docs/README.md`
- [ ] `docs/codebase-summary.md`
- [ ] `docs/cokit-comprehensive-mapping-guide.md`
- [ ] `docs/cokit-team-presentation.md`
- [ ] `docs/cokit-sync-and-maintenance-guide.md`
- [ ] `docs/guide-next-steps-speckit-cokit-implementation.md`
- [ ] `docs/project-overview-pdr.md`

### If new commands added
- [ ] Flowchart nodes/edges in `index.html`
- [ ] Deep Dive section in `index.html`
- [ ] Prompts table in `index.html` (if variant of existing command)

## 9. Validation Grep Patterns

After porting, run these — must return 0 matches (except historical/changelog):

```bash
grep -r "@\w+-\w+" agents/ skills/ prompts/          # @agent-name syntax
grep -r "project-manager" agents/ skills/ prompts/    # Non-existent agent
grep -r "subagent" agents/                            # Wrong terminology
grep -r "\.claude/" agents/ skills/ prompts/          # Wrong path
grep -r "AskUserQuestion\|SlashCommand" agents/ skills/ prompts/  # Claude Code APIs
grep -r "chrome-devtools" agents/                     # Renamed tool
grep -r "\$ARGUMENTS" agents/ prompts/                # Wrong variable
grep -r "^name:\|^model:\|^memory:" agents/ prompts/  # Invalid frontmatter
```

## 10. Common Mistakes

1. **`@agent-name`** → Use `` `agent-name` agent `` (no `@` prefix)
2. **`project-manager` agent** → Doesn't exist, replace with direct instructions
3. **Team Mode sections** → Don't port, Copilot subagents are isolated
4. **Missing "(if installed/available)"** → External tools need qualifiers
5. **Counting variants as prompts** → Variants don't bump prompt count
6. **`SlashCommand()` wrappers** → Convert to plain `/ck-*`
7. **`document-skills`** → Use `docs-seeker`
8. **`chrome-devtools`** → Use `agent-browser`
