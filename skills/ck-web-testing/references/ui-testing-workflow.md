# UI Testing Workflow

Browser-based visual testing using `agent-browser` skill. Covers screenshots, responsive checks, accessibility, form automation, console errors.

## Prerequisites

Ensure `agent-browser` skill is available. For screenshot analysis, use `ai-multimodal` skill (if available).

## Step 1: Discovery

Browse target URL, discover pages, components, endpoints:

```bash
# Navigate and capture initial state
# Use agent-browser skill to browse http://localhost:3000
# Capture ARIA snapshot for accessibility baseline
```

## Step 2: Visual Capture

```bash
# Full page screenshot
# Screenshot http://localhost:3000 → ./screenshots/home.png (full-page)

# Specific component
# Screenshot selector ".main-content" → ./screenshots/main.png
```

## Step 3: Console Error Check

Capture JavaScript errors for 5 seconds on each page.

- Zero errors = pass
- Any errors = investigate before proceeding
- Check for: uncaught exceptions, failed promises, deprecation warnings

## Step 4: Network Validation

Check for failed API calls:
- Filter responses with status >= 400
- Identify CORS issues, missing endpoints, auth failures
- Validate API response times

## Step 5: Responsive Testing

Capture at key breakpoints:

| Viewport | Size | Device |
|----------|------|--------|
| Desktop | 1920x1080 | Standard monitor |
| Tablet | 768x1024 | iPad |
| Mobile | 375x812 | iPhone |

For each viewport:
1. Resize browser window
2. Capture full-page screenshot
3. Check for layout breakage, overflow, hidden elements

## Step 6: Form & Interaction Testing

Test interactive elements:
1. Fill form fields with valid data
2. Submit and verify success state
3. Fill with invalid data and verify error messages
4. Test keyboard navigation (Tab, Enter, Escape)
5. Capture screenshots of each state

## Step 7: Performance Metrics

Collect Core Web Vitals:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID/INP** (First Input Delay / Interaction to Next Paint): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1

## Authentication for Protected Routes

For pages behind auth:

| Method | Use Case |
|--------|----------|
| Cookie injection | Session-based auth |
| Bearer token | API/JWT auth |
| localStorage | SPA token storage |

After injection, browser session persists for subsequent tests.

## Screenshot Analysis

Use `ai-multimodal` skill (if available) to analyze captured screenshots for:
- Layout correctness
- Visual regressions vs baseline
- Missing elements or broken styling
- Accessibility issues (contrast, text size)

## Cleanup

Close browser sessions when testing completes to free resources.
