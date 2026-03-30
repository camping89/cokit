# CoKit

Make GitHub Copilot smarter in 30 seconds.
Check it out at https://camping89.github.io/cokit/index.html

## Installation

```bash
npx cokit-cli init
```

That's it! All CoKit resources are now available in your Copilot.

## Usage

After installation, use commands in GitHub Copilot chat:

```
/ck-plan "Add user authentication"
/ck-fix "Login button not working"
/ck-test
```

## Sample Workflows

### Quick Fix (5 min)
```
/ck-fix "Users can't upload files larger than 5MB"
```
Done. Single command handles analysis and fix.

### Small Feature (30 min)
```
/ck-plan-fast "Add dark mode toggle"
→ implement
/ck-test
/ck-fix  (if tests fail)
```

### Medium Feature (2-4 hours)
```
/ck-plan-hard "Add payment integration with Stripe"
→ implement phase by phase
/ck-test
/ck-review
```

## Command Reference

### Daily Development (`ck-*`)

| Command | When to Use |
|---------|-------------|
| `/ck-fix` | Fix bugs, errors, issues |
| `/ck-test` | Run and analyze tests |
| `/ck-plan-fast` | Quick feature (< 2 hours) |
| `/ck-plan-hard` | Feature needing research |
| `/ck-ask` | Technical questions |
| `/ck-review` | Code review |
| `/ck-bootstrap` | Start new project |

## Which Workflow?

```
Is this a bug fix?
  → /ck-fix

Is this < 2 hours work?
  → /ck-plan-fast

Otherwise?
  → /ck-plan-hard (research + plan)
```

## What's Included

| Resource | Count | Purpose |
|----------|-------|---------|
| Prompts | 17 | Commands for Copilot |
| Agents | 12 | Specialized AI assistants |
| Skills | 23 | Domain expertise |
| Instructions | 5 | Context-aware rules |
| Collections | 5 | Bundled workflows |

See [docs/](docs/) for detailed resource documentation.

## What's New (v1.2.7)

- Simplified CLI: removed `-g`/`--global` and `-a`/`--all` flags — `init` is now always interactive
- Removed `-g`/`--global` from `add` command

See [CHANGELOG.md](CHANGELOG.md) for full history.

## Documentation

- [Commands Usage Guide](docs/cokit-commands-usage-guide.md) - When to use each command
- [Resource Catalog](docs/resource-catalog.md) - Full list of all resources
- [Project Overview](docs/project-overview-pdr.md) - Vision and goals

## For Contributors

See [docs/contributing.md](docs/contributing.md) for development setup.

## License

CC BY-NC 4.0 - See [LICENSE](LICENSE) for details.
