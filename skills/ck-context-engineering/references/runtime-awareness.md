# Runtime Awareness

Monitor usage limits and context window utilization in real-time to optimize Copilot sessions.

## Overview

Runtime awareness provides visibility into two critical metrics:
1. **Usage Limits** - API quota consumption (5-hour and 7-day rolling windows)
2. **Context Window** - Current token utilization within the 200K context limit

## Architecture

```
┌─────────────────┐    ┌──────────────────────────┐
│  statusline.cjs │───▶│  /tmp/ck-context-*.json  │
│  (writes data)  │    │  (context window data)   │
└─────────────────┘    └────────────┬─────────────┘
                                    │
                       ┌────────────▼─────────────┐
                       │  usage-context-hook.cjs  │◀── PostToolUse
                       │  - Reads context file    │
                       │  - Fetches usage limits  │
                       │  - Injects awareness     │
                       └──────────────────────────┘
```


## Context Window Data

### Source

Statusline writes context data to `/tmp/ck-context-{session_id}.json`:

```json
{
  "percent": 67,
  "tokens": 134000,
  "size": 200000,
  "usage": {
    "input_tokens": 80000,
    "cache_creation_input_tokens": 30000,
    "cache_read_input_tokens": 24000
  },
  "timestamp": 1705312000000
}
```

### Token Calculation

```
total = input_tokens + cache_creation_input_tokens + cache_read_input_tokens
percent = (total + AUTOCOMPACT_BUFFER) / context_window_size * 100
```

Where `AUTOCOMPACT_BUFFER = 45000` (22.5% reserved).

## Hook Output

The PostToolUse hook injects awareness data every 5 minutes:

```xml
<usage-awareness>
Limits: 5h=45%, 7d=32%
Context: 67%
</usage-awareness>
```

### Warning Indicators

| Level | Threshold | Indicator |
|-------|-----------|-----------|
| Normal | < 70% | Plain percentage |
| Warning | 70-89% | `[WARNING]` |
| Critical | ≥ 90% | `[CRITICAL]` |

### Examples

Normal state:
```xml
<usage-awareness>
Limits: 5h=45%, 7d=32%
Context: 67%
</usage-awareness>
```

Warning state:
```xml
<usage-awareness>
Limits: 5h=75% [WARNING], 7d=32%
Context: 78% [WARNING - consider compaction]
</usage-awareness>
```

Critical state:
```xml
<usage-awareness>
Limits: 5h=92% [CRITICAL], 7d=65%
Context: 91% [CRITICAL - compaction needed]
</usage-awareness>
```

## Recommendations by Threshold

### Context Window

| Utilization | Action |
|-------------|--------|
| < 70% | Continue normally |
| 70-80% | Plan compaction strategy |
| 80-90% | Execute compaction |
| > 90% | Immediate compaction or session reset |

### Usage Limits

| 5-Hour | Action |
|--------|--------|
| < 70% | Normal usage |
| 70-90% | Reduce parallelization, delegate to subagents |
| > 90% | Wait for reset or use lower-tier models |

| 7-Day | Action |
|-------|--------|
| < 70% | Normal usage |
| 70-90% | Monitor daily consumption |
| > 90% | Limit usage to essential tasks |

## Configuration

### Hook Settings (`.vscode/settings.json`)

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "*",
        "hooks": [{
          "type": "command",
          "command": "node hooks/usage-context-awareness.cjs"
        }]
      }
    ]
  }
}
```

### Throttling

- **Injection interval**: 5 minutes (300,000ms)
- **API cache TTL**: 60 seconds
- **Context data freshness**: 30 seconds

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| No usage limits shown | No OAuth token | Check credentials |
| Stale context data | Statusline not updating | Check statusline config |
| 401 Unauthorized | Expired token | Re-authenticate |
| Hook not firing | Settings misconfigured | Verify PostToolUse matcher |
