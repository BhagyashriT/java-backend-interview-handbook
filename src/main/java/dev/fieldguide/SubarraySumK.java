package dev.fieldguide;

import java.util.HashMap;
import java.util.Map;

/** Count subarrays whose sum equals k, including negative values. */
public final class SubarraySumK {
    private SubarraySumK() {}

    public static long count(int[] nums, long k) {
        Map<Long, Long> counts = new HashMap<>();
        counts.put(0L, 1L); // Empty prefix
        long prefix = 0;
        long result = 0;
        for (int n : nums) {
            prefix += n;
            result += counts.getOrDefault(prefix - k, 0L);
            counts.merge(prefix, 1L, Long::sum);
        }
        return result;
    }
}
