# Intent spec template

One page, written *before* you prompt. Keep it in the repository next to the
feature it describes. If it grows past one page, split the work.

---

# Intent: <feature name>

**Goal**
What outcome, for whom, and why now. One or two sentences.

**Must**
Observable behaviors, each stated so a test could check it.
- ...

**Must never**
The things that would make this a failure. This is the most important
section: models are good at making things work and much worse at knowing what
must not happen. Think data leaks, double charges, silent failures, actions by
the wrong user.
- ...

**Edge cases**
Empty, huge, duplicate, concurrent, offline, unauthorized, timed out, partially
failed.
- ...

**Constraints**
Performance budget, data residency, cost, compliance, existing systems this
must fit into.
- ...

**Done when**
The acceptance tests that must pass, in plain language. Write these as real
tests *before* generating the implementation, ideally by someone (or a
separate agent session) that has not seen the implementation.
- ...

**Risk tier** (see §9.1): throwaway / internal / high stakes

**Owner**
A named person accountable for this in production.

---

## Worked example (shortened)

# Intent: Partial refunds

**Goal** Let support staff refund part of a captured payment, so customers
don't need a full refund plus a re-charge.

**Must**
- Refund any amount up to the remaining captured balance.
- Record every refund with who, when, amount, and reason.

**Must never**
- Refund more than was captured.
- Refund twice when the same request is retried.
- Let a non-admin trigger a refund.

**Edge cases** Concurrent refunds on one payment; currency rounding; payment
provider timeout after we sent the request; database write failing after the
provider succeeded.

**Constraints** Use the existing payments service and authorization layer; no
new provider SDKs.

**Done when**
- A concurrent double-refund test leaves the balance correct.
- A retried request with the same idempotency key refunds once.
- A non-admin request is rejected and logged.

**Risk tier** High stakes (money)

**Owner** Payments team lead
