# Phase 4: Convert Skills to Instructions

## Context Links
- [Main Plan](./plan.md)
- [Phase 3: Convert Commands](./phase-03-convert-commands-to-prompts.md)

## Overview

| Priority | Status | Effort |
|----------|--------|--------|
| P1 | pending | 4h |

## Key Insights

1. ClaudeKit skills co 2 loai:
   - Simple (SKILL.md only) → convert to `.instructions.md`
   - Complex (SKILL.md + assets) → keep as `skills/*/`
2. Instructions can `applyTo` field de specify file patterns
3. Skills phai co `name` va `description` trong frontmatter

## Requirements

### Source Skills Analysis (38 files)

| Skill | Has Assets | Target Type |
|-------|------------|-------------|
| frontend-design-pro | No | instruction |
| frontend-development | No | instruction |
| sequential-thinking | No | instruction |
| document-skills/pdf | No | instruction |
| document-skills/pptx | No | instruction |
| document-skills/xlsx | No | instruction |
| document-skills/docx | No | instruction |
| threejs | No | instruction |
| devops | No | instruction |
| mobile-development | No | instruction |
| mcp-builder | No | instruction |
| repomix | No | instruction |
| ui-styling | No | instruction |
| better-auth | No | instruction |
| template-skill | No | (skip - template) |
| debugging | No | instruction |
| problem-solving | No | instruction |
| media-processing | No | instruction |
| code-review | No | instruction |
| payment-integration | No | instruction |
| shopify | No | instruction |
| backend-development | No | instruction |
| web-frameworks | No | instruction |
| research | No | instruction |
| ai-artist | No | instruction |
| databases | No | instruction |
| frontend-design | No | instruction |
| ai-multimodal | No | instruction |
| google-adk-python | No | instruction |
| chrome-devtools | Yes (scripts/) | skill |
| docs-seeker | No | instruction |
| markdown-novel-viewer | No | instruction |
| mcp-management | Yes (scripts/) | skill |
| planning | No | instruction |
| plans-kanban | No | instruction |
| skill-creator | No | instruction |
| ui-ux-pro-max | No | instruction |
| dotnet-backend | No | instruction |

### Skills to Keep as Skills (with assets)

| Skill | Assets |
|-------|--------|
| chrome-devtools | scripts/, node_modules/ |
| mcp-management | scripts/ |

### Skills to Convert to Instructions (36)

All other skills without bundled assets.

## Frontmatter Conversion

### Skill → Instruction

**ClaudeKit SKILL.md:**
```yaml
---
name: frontend-design-pro
description: Creates jaw-dropping interfaces...
---
```

**Awesome Copilot Instruction:**
```yaml
---
description: 'Creates jaw-dropping interfaces...'
applyTo: '**/*.tsx, **/*.jsx, **/*.vue, **/*.svelte'
---
```

### Skill → Skill (keep format)

**ClaudeKit SKILL.md:**
```yaml
---
name: chrome-devtools
description: Browser automation and debugging...
---
```

**Awesome Copilot SKILL.md:**
```yaml
---
name: 'ck-chrome-devtools'
description: 'Browser automation and debugging...'
---
```

## applyTo Mapping

| Skill Category | applyTo Pattern |
|----------------|-----------------|
| Frontend (React, Vue) | `'**/*.tsx, **/*.jsx, **/*.vue, **/*.svelte'` |
| Backend (Node, Python) | `'**/*.ts, **/*.js, **/*.py'` |
| .NET | `'**/*.cs, **/*.csproj'` |
| Mobile | `'**/*.swift, **/*.kt, **/*.dart'` |
| Database | `'**/*.sql, **/*.prisma'` |
| DevOps | `'**/Dockerfile, **/*.yml, **/*.yaml'` |
| General | `'**/*'` |

## Implementation Steps

### Step 1: Create Classification Script

Create `eng/classify-skills.mjs`:

```javascript
#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import os from 'os';

const SKILLS_DIR = path.join(os.homedir(), '.claude', 'skills');

function hasAssets(skillDir) {
  const entries = fs.readdirSync(skillDir, { withFileTypes: true });
  return entries.some(e =>
    e.isDirectory() && !e.name.startsWith('.') ||
    (e.isFile() && !e.name.endsWith('.md') && e.name !== '.gitignore')
  );
}

const skills = fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
  .filter(e => e.isDirectory() && !e.name.startsWith('.'))
  .map(e => {
    const skillPath = path.join(SKILLS_DIR, e.name);
    const hasSkillMd = fs.existsSync(path.join(skillPath, 'SKILL.md'));
    return {
      name: e.name,
      hasAssets: hasAssets(skillPath),
      hasSkillMd,
      type: hasAssets(skillPath) ? 'skill' : 'instruction'
    };
  });

console.log('Skills Classification:');
skills.forEach(s => {
  console.log(`${s.name}: ${s.type} (assets: ${s.hasAssets})`);
});

// Export for conversion scripts
export default skills;
```

### Step 2: Create Instruction Conversion Script

Create `eng/convert-skills-to-instructions.mjs`:

```javascript
#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import os from 'os';

const SKILLS_DIR = path.join(os.homedir(), '.claude', 'skills');
const INSTRUCTIONS_DIR = path.join(process.cwd(), 'instructions');

const APPLY_TO_MAP = {
  'frontend': '**/*.tsx, **/*.jsx, **/*.vue, **/*.svelte, **/*.css',
  'backend': '**/*.ts, **/*.js, **/*.py, **/*.go',
  'dotnet': '**/*.cs, **/*.csproj, **/*.sln',
  'mobile': '**/*.swift, **/*.kt, **/*.dart',
  'database': '**/*.sql, **/*.prisma',
  'devops': '**/Dockerfile, **/*.yml, **/*.yaml',
  'default': '**/*'
};

function getApplyTo(skillName) {
  if (skillName.includes('frontend') || skillName.includes('ui'))
    return APPLY_TO_MAP.frontend;
  if (skillName.includes('backend') || skillName.includes('devops'))
    return APPLY_TO_MAP.backend;
  if (skillName.includes('dotnet'))
    return APPLY_TO_MAP.dotnet;
  if (skillName.includes('mobile'))
    return APPLY_TO_MAP.mobile;
  if (skillName.includes('database'))
    return APPLY_TO_MAP.database;
  return APPLY_TO_MAP.default;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: content };

  const fm = {};
  match[1].split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.substring(0, colonIdx).trim();
      const val = line.substring(colonIdx + 1).trim();
      fm[key] = val;
    }
  });
  return { frontmatter: fm, body: match[2] };
}

function convertToInstruction(skillPath, skillName) {
  const skillMd = path.join(skillPath, 'SKILL.md');
  if (!fs.existsSync(skillMd)) return null;

  const content = fs.readFileSync(skillMd, 'utf8');
  const { frontmatter, body } = parseFrontmatter(content);

  const description = (frontmatter.description || `${skillName} guidelines`)
    .replace(/^['"]|['"]$/g, '');
  const applyTo = getApplyTo(skillName);

  const newFm = `---
description: '${description.replace(/'/g, "''")}'
applyTo: '${applyTo}'
---`;

  return `${newFm}\n${body}`;
}

// Main
const skills = fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
  .filter(e => e.isDirectory() && !e.name.startsWith('.'));

skills.forEach(skill => {
  const skillPath = path.join(SKILLS_DIR, skill.name);

  // Skip skills with assets
  const hasAssets = fs.readdirSync(skillPath, { withFileTypes: true })
    .some(e => e.isDirectory() && !e.name.startsWith('.'));

  if (hasAssets) {
    console.log(`Skipping ${skill.name} (has assets)`);
    return;
  }

  const converted = convertToInstruction(skillPath, skill.name);
  if (converted) {
    const targetName = `ck-${skill.name}.instructions.md`;
    const targetPath = path.join(INSTRUCTIONS_DIR, targetName);
    fs.writeFileSync(targetPath, converted);
    console.log(`Converted: ${skill.name} -> ${targetName}`);
  }
});
```

### Step 3: Copy Complex Skills

Create `eng/copy-complex-skills.mjs`:

```javascript
#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import os from 'os';

const SKILLS_DIR = path.join(os.homedir(), '.claude', 'skills');
const TARGET_SKILLS_DIR = path.join(process.cwd(), 'skills');

const COMPLEX_SKILLS = ['chrome-devtools', 'mcp-management'];

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'node_modules') continue; // Skip node_modules
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

COMPLEX_SKILLS.forEach(skillName => {
  const src = path.join(SKILLS_DIR, skillName);
  const dest = path.join(TARGET_SKILLS_DIR, `ck-${skillName}`);

  if (fs.existsSync(src)) {
    copyRecursive(src, dest);

    // Update SKILL.md frontmatter
    const skillMd = path.join(dest, 'SKILL.md');
    if (fs.existsSync(skillMd)) {
      let content = fs.readFileSync(skillMd, 'utf8');
      content = content.replace(
        /name:\s*['"]?([^'"\n]+)['"]?/,
        `name: 'ck-$1'`
      );
      fs.writeFileSync(skillMd, content);
    }

    console.log(`Copied: ${skillName} -> ck-${skillName}/`);
  }
});
```

### Step 4: Verify Skill Structure

Each skill folder must have:
- `SKILL.md` with valid frontmatter
- `name` field (lowercase, hyphens, max 64 chars)
- `description` field (10-1024 chars)

## Success Criteria

- [ ] All simple skills (36) converted to instructions
- [ ] Complex skills (2) copied with assets
- [ ] All instructions have `description` and `applyTo`
- [ ] All skills have valid `name` and `description`
- [ ] Filenames follow naming conventions
- [ ] No node_modules copied

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Wrong applyTo patterns | Medium | Low | Manual review |
| Missing skill content | Low | High | Validate source exists |
| Large asset files | Medium | Medium | Skip node_modules |
| Description length | Low | Low | Truncate to 1024 chars |
