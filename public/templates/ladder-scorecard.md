# Verification ladder scorecard

Score one repository against the seven rungs of the verification ladder.
Use only evidence you can point to: a file, a config line, a setting, a run.
If you can't point to it, it's Absent.

Statuses: **Present** (exists and enforced), **Partial** (exists but has a
gap, or isn't enforced), **Absent**, **N/A** (not applicable, say why).

| Rung | Status | Evidence (file, setting, or run) |
| --- | --- | --- |
| 1. Types and schemas | | Type checker / linter in CI? Strict mode? Schema or DB constraints? |
| 2. Tests from the spec | | Are the tests tracked in the repo? Do they run in CI? Do they map to "Must" / "Must never"? |
| 3. Policy in the system | | Is authorization enforced in one central place (not the UI)? Row-level security? Contract tests? |
| 4. Security scanning | | Static analysis, secret scanning, dependency updates. How often do they run? |
| 5. CI gate | | Are checks *required* on the default branch? Can any step pass by being skipped or swallowed (`|| true`, `|| echo`, `continue-on-error`)? |
| 6. Production signals | | Alerts, tracing, SLOs, feature flags, rollback. Or N/A with a reason. |
| 7. Human review by risk | | Is review required where the risk is (auth, money, personal data, migrations)? Is it enforced (code ownership), or only a convention? |

## Ownership (score separately)

| Practice | Status | Evidence |
| --- | --- | --- |
| A named owner for each deployed system | | |
| A written *why* for surprising decisions | | |
| A runbook for incidents | | |
| An intent spec committed next to each feature | | |
| A retirement / simplification review at least every six months | | |

## How to read the result

- The most useful finding is usually **the gap between "exists" and
  "enforced"**. A check that can't block a merge is a suggestion.
- Fix rung 5 first. It's what keeps rungs 1 to 4 from being skipped under
  deadline pressure.
- Record the date and the commit you scored. This is a snapshot, not a
  grade.
- Re-score after 30 days of using the loop. If nothing moved, say so.
