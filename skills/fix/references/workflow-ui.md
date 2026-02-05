# UI Fix Workflow

For fixing visual/UI issues. Requires design skills.

## Required Skills (activate in order)
1. `ui-styling` - Design patterns and components (ALWAYS FIRST)
2. `frontend-design` - Implementation patterns

## Pre-fix Research
Use `docs-seeker` skill to research:
- Design patterns for the product type
- Accessibility best practices
- Component styling guidelines

## Workflow

1. **Analyze** screenshots/videos visually

2. **Implement** fix with `ui-ux-designer` agent

3. **Verify** with screenshot comparison
   - Capture parent container, not whole page
   - Compare to design guidelines
   - Iterate until correct

4. **DevTools check** with `agent-browser` or browser automation tools

5. **Test** compilation with `tester` agent

6. **Document** updates to `./docs/design-guidelines.md` if needed

## Tips
- Read `./docs/design-guidelines.md` first
- Use ImageMagick/FFmpeg CLI for image editing
