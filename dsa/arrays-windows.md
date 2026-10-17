# Arrays, hashing, and sliding window

## Longest substring without repeating characters

**Brute force, naturally:** “I could start at every character, extend until a duplicate appears, and remember the longest length.” O(n²) time on a typical early-break scan; O(min(n, alphabet)) auxiliary set.

**What repeats?** Multiple starts rescan overlapping spans.

**Optimization:** Keep a window with unique characters; when the next character was last seen inside the window, move the left edge past that occurrence. Each index enters once, so O(n) time; O(distinct characters) map space. [Java implementation](../src/main/java/dev/fieldguide/LongestUniqueSubstring.java).

**Dry run:** `abba`: a→1, ab→2, next b moves left to 2; next a creates `ba` of length 2. Final answer 2.

**Pitfalls:** Unicode supplementary characters occupy two Java `char` code units. This implementation measures UTF-16 code units; for user-visible Unicode code points, iterate code points instead.

## Subarray sum equals K (may include negatives)

**Brute force:** Try each starting index and accumulate every ending index, O(n²) time, O(1) extra.

**Optimization:** Count previous prefix sums using a map. For current prefix `s`, any earlier prefix `s-k` yields a valid ending-here subarray. O(n) expected time and O(n) space.

**Dry run:** `[1,2,1]`, k=3: prefix 1→0 matches, 3→1 match, 4→1 match, answer 2.

**Pitfalls:** Initialize frequency of prefix 0 to 1. Use `long` prefix sum if input may overflow int.

## Two sum

**Brute force:** compare all pairs O(n²); optimized map of seen values O(n) expected time, O(n) space. Insert *after* checking complement if same index can't be used twice. Handle overflow/duplicate constraints explicitly.
