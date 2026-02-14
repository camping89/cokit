# Skills
Skills are folders of instructions, scripts, and resources that the AI agent loads dynamically to improve performance on specialized tasks. Skills teach the AI agent how to complete specific tasks in a repeatable way, whether that's creating documents with your company's brand guidelines, analyzing data using your organization's specific workflows, or automating personal tasks.

# About This Repository

This repository contains example skills that demonstrate what's possible with the skills system. These examples range from creative applications (art, music, design) to technical tasks (testing web apps, MCP server generation) to enterprise workflows (communications, branding, etc.).

Each skill is self-contained in its own directory with a `SKILL.md` file containing the instructions and metadata that the AI agent uses. Browse through these examples to get inspiration for your own skills or to understand different patterns and approaches.

The example skills in this repo are open source (Apache 2.0).

**Note:** These are reference examples for inspiration and learning. They showcase general-purpose capabilities rather than organization-specific workflows or sensitive content.

## Disclaimer

**These skills are provided for demonstration and educational purposes only.** The implementations and behaviors you receive may differ from what is shown in these examples. These examples are meant to illustrate patterns and possibilities. Always test skills thoroughly in your own environment before relying on them for critical tasks.

# Installation

Some skills require external dependencies (FFmpeg, ImageMagick, Node.js packages, Python packages). Use our automated installation scripts to set up all dependencies:

## Automated Installation (Recommended)

**Linux/macOS:**
```bash
cd $HOME/.copilot/skills
./install.sh
```

**Windows (PowerShell as Administrator):**
```powershell
cd .copilot\skills
.\install.ps1
```

The installation scripts will:
- Install system tools (FFmpeg, ImageMagick)
- Install Node.js packages (rmbg-cli, pnpm, wrangler, repomix)
- Create Python virtual environment
- Install Python packages (google-genai, pypdf, Pillow, etc.)
- Install test dependencies
- Verify all installations

## Manual Installation

For manual installation or troubleshooting, see [INSTALLATION.md](INSTALLATION.md) for detailed instructions.

## What Gets Installed

- **System Tools**: FFmpeg, ImageMagick
- **Node.js Packages**: rmbg-cli, pnpm, wrangler, repomix
- **Python Packages**: google-genai, pypdf, python-docx, Pillow, pytest

See [INSTALLATION.md](INSTALLATION.md) for complete dependency list and platform-specific instructions.

# Example Skills

This repository includes a diverse collection of example skills demonstrating different capabilities:

## Creative & Design
- **algorithmic-art** - Create generative art using p5.js with seeded randomness, flow fields, and particle systems
- **canvas-design** - Design beautiful visual art in .png and .pdf formats using design philosophies
- **slack-gif-creator** - Create animated GIFs optimized for Slack's size constraints

## Development & Technical
- **artifacts-builder** - Build complex HTML artifacts using React, Tailwind CSS, and shadcn/ui components
- **mcp-server** - Guide for creating high-quality MCP servers to integrate external APIs and services
- **webapp-testing** - Test local web applications using Playwright for UI verification and debugging

## Enterprise & Communication
- **brand-guidelines** - Apply brand colors and typography to artifacts
- **internal-comms** - Write internal communications like status reports, newsletters, and FAQs
- **theme-factory** - Style artifacts with 10 pre-set professional themes or generate custom themes on-the-fly

# Using Skills

You can use skills by mentioning them in conversation. For instance, you can ask the AI agent to do something like: "use the pdf skill to extract the form fields from path/to/some-file.pdf"

# Creating a Basic Skill

Skills are simple to create - just a folder with a `SKILL.md` file containing YAML frontmatter and instructions:

```markdown
---
name: my-skill-name
description: A clear description of what this skill does and when to use it
---

# My Skill Name

[Add your instructions here that the AI agent will follow when this skill is active]

## Examples
- Example usage 1
- Example usage 2

## Guidelines
- Guideline 1
- Guideline 2
```

The frontmatter requires only two fields:
- `name` - A unique identifier for your skill (lowercase, hyphens for spaces)
- `description` - A complete description of what the skill does and when to use it

The markdown content below contains the instructions, examples, and guidelines that the AI agent will follow.

# Partner Skills

Skills are a great way to teach the AI agent how to get better at using specific pieces of software. Here are some partner skills:

- **Notion** - [Notion Skills](https://www.notion.so/notiondevs/Notion-Skills-28da4445d27180c7af1df7d8615723d0)