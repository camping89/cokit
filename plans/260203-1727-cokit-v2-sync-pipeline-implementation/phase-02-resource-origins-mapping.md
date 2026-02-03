# Phase 2: Resource Origins Mapping Configuration

## Context Links

- [Plan Overview](plan.md)
- [Brainstorm Report](../reports/brainstorm-260203-1630-cokit-v2-architecture-refresh.md)
- [Maintenance Guide](../../docs/cokit-sync-and-maintenance-guide.md)

## Overview

| Field | Value |
|-------|-------|
| Priority | P1 - Critical Path |
| Status | Pending |
| Effort | 30 minutes |
| Dependencies | Phase 1 (subtree exists) |

Create `eng/resource-origins.yml` as the source of truth for all command mappings. This file defines how upstream commands transform to `ck.*` namespace.

## Key Insights

- YAML format for human readability and easy editing
- Track both source (speckit/claudekit) and original command name
- `unknown_commands` array catches new upstream additions
- Version tracking enables reproducible builds

## Requirements

### Functional

- Map all SpecKit commands to `ck.*` namespace
- Map all ClaudeKit commands to `ck.*` namespace
- Track upstream file paths for each command
- Support conflict resolution (same name from different sources)

### Non-Functional

- Valid YAML syntax
- Comments for section organization
- Easy to maintain by future developers

## Architecture

```yaml
version: "2.0"
synced_at: "{timestamp}"

sources:
  speckit: { repo, ref, last_sync }
  claudekit: { path, last_sync }

mappings:
  ck.{name}:
    origin: speckit|claudekit|cokit-native
    original: {original_command_name}
    upstream_file: {path_to_source}
    description: {brief_description}

unknown_commands: []
```

## Related Code Files

### Files to Create

| File | Purpose |
|------|---------|
| `eng/resource-origins.yml` | Command mapping configuration |

### Directories to Create

| Directory | Purpose |
|-----------|---------|
| `eng/` | Engineering/build scripts directory |

## Implementation Steps

1. **Create eng directory**
   ```bash
   mkdir -p eng
   ```

2. **Create resource-origins.yml** with structure:
   - Header: version, synced_at
   - Sources: speckit config, claudekit config
   - Mappings: All ck.* commands from brainstorm

3. **SpecKit mappings** (from brainstorm report):
   - `ck.specify` ← speckit.specify
   - `ck.clarify` ← speckit.clarify
   - `ck.constitution` ← speckit.constitution
   - `ck.tasks` ← speckit.tasks
   - `ck.analyze` ← speckit.analyze
   - `ck.checklist` ← speckit.checklist

4. **ClaudeKit mappings** (from brainstorm report):
   - `ck.brainstorm` ← brainstorm
   - `ck.plan` ← plan
   - `ck.plan.hard` ← plan/hard
   - `ck.plan.fast` ← plan/fast
   - `ck.cook` ← cook
   - `ck.fix` ← fix
   - `ck.test` ← test

5. **Validate YAML syntax**
   ```bash
   node -e "require('js-yaml').load(require('fs').readFileSync('eng/resource-origins.yml'))"
   ```

## Todo List

- [ ] Create `eng/` directory
- [ ] Create `eng/resource-origins.yml` with header
- [ ] Add sources section (speckit, claudekit)
- [ ] Add SpecKit command mappings (6 commands)
- [ ] Add ClaudeKit command mappings (7 commands)
- [ ] Add empty unknown_commands array
- [ ] Validate YAML syntax
- [ ] Commit configuration file

## Success Criteria

- [ ] `eng/resource-origins.yml` exists and is valid YAML
- [ ] All 13 commands mapped (6 SpecKit + 7 ClaudeKit)
- [ ] Each mapping has: origin, original, upstream_file, description
- [ ] Sources section has correct paths/repos

## Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Incorrect upstream paths | High | Medium | Verify against actual repo structure |
| Missing commands | Medium | Low | Cross-check with brainstorm report |
| YAML syntax errors | Low | Low | Validate before commit |

## Security Considerations

- No secrets in config file
- File paths are relative, not absolute
- No remote URLs with credentials

## Next Steps

After completing this phase:
1. Proceed to [Phase 3: Transform Scripts](phase-03-transform-scripts.md)
2. Scripts will read this config to know what to transform
