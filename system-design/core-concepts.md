# Core concepts without buzzwords

| Concept | Simple interpretation | Design decision |
|---|---|---|
| Latency | Time to complete a request, track p50/p95/p99 | Can async work leave the critical path? |
| Throughput | Successful operations per unit time | Can we batch or horizontally scale? |
| Availability | Probability service can serve request | What if a node or zone fails? |
| Durability | Accepted committed data survives failures | Replication, WAL, backups, verification |
| Consistency | What reads observe relative to writes | Need read-your-writes? Eventual acceptable? |
| Partitioning | Split ownership of records or tasks | Choose key to avoid hot shards |
| Replication | Maintain copies | Handle lag, promotion and conflict semantics |
| Backpressure | Limit in-flight work under pressure | Reject, queue durably, or shed load |
| Idempotency | Repeated request does not repeat side effect | Stable key and retention window |

## Why caching is not free

Cache-aside: `read cache → miss → database → populate cache`. Consider stampedes, TTL, negative caching, invalidation, warmup, and consistency. High cache hit rate matters only if cached reads reduce actual bottlenecks.

## Why queues are not free

Queues absorb spikes and decouple services but bring lag, retries, poison messages and duplicate delivery. Correlation IDs, dedupe, DLQs and processing-age metrics matter.

## What does CAP actually say?

During a network partition in a distributed data store, there is a tradeoff between maintaining strong consistency of operations and remaining available for those operations. Normal operation involves other tradeoffs such as latency and consistency; CAP is not a database buying guide.

## Consistent hashing — say it aloud

“When I shard data across N nodes, naive `hash(key) % N` reshuffles nearly every key when N changes. Consistent hashing places nodes and keys on the same ring, so adding or removing a node only remaps the keys adjacent to it — roughly 1/N of the data. Virtual nodes (each physical node appearing many times on the ring) smooth out the distribution when nodes are few or heterogeneous. I'd reach for it when membership changes often: caches, distributed rate limiters, sharded queues.”

## Quorums — say it aloud

“With N replicas, writing to W and reading from R, I get strong consistency when R + W > N, because every read overlaps at least one node that saw the latest write. N=3, W=2, R=2 is the classic setup. Lowering W makes writes fast but risks stale reads; lowering R makes reads fast but risks missing the latest write. Quorums let me tune the latency/consistency tradeoff per operation instead of per system — writes that must be durable get W=3, reads that can be stale get R=1.”

## Numbers quick reference

- 1 day = 86,400 seconds.
- Average QPS = requests per day / 86,400.
- Peak = average × assumed peak factor (state assumption).
- Data storage = object count × average bytes, then add indexes, replication and retention.

Avoid inventing realistic-looking guarantees or benchmark numbers without measuring them.
