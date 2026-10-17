/* Original flashcards. No external API calls. */
window.FIELDGUIDE_CARDS = [
  {
    "id": "c001",
    "topic": "Java",
    "question": "What is the contract between equals() and hashCode()?",
    "answer": "Equal objects must have equal hash codes. Hash collisions do not imply equality. Mutable fields used by either method can break hash-based lookups after insertion.",
    "level": "core",
    "ref": "java/collections.md"
  },
  {
    "id": "c002",
    "topic": "Java",
    "question": "When do you choose LinkedHashSet over HashSet or List?",
    "answer": "When unique elements must iterate in insertion order. HashSet has no order guarantee; List preserves order but allows duplicates and linear membership checks.",
    "level": "core",
    "ref": "java/collections.md"
  },
  {
    "id": "c003",
    "topic": "Java",
    "question": "What does an access-ordered LinkedHashMap give you?",
    "answer": "Recently accessed entries move to the end. With removeEldestEntry you can build an expected-O(1) LRU; it is not thread-safe by default.",
    "level": "core",
    "ref": "java/collections.md"
  },
  {
    "id": "c004",
    "topic": "Java",
    "question": "Is PriorityQueue iteration sorted?",
    "answer": "No. Only the head gives the minimum per comparator. Repeated poll operations yield priority order; each poll is O(log n).",
    "level": "core",
    "ref": "java/collections.md"
  },
  {
    "id": "c005",
    "topic": "Java",
    "question": "ArrayList versus LinkedList for most workloads?",
    "answer": "ArrayList usually wins for indexing, compact storage, and locality. LinkedList has O(1) insertion around a known node, but finding an indexed node is O(n).",
    "level": "core",
    "ref": "java/collections.md"
  },
  {
    "id": "c006",
    "topic": "Java",
    "question": "Why is a volatile counter not thread-safe?",
    "answer": "Volatile provides visibility and ordering, not atomic read-modify-write. count++ can lose updates. Use AtomicInteger, LongAdder for certain counters, or a lock.",
    "level": "core",
    "ref": "java/concurrency.md"
  },
  {
    "id": "c007",
    "topic": "Java",
    "question": "What guarantee does synchronized provide?",
    "answer": "Mutual exclusion for a monitor and happens-before between unlocking and a later lock of that same monitor. It does not promise fairness.",
    "level": "core",
    "ref": "java/concurrency.md"
  },
  {
    "id": "c008",
    "topic": "Java",
    "question": "Why can check-then-put on ConcurrentHashMap be unsafe?",
    "answer": "The compound operation contains a race even though individual methods are thread-safe. Prefer putIfAbsent or compute for per-key atomic changes.",
    "level": "core",
    "ref": "java/concurrency.md"
  },
  {
    "id": "c009",
    "topic": "Java",
    "question": "How can a thread pool cause an outage without high CPU?",
    "answer": "Tasks may block waiting on dependencies; queued work grows, response time increases, and timeouts amplify. Bound queue/work, measure queue age and dependency latency, and set time budgets.",
    "level": "core",
    "ref": "java/concurrency.md"
  },
  {
    "id": "c010",
    "topic": "Java",
    "question": "When would you use ReentrantLock?",
    "answer": "When you need tryLock, interruption or separate conditions. Always unlock in finally. Prefer simpler synchronized when these capabilities are unnecessary.",
    "level": "core",
    "ref": "java/concurrency.md"
  },
  {
    "id": "c011",
    "topic": "Java",
    "question": "What is the difference between AtomicLong and LongAdder?",
    "answer": "AtomicLong gives a single atomic value for operations like compareAndSet. LongAdder spreads updates across cells for high-contention counters, but sum is not an atomic snapshot during concurrent updates.",
    "level": "core",
    "ref": "java/concurrency.md"
  },
  {
    "id": "c012",
    "topic": "Java",
    "question": "Java pass-by-value: what happens to object parameters?",
    "answer": "The method receives a copy of the reference value. It can mutate the referenced object, but reassigning its parameter does not change the caller’s reference.",
    "level": "core",
    "ref": "java/jvm-memory.md"
  },
  {
    "id": "c013",
    "topic": "Java",
    "question": "What is the difference between == and equals()?",
    "answer": "For object references == compares identity; equals compares class-defined logical equality. For primitives == compares values.",
    "level": "core",
    "ref": "java/jvm-memory.md"
  },
  {
    "id": "c014",
    "topic": "Java",
    "question": "What is a likely source of a Java memory leak?",
    "answer": "Objects retained by unintended references, not simply objects created in large numbers. Inspect heap retention paths, caches, listeners, queues, and thread locals.",
    "level": "core",
    "ref": "java/jvm-memory.md"
  },
  {
    "id": "c015",
    "topic": "Java",
    "question": "What is the distinction between map and flatMap?",
    "answer": "map creates one transformed result per input item; flatMap maps each item to a stream and then flattens nested results.",
    "level": "core",
    "ref": "java/streams-generics.md"
  },
  {
    "id": "c016",
    "topic": "Java",
    "question": "Why is Optional.orElseGet sometimes preferable to orElse?",
    "answer": "orElse evaluates the supplied default eagerly. orElseGet evaluates its supplier only when the Optional is empty, avoiding unnecessary expensive work.",
    "level": "core",
    "ref": "java/streams-generics.md"
  },
  {
    "id": "c017",
    "topic": "Java",
    "question": "What does type erasure imply for Java generics?",
    "answer": "Generic type parameters are not retained as distinct specialized runtime classes. You cannot directly instantiate T or test instanceof List<String>.",
    "level": "core",
    "ref": "java/streams-generics.md"
  },
  {
    "id": "c018",
    "topic": "Java",
    "question": "What does PECS mean?",
    "answer": "Producer Extends, Consumer Super: use ? extends T for reading T-like values from a source and ? super T for writing T values to a destination.",
    "level": "core",
    "ref": "java/streams-generics.md"
  },
  {
    "id": "c019",
    "topic": "Java",
    "question": "Name two Java 11 String APIs.",
    "answer": "String.isBlank(), strip(), lines(), and repeat(int) are available in Java 11. Avoid using records or other newer-JDK features if the interview specifies Java 11.",
    "level": "core",
    "ref": "java/streams-generics.md"
  },
  {
    "id": "c020",
    "topic": "Java",
    "question": "Where would you start investigating a sudden JVM latency increase?",
    "answer": "Establish p95/p99 and error scope; compare deploys; inspect traces, GC/CPU, thread pools and dependency saturation. Profile or inspect heap only when the signals point there.",
    "level": "core",
    "ref": "java/jvm-memory.md"
  },
  {
    "id": "c021",
    "topic": "DSA",
    "question": "How do you start a coding answer before optimizing?",
    "answer": "State a correct brute-force approach, time/space cost, and the repeated work. Then introduce the invariant or data structure that avoids it.",
    "level": "core",
    "ref": "dsa/patterns.md"
  },
  {
    "id": "c022",
    "topic": "DSA",
    "question": "Longest unique substring: what is the sliding-window invariant?",
    "answer": "The window [left,right] contains no repeated character. Move left past the prior occurrence if it is still inside the window. Time O(n), map space O(distinct chars).",
    "level": "core",
    "ref": "dsa/arrays-windows.md"
  },
  {
    "id": "c023",
    "topic": "DSA",
    "question": "Why can sliding-window sum fail with negative numbers?",
    "answer": "Adding an element can decrease the sum, so moving pointers is no longer monotonic. Prefix sum counts handle arbitrary signed values for exact-sum subarrays.",
    "level": "core",
    "ref": "dsa/arrays-windows.md"
  },
  {
    "id": "c024",
    "topic": "DSA",
    "question": "Subarray sum equals K: what starts in the prefix map?",
    "answer": "Prefix sum zero with count one. Otherwise subarrays starting at index zero are missed. For current sum s, add count(s-k).",
    "level": "core",
    "ref": "dsa/arrays-windows.md"
  },
  {
    "id": "c025",
    "topic": "DSA",
    "question": "How do you find first index >= target in a sorted array?",
    "answer": "Binary search a half-open interval [left,right). On value < target, advance left to mid+1; otherwise move right to mid. Return left.",
    "level": "core",
    "ref": "dsa/search-intervals-heaps.md"
  },
  {
    "id": "c026",
    "topic": "DSA",
    "question": "Top K frequent: why use a size-K min-heap?",
    "answer": "After counting frequencies, keep the best K entries. Offer candidates and evict the worst; O(n + u log k) time. Specify tie-breaking.",
    "level": "core",
    "ref": "dsa/search-intervals-heaps.md"
  },
  {
    "id": "c027",
    "topic": "DSA",
    "question": "Merge intervals: why sort by start first?",
    "answer": "Sorted starts let each interval be compared only with the active merged interval. If overlapping, extend the end; otherwise emit active. O(n log n) time.",
    "level": "core",
    "ref": "dsa/search-intervals-heaps.md"
  },
  {
    "id": "c028",
    "topic": "DSA",
    "question": "When does BFS find shortest paths?",
    "answer": "When all edges have equal weight, BFS traverses by hop distance. Weighted graphs need an algorithm suited to edge-weight assumptions.",
    "level": "core",
    "ref": "dsa/trees-graphs.md"
  },
  {
    "id": "c029",
    "topic": "DSA",
    "question": "How do you detect a directed cycle with topological sort?",
    "answer": "Kahn’s algorithm removes indegree-zero nodes. If fewer than V nodes are removed, some cycle prevents a valid ordering.",
    "level": "core",
    "ref": "dsa/trees-graphs.md"
  },
  {
    "id": "c030",
    "topic": "DSA",
    "question": "Articulation point: how does low-link reveal a cut vertex?",
    "answer": "For a non-root DFS vertex v, if a child u has low[u] >= tin[v], u’s subtree cannot reach an ancestor of v without v. A root is articulation if it has >=2 DFS children.",
    "level": "advanced",
    "ref": "dsa/trees-graphs.md"
  },
  {
    "id": "c031",
    "topic": "DSA",
    "question": "What is the first step of dynamic programming?",
    "answer": "Define the state in words. Then derive a recurrence that covers all choices, establish base cases, and choose memoization or bottom-up evaluation.",
    "level": "core",
    "ref": "dsa/dynamic-programming.md"
  },
  {
    "id": "c032",
    "topic": "DSA",
    "question": "Why does greedy coin change fail in general?",
    "answer": "Locally largest denominations need not minimize coin count. With [1,3,4] and amount 6, greedy uses 4+1+1, while optimum is 3+3.",
    "level": "core",
    "ref": "dsa/dynamic-programming.md"
  },
  {
    "id": "c033",
    "topic": "DSA",
    "question": "What is the typical cost of DFS or BFS on an adjacency-list graph?",
    "answer": "O(V+E) time, O(V) visited/queue/stack memory. Recursive DFS also risks call-stack overflow for very deep graphs.",
    "level": "core",
    "ref": "dsa/trees-graphs.md"
  },
  {
    "id": "c034",
    "topic": "DSA",
    "question": "What is the difference between a bridge and an articulation point?",
    "answer": "Bridge is an edge whose removal increases connected components. Articulation is a vertex. For DFS child u of v, bridge condition is low[u] > tin[v]; non-root articulation uses >=.",
    "level": "advanced",
    "ref": "dsa/trees-graphs.md"
  },
  {
    "id": "c035",
    "topic": "DSA",
    "question": "Which edge cases are essential for binary search?",
    "answer": "Empty input, absent target, target below/above range, duplicate equals, single element, and near-boundary indices.",
    "level": "core",
    "ref": "dsa/search-intervals-heaps.md"
  },
  {
    "id": "c036",
    "topic": "System design",
    "question": "How do you open a system design interview?",
    "answer": "Clarify top user operations, nonfunctional requirements, size assumptions, security/retention and out-of-scope features. Then propose a simple correct baseline.",
    "level": "core",
    "ref": "system-design/framework.md"
  },
  {
    "id": "c037",
    "topic": "System design",
    "question": "How do you estimate QPS from requests/day?",
    "answer": "Divide by 86,400 for average per second, then apply an explicitly assumed peak multiplier. Keep rough sizing honest and easy to check.",
    "level": "core",
    "ref": "system-design/framework.md"
  },
  {
    "id": "c038",
    "topic": "System design",
    "question": "What is the most important cache-aside failure mode?",
    "answer": "Staleness and cache invalidation; also stampedes on hot misses. Choose TTL/invalidation based on consistency requirements and monitor hit ratio plus database load.",
    "level": "core",
    "ref": "system-design/core-concepts.md"
  },
  {
    "id": "c039",
    "topic": "System design",
    "question": "What tradeoff does async queueing introduce?",
    "answer": "It removes expensive work from request latency and absorbs peaks, but adds lag, duplicate delivery, ordering complexity and consumer failures.",
    "level": "core",
    "ref": "system-design/tradeoffs.md"
  },
  {
    "id": "c040",
    "topic": "System design",
    "question": "How does the transactional outbox help?",
    "answer": "Persist a business change and corresponding event intent in one database transaction. A publisher later emits the event; consumers still need idempotency.",
    "level": "core",
    "ref": "system-design/notifications.md"
  },
  {
    "id": "c041",
    "topic": "System design",
    "question": "Why is “exactly once” delivery a dangerous blanket claim?",
    "answer": "Guarantees are scoped to specific components or transactions. External side effects and crash windows can still duplicate actions without idempotent coordination.",
    "level": "core",
    "ref": "system-design/notifications.md"
  },
  {
    "id": "c042",
    "topic": "System design",
    "question": "What is a safe default for retries?",
    "answer": "Only retry appropriate transient errors, with bounded attempts, backoff and jitter, total deadlines, and idempotency for repeated side effects.",
    "level": "core",
    "ref": "system-design/tradeoffs.md"
  },
  {
    "id": "c043",
    "topic": "System design",
    "question": "Fixed window vs token bucket rate limits?",
    "answer": "Fixed window is simple but can allow boundary bursts. Token bucket controls average refill while allowing capacity-bounded bursts.",
    "level": "core",
    "ref": "system-design/rate-limiter.md"
  },
  {
    "id": "c044",
    "topic": "System design",
    "question": "What makes a local rate limiter not globally accurate?",
    "answer": "Each instance has independent token state. Shared exact enforcement needs an atomic centralized operation or accepts deliberate approximation by partition.",
    "level": "core",
    "ref": "system-design/rate-limiter.md"
  },
  {
    "id": "c045",
    "topic": "System design",
    "question": "For URL shortener, what should be indexed?",
    "answer": "A unique short code or key used on redirect. Optionally owner+created_at for listing; design indexes around demonstrated queries, not every column.",
    "level": "core",
    "ref": "system-design/url-shortener.md"
  },
  {
    "id": "c046",
    "topic": "System design",
    "question": "Why might URL redirects prefer HTTP 302?",
    "answer": "A temporary redirect is appropriate when destinations can change or the service wants to avoid long-lived client caching. 301 indicates permanent behavior.",
    "level": "core",
    "ref": "system-design/url-shortener.md"
  },
  {
    "id": "c047",
    "topic": "System design",
    "question": "Fan-out on write vs fan-out on read for feeds?",
    "answer": "Precomputing follower feeds gives fast reads but expensive heavy-author writes. Read-time merge simplifies writes but increases read costs; hybrids address celebrities.",
    "level": "core",
    "ref": "system-design/feed.md"
  },
  {
    "id": "c048",
    "topic": "System design",
    "question": "How do you handle a hot partition key?",
    "answer": "Measure skew; consider key salting or splitting, cache, partition reshaping, or separate handling for extreme keys. Preserve ordering and consistency invariants.",
    "level": "advanced",
    "ref": "system-design/core-concepts.md"
  },
  {
    "id": "c049",
    "topic": "System design",
    "question": "How do you handle a notification worker crash after provider acceptance?",
    "answer": "Delivery could repeat if acknowledgement was lost. Use provider idempotency if supported, persisted attempts and deduplication; document residual uncertainty.",
    "level": "core",
    "ref": "system-design/notifications.md"
  },
  {
    "id": "c050",
    "topic": "System design",
    "question": "When might read replicas be unsafe for a user action?",
    "answer": "If the action requires immediate read-your-writes and replicas can lag. Route critical reads to leader or use version/session strategies.",
    "level": "core",
    "ref": "system-design/tradeoffs.md"
  },
  {
    "id": "c051",
    "topic": "System design",
    "question": "What does CAP actually constrain?",
    "answer": "During network partitions, a system cannot always provide both strong consistency and availability for all affected operations. Real designs still trade latency, cost and consistency in normal operation.",
    "level": "core",
    "ref": "system-design/core-concepts.md"
  },
  {
    "id": "c052",
    "topic": "System design",
    "question": "What metric matters for notification delivery?",
    "answer": "Age of oldest message and user-visible time to delivery, along with provider failure, retries and DLQ. Queue size alone can hide slow work.",
    "level": "core",
    "ref": "system-design/notifications.md"
  },
  {
    "id": "c053",
    "topic": "System design",
    "question": "How do you conclude a design interview well?",
    "answer": "Summarize requirements met, the main bottleneck, the deliberate tradeoff, monitoring/mitigation, and the next scaling step under changed assumptions.",
    "level": "core",
    "ref": "system-design/framework.md"
  },
  {
    "id": "c054",
    "topic": "Backend",
    "question": "What is an idempotency key?",
    "answer": "Stable identity for a retried operation. Persist it with a request fingerprint/result and prevent concurrent duplicate execution using an atomic database constraint or equivalent.",
    "level": "core",
    "ref": "backend/api-idempotency.md"
  },
  {
    "id": "c055",
    "topic": "Backend",
    "question": "PUT vs POST vs PATCH retry semantics?",
    "answer": "PUT is intended idempotent replacement. POST may create new effects unless keyed. PATCH may or may not be idempotent depending on the patch instruction.",
    "level": "core",
    "ref": "backend/api-idempotency.md"
  },
  {
    "id": "c056",
    "topic": "Backend",
    "question": "Why might a LEFT JOIN behave like INNER JOIN?",
    "answer": "A restrictive predicate on the right table in WHERE filters rows where right values are NULL. Move intended match predicates into ON or allow nulls explicitly.",
    "level": "core",
    "ref": "backend/databases-sql.md"
  },
  {
    "id": "c057",
    "topic": "Backend",
    "question": "What is a composite index useful for?",
    "answer": "Combining equality predicates and subsequent range/sort access for particular queries. Measure the execution plan; indexes cost writes and space.",
    "level": "core",
    "ref": "backend/databases-sql.md"
  },
  {
    "id": "c058",
    "topic": "Backend",
    "question": "How can one SQL statement prevent overselling?",
    "answer": "Use atomic guarded UPDATE inventory SET available=available-1 WHERE sku=? AND available>0, then check affected row count. Broader workflows need transactional coordination.",
    "level": "core",
    "ref": "backend/databases-sql.md"
  },
  {
    "id": "c059",
    "topic": "Backend",
    "question": "Difference between WHERE and HAVING?",
    "answer": "WHERE filters input rows before grouping. HAVING filters groups after aggregation.",
    "level": "core",
    "ref": "backend/databases-sql.md"
  },
  {
    "id": "c060",
    "topic": "Backend",
    "question": "When choose SQS versus Kafka?",
    "answer": "SQS for managed work queues and retry visibility; Kafka for durable partitioned event logs with replay and per-partition ordering. Clarify ordering, fan-out and ops needs.",
    "level": "core",
    "ref": "backend/aws-deployment.md"
  },
  {
    "id": "c061",
    "topic": "Backend",
    "question": "What are the three observability signals?",
    "answer": "Metrics show scale and trend, traces locate spans/bottlenecks, and structured logs explain details for specific executions. All need useful correlation IDs.",
    "level": "core",
    "ref": "backend/observability.md"
  },
  {
    "id": "c062",
    "topic": "Backend",
    "question": "What would you inspect when p99 latency rises but CPU stays low?",
    "answer": "Look for downstream wait time: slow SQL, network calls, locks, connection pools, queueing or retry waterfalls. Use traces to isolate the wait.",
    "level": "core",
    "ref": "backend/observability.md"
  },
  {
    "id": "c063",
    "topic": "Backend",
    "question": "Why is increasing timeouts an incomplete fix?",
    "answer": "Longer waits may mask slow dependencies and retain more blocked resources. Identify causes, cap concurrency, define deadline budgets and monitor user success.",
    "level": "core",
    "ref": "backend/observability.md"
  },
  {
    "id": "c064",
    "topic": "Backend",
    "question": "What are readiness and liveness checks?",
    "answer": "Readiness answers whether to route new requests to the instance; liveness answers whether the process should be restarted. An unavailable dependency may affect readiness without meaning the process is stuck.",
    "level": "core",
    "ref": "backend/reliability-testing.md"
  },
  {
    "id": "c065",
    "topic": "Backend",
    "question": "How do you verify backups actually work?",
    "answer": "Perform restore drills, measure recovery time and data loss against RTO/RPO, and verify recovered data consistency. Backup jobs succeeding is not enough.",
    "level": "core",
    "ref": "backend/reliability-testing.md"
  },
  {
    "id": "c066",
    "topic": "Backend",
    "question": "How do you avoid leaking secrets in logs?",
    "answer": "Structured redaction, carefully chosen fields, access controls and retention policies. Do not log API keys, bearer tokens, credentials or customer data unless explicitly authorized.",
    "level": "core",
    "ref": "backend/api-idempotency.md"
  },
  {
    "id": "c067",
    "topic": "Backend",
    "question": "What makes cursor pagination more stable than offset?",
    "answer": "A cursor derived from a deterministic order/key avoids shifts when earlier rows are inserted. Use an opaque stable cursor and an explicit tie-breaker.",
    "level": "core",
    "ref": "backend/api-idempotency.md"
  },
  {
    "id": "c068",
    "topic": "Behavioral",
    "question": "How should you present your role in a team achievement?",
    "answer": "Differentiate the team-wide outcome from your direct design/implementation/coordination. Explain evidence and credit collaborators rather than implying sole ownership.",
    "level": "core",
    "ref": "behavioral/README.md"
  },
  {
    "id": "c069",
    "topic": "Behavioral",
    "question": "What should a 90-second project story cover?",
    "answer": "Context, individual ownership, options/tradeoff, implementation and partners, actual outcome, reflection. Be able to draw architecture for deeper questions.",
    "level": "core",
    "ref": "behavioral/README.md"
  },
  {
    "id": "c070",
    "topic": "Behavioral",
    "question": "How do you answer why a design choice was made?",
    "answer": "Name the requirement, outline a plausible alternative, compare costs and failure modes, state the evidence you used, and explain whether hindsight changed your view.",
    "level": "core",
    "ref": "behavioral/README.md"
  },
  {
    "id": "c071",
    "topic": "Behavioral",
    "question": "How do you talk about production incidents?",
    "answer": "Scope and customer impact, first signal, investigation path, containment, validated root cause, permanent prevention, and transparent communication.",
    "level": "core",
    "ref": "behavioral/README.md"
  },
  {
    "id": "c072",
    "topic": "Behavioral",
    "question": "What makes a learning-from-mistake answer credible?",
    "answer": "Own a real decision, give its effects without blame, show what you changed and how you measure prevention. Avoid a disguised humblebrag.",
    "level": "core",
    "ref": "behavioral/README.md"
  },
  {
    "id": "c073",
    "topic": "Behavioral",
    "question": "What if employer outcomes are confidential?",
    "answer": "Generalize architecture and describe safely shareable impact qualitatively. Do not publish proprietary diagrams, source, internal names or confidential metrics.",
    "level": "core",
    "ref": "behavioral/README.md"
  },
  {
    "id": "c074",
    "topic": "System design",
    "question": "Why doesn't volatile make count++ thread-safe?",
    "answer": "volatile gives visibility and ordering of the read and write separately, but count++ is read-add-write; two threads can read the same value before either writes. Use AtomicInteger.incrementAndGet for one atomic step.",
    "level": "core",
    "ref": "java/concurrency.md"
  },
  {
    "id": "c075",
    "topic": "System design",
    "question": "LongAdder vs AtomicLong?",
    "answer": "AtomicLong gives exact per-operation atomicity but hammers one cache line under contention. LongAdder spreads writes across per-thread cells and sums on read — faster for metrics, at the cost of only eventually consistent reads.",
    "level": "core",
    "ref": "java/concurrency.md"
  },
  {
    "id": "c076",
    "topic": "System design",
    "question": "A task throws inside an ExecutorService — where does the exception go?",
    "answer": "With execute(), to the thread's uncaught-exception handler — easily missed. With submit(), captured in the Future and rethrown from get() wrapped in ExecutionException — but only if you call get(). Handle errors explicitly either way.",
    "level": "core",
    "ref": "java/concurrency.md"
  },
  {
    "id": "c077",
    "topic": "System design",
    "question": "What evidence justifies JVM heap tuning?",
    "answer": "Frequent full GCs or long pauses correlating with p99 latency in GC logs, heap histograms showing explainable old-gen growth, or OOM heap dumps pointing at a retention path. First rule out a leak: reachable-but-shouldn't-be objects like an unevicted static cache.",
    "level": "advanced",
    "ref": "java/jvm-memory.md"
  },
  {
    "id": "c078",
    "topic": "System design",
    "question": "Say consistent hashing aloud.",
    "answer": "Naive hash(key) % N reshuffles nearly every key when N changes. Consistent hashing puts nodes and keys on one ring, so membership changes remap only ~1/N of keys. Virtual nodes smooth distribution. Use when membership changes often: caches, sharded queues.",
    "level": "core",
    "ref": "system-design/core-concepts.md"
  },
  {
    "id": "c079",
    "topic": "System design",
    "question": "Say quorums aloud.",
    "answer": "With N replicas, write to W and read from R: R + W > N gives strong consistency because every read overlaps a node with the latest write. N=3, W=2, R=2 is classic. Tune per operation: durable writes get W=3, stale-tolerant reads get R=1.",
    "level": "core",
    "ref": "system-design/core-concepts.md"
  },
  {
    "id": "c080",
    "topic": "System design",
    "question": "News feed: fan-out on write vs on read?",
    "answer": "Push (fan-out on write) makes reads a single list lookup but a celebrity post triggers millions of writes. Pull (fan-out on read) keeps writes cheap but reads do N-way merges. Hybrid: push for normal users, pull for celebrities — design for the skewed distribution.",
    "level": "core",
    "ref": "system-design/news-feed.md"
  },
  {
    "id": "c081",
    "topic": "System design",
    "question": "How do you order chat messages without client clocks?",
    "answer": "Assign a per-conversation sequence number at write time; clients render by seq_no, not arrival order. Sends carry a client-generated idempotency key so retries are safe; offline devices catch up with since=seq_no.",
    "level": "core",
    "ref": "system-design/chat.md"
  },
  {
    "id": "c082",
    "topic": "System design",
    "question": "Cache stampede: what is it and two fixes?",
    "answer": "A hot key expires and many requests miss at once, hammering the DB. Fixes: request coalescing (single-flight) so one request repopulates, probabilistic early refresh, or stale-while-revalidate. Also cache negative results briefly.",
    "level": "core",
    "ref": "learnings/caching-strategies.md"
  },
  {
    "id": "c083",
    "topic": "System design",
    "question": "Exactly-once delivery end to end: true or trap?",
    "answer": "Trap. Exactly-once exists only within narrow boundaries (e.g., Kafka transactions between Kafka topics). End to end with external side effects, design for at-least-once with idempotent consumers — dedup keys and unique constraints make duplicates harmless.",
    "level": "core",
    "ref": "learnings/messaging-patterns.md"
  },
  {
    "id": "c084",
    "topic": "System design",
    "question": "How do you make POST /payments safe to retry?",
    "answer": "Client sends Idempotency-Key: <uuid>; server stores (key -> result) with a unique constraint and a retention window. A repeated key returns the stored result instead of re-executing. First request wins; keys can't live forever, so name the window.",
    "level": "core",
    "ref": "learnings/api-design.md"
  },
  {
    "id": "c085",
    "topic": "System design",
    "question": "Why is a token-bucket check-and-consume one atomic step?",
    "answer": "Refill, compare, and subtract must happen under the same lock (or one atomic update). Split across two critical sections, two threads can both see the last token and oversubscribe. The LLD example keeps it in one synchronized allow().",
    "level": "core",
    "ref": "lld/token-bucket-rate-limiter.md"
  }
];
