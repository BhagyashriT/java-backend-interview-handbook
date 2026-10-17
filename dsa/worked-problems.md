# Worked-problem index and speaking template

| Problem variant | Brute force | Optimization | Java implementation |
|---|---|---|---|
| Longest unique substring | start at every position O(n²) | last-seen indices O(n) | [Source](../src/main/java/dev/fieldguide/LongestUniqueSubstring.java) |
| Prefix-sum subarray count | all intervals O(n²) | running prefix frequencies expected O(n) | [Source](../src/main/java/dev/fieldguide/SubarraySumK.java) |
| Lower bound sorted array | scan O(n) | invariant binary search O(log n) | [Source](../src/main/java/dev/fieldguide/LowerBound.java) |
| Merge intervals | repeated pairwise merging | sort + sweep O(n log n) | [Source](../src/main/java/dev/fieldguide/MergeIntervals.java) |
| Top K frequent numbers | sort all unique O(u log u) | size-K heap O(u log k) | [Source](../src/main/java/dev/fieldguide/TopKFrequent.java) |
| Number of islands | redundant component scans | visited BFS O(RC) | [Source](../src/main/java/dev/fieldguide/NumberOfIslands.java) |
| Course scheduling | explore orderings | indegree BFS O(V+E) | [Source](../src/main/java/dev/fieldguide/CourseSchedule.java) |
| LRU cache | array/list scan on each access | hash+linked access order expected O(1) | [Source](../src/main/java/dev/fieldguide/LruCache.java) |

### Conversation-friendly explanation format

> “One direct way is to ___. This costs O(__) time and O(__) space. The expensive work is ___. I can avoid it by maintaining ___. The invariant is ___, and after each iteration ___. Here's a dry run on ___. I'd test empty input, duplicates, and ___.”

**Checklist:** ask about null/empty inputs, duplicate keys, ordering requirements, integer overflow, input mutation, stable tie-breaking, graph directedness, and Java Unicode character semantics.
