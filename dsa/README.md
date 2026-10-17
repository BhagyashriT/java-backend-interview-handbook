# DSA: pattern first, code second

1. [Pattern detector](patterns.md) — choose the right tool based on input shape and constraints.
2. [Arrays, maps, sliding window](arrays-windows.md) — reuse a running invariant.
3. [Binary search, intervals, heaps](search-intervals-heaps.md) — monotonicity and order statistics.
4. [Trees and graphs](trees-graphs.md) — BFS, DFS, topological sorting, articulation points.
5. [Dynamic programming](dynamic-programming.md) — state definition, recurrence, order of evaluation.
6. [Worked Java examples](worked-problems.md) — brute-force → optimized, tests, dry runs.
7. [Executable Java 11 source](../src/README.md).

**Your first sentence:** “A direct approach would be __, which costs __. The repeated work is __, so I'll instead maintain __.”

## Runnable code ↔ notes map

Every example compiles with `javac --release 11` and is covered by `bash scripts/test.sh`:

| Code | Pattern (notes) | Design note it also illustrates |
|---|---|---|
| [LongestUniqueSubstring](../src/main/java/dev/fieldguide/LongestUniqueSubstring.java) | Sliding window ([arrays-windows](arrays-windows.md)) | — |
| [SubarraySumK](../src/main/java/dev/fieldguide/SubarraySumK.java) | Prefix sum + hash map ([arrays-windows](arrays-windows.md)) | — |
| [LowerBound](../src/main/java/dev/fieldguide/LowerBound.java) | Binary search invariant ([search-intervals-heaps](search-intervals-heaps.md)) | — |
| [MergeIntervals](../src/main/java/dev/fieldguide/MergeIntervals.java) | Sort + sweep ([search-intervals-heaps](search-intervals-heaps.md)) | — |
| [TopKFrequent](../src/main/java/dev/fieldguide/TopKFrequent.java) | Bounded heap ([search-intervals-heaps](search-intervals-heaps.md)) | — |
| [NumberOfIslands](../src/main/java/dev/fieldguide/NumberOfIslands.java) | BFS ([trees-graphs](trees-graphs.md)) | — |
| [CourseSchedule](../src/main/java/dev/fieldguide/CourseSchedule.java) | Topological sort ([trees-graphs](trees-graphs.md)) | — |
| [LruCache](../src/main/java/dev/fieldguide/LruCache.java) | Access-order LinkedHashMap ([../java/collections.md](../java/collections.md)) | Cache eviction ([../learnings/caching-strategies.md](../learnings/caching-strategies.md)) |
| [TokenBucket](../src/main/java/dev/fieldguide/TokenBucket.java) | — | [LLD walkthrough](../lld/token-bucket-rate-limiter.md) · [distributed rate limiter](../system-design/rate-limiter.md) · [concurrency](../java/concurrency.md) |
