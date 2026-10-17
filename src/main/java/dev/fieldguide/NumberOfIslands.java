package dev.fieldguide;

import java.util.ArrayDeque;
import java.util.Queue;

/** Four-direction islands; non-mutating BFS on rectangular grid of '0'/'1'. */
public final class NumberOfIslands {
    private NumberOfIslands() {}

    public static int count(char[][] grid) {
        if (grid.length == 0) return 0;
        int cols = grid[0].length;
        for (char[] row : grid) {
            if (row.length != cols) throw new IllegalArgumentException("Expected rectangular grid");
        }
        boolean[][] seen = new boolean[grid.length][cols];
        int islands = 0;
        int[] dr = {1, -1, 0, 0};
        int[] dc = {0, 0, 1, -1};
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] != '1' || seen[r][c]) continue;
                islands++;
                Queue<int[]> queue = new ArrayDeque<>();
                seen[r][c] = true;
                queue.offer(new int[]{r,c});
                while (!queue.isEmpty()) {
                    int[] cur = queue.poll();
                    for (int d = 0; d < 4; d++) {
                        int nr = cur[0] + dr[d];
                        int nc = cur[1] + dc[d];
                        if (nr >= 0 && nr < grid.length && nc >= 0 && nc < cols
                                && grid[nr][nc] == '1' && !seen[nr][nc]) {
                            seen[nr][nc] = true;
                            queue.offer(new int[]{nr,nc});
                        }
                    }
                }
            }
        }
        return islands;
    }
}
