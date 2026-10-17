# Learning summary: API design

## The mental model

An API is a **contract with strangers**. Design for the reader: predictable, boring, and hard to misuse. Clever APIs create support tickets.

## Conventions that survive review

- **Resources, not actions:** `POST /v1/orders`, `GET /v1/orders/{id}`. Verbs in URLs (`/getOrder`, `/createUser`) are a smell.
- **Correct methods:** `GET` for reads (safe, cacheable), `POST` for creates, `PUT` for full replacement, `PATCH` for partial updates, `DELETE` for removal. Retries are safe on `GET`/`PUT`/`DELETE` by definition; `POST` retries need idempotency keys.
- **Versioning:** `/v1/` in the path is the pragmatic default. Never break a shipped version — add fields, don't rename them; deprecate with a sunset date.
- **Errors:** stable machine-readable codes (`"code": "insufficient_inventory"`) plus human messages; HTTP status for the category (4xx caller fault, 5xx server fault, 429 slow down). Don't leak stack traces.
- **Pagination:** cursor-based (`?after=...&limit=50`) for anything that grows — offset pagination skips/duplicates rows when data changes under you. Return the next cursor and total only when cheap.

## Idempotency — the interview favorite

`POST /v1/payments` retried by the client must not charge twice. Pattern: client sends `Idempotency-Key: <uuid>`; server stores `(key → result)` with a unique constraint and a retention window; a repeated key returns the stored result instead of re-executing. The first request "wins". Name the retention window — keys can't live forever.

## What interviewers probe

- **Why did the payment double-charge?** Missing idempotency key, or the key wasn't actually unique per operation (reused across different payments).
- **PUT vs PATCH for updates:** PUT replaces the whole resource (missing fields → cleared); PATCH updates what's sent. Know which one your API promises.
- **How do you evolve an API without breaking mobile clients?** Additive changes only, versioned paths, and a deprecation policy — old app versions live in the wild for months.
- **Rate limiting responses:** `429` with `Retry-After`; document limits per key, not just per endpoint.

## My takeaway

“Resources and correct methods, cursor pagination, additive-only evolution, and idempotency keys on every mutating POST. Boring is the feature.”
