# Learning summary: caching strategies

## The mental model

A cache trades **staleness and complexity for latency**. Every strategy answers two questions: who writes the cache, and who invalidates it.

## The four patterns

- **Cache-aside (lazy):** app reads cache → miss → reads DB → populates cache. Writes go to the DB; the app invalidates or updates the cache. Simplest, most common; first read after invalidation is slow.
- **Read/write-through:** the cache sits in front of the DB and every read/write goes through it. Consistent by construction, but every write pays cache latency and a cold cache is useless.
- **Write-behind (write-back):** writes go to cache, flushed to DB asynchronously. Very fast writes; data loss window if the cache dies before flush. Only for data you can afford to lose or recompute.
- **Refresh-ahead:** the cache proactively refreshes hot keys before TTL expiry. Great for predictable hot data; wasted work for everything else.

## What actually breaks in interviews

- **Thundering herd / stampede:** a hot key expires and 1,000 requests all miss at once and hammer the DB. Fixes: request coalescing (single-flight), probabilistic early refresh, or a short stale-while-revalidate window.
- **TTL discipline:** no TTL means stale forever; too-short TTL means the cache never helps. Tie TTL to how stale the data is allowed to be — prices and inventory need short TTLs, user avatars can live for days.
- **Negative caching:** cache the *miss* briefly, or attackers and bugs will turn "not found" into a DB DoS.
- **Cache penetration vs breakdown vs avalanche:** know the three failure shapes and one mitigation each.

## My takeaway

“Default to cache-aside with explicit TTLs and negative caching. Add single-flight for hot keys. Reach for write-through only when the consistency requirement is stated, and say the tradeoff out loud: I'm buying latency with staleness.”
