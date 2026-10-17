# DSA pattern detector

| Clue | Candidate pattern | Ask yourself |
|---|---|---|
| Fast membership / duplicates / frequency | Hash map / hash set | Can I trade memory for lookup speed? |
| Contiguous segment, positive/nonnegative input | Sliding window | Can both pointers move monotonically? |
| Contiguous subarray, negatives allowed | Prefix sum + hash map | Would shrinking a window break monotonicity? |
| Sorted input or monotonic feasibility | Binary search | What is the invariant separating false and true? |
| Top K or streaming extrema | Heap | Can I maintain only K elements? |
| Next greater/smaller | Monotonic stack | When does the current value invalidate earlier candidates? |
| Unweighted shortest path | BFS | Does each edge have equal cost? |
| Reachability / components | DFS or BFS | How do I avoid revisiting? |
| Dependencies / prerequisites | Topological sort | How do I detect a cycle? |
| Repeated optimal subproblems | DP / memoization | What state uniquely defines the remaining work? |
| Sorted intervals | Sort + sweep | Can I merge/track overlaps in one pass? |

## Interview explanation formula

1. State **input constraints** (duplicates? sorted? negative? size? mutation allowed?).
2. Explain simple exhaustive option and its time/space.
3. Point out the repeated scanning or recomputation.
4. Name the maintained invariant and how each step preserves it.
5. Give Big O, then discuss worst cases / tricky input.

**Counterexample:** A classic variable-size sliding window for subarray sum assumes nonnegative numbers. With negatives, the sum can decrease when expanding, so prefix sums are safer.
