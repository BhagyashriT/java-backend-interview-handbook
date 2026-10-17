# Java concurrency: correctness before speed

## Say it aloud

“First I define the invariant and which state is shared. Then I choose an ownership or synchronization strategy. I separate **visibility**, **atomicity**, and **ordering** because solving one doesn't automatically solve all three.”

| Concept | Guarantee | Not guaranteed |
|---|---|---|
| `volatile` field | visibility and ordering rules for accesses | atomic `x++` |
| `synchronized` | mutual exclusion and happens-before around same monitor | fairness |
| `AtomicInteger` | atomic operations such as `incrementAndGet` | consistency across unrelated fields |
| `ConcurrentHashMap.compute` | atomic per-key remapping operation | atomic transactions involving many keys |
| `ReentrantLock` | explicit lock/unlock; optional fairness, interruptible acquisition | safe use without `finally` |
| `ExecutorService` | task scheduling through executor | safe unbounded queue sizing or task completion without `get`/tracking |

### Example: incorrect counter

```java
volatile int count = 0;
// count++ is read + add + write; two threads can lose updates.
```

Fix with `AtomicInteger.incrementAndGet()` or a critical section. For multi-field invariants, a lock may be simpler than multiple atomics.

### `ConcurrentHashMap` gotcha

```java
// Not an atomic composite operation:
if (!map.containsKey(id)) map.put(id, value);
// Better when "only add if absent":
map.putIfAbsent(id, value);
```

### Thread pools and backpressure

Choose worker count from CPU vs blocking workload. Bound concurrency **and** queued work. At saturation, decide whether to reject, wait, shed load, or use durable queues; never assume throwing more threads at latency works.

### Deadlock checklist

- Circular wait from inconsistent lock ordering.
- Lock held while blocking on a future that needs the same lock.
- Fix: global lock order, timeout/try-lock, less shared mutable state, remove nested blocking.

### Practical follow-ups

1. Why doesn't `volatile` make the counter safe?
2. When use `LongAdder` versus `AtomicLong`? (high-contention stats vs exact per-operation atomic read-modify-write semantics)
3. What if a task throws inside `ExecutorService`? (how you submit/observe results matters)
4. Can your rate limiter oversubscribe under concurrent traffic? (identify lock or CAS protecting shared tokens)
5. What happens when the consumer is slower than the producer? (queues grow; enforce backpressure)

→ [JLS 17: Threads and Locks](https://docs.oracle.com/javase/specs/jls/se11/html/jls-17.html)
