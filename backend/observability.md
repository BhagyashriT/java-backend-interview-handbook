# Debug production: metrics → traces → logs → cause → verify

## My investigation framework

**Initial answer:** “I'd first establish what is broken from metrics and scope it by region, deployment, customer segment and request path. Then I'd use distributed traces to isolate the slow or failing span, logs to understand errors, and targeted experiments to validate the root cause.”

## Signals

| Signal | Answers | Useful examples |
|---|---|---|
| Metrics | How widespread? Since when? | p50/p95/p99 latency, error %, throughput, saturation, retries |
| Traces | Where is time spent? | DB call 850ms, queue wait 2s, retry waterfall |
| Logs | What happened at a specific point? | Correlation ID, exception, structured context (no secrets) |
| Profiles | What resources were consumed? | CPU flame graph, allocations, lock contention |

## Hypothetical incident dry run

Symptom: p99 jumps from ~200ms to ~2s after a release. Error rate unchanged. Trace shows 1.6s in SQL. Explain: query plan/index changed or N+1 queries. Validate via plan, query count, data volume, and rollback comparison. Then remediate with query/index changes, repeat realistic load test, and watch p99 + DB saturation.

These numbers are illustrative, **not a claim about a real employer system**.

## Fault tree

- Latency ↑ and CPU ↑ → expensive compute, spin, high GC, hot path.
- Latency ↑ and CPU low → wait on database/network/locks/queue.
- Errors ↑ only in one region → dependency/network/configuration scope.
- Queue age ↑ → consumer slower than producer, blocked worker, poisoned messages.

## Remediation quality

State cause vs correlation, immediate containment, permanent fix, regression test, detector/SLO, and remaining risk. Avoid simply increasing timeout without understanding resource amplification.
