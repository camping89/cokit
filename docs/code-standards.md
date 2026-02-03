# CoKit Code Standards

## Principles
- **YAGNI**: Don't build what you don't need
- **KISS**: Keep solutions simple
- **DRY**: Don't repeat yourself

## File Naming
- kebab-case for all files: `transform-claudekit.mjs`
- Descriptive names that self-document purpose
- Extensions: `.mjs` for ES modules, `.js` for CommonJS

## Project Structure
```
cokit/
├── bin/cokit.js          # CLI entry point
├── src/index.js          # Main CLI logic
├── eng/                  # Build/sync scripts
│   ├── sync.mjs          # Sync orchestrator
│   ├── transform-*.mjs   # Transform scripts
│   ├── patch-navigation.mjs
│   └── resource-origins.yml
├── prompts/              # Generated prompts
├── agents/               # Agent definitions
├── skills/               # Skill definitions
├── instructions/         # Instruction files
├── collections/          # Bundled collections
├── upstream/speckit/     # Git subtree (read-only)
└── docs/                 # Documentation
```

## Code Style

### JavaScript/Node.js
- ES Modules with top-level await
- Async/await over callbacks
- Destructuring for imports
- Template literals for strings

### Example
```javascript
import { globby } from 'globby';
import fs from 'fs/promises';

export async function transform(config) {
  const files = await globby('*.md', { cwd: config.path });
  // ...
}
```

## Commit Messages
Conventional commits: `type(scope): description`

| Type | Use For |
|------|---------|
| feat | New features |
| fix | Bug fixes |
| docs | Documentation |
| chore | Maintenance |

## Testing
- `npm test` runs Node.js test runner
- Test files: `*.test.js`

## Documentation
- Max 800 LOC per doc file
- Use tables for structured data
- Include code examples
