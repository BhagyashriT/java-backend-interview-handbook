# My stories — 90-second versions

Drafted from my resume on Oct 16, 2026. Bracketed `[confirm: ...]` notes are details to verify or fill in — fix them before using these in an interview.

---

## Story 1 — event-driven re-architecture (hardest problem / scale win)

"Our ad serving ran on synchronous microservice workflows across millions of devices. Latency compounded with every chained call, and fill rate was suffering — a slow dependency anywhere blocked the whole chain. I owned re-architecting it to an AWS event-driven design. The tradeoff was real: sync is simple to debug and reason about; event-driven decouples everything but you inherit ordering, duplicate delivery, and much harder debugging. I chose event-driven because the latency math made sync a dead end at our scale, and I mitigated the debugging cost with [confirm: correlation IDs and idempotent consumers]. Result: fill rate up 35%, end-to-end latency down 40%. Reflection: I'd invest in distributed tracing *before* the migration next time, not during."

**If they dig:**
- "Why not just add caching?" → "Caching helps repeat reads; our bottleneck was chained synchronous compute per request — a cache couldn't fix the workflow shape."
- "How did you handle duplicates from at-least-once delivery?" → [confirm: your answer]

## Story 2 — dynamic ad-rendering framework (tradeoff with business impact)

"We needed real-time ASIN selection and A/B testing in ad rendering. The fast option was hardcoded templates per placement — quick to ship, but it explodes combinatorially with every new placement and experiment. I architected a Java-based dynamic rendering framework instead: bigger upfront investment, reusable everywhere. It launched and drove $100M+ in annual incremental revenue. The lesson I reuse: when the business wants rapid experimentation, you pay the platform cost once instead of the per-experiment tax forever."

**If they dig:**
- "How did the framework stay fast with dynamic selection?" → [confirm: caching / metadata service design]
- "How did you roll it out safely?" → [confirm: staged rollout / experiment gating]

## Story 3 — operational insights platform (production incident / ownership)

"Incident triage across our distributed AWS services took hours — engineers manually correlating logs across services. I built an operational insights platform that automated log analysis and root-cause investigation. The alternative was better runbooks and dashboards: zero build cost, but it doesn't scale as service count grows. Automation won because the toil was growing with the architecture. Triage went from hours to minutes."

**If they dig:**
- "How did it identify root cause?" → [confirm: your answer]
- "How did you deal with false positives?" → [confirm: your answer]

## Story 4 — mentoring and technical influence (quick version)

"I mentored four engineers through design reviews, code reviews, and technical guidance, while improving our CI/CD pipelines and observability. The leverage point was making reviews teach the *reasoning* — not just catching bugs but building judgment — so the team got faster even when I wasn't in the room."

---

*Keep these public-safe: no internal codenames, no nonpublic figures. The numbers above are the ones already on my resume.*
