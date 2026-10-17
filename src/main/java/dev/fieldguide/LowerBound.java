package dev.fieldguide;

/** The first index i with sorted[i] >= target, or sorted.length. */
public final class LowerBound {
    private LowerBound() {}

    public static int find(int[] sorted, int target) {
        int lo = 0;
        int hi = sorted.length;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (sorted[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
