# Decision table: choose tools for requirements

| If you need... | Consider | Costs / failure mode |
|---|---|---|
| Low-latency repeat reads | Cache-aside Redis/in-memory | Staleness, invalidation, eviction, stampede |
| Durable async jobs | DB-backed queue, SQS, Kafka depending on needs | At-least-once duplicates, lag, poison messages |
| Key-based ordered event streams | Kafka partitioned by entity key | Ordering only within partition, throughput skew |
| Transactional invariants | RDBMS transaction/constraints | Contention, cross-region complexity |
| Fast full-text search | Search index | Async index lag, operational overhead |
| Large immutable blobs | Object storage | Metadata indexing, lifecycle policy, upload auth |
| Many parallel readers | Read replicas | Lag, stale reads, failover complexity |
| Predictable per-client traffic caps | Atomic rate limiter | Distributed clock/state, fail-open/closed choice |

## Common design traps

- **Dual writes:** Update DB then publish event without atomic coordination → missed or duplicated event. Consider transactional outbox + idempotent consumers.
- **Infinite retries:** Retry amplification can overwhelm an unhealthy service. Bound attempts, backoff + jitter, and use timeouts.
- **Exactly once claims:** Distinguish broker semantics, processing transaction boundaries, and external side effects.
- **Unbounded queues:** Hide overload until memory/disk pressure. Watch queue age and in-flight limits.
- **Premature microservices:** Start with a simpler deployable unit if team/scale do not justify complexity.
