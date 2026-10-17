# Java collections: contracts, costs and traps

## The interview answer

“I choose a collection from its **access pattern and guarantees**: lookup cost, ordering, duplicates, concurrency, and memory. `HashMap` is a default for expected constant-time lookup, but if order matters I consider `LinkedHashMap`, and for top-priority retrieval I use a heap.”

| Structure | Average operation | Ordering / detail | Trap |
|---|---|---|---|
| `ArrayList` | get O(1), append amortized O(1) | Insertion order | insert/remove at front O(n) |
| `LinkedList` | indexed get O(n) | Insertion order | extra allocation and poor locality |
| `HashMap` | expected get/put O(1) | No traversal order promise | mutable key / wrong `hashCode` |
| `LinkedHashMap` | expected get/put O(1) | Insertion or access order | access-ordered `get` mutates ordering |
| `HashSet` | expected add/contains O(1) | No order guarantee | not a list |
| `LinkedHashSet` | expected add/contains O(1) | Insertion order | extra linked metadata |
| `TreeMap` | get/put O(log n) | Comparator or natural key sort | comparator equality affects key identity |
| `PriorityQueue` | offer/poll O(log n), peek O(1) | Heap priority at head | iterator not sorted |

## `equals` and `hashCode`

Equal keys **must** have equal hash codes. Hash collision does **not** mean two keys are equal. Mutating a key's equality-relevant fields after insertion may make it effectively unfindable. Prefer immutable key objects.

## Why `LinkedHashSet` instead of `List`?

If you require **unique items and stable insertion-order iteration**, `LinkedHashSet` handles both. A `List` preserves order and permits duplicates, so preventing duplicates by scanning may cost O(n) for each insertion. `LinkedHashSet` has expected O(1) membership operations with extra memory overhead.

## LRU in Java 11

`LinkedHashMap<>(capacity, 0.75f, true)` maintains access order. Override `removeEldestEntry` to evict when the map grows beyond capacity. This is **not thread-safe** without external coordination. [Executable example](../src/main/java/dev/fieldguide/LruCache.java).

## Common follow-ups

- Why can `HashMap` degrade? Hash collisions; tree bins can help under certain conditions, but don't claim unconditional O(log n).
- `ConcurrentHashMap` vs `Collections.synchronizedMap`? Different concurrency strategies/iteration semantics; neither makes multi-step business operations automatically atomic.
- `computeIfAbsent`? Useful for lazy grouping; avoid side effects that recursively modify the same mapping.
- Is heap iteration sorted? No; repeatedly `poll` to get priority order, changing the queue.

→ [Oracle collection API](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/package-summary.html)
