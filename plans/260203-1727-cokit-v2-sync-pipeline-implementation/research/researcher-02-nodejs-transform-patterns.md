# Node.js File Transformation Pipeline Patterns

## Executive Summary
ES modules + modern libraries provide optimal patterns for building file transformation pipelines in Node.js. Recommend combination of: `globby` (file discovery), `gray-matter` (frontmatter), `js-yaml` (YAML), native `fs` + regex (string replacement).

---

## 1. ES Module Patterns for File Processing

**Pattern: Import.meta.url for Resolution**
- Use `import.meta.url` to resolve relative file paths in ES modules
- Support for top-level await enables cleaner pipeline orchestration
- Dynamic imports enable conditional loading for plugin patterns

**Recommended Approach:**
```javascript
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));
```

**Stream Processing:**
- Use native `Stream.pipeline()` with promises for automatic cleanup
- Enables async/await error handling over callback patterns
- Better than manual error handling for complex pipelines

---

## 2. YAML Parsing: js-yaml vs yaml Package

**js-yaml (Recommended for Cokit):**
- Battle-tested, widely adopted in static site generators
- Supports YAML 1.2 with safe parsing (FAILSAFE_SCHEMA)
- Handles anchors, aliases, type tags with proper escaping
- Simple API: `yaml.load(content)` returns parsed object

**yaml Package (Alternative):**
- More modern, different API surface
- Slightly better performance for large documents
- Both are solid; js-yaml has larger ecosystem integration

**Best Practice:**
```javascript
import YAML from 'js-yaml';
const data = YAML.load(yamlString);
```

---

## 3. Markdown Frontmatter Parsing

**gray-matter (Recommended):**
- Industry standard, used by Gatsby, Astro, TinaCMS, Next.js
- Parses YAML frontmatter by default, supports JSON/TOML/custom
- Handles complex content including nested code blocks
- Returns `{ data, content, excerpt }` object

**Key Feature:**
- Separates metadata from body in single pass
- Handles edge cases other parsers fail on
- Extensible with custom delimiters

**Usage:**
```javascript
import matter from 'gray-matter';
const { data, content } = matter(fileContents);
```

---

## 4. File Discovery: Glob Patterns

**Performance Tiers:**
1. **fast-glob** - Fastest (baseline)
2. **globby** - 10-20% slower, respects `.gitignore` automatically
3. **glob** - Legacy, slower (~50% slower than fast-glob)

**Pattern Syntax:**
- `*.md` - Match in current directory only
- `**/*.md` - Match recursively (glob2)
- `[1-5]` - Character classes
- `(a|b)` - Alternation groups
- `!pattern` - Negation (exclude)

**Recommendation:** Use **globby** for convenience (auto-gitignore), fall back to **fast-glob** for performance-critical pipelines.

---

## 5. String Replacement Best Practices

**Native fs Approach (Lightweight):**
- Read: `fs.readFileSync(path, 'utf8')`
- Replace: Use `.replace()` with regex + `g` flag for all occurrences
- Write: `fs.writeFileSync(path, content)`
- Advantage: Zero dependencies

**Regex Flags:**
- `g` - Global (all matches)
- `i` - Case-insensitive
- `m` - Multiline (^ and $ match line boundaries)

**For Complex Scenarios:**
- Use `replace-in-file` npm package for multi-file operations
- Supports regex patterns detected automatically
- Provides file context in replacement callbacks

**Anti-Pattern:** Omitting `g` flag replaces only first occurrence

---

## Architecture Recommendations for Cokit

**Pipeline Structure:**
```
discover files (globby)
  ↓
read file (fs)
  ↓
parse frontmatter (gray-matter)
  ↓
parse/transform config (js-yaml)
  ↓
apply transformations (regex + string replace)
  ↓
write file (fs)
```

**Use ES Modules:**
- All new files should use `.mjs` or `"type": "module"` in package.json
- Cleaner async/await syntax for pipeline orchestration
- Better tree-shaking and import resolution

**Error Handling:**
- Wrap frontmatter parsing in try-catch
- Validate YAML schema before transformations
- Use glob negation patterns to skip problematic files

---

## Unresolved Questions
- Should Cokit support custom frontmatter delimiters beyond YAML?
- What error recovery strategy for malformed files?
- Should transformations support plugins/extensions?

---

## Sources
- [Modern Node.js Patterns for 2025](https://kashw1n.com/blog/nodejs-2025/)
- [Node.js ES Modules Documentation](https://nodejs.org/api/esm.html)
- [js-yaml GitHub](https://github.com/nodeca/js-yaml)
- [gray-matter GitHub](https://github.com/jonschlinkert/gray-matter)
- [fast-glob GitHub](https://github.com/mrmlnc/fast-glob)
- [globby GitHub](https://github.com/sindresorhus/globby)
- [replace-in-file NPM](https://www.npmjs.com/package/replace-in-file)
- [LogRocket: Understanding glob patterns in Node.js](https://blog.logrocket.com/understanding-using-globs-node-js/)
