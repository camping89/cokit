---
mode: agent
description: Run tests and analyze results
---
# Run Tests

Run the test suite and analyze results.

## Process

1. **Run Tests**
   - Execute test command (npm test, pytest, etc.)
   - Capture full output

2. **Analyze Results**
   - Count passed/failed/skipped
   - Identify failure patterns
   - Check for flaky tests

3. **Report**
   - Summary: X passed, Y failed, Z skipped
   - List failing tests with error messages
   - Suggest fixes for failures

## If Tests Fail
- Read error message completely
- Find root cause before fixing
- Fix one issue at a time
- Re-run to verify fix
