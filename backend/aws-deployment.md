# AWS backend design and deployment notes

**Choose services from constraints, not familiarity.** This page describes typical options, not a single recommended architecture.

| Requirement | Consider | Important check |
|---|---|---|
| Serverless event handler | Lambda | cold starts, concurrency, timeouts, retries |
| Container service | ECS/Fargate | task sizing, rollout, private networking |
| Kubernetes workloads | EKS | cluster ops burden, scheduling and platform ownership |
| Object storage | S3 | IAM, public access, lifecycle, consistency expectations |
| Async job queue | SQS | visibility timeout, duplicate delivery, DLQ, FIFO constraints |
| Event fan-out | SNS / EventBridge | routing, filtering, ordering, destination retries |
| Relational store | RDS / Aurora | backups, failover, connections, indexing |
| Secrets | Secrets Manager / Parameter Store | rotation, IAM policies, retrieval caching |

## Deployment interview script

1. Deploy artifact immutably through CI with tests, scanning and environment promotion.
2. Health/readiness checks, gradual rollout, useful dashboards and rollback criteria.
3. Restrict IAM, encrypt data in transit/at rest as required, don't log secrets.
4. Alert on customer-facing SLIs (error rate, p95 latency, availability), not only CPU.
5. Plan for dependency outages, retries, queue backlogs, region or zone failures.

## Cost reasoning

Account for fixed vs request costs, data transfer, NAT, storage growth, logs/metrics retention, and operational time. A “free tier” may have limits or expire; always review actual provider pricing before deploying.

→ [AWS Well-Architected](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
