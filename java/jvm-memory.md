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

## Say it aloud: the classic traps

**Java pass-by-value with a mutable object:**
“Java is always pass-by-value — the value being passed is either a primitive or an object *reference*. So `void swap(StringBuilder a, StringBuilder b)` can't swap the caller's variables, but `a.append("x")` mutates the object the caller's reference points to. If an interviewer asks, I draw the reference arrow: the parameter is a copy of the arrow, not a copy of the object.”

**String identity:**
“String literals are interned, so `"x" == "x"` is true — same pooled object. But `new String("x") == "x"` is false: different objects, same content. That's why string comparison is always `.equals()`. In an interview I never rely on `==` for objects.”

**What evidence justifies JVM heap tuning?**
“Not a guess — evidence. I'd tune only after seeing: frequent full GCs or long GC pauses correlating with p99 latency in the GC logs; heap histograms showing the old gen filling with long-lived objects I can explain; or OOMs with heap dumps pointing at a specific retention path. Tuning without that is superstition. And I'd first check for a leak — objects that are *reachable* but shouldn't be, like a static cache without eviction or listeners never deregistered — because no heap size fixes a leak.”

**Practice answer — “latency rose after deploy, CPU low”:**
“Low CPU with high latency usually means threads are *waiting*, not working. I'd check: p95/p99 vs p50 to see if it's tail latency; thread dumps for threads blocked on locks or waiting on downstream calls; traces to find which dependency got slow; connection pool and queue-depth metrics — maybe the deploy shrank a pool or added a blocking call. I would *not* raise thread counts — more threads waiting on the same slow dependency just adds memory pressure and context switching.”
