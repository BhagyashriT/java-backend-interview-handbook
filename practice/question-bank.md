# Question bank — active recall, not passive rereading

Say a 30-second answer to each question, then follow up with tradeoffs or a code sketch. The interactive viewer includes answer cards for selected prompts.

## Java and concurrency

1. Why is `hashCode` part of `HashMap` correctness?
2. Difference between `HashMap`, `LinkedHashMap`, and `ConcurrentHashMap`?
3. Why doesn't `volatile int x` make `x++` thread-safe?
4. When would you use `AtomicInteger`, `LongAdder`, or a lock?
5. Why can a fixed thread pool still run out of memory?
6. Difference between `map`, `flatMap`, and `reduce`?
7. How do `orElse` and `orElseGet` differ?
8. How do you explain Java pass-by-value with a mutable object?
9. Why might `LinkedList` underperform `ArrayList` despite O(1) insertion near a node?
10. What evidence would justify JVM heap tuning?

## DSA

11. Find longest substring without duplicate characters. Start with brute force.
12. Find count of subarrays equal to K with negative values.
13. Find top K frequent keys with stable tie-breaking.
14. Merge intervals; define endpoint overlap behavior.
15. Find leftmost position >= target in sorted array.
16. Detect cycle in directed prerequisites.
17. Explain BFS versus DFS and what each guarantees.
18. Find articulation points in an undirected graph.
19. Build O(1)-average LRU cache using Java 11.
20. Compare greedy and DP for coin change.

## Backend, SQL and AWS

21. How do you enforce idempotent create/pay requests?
22. Explain POST/PUT/PATCH retry semantics.
23. Why would `LEFT JOIN` unexpectedly drop unmatched rows?
24. How does a composite B-tree index support an ORDER BY?
25. How do you prevent stock overselling under concurrent requests?
26. Where would you use SQS vs Kafka?
27. What is the transactional outbox solving?
28. How do you size and protect a thread pool?
29. What is the difference between readiness and liveness?
30. Why might a new cache make an outage worse?

## System design

31. Design a URL shortener. What is the bottleneck?
32. Design a distributed rate limiter: accurate across multiple regions?
33. Design notification delivery with retries and deduplication.
34. Design a social feed: fan-out on read or write?
35. Design job alerts while preventing duplicate notifications.
36. How do you handle hot keys and skewed partitions?
37. Design cursor pagination for a changing dataset.
38. What does eventual consistency mean to an end user?
39. How do you make schema changes during zero-downtime deploys?
40. What metric would prove your redesign improved experience?

## Behavioral and debugging

41. Tell me about a difficult on-call issue and how you found the cause.
42. Explain a design tradeoff you made against your initial instinct.
43. Describe a cross-team project and your personal contributions.
44. Give an example of a production failure you helped prevent.
45. What did you learn from a project that delivered the feature but missed a metric?
46. How would you debug a 10× latency increase without rising errors?
47. How do you communicate incomplete evidence during a severe incident?
48. When would you push back on a requirement?
49. How do you choose the right depth for a design interview?
50. What would you improve if rebuilding your last system from scratch?

### Scoring yourself

- **0** no structure; **1** recognition only; **2** initial correct answer; **3** follow-up and tradeoff; **4** can implement or whiteboard and defend failure cases.
- Revisit scores 0–2 first, retest without notes. Don't mark a topic mastered solely because you've read the answer.
