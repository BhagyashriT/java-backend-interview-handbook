# System design — 10-minute refresher

**Opening script:** “Before drawing boxes, I’ll clarify the critical user actions, traffic, consistency needs, and what success looks like. Then I’ll propose a small correct design and scale the bottlenecks.”

| Step | Talk through |
|---|---|
| 1. Requirements (2m) | Actors, core APIs, read/write ratio, latency SLO, availability, security boundaries |
| 2. Size assumptions (1m) | QPS ≈ requests/day ÷ 86,400 × peak multiplier; storage ≈ objects × bytes × retention × replication |
| 3. API/data (2m) | Three endpoints, schemas, identifiers, indexes, idempotency keys |
| 4. Baseline (2m) | Client → stateless API → persistent store; add queue/cache only when the problem demands it |
| 5. Scaling (2m) | Hot keys, sharding, caching, async processing, bottlenecks, consistency |
| 6. Failures (1m) | Retries, dedupe, backpressure, monitoring, disaster recovery |

**Tradeoffs to say clearly:**

- Cache-aside speeds reads, but data can be stale; define TTL and invalidation strategy.
- Async queues decouple spikes and retries, but introduce lag, ordering complications, and duplicate delivery.
- A database replica scales reads, but may have lag; don't serve read-after-write-critical reads blindly.
- At-least-once delivery requires idempotent consumers. “Exactly once” usually depends on tightly scoped guarantees, not magical end-to-end behavior.
- Availability and consistency tradeoffs depend on the failure model and user action; do not recite CAP mechanically.

**Close with:** “At this scale the first likely bottleneck is ___. I'd watch ___, alert on ___, and mitigate using ___, while accepting the tradeoff of ___.”

→ [Framework](../system-design/framework.md) · [Decision table](../system-design/tradeoffs.md)
