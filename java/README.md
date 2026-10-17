# Java track

- [Collections and equality](collections.md): `HashMap`, ordering, heaps, map operations, costs.
- [Concurrency and Java Memory Model](concurrency.md): `volatile`, locks, atomics, concurrent collections, executors.
- [JVM and memory](jvm-memory.md): stack/heap, GC, profiling, class loading.
- [Streams, generics and Java 11](streams-generics.md): map/flatMap, type erasure, inference, `Optional`.
- [Java interview Q&A](questions.md): progressive follow-ups.

**Runnable code that exercises these notes:** [LruCache](../src/main/java/dev/fieldguide/LruCache.java) (collections, eviction) and [TokenBucket](../src/main/java/dev/fieldguide/TokenBucket.java) (atomic check-and-consume under one lock) — both covered by `bash scripts/test.sh`. See the [code ↔ notes map](../dsa/README.md#runnable-code--notes-map).

**How to revise:** Answer each question aloud without scrolling. When uncertain, identify whether you are making an API guarantee or describing a current implementation detail.
