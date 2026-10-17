# JVM, memory and performance investigations

## What happens when Java runs?

`javac` translates source into JVM bytecode; the JVM loads/verifies classes and executes code, typically interpreting initially and JIT-compiling hot paths. The runtime includes heap, stacks, metaspace and garbage collector machinery. These are conceptual models; JVM implementation choices vary.

## Debugging a slow API: order of evidence

1. **Metrics:** Was p95/p99 latency elevated? Are errors, CPU, allocation, queue depth and GC pauses correlated?
2. **Trace:** Which operation or dependency consumes the request time? Is time in remote calls, lock contention, or computation?
3. **Logs:** Gather correlated request IDs and errors with sensitive data redacted.
4. **Profile/measure:** CPU sampling, allocation flame graphs, thread dumps, heap histogram; compare against baseline.
5. **Mitigate:** Rollback, scale, cache, reduce concurrency, tune query or code depending on evidence; then verify effects.

## GC reminders

- GC reclaims **unreachable objects**, not file handles or thread shutdown by itself.
- High allocation rate can increase pressure; a heap leak usually means unwanted objects remain *reachable*.
- Check GC logs and object retention before assuming memory size is the cause.
- A larger heap can reduce collection frequency but also increases footprint and can change pause characteristics.

## Common misunderstandings

- Java is **pass-by-value** (an object reference value may be passed; methods can mutate the object via that reference).
- Strings are immutable; `new String("x")` and a literal are not always the same object identity.
- `==` checks object identity for references; `.equals` checks contract-defined equality.
- `final` prevents reassignment of a variable, not necessarily mutation of its referenced object.

**Practice:** “Latency rose after deployment but CPU is low. What metrics and traces would you inspect before changing thread counts?”
