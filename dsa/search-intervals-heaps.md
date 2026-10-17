# Binary search, intervals, and heaps

## Lower-bound binary search

Given sorted ascending array, find index of first element >= target, or n.

**Brute force:** Scan left-to-right, O(n) time and O(1) space.

**Optimization:** The predicate `arr[i] >= target` is monotonic, so bisect the half-open search range `[left,right)`. On each step keep answer inside that range. O(log n) time, O(1) space. [Java source](../src/main/java/dev/fieldguide/LowerBound.java).

**Dry run:** `[1,3,3,8]`, target 3 → result 1, even though another 3 exists at index 2.

## Merge intervals

**Brute force:** Repeatedly search for overlapping pairs and merge until stable; naive pairwise passes can be quadratic or worse depending on representation.

**Optimization:** Sort by start, then fold into previous interval if overlapping. O(n log n) time and O(n) output (sorting may use additional memory). Decide whether endpoints touching count as overlap. [Java source](../src/main/java/dev/fieldguide/MergeIntervals.java).

## Top K frequent

**Brute force:** Frequency map, sort all distinct keys by frequency: O(n + u log u), u distinct elements.

**Optimization:** Maintain a size-K min-heap of the best candidates: O(n + u log k) time, O(u + k) space. Decide tie-breaking explicitly for deterministic results. [Java source](../src/main/java/dev/fieldguide/TopKFrequent.java).

**Follow-ups:** What if input is a stream? What if k > distinct count? What if frequencies are updated online? How would approximate heavy hitters work?
