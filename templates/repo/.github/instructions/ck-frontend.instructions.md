---
applyTo: "**/*.tsx,**/*.jsx,**/*.vue,**/*.svelte,**/components/**"
description: "Frontend component guidelines for React, Vue, Svelte"
---

# Frontend Guidelines

## Component Design

- Use functional components with hooks
- Prefer composition over inheritance
- Extract reusable components early
- Keep components focused (single responsibility)
- Props interface required for TypeScript

## State Management

- Lift state only when necessary
- Use context for truly global state (auth, theme)
- Prefer local state when possible
- Avoid prop drilling beyond 2 levels

## User Experience

- Handle loading states explicitly (skeleton, spinner)
- Show meaningful error messages to users
- Use semantic HTML for accessibility
- Design mobile-first, then scale up
- Support keyboard navigation

## Performance

- Lazy load large components and routes
- Memoize expensive calculations (useMemo)
- Avoid unnecessary re-renders (React.memo)
- Use virtualization for long lists
- Optimize images (srcset, lazy loading)

## Accessibility

- All interactive elements keyboard accessible
- Proper ARIA labels where needed
- Color contrast meets WCAG AA
- Focus management for modals/dialogs
