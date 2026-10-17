# Reliability, testing and failure-mode checklist

## Test pyramid with purpose

- **Unit tests:** algorithm invariants, bad boundaries, deterministic behavior.
- **Integration tests:** DB transaction semantics, serialization, queue behavior, version mismatch.
- **Contract tests:** API request/response compatibility between teams.
- **Load tests:** p95/p99 latency versus concurrency and realistic traffic mix; document environment.
- **Fault injection:** dependency timeout, duplicate event, disk full, worker crash, stale cache.

## Non-negotiable distributed system checks

- Set timeouts for network calls; define a total request budget and cancellation strategy.
- Retries only for appropriate classes of failure; exponential backoff + jitter + bounded attempts.
- Use idempotency keys for repeatable side-effect requests when needed.
- Keep queue depth and queue age bounded; decide rejection/degradation behavior.
- Monitor success rate and latency of the **user journey**, not only infrastructure metrics.
- Design schema migrations for deploy-order compatibility (expand/contract as needed).
- Verify rollback and recovery; backup existence alone does not prove recoverability.

## Interview follow-up example

“What happens if the consumer processes an event but crashes before acknowledging?”

**Answer:** With at-least-once delivery it may receive the event again. Use stable event identity and idempotent side effects or durable deduplication; define the residual risk if an external provider cannot dedupe.
