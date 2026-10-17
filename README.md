# Java & Backend Interview Field Guide ☕

> **Interview-ready notes you can actually use.** Java 11 · DSA patterns · System design · SQL · AWS · production reliability · behavioral storytelling.

[![Java 11 CI](https://github.com/BhagyashriT/java-backend-interview-handbook/actions/workflows/java.yml/badge.svg)](https://github.com/BhagyashriT/java-backend-interview-handbook/actions/workflows/java.yml)
![Java](https://img.shields.io/badge/Java-11-orange) ![License](https://img.shields.io/badge/license-MIT-blue) ![No paid tools](https://img.shields.io/badge/study_site-free-brightgreen)

**Maintained by [Bhagyashri Thorat](https://github.com/BhagyashriT)** · [Engineering portfolio](https://bhagyashrit.github.io/)

A focused, original, publicly shareable knowledge base for engineers preparing for backend, full-stack, and senior SWE interviews. Emphasis on **explaining tradeoffs out loud**, not memorizing buzzwords.

## ⚡ Pick your time budget

| Time available | Go here | Goal |
|---|---|---|
| 10 minutes | [Java last-minute](quick-revision/10-minute-java.md) | Core Java traps and collections |
| 10 minutes | [System design last-minute](quick-revision/10-minute-design.md) | Structure and tradeoffs |
| 30 minutes | [Pre-interview checklist](quick-revision/30-minute.md) | Warmup, communication, recall |
| 7 days | [Seven-day plan](practice/seven-day-plan.md) | Balanced structured revision |
| Practice questions | [Question bank](practice/question-bank.md) | Prompts + follow-up probes |
| Flashcards | [Interactive revision site](docs/index.html) | Offline-ready, searchable, progress tracking |

**Online study site** (after enabling Pages for this repo): `https://bhagyashrit.github.io/java-backend-interview-handbook/`.

## 📚 Contents

| Track | Topics | Start here |
|---|---|---|
| **Java & JVM** | Collections, concurrency, JVM, Streams, memory model, pitfalls | [Java index](java/README.md) |
| **Data structures & algorithms** | Pattern recognition, brute force → optimized Java 11 → dry runs | [DSA index](dsa/README.md) |
| **System design** | Interview framework, caching, databases, queues, availability, case studies | [Design index](system-design/README.md) |
| **Backend engineering** | REST, idempotency, SQL, cloud, debugging, reliability, testing | [Backend index](backend/README.md) |
| **Low-level design** | Requirements, abstractions, concurrency, extensibility | [LLD](lld/README.md) |
| **Communication** | Experience stories, tradeoffs, retrospectives | [Behavioral](behavioral/README.md) |
| **Executable Java** | Dependency-free Java 11 implementations with test runner | [Examples](src/README.md) |

## 🎯 How each coding solution is documented

1. **Say the brute-force idea naturally** and give its time/space complexity.
2. Identify the bottleneck and describe the insight that eliminates wasted work.
3. Implement an **optimized Java 11** solution with clearly stated invariants.
4. Dry-run one normal and one edge case, then discuss follow-up variants.

Each system-design case instead follows: **requirements → estimates → API → data model → architecture → bottlenecks → failure handling → tradeoffs → observability**.

## 🧪 Run the Java examples

Requires a JDK **11 or later**, Bash, and no external dependencies:

```bash
bash scripts/test.sh
```

CI compiles with `javac --release 11` and runs deterministic tests. These examples are study material, **not a production service**.

## 🧠 Interview practice method

- Recall first, reveal the answer second. Use the flashcard viewer, cover the notes, and explain aloud.
- For coding, write the approach and invariants without opening the implementation.
- For design, sketch 3–5 boxes, justify one tradeoff, and identify one failure mode.
- For behavioral questions, rehearse an authentic project story; don't publish confidential employer information.
- Track genuine understanding, not a cosmetic completion percentage.

## 🌐 Publish the free interactive site

See [step-by-step publishing instructions](PUBLISHING.md).

Repository → **Settings → Pages → Deploy from a branch → `main` → `/docs` → Save**. The study site works locally by opening `docs/index.html` (no server or API key). The page uses local system fonts and works completely offline. Progress and saved cards are stored in **your browser only**.

## 🔗 Reference shelf

These are **external learning resources**, not copied material:

- [Kevin Naughton Jr. / interviews](https://github.com/kdn251/interviews) — broad collection and interview reference links.
- [The System Design Primer](https://github.com/donnemartin/system-design-primer) — public system-design reference.
- [Hello Interview — free system design articles](https://www.hellointerview.com/learn/system-design/in-a-hurry/core-concepts) — for additional reading; no proprietary content reproduced.
- [Oracle Java SE 11 API](https://docs.oracle.com/en/java/javase/11/docs/api/) — canonical Java API docs.
- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html) — operational pillars and tradeoffs.
- [OpenTelemetry Docs](https://opentelemetry.io/docs/) — instrumentation and signals.
- [PostgreSQL documentation](https://www.postgresql.org/docs/current/index.html) — indexes, concurrency, query plans.

See [Resources & attribution](RESOURCES.md). All authored notes and source code here are original examples. External material is linked, not transcribed.

## 🤝 Contributing

Found a bug or inaccurate explanation? Please open an issue or small PR. See [CONTRIBUTING](CONTRIBUTING.md). Explain the edge case and reference a reliable source when correcting technical claims.

## License and honesty

MIT for this repository's original content and code. Linked third-party material has its own terms. This is a **learning reference, not a certificate of expertise**. Interview preparation and hiring outcomes cannot be guaranteed.
