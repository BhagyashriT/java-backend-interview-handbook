package dev.fieldguide;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/** Closed intervals; touching endpoints count as overlap. Does not modify input. */
public final class MergeIntervals {
    private MergeIntervals() {}

    public static int[][] merge(int[][] intervals) {
        if (intervals.length == 0) return new int[0][2];
        int[][] sorted = new int[intervals.length][2];
        for (int i = 0; i < intervals.length; i++) {
            if (intervals[i].length != 2 || intervals[i][0] > intervals[i][1]) {
                throw new IllegalArgumentException("Expected [start,end] with start <= end");
            }
            sorted[i] = intervals[i].clone();
        }
        Arrays.sort(sorted, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> out = new ArrayList<>();
        int[] active = sorted[0];
        for (int i = 1; i < sorted.length; i++) {
            int[] next = sorted[i];
            if (next[0] <= active[1]) {
                active[1] = Math.max(active[1], next[1]);
            } else {
                out.add(active);
                active = next;
            }
        }
        out.add(active);
        return out.toArray(new int[out.size()][]);
    }
}
