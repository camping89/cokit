# CoKit - Session Initialization Guide

> **CRITICAL**: Before starting to work with CoKit, you MUST enable Built-in Tools. Without Built-in Tools, Copilot cannot perform any tasks!

## 🔧 Step 1: Enable Built-in Tools (REQUIRED)

Open **GitHub Copilot Tools Settings** and enable the following tools:

### ✅ Essential (Required)
- ✅ **edit** - Edit files in workspace
- ✅ **read** - Read file contents
- ✅ **search** - Search files and code
- ✅ **execute** - Run commands and scripts
- ✅ **agent** - Delegate tasks to other agents
- ✅ **todo** - Manage task list for work tracking

### ✅ Recommended
- ✅ **vscode** - Use VS Code features
- ✅ **web** - Fetch information from web

---

## ⚙️ Step 2: Configure VS Code Settings

Create/update `.vscode/settings.json` file with optimal configurations:

```json
{
  // GitHub Copilot Settings
  "github.copilot.enable": {
    "*": true,
    "markdown": true,
    "yaml": true
  },
  "github.copilot.advanced": {
    "debug.overrideEngine": "claude-sonnet-4.5",
    "debug.useNodeFetcher": true
  },

  // Editor Settings
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit",
    "source.organizeImports": "explicit"
  },
  "editor.inlineSuggest.enabled": true,
  "editor.quickSuggestions": {
    "other": true,
    "comments": true,
    "strings": true
  },

  // Files Settings
  "files.autoSave": "onFocusChange",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,

  // Terminal Settings
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "terminal.integrated.enablePersistentSessions": true,

  // Search Settings
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/build": true,
    "**/.git": true
  }
}
```

---

## 🔌 Step 3: Enable Extensions/MCP Servers (Optional)

These extensions enhance Copilot's capabilities:

### Recommended
- ✅ **sequentialthinking** - Step-by-step logical thinking for complex problems
- ✅ **memory** - Remember context between sessions
- ✅ **context7** - Fetch latest documentation

### As Needed
- ⚡ **playwright** - For web automation/testing
- ⚡ **mongodb** - If working with MongoDB
- ⚡ **github** - To search code on GitHub repos

---

## 🚀 Step 4: Verify Setup

After setup is complete, test by asking Copilot:

```
@workspace List available agents in the agents/ folder
```

If Copilot can read and list the files, setup is successful! ✅

---

## 📋 Quick Start Workflow

1. **Open project**: `code c:\w\_me\cokit`
2. **Check tools**: Ensure built-in tools are enabled
3. **Start session**: Use prompts in `prompts/` folder
   - `#file:ck-bootstrap.prompt.md` - Initialize new project
   - `#file:ck-code.prompt.md` - Code features
   - `#file:ck-debug.prompt.md` - Debug issues
4. **Use agents**: Delegate tasks to specialists
   - `@brainstormer` - Brainstorm ideas
   - `@planner` - Create plans
   - `@fullstack-developer` - Full-stack development

---

## 🎯 Important Tips

1. **Always enable Built-in Tools** - This is a prerequisite!
2. **Use #file:** to reference prompts and instructions
3. **Use @ to call agents** specialized for each task
4. **Check QUICK-START.md** for detailed workflow
5. **See FAQ.md** for frequently asked questions

---

## 🆘 Troubleshooting

**Q: Copilot can't edit files?**
→ Check if `edit` tool is enabled

**Q: Copilot can't read files?**
→ Check if `read` and `search` tools are enabled

**Q: Agents not working?**
→ Check if `agent` tool is enabled

**Q: Can't run commands?**
→ Check if `execute` tool is enabled

---

## 📚 Related Documentation

- [QUICK-START.md](QUICK-START.md) - Quick start guide
- [FAQ.md](FAQ.md) - Frequently asked questions
- [AGENTS.md](AGENTS.md) - Project overview
- [docs/](docs/) - Detailed documentation

---

**You're ready to go! 🎉**

Start by asking: `@workspace Introduce available agents`
