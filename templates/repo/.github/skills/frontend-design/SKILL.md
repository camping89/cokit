---
name: frontend-design
description: Create polished frontend interfaces from designs/screenshots. Use for web components, replicating UI designs, quick prototypes, avoiding AI slop.
license: Complete terms in LICENSE.txt
---

Create distinctive, production-grade frontend interfaces. Implement real working code with exceptional aesthetic attention.

## Workflow Selection

Choose workflow based on input type:

| Input | Workflow | Reference |
|-------|----------|-----------|
| Screenshot | Replicate exactly | `./references/workflow-screenshot.md` |
| Quick task | Rapid implementation | `./references/workflow-quick.md` |
| Describe only | Document for devs | `./references/workflow-describe.md` |
| From scratch | Design Thinking below | - |

**All workflows**: Activate `ui-styling` skill FIRST for design patterns and component library.

## Screenshot/Video Replication (Quick Reference)

1. **Analyze** visually - extract colors, fonts, spacing, effects
2. **Plan** with `ui-ux-designer` subagent - create phased implementation
3. **Implement** - match source precisely
4. **Verify** - compare to original
5. **Document** - update `./docs/design-guidelines.md` if approved

See specific workflow files for detailed steps.

## Design Thinking (From Scratch)

Before coding, commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Execute with precision. Bold maximalism and refined minimalism both work - intentionality is key.

## Aesthetics Guidelines

- **Typography**: Avoid Arial/Inter; use distinctive, characterful fonts. Pair display + body fonts.
- **Color**: Commit to cohesive palette. CSS variables. Dominant colors with sharp accents.
- **Motion**: CSS-first, anime.js for complex (`./references/animejs.md`). Orchestrated page loads > scattered micro-interactions.
- **Spatial**: Unexpected layouts. Asymmetry. Overlap. Negative space OR controlled density.
- **Backgrounds**: Atmosphere over solid colors. Gradients, noise, patterns, shadows, grain.
- **Assets**: Process with ImageMagick, FFmpeg, RMBG CLI tools

## Asset & Analysis References

| Task | Reference |
|------|-----------|
| Generate assets | `./references/asset-generation.md` |
| Analyze quality | `./references/visual-analysis-overview.md` |
| Extract guidelines | `./references/design-extraction-overview.md` |
| Optimization | `./references/technical-overview.md` |
| Animations | `./references/animejs.md` |

Quick start: `./references/asset-generation.md`

## Anti-Patterns (AI Slop)

NEVER use:
- Overused fonts: Inter, Roboto, Arial, Space Grotesk
- Cliched colors: purple gradients on white
- Predictable layouts, cookie-cutter patterns

DO:
- Vary themes (light/dark), fonts, aesthetics per project
- Match complexity to vision (maximalist = elaborate; minimalist = precise)
- Make unexpected, context-specific choices

Remember: Claude is capable of extraordinary creative work. Commit fully to distinctive visions.