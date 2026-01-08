# AGENTS.md

## Project Overview

CoKit is a collection of agents, prompts, instructions, and skills designed to enhance GitHub Copilot experiences. The project converts ClaudeKit resources to Awesome Copilot format for use with GitHub Copilot.

- **Agents** - Specialized GitHub Copilot agents for various tasks
- **Prompts** - Task-specific prompts for code generation and problem-solving
- **Instructions** - Coding standards and best practices applied to specific file patterns
- **Skills** - Self-contained folders with instructions and bundled resources
- **Collections** - Curated collections organized around specific themes

## Repository Structure

```
.
├── agents/           # Custom agent definitions (.agent.md files)
├── prompts/          # Task-specific prompts (.prompt.md files)
├── instructions/     # Coding standards (.instructions.md files)
├── skills/           # Agent Skills folders (SKILL.md + bundled assets)
├── collections/      # Curated collections (.collection.yml files)
├── docs/             # Documentation
├── eng/              # Build and conversion scripts
├── src/              # CLI source code
├── bin/              # CLI entry point
└── templates/        # Project templates for init command
```

## Setup Commands

```bash
# Install dependencies
npm ci

# Build (generate README.md)
npm run build

# Convert all ClaudeKit resources
npm run convert:all

# Convert individually
npm run convert:agents
npm run convert:commands
npm run convert:skills
```

## Development Workflow

### Working with Agents, Prompts, Instructions, and Skills

All files must include proper markdown front matter:

#### Agent Files (*.agent.md)
- Must have `description` field (wrapped in single quotes)
- File names should be lowercase with hyphens
- Recommended to include `model` field

#### Prompt Files (*.prompt.md)
- Must have `agent` field (value: `'agent'`)
- Must have `description` field (wrapped in single quotes)
- File names should be lowercase with hyphens

#### Instruction Files (*.instructions.md)
- Must have `description` field (wrapped in single quotes)
- Must have `applyTo` field specifying file patterns
- File names should be lowercase with hyphens

#### Agent Skills (skills/*/SKILL.md)
- Each skill is a folder containing a `SKILL.md` file
- Must have `name` field (lowercase with hyphens, max 64 chars)
- Must have `description` field (wrapped in single quotes)
- Can include bundled assets (scripts, templates, data files)

### Adding New Resources

1. Create the file with proper front matter
2. Add to the appropriate directory
3. Run `npm run build` to update README.md
4. Verify the resource appears in the generated README

## Code Style Guidelines

### Markdown Files
- Use proper front matter with required fields
- Keep descriptions concise and informative
- Wrap description values in single quotes
- Use lowercase file names with hyphens

### JavaScript/Node.js Scripts
- Located in `eng/` and `src/` directories
- Follow Node.js ES module conventions (.mjs extension)
- Use clear, descriptive function and variable names

## Pull Request Guidelines

1. Run `npm run build` before committing
2. Ensure all markdown files have required front matter
3. Verify file names follow naming convention
4. Provide clear description of what your contribution does

## License

CC BY-NC 4.0 - See [LICENSE](LICENSE) for details
