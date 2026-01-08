---
agent: 'agent'
description: 'Utilize tools of Model Context Protocol (MCP) servers'
tools: ['search/codebase', 'read/terminalLastCommand']
---

Execute MCP operations via **Gemini CLI** to preserve context budget.

## Execution Steps

1. **Execute task via Gemini CLI** (using stdin pipe for MCP support):
   ```bash
   # IMPORTANT: Use stdin piping, NOT -p flag (deprecated, skips MCP init)
   echo "${input}. Return JSON only per GEMINI.md instructions." | gemini -y -m gemini-2.5-flash
   ```

2. **Fallback to mcp-manager ** (if Gemini CLI unavailable):
   - discover and execute tools
   - If the  got issues with the scripts of `mcp-management` skill, md auto-loaded**: Gemini CLI automatically loads `GEMINI.md` from project root, enforcing JSON-only response format
- **Parseable output**: Responses are structured JSON: `{"server":"name","tool":"name","success":true,"result":<data>,"error":null}`

## Anti-Pattern (DO NOT USE)

```bash
# BROKEN - deprecated -p flag skips MCP server connections!
gemini -y -m gemini-2.5-flash -p "..."
```
