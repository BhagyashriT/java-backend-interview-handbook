# Java 11 — 10-minute interview refresher

**0–2m · Collections**

- `HashMap` expected O(1) get/put; worst-case behavior depends on collisions and implementation. Hash equal objects consistently: `equals` **and** `hashCode`.
- `LinkedHashMap` optionally maintains access order; useful for LRU. `HashSet` has no ordering contract; `LinkedHashSet` preserves insertion order.
- `ArrayList`: amortized O(1) append, O(n) middle insertion. `LinkedList`: O(n) indexed access, O(1) insertion **once you already have a node/iterator**.
- `PriorityQueue`: O(log n) insert/remove, O(1) peek; min-heap by default. Iterating it is **not sorted**.

**2–4m · Concurrency**

- `volatile` provides visibility/order for a field; **not** atomic read-modify-write. Use `AtomicInteger.incrementAndGet()` or locking for a counter.
- `synchronized` gives mutual exclusion and happens-before between monitor unlock and next lock.
- `ConcurrentHashMap`: safe concurrent operations; `get` then `put` as two separate actions is not an atomic transaction. Prefer `compute`, `putIfAbsent`, or coordination appropriate to your invariant.
- `ExecutorService`: size threads/queue; define timeouts and shutdown. Avoid blind infinite queues.

**4–6m · JVM, strings and memory**

- Java passes arguments **by value**, including copies of object references.
- `String` is immutable; use `StringBuilder` for repeated concatenation in a loop.
- Local primitives/references are stored in stack frames conceptually; reachable objects usually live on the heap. Optimizations can change physical storage: don't overstate.
- GC handles unreachable memory, not network sockets, files, threads, or business resource ownership.

**6–8m · Java 8–11 idioms**

- `map` transforms; `flatMap` flattens nested sequences; stream pipelines are lazy until terminal operations.
- `Optional` signals optional result; avoid using it for every field or as a replacement for validation.
- `Collectors.groupingBy` for grouping; `Map.merge` for frequencies; `computeIfAbsent` for collections.

**8–10m · Say aloud**

1. When would I use `LinkedHashSet` rather than `HashSet`?
2. What breaks if I override `equals` but not `hashCode`?
3. How is `volatile` different from `AtomicInteger`?
4. What would I check first if a Java API suddenly slows down?
5. Why could a bounded queue plus backpressure be safer than an unlimited work queue?

→ Deep dives: [Collections](../java/collections.md) · [Concurrency](../java/concurrency.md) · [JVM](../java/jvm-memory.md)
