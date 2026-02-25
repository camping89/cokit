# Test Execution Workflow

Orchestrated workflow for running code-level tests across any language/framework.

## Step 1: Identify Scope

Determine what to test based on recent changes:

| Change Type | Test Strategy |
|-------------|---------------|
| New feature | Full test suite + new test cases |
| Bug fix | Regression tests + targeted fix validation |
| Refactor | Existing test suite (no new tests unless gaps found) |
| Coverage check | Full suite with coverage flags |

## Step 2: Pre-flight Checks

Run syntax/type checks before tests to catch compile errors early:

```bash
# JavaScript/TypeScript
npx tsc --noEmit
npx eslint .

# Python
python -m py_compile file.py
flake8 .

# Flutter
flutter analyze

# Go
go vet ./...

# Rust
cargo check
```

## Step 3: Execute Tests

### JavaScript/TypeScript
```bash
npm test                      # project default
npx vitest run                # Vitest
npx jest --coverage           # Jest with coverage
bun test                      # Bun
```

### Python
```bash
pytest                                          # basic
pytest --cov=src --cov-report=term-missing      # with coverage
python -m unittest discover                     # unittest
```

### Go
```bash
go test ./... -cover          # with coverage
go test ./... -race           # race condition detection
```

### Rust
```bash
cargo test
cargo test -- --nocapture     # show stdout
```

### Flutter
```bash
flutter test --coverage
```

## Step 4: Analyze Results

Focus on:
1. **Failing tests** — read error messages and stack traces carefully
2. **Flaky tests** — pass/fail intermittently → race conditions or state leaks
3. **Slow tests** — >5s per test is suspicious, identify bottlenecks
4. **Skipped tests** — ensure skips are intentional, not hiding failures

## Step 5: Coverage Analysis

Thresholds:
- **80%+** line coverage — standard minimum
- **70%+** branch coverage — acceptable for most projects
- Focus on critical paths: auth, payment, data mutations

Identify gaps:
- Uncovered error handlers
- Missing edge case branches
- Untested utility functions

## Step 6: Build Verification

```bash
npm run build                 # JS/TS production build
python setup.py build         # Python
go build ./...                # Go
cargo build --release         # Rust
flutter build                 # Flutter
```

Check for:
- Build warnings or deprecation notices
- Unresolved dependencies
- Production config correctness

## Quality Checklist

- [ ] All tests pass (zero failures)
- [ ] Coverage meets project threshold
- [ ] No flaky tests detected
- [ ] Build completes without errors
- [ ] Error scenarios tested
- [ ] Test isolation verified (no shared state)
- [ ] Test data cleaned up after execution
- [ ] Mocks/stubs properly configured
- [ ] Environment variables correctly set
