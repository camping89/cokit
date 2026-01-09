# Instructions (`copilot-instructions.md`)

**Location:** `.github/copilot-instructions.md`

## Format

```markdown
# No YAML front matter required

Natural language instructions in Markdown.
Each instruction as self-contained statement.
```

## Rules

- Single file per repository
- No YAML front matter needed
- Size ≤ 8KB (~2 pages)
- Instructions ngắn gọn, self-contained
- Whitespace between instructions ignored

## Checklist

| # | Criteria | ☐ |
|---|----------|---|
| 1 | File path `.github/copilot-instructions.md` |  |
| 2 | Single file per repository |  |
| 3 | Valid Markdown syntax |  |
| 4 | Size ≤ 8KB (~2 pages) |  |
| 5 | No YAML front matter needed |  |
| 6 | Instructions ngắn gọn, self-contained |  |
| 7 | No secrets/credentials |  |

## Content Guidelines

Include:
- Project summary/description
- Tech stack
- Coding conventions
- Build/test commands
- Project structure
- Available tools/resources

## Example

```markdown
# Project Instructions

This is a React + TypeScript web application using Vite.

## Tech Stack
- React 18 with TypeScript
- Tailwind CSS for styling
- React Query for data fetching
- Vitest for testing

## Conventions
- Use functional components with hooks
- Prefer named exports over default exports
- Use `const` over `let` when possible

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
```
