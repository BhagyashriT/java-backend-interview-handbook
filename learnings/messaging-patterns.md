# Learning summary: messaging patterns

## The mental model

Messaging decouples **when** work happens from **when** it was requested. The price is delivery semantics: the network can duplicate, delay, reorder, or lose your message, and your design has to pick which of those it tolerates.

## The three shapes

- **Queue (point-to-point):** one message → one consumer. Good for distributing work (SQS, RabbitMQ). Ordering is per-queue and often best-effort at scale.
- **Pub/sub (topic):** one message → many subscribers. Good for events and notifications. Subscribers are independent; a slow one doesn't block others.
- **Log (partitioned stream):** one ordered, replayable log per partition (Kafka). Good for event sourcing, stream processing, and anything that needs replay. Ordering is guaranteed *within* a partition only — hence partition by entity key.

## Delivery semantics, honestly

- **At-most-once:** may lose messages. Rarely acceptable.
- **At-least-once:** may deliver duplicates — the common reality. Design consumers to be **idempotent** (dedup keys, unique constraints) and duplicates become harmless.
- **Exactly-once:** only within narrow boundaries (Kafka transactions between Kafka topics). End-to-end exactly-once with external side effects doesn't exist — say this confidently; it's a favorite trap.

## What actually breaks

- **Poison messages:** one bad message redelivered forever, blocking the queue. Dead-letter queues + retry budgets + alerts.
- **Dual writes:** writing to the DB *and* publishing an event without atomicity → the event can be lost or duplicated. The [transactional outbox](../backend/api-idempotency.md) pattern fixes it: write the event to an outbox table in the same transaction, relay it asynchronously.
- **Unbounded retries:** a retry storm can kill the service you're retrying. Bound attempts, exponential backoff with jitter, circuit breakers.
- **Ordering assumptions:** global ordering across partitions doesn't exist; design for per-key ordering or idempotent out-of-order handling.

## My takeaway

“Default to at-least-once with idempotent consumers — it's the only honest end-to-end semantic. Use the outbox when the DB and the event must agree, and give every retry a budget and a dead-letter destination.”
