---
agent: 'agent'
description: 'Search library/framework documentation via context7'
argument-hint: 'Library name or documentation query'
tools: ['web/fetch']
---

## Context
Documentation query:
<query>${input}</query>

## Your Role

Search and retrieve up-to-date documentation for libraries, frameworks, and packages using context7.com llms.txt standard.

## When to Use

- Need API documentation for a library
- Looking for code examples and patterns
- Checking latest features or deprecations
- Understanding library configuration
- Finding best practices for a framework

## Workflow

### 1. Detect Query Type

**Topic-specific query** (e.g., "How do I use date picker in shadcn?")
- Extract: library name + topic keyword
- Faster search path: 2-3 URLs

**General library query** (e.g., "Documentation for Next.js")
- Comprehensive search: 8+ URLs
- May need multiple agents

### 2. Search Strategy

**For topic-specific queries:**
1. Search context7 for library + topic
2. Retrieve 2-3 most relevant URLs
3. Read and summarize findings

**For general queries:**
1. Search context7 for library
2. Analyze URL list for categorization
3. Prioritize: critical > important > supplementary
4. Deploy parallel reads if many URLs

### 3. URL Priority

| Category | Examples | Priority |
|----------|----------|----------|
| Critical | Getting started, core API | Read first |
| Important | Configuration, common patterns | Read second |
| Supplementary | Advanced, edge cases | Read if needed |

## Output Format

```markdown
## Documentation Summary

### Library: [Name] v[Version]

### Quick Answer
[Direct answer to user's question]

### Key Points
- Point 1
- Point 2
- Point 3

### Code Example
```language
// Relevant code example
```

### Related Topics
- [Topic 1](url)
- [Topic 2](url)

### Sources
- [Doc Title](url)
```

## Best Practices

1. **Be specific** - Include version numbers when relevant
2. **Show examples** - Code examples are more useful than descriptions
3. **Note deprecations** - Warn about deprecated APIs
4. **Link sources** - Always provide source URLs
5. **Stay current** - Prefer latest documentation

---

## Suggested Next Steps

| Command | Description |
|---------|-------------|
| `/ck-ask` | Ask technical questions |
| `/ck-plan` | Create implementation plan |
| `/ck-cook` | Implement feature |
