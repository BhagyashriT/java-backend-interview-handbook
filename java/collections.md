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

## Common follow-ups — answered aloud

**Why can `HashMap` degrade?**
“Expected O(1) assumes keys spread across buckets. If many keys collide — bad `hashCode`, or an adversarial input — lookups walk a chain. Since Java 8, long chains treeify into red-black trees, which bounds the worst case to O(log n) *per bucket* — but that's a mitigation, not a guarantee of O(log n) overall, and it only kicks in above a threshold with sufficient capacity. The real fix is a good hash function and immutable keys.”

**`ConcurrentHashMap` vs `Collections.synchronizedMap`?**
“`synchronizedMap` wraps every method in one global lock — simple, but all operations serialize and iteration still needs external synchronization. `ConcurrentHashMap` uses fine-grained locking (per-bin in Java 8+) so concurrent reads and writes scale, and its iterators are weakly consistent instead of fail-fast. Neither makes a multi-step business operation atomic — `if (!map.containsKey(k)) map.put(k, v)` is still a race on both; I need `putIfAbsent` or `compute`.”

**`computeIfAbsent` gotcha?**
“It's great for lazy grouping — `map.computeIfAbsent(key, k -> new ArrayList<>()).add(v)`. But the mapping function must not modify the same map — doing so can deadlock or throw `IllegalStateException`, because the bin is locked during computation. Keep the function side-effect free and fast.”

**Is `PriorityQueue` iteration sorted?**
“No. Only the head is guaranteed to be the minimum. The internal array is a heap, not a sorted list — iterating it yields heap order. To get sorted output I repeatedly `poll()`, which destroys the queue. If I need sorted traversal without destruction, I copy the queue or use a `TreeSet`.”

→ [Oracle collection API](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/package-summary.html)
