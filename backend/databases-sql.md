# Databases, SQL and indexing: interview checklist

## Transactions

ACID: atomicity (all-or-nothing), consistency (preserve declared invariants), isolation (concurrent effects governed by level), durability (committed data survives promised failures). These are not blanket guarantees of distributed exactly-once processing.

## Index mental model

A B-tree index can accelerate selective lookups, range filtering, joins, or order-by when aligned with query predicates. Indexes cost storage and write amplification. Confirm with `EXPLAIN (ANALYZE, BUFFERS)` in a safe test environment, rather than asserting indexes always improve performance.

```sql
-- Example: recent orders for one user, newest first
CREATE INDEX idx_orders_user_created
    ON orders (user_id, created_at DESC);
SELECT id, total, created_at FROM orders
 WHERE user_id = 42 ORDER BY created_at DESC LIMIT 20;
```

**Why composite order matters:** Equality predicate on `user_id` plus range/sort on `created_at` can benefit from this index. Actual plan depends on stats/selectivity/data size.

## SQL correctness traps

- `WHERE` filters rows before grouping; `HAVING` filters groups after aggregation.
- `INNER JOIN` removes nonmatches; `LEFT JOIN` preserves left rows, with NULLs on unmatched right.
- A `LEFT JOIN` plus a restrictive right-table predicate in `WHERE` can behave like an inner join.
- `COUNT(*)` counts rows; `COUNT(col)` excludes NULL values.
- `GROUP BY` and pagination must have deterministic semantics when ties exist.

## Concurrency scenario: prevent overselling

Use a single guarded DB update inside a transaction:

```sql
UPDATE inventory
SET available = available - 1
WHERE sku = :sku AND available > 0;
```

Check affected row count; a single atomic statement prevents below-zero for this single-row constraint, assuming appropriate transaction/storage semantics. Cross-table order/payment workflows need broader coordination and compensations.

## Questions to practice

1. When is an index not used despite being present?
2. Difference between row locks, optimistic version checking, and serializable isolation?
3. What does a covering index change?
4. How do you debug slow `JOIN`/`GROUP BY`?
5. Why do replicas cause read-after-write surprises?
