package dev.fieldguide;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

/** Highest frequency first; smaller integer wins ties for deterministic output. */
public final class TopKFrequent {
    private TopKFrequent() {}

    public static List<Integer> find(int[] nums, int k) {
        if (k < 0) throw new IllegalArgumentException("k must not be negative");
        if (k == 0) return Collections.emptyList();
        Map<Integer, Integer> freq = new HashMap<>();
        for (int n : nums) freq.merge(n, 1, Integer::sum);

        // Heap head is the worst retained candidate: low frequency, then higher key.
        Comparator<Integer> worstFirst = Comparator
                .<Integer>comparingInt(freq::get)
                .thenComparing(Comparator.reverseOrder());
        PriorityQueue<Integer> heap = new PriorityQueue<>(worstFirst);
        for (int n : freq.keySet()) {
            heap.offer(n);
            if (heap.size() > k) heap.poll();
        }
        List<Integer> answer = new ArrayList<>(heap);
        answer.sort((a, b) -> {
            int countOrder = Integer.compare(freq.get(b), freq.get(a));
            return countOrder != 0 ? countOrder : Integer.compare(a, b);
        });
        return answer;
    }
}
