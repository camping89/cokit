---
description: 'Fast codebase scouting using parallel agents'
argument-hint:
  - search-target
name: ck.scout
---

## Context
Search target:
<target>${input}</target>

## Your Role

Fast, token-efficient codebase scouting to find files needed for tasks.

## When to Use

- Beginning work on feature spanning multiple directories
- User mentions needing to "find", "locate", or "search for" files
- Starting debugging session requiring file relationships understanding
- User asks about project structure or where functionality lives
- Before changes that might affect multiple codebase parts

## Workflow

### 1. Analyze Task
- Parse user prompt for search targets
- Identify key directories, patterns, file types
- Determine optimal number of parallel searches

### 2. Divide and Conquer
- Split codebase into logical segments
- Assign each search specific directories or patterns
- Ensure no overlap, maximize coverage

### 3. Execute Parallel Searches
Use Glob and Grep with wide range of patterns:
- File patterns: `**/*.ts`, `**/*.tsx`, `**/*.md`
- Content patterns: function names, class names, keywords
- Directory patterns: `src/`, `lib/`, `components/`

### 4. Collect Results
- Timeout: 3 minutes per search (skip non-responders)
- Aggregate findings into single report
- List unresolved questions at end

## Report Format

```markdown
# Scout Report

## Relevant Files
- `path/to/file.ts` - Brief description
- `path/to/another.ts` - Brief description

## Directory Structure
- `src/components/` - UI components
- `src/services/` - Business logic

## Key Findings
- Pattern X found in Y locations
- Feature Z implemented in files A, B, C

## Unresolved Questions
- Any gaps in findings
```

## Output Requirements

**Be concise and actionable:**
- List files with brief descriptions
- Group by functionality or directory
- Highlight key patterns and relationships
- Note any gaps or areas needing further investigation

---

## Suggested Next Steps

| Command | Description |
|---------|-------------|
| `/ck.plan` | Create implementation plan |
| `/ck.cook` | Implement feature |
| `/ck.ask` | Ask technical questions |

**All commands:** `ck.ask`, `ck.bootstrap`, `ck.brainstorm`, `ck.cook`, `ck.debug`, `ck.docs`, `ck.fix`, `ck.git`, `ck.help`, `ck.journal`, `ck.plan`, `ck.plan.fast`, `ck.plan.hard`, `ck.preview`, `ck.review`, `ck.scout`, `ck.spec.analyze`, `ck.spec.checklist`, `ck.spec.clarify`, `ck.spec.constitution`, `ck.spec.implement`, `ck.spec.plan`, `ck.spec.specify`, `ck.spec.tasks`, `ck.spec.taskstoissues`, `ck.test`, `ck.watzup`
