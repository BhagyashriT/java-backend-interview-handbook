# Case study: design a news feed (timeline)

## 1. Requirements

Each user sees a personalized feed of posts from people/pages they follow, newest first. Clarify: read/write ratio, whether celebrities (millions of followers) exist, ranking vs pure chronological, pagination, and tolerance for slightly stale feeds.

## 2. Assumptions (example only)

Suppose 10M daily active users, average 200 follows each, 2 posts/user/day ⇒ 20M posts/day ≈ 230 average write QPS (peak ~1,150). Feed reads dominate: 10 reads/user/day ⇒ 100M reads/day ≈ 1,150 average read QPS (peak ~5,800). Average post 1 KB ⇒ ~20 GB/day of post content; feed entries are (user_id, post_id) pointers, not copies.

## 3. The central decision: fan-out on write vs fan-out on read

**Fan-out on write (push):** when a user posts, write the post ID into every follower's feed list. Reads are then a single fast list lookup — great for read-heavy workloads. Cost: a celebrity with 5M followers triggers 5M writes per post, and followers' feeds go stale if a write fails partway.

**Fan-out on read (pull):** store posts per author; at read time, merge the recent posts of everyone the user follows. Writes are cheap, but reads do N-way merges — slow for users with many follows.

**Hybrid (what I'd propose):** push for normal users, pull for celebrities. A celebrity's posts are fetched at read time and merged in; everyone else's posts are pre-materialized into follower feeds. This bounds the worst-case write amplification while keeping common reads fast.

## 4. Data model and flow

```text
posts(post_id, author_id, body, created_at)
feed_entries(user_id, post_id, created_at)  -- pre-materialized timeline per user
follows(follower_id, followee_id)
```

Post flow: persist post → enqueue fan-out job → workers write `feed_entries` for followers (batched, idempotent on `(user_id, post_id)`). Read flow: `GET /v1/feed?before=...&limit=20` reads the user's `feed_entries`, joins post content from cache, merges celebrity posts pulled live.

## 5. Reliability

- **Partial fan-out:** worker crashes mid-fan-out must be resumable and idempotent; a unique constraint on `(user_id, post_id)` makes retries safe.
- **Celebrity post:** never push to millions of feeds synchronously — queue it, and serve celebrity content via pull.
- **Cache:** feed lists and hot posts cached with TTL; a cache miss falls back to the DB, never to an error.
- **Ranking:** if the feed is ranked rather than chronological, score at read time from precomputed features; don't re-rank the whole history per request.

## 6. Follow-ups

- User with 10k follows? Pull model degrades — cap the merge set, precompute more aggressively, or paginate follows.
- Deleting a post? Tombstone the post; lazily clean feed entries or filter at read time.
- Real-time updates? Push new entries over the existing WebSocket/polling channel; the feed list is append-friendly.
- Consistency? A follower seeing a post a few seconds late is acceptable — eventual consistency is the right call here; say so explicitly.

**Tradeoff to say:** Push optimizes reads at the cost of write amplification; pull optimizes writes at the cost of read latency. The hybrid exists because real graphs have celebrities — design for the skewed distribution, not the average.
