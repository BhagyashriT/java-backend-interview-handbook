# Trees and graphs

## BFS vs DFS

BFS expands by level and gives shortest paths in **unweighted** graphs; uses a queue. DFS explores deeply and uses a stack or recursion. Both cost O(V+E) time, O(V) visited memory for adjacency-list traversal. Recursive DFS may overflow Java stack on deep graphs.

## Number of islands

**Brute force:** For each land cell, repeatedly traverse to discover which others are connected without memoizing; excessive redundant scans.

**Optimization:** Mark visited land cells during BFS/DFS once. For an R×C grid, O(RC) time and up to O(RC) queue/visited space. [Java source](../src/main/java/dev/fieldguide/NumberOfIslands.java).

**Dry run:** `110 / 010 / 001` has two connected components with 4-direction neighbors.

## Course scheduling / dependencies

**Brute force:** Try orders of tasks, potentially factorial candidates.

**Optimization:** Kahn's algorithm: compute indegrees, enqueue zero-indegree tasks, pop and decrement neighbor indegrees; if processed count < n, a directed cycle exists. O(V+E). [Java source](../src/main/java/dev/fieldguide/CourseSchedule.java).

**Follow-ups:** How to produce a valid order? How to expose cycle nodes? What if prerequisites update incrementally?

## Articulation points (advanced)

In an **undirected** graph, a vertex is an articulation point if removing it increases the connected component count. Tarjan DFS tracks discovery timestamps `tin[v]` and low-link `low[v]` (earliest reachable discovery time via tree edges plus a back edge).

For DFS root, at least two child subtrees ⇒ articulation. For non-root `v`, a child `u` with `low[u] >= tin[v]` ⇒ removing `v` disconnects that subtree. Overall O(V+E). Do not confuse articulation (vertices) with bridge edges (`low[u] > tin[v]`).

Interview caution: parent handling needs care for multigraphs with parallel edges; edge IDs are safer than “skip every edge to parent”.
