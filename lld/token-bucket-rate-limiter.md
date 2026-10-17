# LLD: rate limiter — from interface to thread-safe code

A worked low-level design that ends in [runnable Java](../src/main/java/dev/fieldguide/TokenBucket.java). System-design context: [distributed rate limiter](../system-design/rate-limiter.md).

## 1. Requirements (5 minutes)

- `allow()` returns true/false per request; thread-safe under concurrent callers.
- Configurable capacity and refill rate; burst-friendly (token bucket, not fixed window).
- Testable without sleeping: inject the clock.
- Explicitly **not** distributed — one JVM. Say that boundary out loud.

## 2. Domain model and invariants

One entity: the bucket. State: `capacity`, `refillPerSecond`, `tokens`, `lastRefillNanos`.

Invariants:
- `0 <= tokens <= capacity` always.
- Refill is computed from a **monotonic** clock (`System.nanoTime`, never `currentTimeMillis` — wall clock jumps break refill math).
- Check-and-consume is **one atomic step**: refill, compare, subtract under the same lock. Splitting it across two synchronized blocks (or two atomics) lets two threads both see the last token — that's the oversubscription bug from [concurrency](../java/concurrency.md).

## 3. Interface

```java
public final class TokenBucket {
    public TokenBucket(double capacity, double refillPerSecond)
    public TokenBucket(double capacity, double refillPerSecond, LongSupplier clock) // test seam
    public synchronized boolean allow()
}
```

Why `synchronized` and not lock-free? Contention on one bucket is low (one key's limiter), the critical section is nanoseconds, and a single monitor makes the invariant obviously correct. Say the alternative you rejected — that's senior signal.

## 4. Walk the scenarios

- **Success:** 10 tokens, `allow()` → refill to 10, consume → 9, return true.
- **Exhausted:** 0 tokens, `allow()` → refill adds 0.3 → still < 1 → false, no subtraction.
- **Concurrent:** two threads, 1 token left → one wins the monitor, consumes; the other sees 0. No oversubscribe.
- **Clock:** fake `LongSupplier` in tests advances time deterministically — no `Thread.sleep` in unit tests.

## 5. Extension points (the interview loves these)

- **Distributed:** replace the in-memory fields with a Redis Lua script doing the same refill-and-consume atomically; the interface doesn't change.
- **Multiple limits:** compose buckets (per-second AND per-day) — `allow()` requires all to allow; document which limit to report in `Retry-After`.
- **Observability:** count allowed/rejected per key; rejected-spike alerts catch misconfigured limits or abuse.

## 6. What I'd say to close

“I kept the state minimal, made check-and-consume atomic under one lock, used a monotonic clock, and injected it for tests. The class documents that it's local-only — going distributed means moving the atomic step to Redis, not adding threads.”

→ [Implementation](../src/main/java/dev/fieldguide/TokenBucket.java) · [Tests](../src/test/java/dev/fieldguide/RunAllTests.java)
