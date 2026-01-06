---
mode: agent
description: Debug and fix code issues
---
# Fix Issue

Analyze the described issue and fix it systematically.

## Process

1. **Identify Issue Type**
   - Type errors → Check TypeScript config, type definitions
   - UI/UX issues → Check styles, layout, responsiveness
   - Test failures → Run tests, analyze failures
   - Build errors → Check dependencies, config

2. **Investigate Root Cause**
   - Read error messages completely
   - Find working examples in codebase
   - Trace back to source of problem

3. **Apply Fix**
   - Make minimal changes
   - Follow existing patterns
   - Update related tests

4. **Verify**
   - Run tests
   - Check types compile
   - Confirm issue resolved

## Guidelines
- No fixes without understanding root cause
- One fix at a time
- Verify before claiming done
