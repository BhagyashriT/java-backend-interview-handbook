# Executable Java 11 examples

Every `.java` file in `src/main/java/dev/fieldguide` is independently readable. Tests are deterministic and dependency-free; run from repository root:

```bash
bash scripts/test.sh
```

| Class | Covers |
|---|---|
| `LongestUniqueSubstring` | Sliding window |
| `SubarraySumK` | Prefix sum frequencies |
| `LowerBound` | Binary search invariant |
| `MergeIntervals` | Sort and sweep |
| `TopKFrequent` | Hash frequency + bounded heap |
| `NumberOfIslands` | BFS traversal |
| `CourseSchedule` | Topological sort |
| `LruCache` | Access-order linked hash map |
| `TokenBucket` | Thread-safe *local* rate limiter; not distributed |

Tests use a small `RunAllTests` main instead of downloading a JUnit dependency. `javac --release 11` enforces Java 11 compatibility even if the installed JDK is newer.
