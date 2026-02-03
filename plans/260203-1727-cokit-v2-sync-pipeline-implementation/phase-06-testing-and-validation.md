# Phase 6: Testing and Validation

## Context Links

- [Plan Overview](plan.md)
- [Maintenance Guide](../../docs/cokit-sync-and-maintenance-guide.md)
- [Brainstorm Report](../reports/brainstorm-260203-1630-cokit-v2-architecture-refresh.md)

## Overview

| Field | Value |
|-------|-------|
| Priority | P1 |
| Status | Pending |
| Effort | 1.5 hours |
| Dependencies | Phase 5 (initial sync complete) |

Comprehensive testing of the sync pipeline and generated commands to ensure production readiness.

## Key Insights

- Test both happy path and edge cases
- Verify cross-navigation between SpecKit and ClaudeKit commands
- Test maintenance workflow (adding new commands)
- Document any limitations found

## Requirements

### Functional

- All ck.* commands work in Copilot
- Navigation suggestions are accurate
- Sync is idempotent (re-run produces same output)
- Unknown command detection works

### Non-Functional

- Sync < 30 seconds
- Clear error messages for failures
- Easy maintenance workflow

## Architecture

```
Test Categories:

1. Unit Tests (Transform Logic)
   ├── Command renaming
   ├── Placeholder substitution
   ├── Model field removal
   └── Handoff updates

2. Integration Tests (Full Pipeline)
   ├── Sync idempotency
   ├── Unknown command detection
   └── Error handling

3. Functional Tests (User Workflows)
   ├── ck.brainstorm → ck.specify flow
   ├── Navigation suggestions
   └── Copilot compatibility
```

## Related Code Files

### Files to Create

| File | Purpose |
|------|---------|
| `eng/sync.test.mjs` | Pipeline tests (optional) |

### Files to Verify

| File Pattern | Verification |
|--------------|--------------|
| `prompts/ck.*.prompt.md` | Valid frontmatter, navigation |
| `eng/resource-origins.yml` | All commands mapped |

## Implementation Steps

### Test 1: Sync Idempotency

```bash
# Run sync twice
npm run sync:transform
cp -r prompts/ prompts-backup/
npm run sync:transform

# Compare - should be identical
diff -r prompts/ prompts-backup/
rm -rf prompts-backup/
```

### Test 2: Command Coverage

```bash
# Verify all mapped commands have output
node -e "
const yaml = require('js-yaml');
const fs = require('fs');
const config = yaml.load(fs.readFileSync('eng/resource-origins.yml'));
const mappings = Object.keys(config.mappings);
const files = fs.readdirSync('prompts').filter(f => f.startsWith('ck.'));

console.log('Mapped:', mappings.length);
console.log('Generated:', files.length);

mappings.forEach(cmd => {
  const expected = cmd.replace(/\./g, '-') + '.prompt.md';
  if (!files.includes(expected)) {
    console.log('MISSING:', cmd, '→', expected);
  }
});
"
```

### Test 3: Frontmatter Validation

```bash
# Validate all frontmatter
node -e "
const matter = require('gray-matter');
const fs = require('fs');
const glob = require('globby');

glob.sync('prompts/ck.*.prompt.md').forEach(f => {
  try {
    const { data } = matter.read(f);
    if (!data.name) console.log('MISSING name:', f);
    if (!data.description) console.log('MISSING description:', f);
  } catch (e) {
    console.log('INVALID:', f, e.message);
  }
});
"
```

### Test 4: Navigation Footer Check

```bash
# Every ck.* prompt should have navigation
for f in prompts/ck.*.prompt.md; do
  if ! grep -q "Suggested Next Steps" "$f"; then
    echo "MISSING NAVIGATION: $f"
  fi
done
```

### Test 5: Transform Verification

```bash
# No untransformed content
echo "Checking for untransformed content..."
grep -r '\$ARGUMENTS' prompts/ && echo "FAIL: Found \$ARGUMENTS" || echo "PASS: No \$ARGUMENTS"
grep -r 'model: ' prompts/ && echo "FAIL: Found model field" || echo "PASS: No model field"
grep -r '/speckit\.' prompts/ && echo "FAIL: Found /speckit." || echo "PASS: No /speckit."
```

### Test 6: Unknown Command Detection

```bash
# Simulate new upstream command
# 1. Add a test file to upstream/speckit/templates/commands/
# 2. Run sync
# 3. Check unknown_commands in resource-origins.yml
```

### Test 7: Error Handling

```bash
# Test missing source gracefully
# 1. Temporarily rename ~/.claude/commands/
# 2. Run sync - should warn but not crash
# 3. Restore ~/.claude/commands/
```

### Test 8: Copilot Compatibility

Manual test:
1. Install generated prompts to ~/.copilot/
2. Open VS Code with Copilot
3. Try `/ck.brainstorm` command
4. Verify navigation suggestions appear
5. Try following to `/ck.specify`

## Todo List

- [ ] Run idempotency test
- [ ] Verify command coverage
- [ ] Validate all frontmatter
- [ ] Check navigation footer in all prompts
- [ ] Verify no untransformed content
- [ ] Test unknown command detection
- [ ] Test error handling (missing source)
- [ ] Manual Copilot compatibility test
- [ ] Document any issues found
- [ ] Update maintenance guide if needed
- [ ] Final commit with test results

## Success Criteria

- [ ] Sync is idempotent (re-run = same output)
- [ ] All 13 mapped commands have generated files
- [ ] All frontmatter is valid YAML
- [ ] All prompts have navigation footer
- [ ] No untransformed content remains
- [ ] Unknown commands logged to config
- [ ] Graceful error handling for missing sources
- [ ] Commands work in Copilot

## Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Copilot format incompatibility | High | Medium | Test early with real Copilot |
| Edge cases in transform | Medium | Medium | Add test cases as discovered |
| Maintenance workflow unclear | Medium | Low | Update docs with findings |

## Security Considerations

- No credentials in test scripts
- Test data stays local
- Clean up test artifacts

## Next Steps

After completing this phase:
1. Update README with v2 sync documentation
2. Create release notes
3. Consider CI/CD integration for sync validation
4. Plan future enhancements (cokit-native commands)

---

## Appendix: Test Results Template

```markdown
## Test Results - YYYY-MM-DD

| Test | Status | Notes |
|------|--------|-------|
| Idempotency | PASS/FAIL | |
| Command Coverage | PASS/FAIL | X/13 commands |
| Frontmatter | PASS/FAIL | |
| Navigation | PASS/FAIL | |
| Transform | PASS/FAIL | |
| Unknown Detection | PASS/FAIL | |
| Error Handling | PASS/FAIL | |
| Copilot Compat | PASS/FAIL | |

### Issues Found

1. ...
2. ...

### Fixes Applied

1. ...
2. ...
```
