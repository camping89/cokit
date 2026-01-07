---
applyTo: "**/*.tsx,**/*.jsx,**/*.vue,**/*.svelte"
---

# Frontend Guidelines

## Component Design

- Use functional components with hooks
- Prefer composition over inheritance
- Extract reusable components early
- Keep components focused (single responsibility)

## State Management

- Lift state only when necessary
- Use context for truly global state
- Prefer local state when possible

## User Experience

- Handle loading states explicitly
- Show meaningful error messages
- Use semantic HTML for accessibility
- Design mobile-first, then scale up

## Performance

- Lazy load large components
- Memoize expensive calculations
- Avoid unnecessary re-renders
