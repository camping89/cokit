# Next Steps Guide: Spec-Kit + Cokit Implementation

**Created:** Feb 3, 2026
**Status:** Ready to Start

---

## Phase 1: Setup Spec-Kit (Week 1)

### Step 1.1: Install GitHub Spec-Kit (Reference)
```bash
# Install spec-kit CLI for reference
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# Test it works
specify --help
```

### Step 1.2: Study Spec-Kit Structure
```bash
# Clone for reference (don't modify)
git clone https://github.com/github/spec-kit.git ~/reference/spec-kit

# Key files to study:
# - templates/claude/commands/*.md
# - src/specify_cli/
# - docs/
```

### Step 1.3: Create my-spec-kit Scaffold
```bash
cd /Users/admin/workspace/_me/cokit
mkdir -p src/spec-kit/{cli,templates,validators}

# Create initial files
touch src/spec-kit/cli/init.js
touch src/spec-kit/cli/constitution.js
touch src/spec-kit/cli/specify.js
touch src/spec-kit/templates/constitution.md
touch src/spec-kit/templates/spec-feature.md
touch src/spec-kit/templates/spec-api.md
```

### Step 1.4: Define Custom Templates

**constitution.md** - Project governance:
- Tech stack decisions
- Code standards
- Security requirements
- Team conventions

**spec-feature.md** - Feature specs:
- User stories
- Acceptance criteria
- Technical constraints
- Dependencies

---

## Phase 2: Port ClaudeKit → Cokit (Week 2-3)

### Step 2.1: Research Copilot CLI
```bash
# Check Copilot CLI docs
# https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-in-the-command-line

# Install GitHub CLI with Copilot extension
gh extension install github/gh-copilot
```

### Step 2.2: Map Commands
| ClaudeKit | Cokit (Copilot) | Notes |
|-----------|-----------------|-------|
| `/brainstorm` | `cokit brainstorm` | Adapt prompts |
| `/plan` | `cokit plan` | Different context model |
| `/cook` | `cokit cook` | Simplify for Copilot |
| `/fix` | `cokit fix` | Direct port |
| `/worktree` | `cokit worktree` | Git-only, no AI needed |

### Step 2.3: Create Cokit CLI
```bash
# Scaffold already exists in /src
# Enhance with new commands:

# src/commands/
#   brainstorm.js
#   plan.js
#   cook.js
#   fix.js
#   worktree.js
```

---

## Phase 3: Integrate Spec-Kit + Cokit (Week 3-4)

### Step 3.1: Create Combo Workflows
```
cokit workflow enterprise  → speckit.constitution → speckit.specify → brainstorm → plan → cook
cokit workflow quick       → brainstorm → plan:fast → cook
cokit workflow fix         → fix --auto
```

### Step 3.2: Add to Instructions
```bash
# Update /instructions/ with combo workflows
touch instructions/workflow-enterprise.md
touch instructions/workflow-quick.md
touch instructions/workflow-fix.md
```

---

## Phase 4: Team Training (Week 4)

### Step 4.1: Create Training Materials
- [ ] Quick start guide (5 min read)
- [ ] Video demo (10 min)
- [ ] Cheat sheet (1 page)
- [ ] FAQ document

### Step 4.2: Pilot Program
- [ ] Select 2-3 volunteer devs
- [ ] Run 1-week pilot
- [ ] Collect feedback
- [ ] Iterate

### Step 4.3: Full Rollout
- [ ] Team presentation
- [ ] Pair programming sessions
- [ ] Office hours for questions

---

## Quick Reference: Commands After Setup

```bash
# Enterprise feature (with specs)
cokit workflow enterprise "new payment system"

# Quick feature (no specs)
cokit workflow quick "add dark mode"

# Bug fix
cokit fix "error: undefined is not a function"

# Parallel development
cokit worktree "feature-x"
```

---

## Checklist

### Week 1
- [ ] Install spec-kit CLI (reference)
- [ ] Clone spec-kit repo (study)
- [ ] Create my-spec-kit scaffold
- [ ] Write constitution template
- [ ] Write spec-feature template

### Week 2
- [ ] Research Copilot CLI API
- [ ] Map ClaudeKit → Cokit commands
- [ ] Port `/brainstorm` command
- [ ] Port `/plan` command

### Week 3
- [ ] Port `/cook` command
- [ ] Port `/fix` command
- [ ] Port `/worktree` command
- [ ] Create combo workflows

### Week 4
- [ ] Write training materials
- [ ] Run pilot program
- [ ] Collect feedback
- [ ] Full team rollout

---

## Resources

- [GitHub Spec-Kit](https://github.com/github/spec-kit)
- [ClaudeKit Reference](https://github.com/duthaho/claudekit)
- [Copilot CLI Docs](https://docs.github.com/en/copilot)
- Research reports: `pocketquant/plans/reports/brainstorm-260203-*`
