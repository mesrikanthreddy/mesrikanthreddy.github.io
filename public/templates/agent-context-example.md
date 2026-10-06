# Project context for AI coding agents

A starter instruction file. Rename it to whatever your agent reads (for
example CLAUDE.md or AGENTS.md), commit it, and review it like code.

Keep it short. Put the rules that matter most **first**: models use the
beginning and end of a long context better than the middle.

---

## Never do (read this first)
- Never log personal data, tokens, or payment details.
- Never bypass the authorization layer or write queries that skip tenant
  filtering.
- Never merge or deploy; open a pull request and stop.
- Never add a dependency without saying why in the PR description.

## How we work
- Write or update tests from the spec **before** the implementation.
- Run the type check, tests, and linter before saying a task is done.
- If the request is ambiguous, list your assumptions and questions first.

## Architecture in five lines
- Web: <framework>. API: <framework>. Database: <engine>.
- All data access goes through <module>. Do not query the database directly.
- Authorization is enforced in <place>, not in the UI.
- Background jobs run through <queue>.
- Configuration comes from environment variables; never hardcode secrets.

## Why things are the way they are
Short notes on surprising decisions, so they aren't "fixed" by accident.
- Retries are capped at 2 because <reason>.
- Field <x> is never logged because <regulatory reason>.

## Layering
Organization-wide rules live in the global file, project rules here, and
folder-specific rules in that folder, so each task only loads the context it
needs.
