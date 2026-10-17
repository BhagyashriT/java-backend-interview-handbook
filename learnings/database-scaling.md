# Learning summary: database scaling

## The mental model

Scaling a database is about deciding **what you're willing to give up**: write throughput, read freshness, or operational simplicity. Scale reads first — they're usually the bottleneck and the cheapest to fix.

## The ladder, in order

1. **Indexes and query fixes.** Most "slow database" problems are missing indexes or N+1 queries. `EXPLAIN` before architecture.
2. **Read replicas.** Replicate to N read nodes; writes go to the primary. Cheap and effective — but replicas lag, so reads can be stale. Route read-your-writes traffic to the primary when freshness matters.
3. **Caching in front.** (See [caching strategies](caching-strategies.md).) Protects the DB from repeat reads; doesn't help write load.
4. **Vertical scaling.** Bigger machine. Buys time, not architecture — say so in the interview.
5. **Sharding.** Partition rows by a shard key across nodes. Writes now scale, but: cross-shard queries and transactions get painful, rebalancing is operationally heavy, and a bad shard key creates hot shards. Choose a key with high cardinality that matches your access pattern (e.g., `user_id` when most queries are per-user).
6. **Denormalization / specialized stores.** Pre-join or duplicate data for read paths; move search to a search index, time series to a TSDB, blobs to object storage. Each new store is new operational surface — justify it with a requirement.

## What interviewers probe

- **Shard key choice:** “Why `user_id` and not `created_at`?” — because queries are per-user; time-based keys hotspot the latest shard.
- **Hot shards:** a celebrity user owns 10% of rows. Mitigations: split hot keys further, cache their reads, or accept the skew and say it.
- **Transactions across shards:** avoid them; use sagas or redesign the boundary. If you must, name the 2PC cost explicitly.
- **When the RDBMS is still right:** strong invariants (money, inventory), complex ad-hoc queries, and moderate scale. Don't shard a database that fits on one machine.

## My takeaway

“Scale reads with replicas and caching before touching writes. Shard only with a key derived from the access pattern, and treat every new data store as a cost that needs a requirement behind it.”
