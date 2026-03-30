---
agent: 'agent'
description: 'Deploy to any platform with auto-detection'
argument-hint: '[platform] [environment]'
---

## Context
Deploy target:
<target>${input}</target>

Auto-detects deployment target from config files. Supports Vercel, Netlify, Cloudflare, Railway, Fly.io, Render, Docker, AWS, GCP, and more.

**IMPORTANT**: Verify deployment target before executing.

---

## Suggested Next Steps

| Command | Description |
|---------|-------------|
| `/ck-test` | Run tests before deploy |
| `/ck-fix` | Fix deployment issues |
