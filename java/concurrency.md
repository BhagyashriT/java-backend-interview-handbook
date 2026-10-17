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

### Follow-up answers — say them aloud

**1. Why doesn't `volatile` fix `count++`?**
“`volatile` gives me visibility and ordering of the read and the write separately. But `count++` is three steps — read, add, write — and two threads can read the same value before either writes. `volatile` never made the three steps atomic, so updates get lost. I'd use `AtomicInteger.incrementAndGet()`, which is one CAS-based atomic step.”

**2. `LongAdder` vs `AtomicLong`?**
“`AtomicLong` gives exact per-operation atomicity — every `incrementAndGet` returns a globally consistent value, but under heavy contention threads hammer the same cache line. `LongAdder` spreads contention across per-thread cells and sums on read, so it's much faster for write-heavy counters like metrics — at the cost that `sum()` is only eventually consistent. Stats and meters: `LongAdder`. A counter whose exact value gates a decision: `AtomicLong` or a lock.”

**3. What if a task throws inside `ExecutorService`?**
“It depends how I submitted it. With `execute()`, the exception goes to the thread's uncaught-exception handler and the task is silently dead — I might never notice. With `submit()`, the exception is captured in the returned `Future` and rethrown from `get()` wrapped in `ExecutionException` — so it only surfaces if I actually call `get()`. Either way, production code needs explicit error handling: a handler, a wrapper that logs, or always consuming futures.”

**4. Can my rate limiter oversubscribe?**
“Only if the token check-and-consume isn't atomic. In the [token bucket example](../src/main/java/dev/fieldguide/TokenBucket.java), refill and consume are guarded by the same lock, so two threads can't both see the last token. If I checked tokens outside the lock and decremented inside, or used two separate atomic fields for 'tokens' and 'last refill time', threads could interleave and oversubscribe. One lock (or one atomic state update) around the whole decision is what makes it safe.”

**5. Consumer slower than producer?**
“An unbounded queue hides the problem until the JVM runs out of memory — that's how a fixed thread pool 'runs out of memory' from the question bank. The fix is backpressure: bound the queue and pick a rejection policy deliberately — `AbortPolicy` to fail fast, `CallerRunsPolicy` to throttle the producer naturally, or a durable queue (Kafka/SQS) when the work must not be lost. The choice depends on whether dropping, slowing, or persisting is acceptable.”

→ [JLS 17: Threads and Locks](https://docs.oracle.com/javase/specs/jls/se11/html/jls-17.html)
