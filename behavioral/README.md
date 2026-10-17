# Behavioral and project deep dives

The most convincing stories are **true**, specific, appropriately scoped, and explain your **individual contribution** without claiming team outcomes as solely yours.

## How interviewers score this

They're listening for: scope of ownership, technical depth under follow-ups, data-driven decisions, conflict handled with evidence, and honest reflection. A story that crumbles at "why didn't you do X instead?" scores worse than a smaller story told with real tradeoffs. (This was the Paramount feedback: stay concrete on ingestion/storage/retrieval choices and scale numbers.)

## A 90-second story structure

1. **Context (15s):** What user/business problem, technical environment and risk?
2. **Ownership (15s):** What exactly were you responsible for?
3. **Options (20s):** Two plausible approaches and the tradeoff you chose.
4. **Execution (25s):** Design, debugging, collaboration, measurement and rollout.
5. **Outcome (10s):** Verifiable outcome, what changed for users/team.
6. **Reflection (5s):** What would you do differently?

## Story bank — fill in your real stories

Prepare one true story per slot. Each maps to multiple interview questions.

| # | Slot | Maps to questions like… | Prompt to jog your memory |
|---|---|---|---|
| 1 | Hardest technical problem | "Tell me about a challenging project" | An ad-serving or distributed-systems problem where the fix wasn't obvious |
| 2 | Production incident | "Tell me about a time something broke" | Where metrics/logs — not intuition — found the bottleneck |
| 3 | Disagreement | "Tell me about a conflict" | A design or priority dispute settled by evidence, not seniority |
| 4 | Tradeoff with business impact | "A time you pushed back" | Where the technically pure option lost to the pragmatic one (or vice versa) |
| 5 | Ambiguity | "Vague requirements" | A project where you defined success metrics yourself |
| 6 | Mentorship / influence | "Helping others grow" | A review, design doc, or standard you shaped that others adopted |
| 7 | Mistake owned | "Tell me about a failure" | Detection → repair → prevention → communication, in that order |
| 8 | Scale / performance win | "Optimized something" | Latency, cost, or throughput improvement with before/after numbers |

For each story, pre-write: the 90-second version, the architecture sketch (public-safe), the alternative you rejected and why, and the metric that proved it worked.

## Delivery tips

- **Numbers, but honest ones:** "p99 from 800ms to 120ms" beats "made it faster". Never invent precision you don't have — "roughly halved" is fine.
- **"I" for your actions, "we" for the team's.** Interviewers discount stories where one person did everything.
- **Name the tradeoff in every story.** Two good options, you picked one for a reason — that's the senior signal.
- **End with the reflection.** "Next time I'd load-test the failover path before launch" shows growth; skipping it suggests you didn't think about it.
- **Keep it public-safe:** no internal codenames, no nonpublic revenue figures, no customer data. Qualitative outcomes ("reduced page-load-driven dropoff") when numbers are confidential.

## Prompts to prepare

- A production incident where you used data, not intuition, to identify the bottleneck.
- Disagreement with a teammate or partner team: what evidence changed the decision?
- A technically correct implementation that did not deliver business value: what did you learn?
- A migration where backwards compatibility or a staged rollout mattered.
- A project with ambiguous requirements: how did you define success?
- A mistake you owned: detection, repair, prevention and communication.

## Deep technical follow-up ladder

**Initial:** What was the problem and your role?

**Architecture:** Draw a simplified public-safe diagram and critical path.

**Alternatives:** Why not a queue, cache, stronger consistency or simpler architecture?

**Operational proof:** Which metrics/logs/traces established the bottleneck? What showed the fix worked?

**Limitations:** Where would your approach fail at 10× scale or with dependency outages?

**Confidentiality:** Use only information cleared for public release. Replace internal names, nonpublic revenue numbers and sensitive details with qualitative outcomes if necessary. These prompts are templates, **not fabricated accounts of completed work**.
