---
name: web-testing
description: Web testing with Playwright, Vitest, k6. E2E/unit/integration/load/security/visual/a11y testing. Multi-language support (JS/TS, Python, Go, Rust, Flutter). Use for test automation, flakiness, Core Web Vitals, mobile gestures, cross-browser.
---

# Web Testing Skill

Comprehensive testing: unit, integration, E2E, load, security, visual regression, accessibility. Multi-language workflow orchestration with structured QA reporting.

## Core Principle

**NEVER IGNORE FAILING TESTS.** Fix root causes, not symptoms. No mocks/cheats/tricks to pass builds.

## Quick Start

```bash
# JavaScript/TypeScript
npx vitest run                    # Unit tests
npx playwright test               # E2E tests
npm run test:coverage             # Coverage

# Python
pytest --cov=src                  # Unit + coverage

# Go / Rust / Flutter
go test ./... -cover              # Go
cargo test                        # Rust
flutter test --coverage           # Flutter

# Web Quality
k6 run load-test.js               # Load tests
npx @axe-core/cli https://...    # Accessibility
npx lighthouse https://...       # Performance
```

## Workflows

Three orchestrated workflows — load the relevant reference when needed:

| Workflow | Reference | Use When |
|----------|-----------|----------|
| Code Testing | `./references/test-execution-workflow.md` | Running unit/integration/e2e, checking coverage, validating builds |
| UI Testing | `./references/ui-testing-workflow.md` | Visual regression, responsive checks, accessibility audits, form automation |
| Report Format | `./references/report-format.md` | Generating structured QA summary reports |

**Code Testing Process:** Identify scope → Pre-flight checks → Execute tests → Analyze results → Coverage analysis → Build verification → Report

**UI Testing Process:** Discovery → Visual capture → Console errors → Network validation → Responsive testing → Form testing → Performance metrics → Report

## Testing Strategy (Choose Your Model)

| Model | Structure | Best For |
|-------|-----------|----------|
| Pyramid | Unit 70% > Integration 20% > E2E 10% | Monoliths |
| Trophy | Integration-heavy | Modern SPAs |
| Honeycomb | Contract-centric | Microservices |

> `./references/testing-pyramid-strategy.md`

## Reference Documentation

### Workflows & Reports
- `./references/test-execution-workflow.md` - Orchestrated code testing (multi-language)
- `./references/ui-testing-workflow.md` - Browser-based visual testing via `agent-browser`
- `./references/report-format.md` - Structured QA report template

### Core Testing
- `./references/unit-integration-testing.md` - Vitest, browser mode, AAA
- `./references/e2e-testing-playwright.md` - Fixtures, sharding, selectors
- `./references/playwright-component-testing.md` - CT patterns (production-ready)
- `./references/component-testing.md` - React/Vue/Angular patterns

### Test Infrastructure
- `./references/test-data-management.md` - Factories, fixtures, seeding
- `./references/database-testing.md` - Testcontainers, transactions
- `./references/ci-cd-testing-workflows.md` - GitHub Actions, sharding
- `./references/contract-testing.md` - Pact, MSW patterns

### Cross-Browser & Mobile
- `./references/cross-browser-checklist.md` - Browser/device matrix
- `./references/mobile-gesture-testing.md` - Touch, swipe, orientation

### Performance & Quality
- `./references/performance-core-web-vitals.md` - LCP/CLS/INP, Lighthouse CI
- `./references/visual-regression.md` - Screenshot comparison
- `./references/test-flakiness-mitigation.md` - Stability strategies

### Accessibility & Security
- `./references/accessibility-testing.md` - WCAG, axe-core
- `./references/security-testing-overview.md` - OWASP Top 10
- `./references/security-checklists.md` - Auth, API, headers

### API & Load
- `./references/api-testing.md` - Supertest, GraphQL
- `./references/load-testing-k6.md` - k6 patterns

### Checklists
- `./references/pre-release-checklist.md` - Complete release checklist
- `./references/functional-testing-checklist.md` - Feature testing

## Tools Integration

- **Test runners**: Vitest, Jest, Mocha, pytest, go test, cargo test, flutter test
- **Coverage**: Istanbul/c8/nyc, pytest-cov, go cover
- **E2E**: Playwright (multi-browser, sharding)
- **Load**: k6
- **Browser**: `agent-browser` skill for UI testing
- **Analysis**: `ai-multimodal` skill (if available) for screenshot analysis
- **Debugging**: `debug` skill when tests reveal bugs
- **Thinking**: `sequential-thinking` skill for complex test failure analysis

## Scripts

### Initialize Playwright Project
```bash
node ./scripts/init-playwright.js [--ct] [--dir <path>]
```
Creates best-practice Playwright setup: config, fixtures, example tests.

### Analyze Test Results
```bash
node ./scripts/analyze-test-results.js \
  --playwright test-results/results.json \
  --vitest coverage/vitest.json \
  --output markdown
```
Parses Playwright/Vitest/JUnit results into unified summary.

## CI/CD Integration

```yaml
jobs:
  test:
    steps:
      - run: npm run test:unit      # Gate 1: Fast fail
      - run: npm run test:e2e       # Gate 2: After unit pass
      - run: npm run test:a11y      # Accessibility
      - run: npx lhci autorun       # Performance
```

## Quality Standards

- All critical paths must have test coverage
- Validate happy path AND error scenarios
- Ensure test isolation — no interdependencies
- Tests must be deterministic and reproducible
- Clean up test data after execution
- Coverage: 80%+ lines, 70%+ branches minimum
