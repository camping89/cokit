# Copilot Flow Diagrams

Visual diagrams showing how Copilot processes resources.

---

## Main Processing Flow

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                           USER INPUT                                         │
│                    "/ck-cook implement login"                                │
└─────────────────────────────────┬────────────────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│  STEP 1: PROMPT LOADING                                                      │
│  ────────────────────────────────────────────────────────────────────────    │
│  Copilot finds file: prompts/ck-cook.prompt.md                               │
│  Loads YAML front matter + body content                                      │
│  ${input} = "implement login"                                                │
└─────────────────────────────────┬────────────────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│  STEP 2: AGENT ASSIGNMENT                                                    │
│  ────────────────────────────────────────────────────────────────────────    │
│  Prompt specifies: agent: 'agent' or agent: 'planner'                        │
│  Copilot loads agent config from agents/*.agent.md                           │
│  Agent receives context + instructions from prompt                           │
└─────────────────────────────────┬────────────────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│  STEP 3: INSTRUCTION INJECTION (Auto)                                        │
│  ────────────────────────────────────────────────────────────────────────    │
│  When agent works with files, Copilot checks glob patterns:                  │
│                                                                              │
│  Current file: src/components/Login.tsx                                      │
│       ↓                                                                      │
│  Check: applyTo: "**/*.tsx" → Match!                                         │
│       ↓                                                                      │
│  Inject: ck-frontend.instructions.md into context                            │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────┐          │
│  │  Instructions injected in order:                               │          │
│  │  1. copilot-instructions.md (global)                           │          │
│  │  2. *.instructions.md matching pattern (file-specific)         │          │
│  └────────────────────────────────────────────────────────────────┘          │
└─────────────────────────────────┬────────────────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│  STEP 4: SKILL ACTIVATION (On-demand)                                        │
│  ────────────────────────────────────────────────────────────────────────    │
│  Agent/User activates skill when specialized knowledge needed:               │
│                                                                              │
│  Prompt: "Use backend-development skill"                                     │
│       ↓                                                                      │
│  Load: skills/ck-backend-development/SKILL.md                                │
│       ↓                                                                      │
│  Inject specialized knowledge into agent context                             │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────┐          │
│  │  Skill may include:                                            │          │
│  │  - SKILL.md (main instructions)                                │          │
│  │  - Scripts (*.py, *.js)                                        │          │
│  │  - Templates, examples                                         │          │
│  └────────────────────────────────────────────────────────────────┘          │
└─────────────────────────────────┬────────────────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│  STEP 5: EXECUTION                                                           │
│  ────────────────────────────────────────────────────────────────────────    │
│  Agent executes with full context:                                           │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────┐             │
│  │  AGENT CONTEXT                                              │             │
│  │  ├── Prompt instructions (workflow)                         │             │
│  │  ├── Global instructions (project rules)                    │             │
│  │  ├── File instructions (pattern-matched)                    │             │
│  │  ├── Activated skills (specialized knowledge)               │             │
│  │  └── User input + conversation history                      │             │
│  └─────────────────────────────────────────────────────────────┘             │
│                                                                              │
│  Agent actions: Read files → Generate code → Edit files → Run commands       │
└─────────────────────────────────┬────────────────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│  STEP 6: OUTPUT                                                              │
│  ────────────────────────────────────────────────────────────────────────    │
│  - Code changes applied                                                      │
│  - Explanation/summary provided                                              │
│  - Follow-up suggestions                                                     │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Resource Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                      COPILOT RESOURCES                          │
├─────────────┬─────────────┬─────────────┬─────────────┬─────────┤
│   Prompt    │    Agent    │ Instruction │    Skill    │Collection│
│  (Workflow) │  (Executor) │   (Rules)   │ (Knowledge) │ (Bundle) │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────┘
```

---

## Resource Relationships

```
Collection (Bundle)
    │
    ├── contains ──► Prompts (Workflows)
    │                    │
    │                    └── uses ──► Agents (Executors)
    │                                     │
    │                                     ├── auto-receives ──► Instructions (Rules)
    │                                     │
    │                                     └── can-activate ──► Skills (Knowledge)
    │
    └── contains ──► Instructions, Skills, Agents...
```

---

## Instruction Injection Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         FILE EDITING                                    │
│                   User opens: src/App.tsx                               │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  PATTERN MATCHING                                                       │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  File: src/App.tsx                                              │    │
│  │                                                                 │    │
│  │  Check instructions/*.instructions.md files:                    │    │
│  │                                                                 │    │
│  │  ├── ck-frontend.instructions.md                                │    │
│  │  │   applyTo: "**/*.{tsx,jsx}" → MATCH ✓                        │    │
│  │  │                                                              │    │
│  │  ├── ck-testing.instructions.md                                 │    │
│  │  │   applyTo: "**/*.test.ts" → NO MATCH ✗                       │    │
│  │  │                                                              │    │
│  │  └── ck-backend.instructions.md                                 │    │
│  │      applyTo: "src/api/**/*.ts" → NO MATCH ✗                    │    │
│  └─────────────────────────────────────────────────────────────────┘    │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  CONTEXT ASSEMBLY                                                       │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│  Final context includes:                                                │
│  1. copilot-instructions.md (global - always)                           │
│  2. ck-frontend.instructions.md (matched)                               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Skill Activation Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      SKILL NEEDED                                       │
│            Agent needs specialized UI design knowledge                  │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  SKILL LOADING                                                          │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│  Load: skills/ck-backend-development/                                   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  Skill Package Contents:                                        │    │
│  │                                                                 │    │
│  │  ck-backend-development/                                        │    │
│  │  ├── SKILL.md           ← Main instructions (loaded)            │    │
│  │  ├── references/                                                │    │
│  │  │   ├── backend-api-design.md                                  │    │
│  │  │   ├── backend-testing.md                                     │    │
│  │  │   └── backend-technologies.md                                │    │
│  │  └── ...                                                        │    │
│  └─────────────────────────────────────────────────────────────────┘    │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  CONTEXT ENRICHMENT                                                     │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│  Agent context now includes:                                            │
│  - Original prompt workflow                                             │
│  - Global + file-specific instructions                                  │
│  - Skill knowledge (design principles, patterns, templates)             │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Comparison Matrix

```
┌─────────────┬──────────────┬──────────────┬────────────────┬───────────────┐
│             │   Trigger    │    Scope     │   Persistence  │    Purpose    │
├─────────────┼──────────────┼──────────────┼────────────────┼───────────────┤
│ Prompt      │ /prompt-name │ Single task  │ Per invocation │ Workflow      │
│ Agent       │ Prompt refs  │ Task exec    │ Per invocation │ Execution     │
│ Instruction │ Auto (glob)  │ File-based   │ Always active  │ Rules/Style   │
│ Skill       │ On-demand    │ Knowledge    │ When activated │ Expertise     │
│ Collection  │ User install │ Resource set │ Permanent      │ Bundling      │
└─────────────┴──────────────┴──────────────┴────────────────┴───────────────┘
```

---

## One-liner Summary

> User calls **Prompt** → Prompt uses **Agent** → Agent auto-receives **Instructions** by file pattern → Agent activates **Skills** when needed → All can be bundled in **Collection**.
