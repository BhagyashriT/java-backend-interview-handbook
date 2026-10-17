package dev.fieldguide;

import java.util.HashMap;
import java.util.Map;

/** Sliding window over Java UTF-16 char units; see README for Unicode caveat. */
public final class LongestUniqueSubstring {
    private LongestUniqueSubstring() {}

    public static int length(String s) {
        Map<Character, Integer> lastIndex = new HashMap<>();
        int left = 0;
        int best = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            Integer old = lastIndex.put(c, right);
            if (old != null && old >= left) {
                left = old + 1;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
