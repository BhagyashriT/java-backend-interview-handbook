# Java interview Q&A: escalating follow-ups

### Q: How does `HashMap` find a key?

**Initial:** It hashes the key, maps the hash to a bucket, and checks equality among candidates. Average get/put is O(1) with a healthy distribution.

**Follow-up:** Two keys can share a hash; `equals` resolves logical equality. Resizing and collisions affect performance.

**Deeper:** How are mutable keys dangerous? If hash/equality-relevant fields change, a lookup may target a different bucket or equality relation.

### Q: What does `volatile` do?

**Initial:** It gives visibility and ordering guarantees for accesses to the field across threads.

**Follow-up:** `count++` remains non-atomic, because it is a compound operation.

**Deeper:** For a simple stop flag, volatile may suffice; for inventory decrement, use a lock/atomic operation and account for persistence boundaries.

### Q: Why is your service timing out?

**Initial:** Check error/latency metrics, compare deploys, inspect trace spans.

**Follow-up:** If dependency calls dominate, check pool saturation, retries, timeout budgets, and downstream errors.

**Deeper:** A retry storm amplifies load. Add bounded retries, jitter, circuit breaking, and idempotency when appropriate.

### Q: `ArrayList` versus `LinkedList`?

**Initial:** Random access and memory locality generally favor `ArrayList` for most app workloads.

**Follow-up:** `LinkedList` offers constant-time insertion around a known node/iterator, but locating by index costs O(n).

**Deeper:** Benchmark the actual access pattern; asymptotic complexity alone doesn't capture allocations and cache locality.
