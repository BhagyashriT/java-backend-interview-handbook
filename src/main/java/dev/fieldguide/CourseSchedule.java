package dev.fieldguide;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;

/** Kahn's algorithm; each pair is [course, prerequisite]. */
public final class CourseSchedule {
    private CourseSchedule() {}

    public static boolean canFinish(int courses, int[][] prerequisites) {
        if (courses < 0) throw new IllegalArgumentException("courses must not be negative");
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < courses; i++) graph.add(new ArrayList<>());
        int[] indegree = new int[courses];
        for (int[] pair : prerequisites) {
            if (pair.length != 2 || pair[0] < 0 || pair[0] >= courses
                    || pair[1] < 0 || pair[1] >= courses) {
                throw new IllegalArgumentException("Invalid dependency");
            }
            graph.get(pair[1]).add(pair[0]);
            indegree[pair[0]]++;
        }
        Queue<Integer> ready = new ArrayDeque<>();
        for (int i = 0; i < courses; i++) if (indegree[i] == 0) ready.offer(i);
        int processed = 0;
        while (!ready.isEmpty()) {
            int node = ready.poll();
            processed++;
            for (int next : graph.get(node)) {
                if (--indegree[next] == 0) ready.offer(next);
            }
        }
        return processed == courses;
    }
}
