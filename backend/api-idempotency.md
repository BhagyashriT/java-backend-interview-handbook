# API contracts and idempotency

## Good API contract checklist

Specify HTTP method, path, request schema, response schema, authentication, authorization, validation, status codes, pagination, rate limit and retry semantics. Version externally breaking changes intentionally.

- `GET`: safe retrieval; should not deliberately trigger externally visible mutation.
- `POST`: create/action; potentially non-idempotent unless keyed.
- `PUT`: replace target state; intended idempotent.
- `PATCH`: partial updates; idempotency depends on operation semantics.
- Use `201 Created` when a resource is created; `202 Accepted` when async processing accepted but not finished; `409 Conflict` when state prevents requested operation; `429 Too Many Requests` for limits.

## Idempotency key pattern

For retries of a payment-like command: client sends stable `Idempotency-Key`. Server persists key + request fingerprint + eventual response within a transaction or otherwise protects against duplicate concurrent submissions.

| Scenario | Expected response |
|---|---|
| Same key, same request after success | Return prior result (per API contract) |
| Same key, different payload | Reject conflict; don't execute different command |
| Same key, concurrent requests | Ensure only one commit/winner, respond predictably |
| Key expired | State lifecycle/retention explicitly |

**Trap:** Checking a map then writing is not race-safe under concurrent processes. Use a unique DB constraint/transaction or atomic primitive.

## Pagination

Offset pagination is simple but shifts under concurrent inserts; cursor pagination using `(created_at,id)` gives more stable continuation for sorted records. Return an opaque cursor instead of exposing raw internal fields when appropriate.

## Security

Rate limit and authorize *server side*. Validate URL inputs against SSRF if fetching them; do not log API tokens, auth cookies or user PII. Use TLS and least-privilege access.
