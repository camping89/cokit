# Mode Selection

Ask the user at start of fixing workflow to choose a mode. Present the question directly in your response, then stop and wait for their answer.

## Question Format

Ask the user:

> **Fix Mode:** How should I handle the fix workflow?
>
> 1. **Autonomous (Recommended)** — Auto-approve if quality high, only ask when stuck
> 2. **Human-in-the-loop** — Pause for approval at each major step
> 3. **Quick fix** — Fast debug-fix-review cycle for simple issues

## Mode Recommendations

| Issue Type | Recommended Mode |
|------------|------------------|
| Type errors, lint errors | Quick |
| Single file bugs | Quick or Autonomous |
| Multi-file, unclear root cause | Autonomous |
| Production/critical code | Human-in-the-loop |
| System-wide/architecture | Human-in-the-loop |
| Security vulnerabilities | Human-in-the-loop |

## Skip Mode Selection When

- Issue is clearly trivial (type error keyword detected) → default Quick
- User explicitly specified mode in prompt
- Previous context already established mode
