---
name: 'ck-backend-development'
description: 'Build robust backend systems with modern technologies (.NET/C#, Node.js, Python, Go), frameworks (ASP.NET Core, NestJS, FastAPI), databases (PostgreSQL, MongoDB, Redis, SQL Server), APIs (REST, GraphQL, gRPC), authentication (OAuth 2.1, JWT, Identity), testing strategies (xUnit, NUnit), security best practices (OWASP Top 10), performance optimization, scalability patterns (microservices, caching), DevOps practices (Docker, Kubernetes, CI/CD), and monitoring. Use when designing APIs, implementing authentication, optimizing database queries, setting up CI/CD pipelines, handling security vulnerabilities, building microservices, or developing production-ready backend systems.'
---

# Backend Development Skill

Production-ready backend development with modern technologies, best practices, and proven patterns.

## When to Use

- Designing RESTful, GraphQL, or gRPC APIs
- Building authentication/authorization systems
- Optimizing database queries and schemas
- Implementing caching and performance optimization
- OWASP Top 10 security mitigation
- Designing scalable microservices
- Testing strategies (unit, integration, E2E)
- CI/CD pipelines and deployment
- Monitoring and debugging production systems

## Technology Selection Guide

**Languages:** C#/.NET (enterprise, full-stack), Node.js/TypeScript (real-time), Python (data/ML), Go (concurrency)
**Frameworks:** ASP.NET Core (enterprise), NestJS, FastAPI, Minimal APIs
**Databases:** SQL Server/PostgreSQL (ACID), MongoDB (flexible schema), Redis (caching)
**APIs:** REST (simple), GraphQL (flexible), gRPC (performance)
**ORMs:** Entity Framework Core, Dapper

See: `references/backend-technologies.md` for detailed comparisons

## Reference Navigation

**Core Technologies:**
- `backend-technologies.md` - Languages, frameworks, databases, message queues, ORMs
- `backend-api-design.md` - REST, GraphQL, gRPC patterns and best practices

**Security & Authentication:**
- `backend-security.md` - OWASP Top 10 2025, security best practices, input validation
- `backend-authentication.md` - OAuth 2.1, JWT, RBAC, MFA, session management

**Performance & Architecture:**
- `backend-performance.md` - Caching, query optimization, load balancing, scaling
- `backend-architecture.md` - Microservices, event-driven, CQRS, saga patterns

**Quality & Operations:**
- `backend-testing.md` - Testing strategies, frameworks, tools, CI/CD testing
- `backend-code-quality.md` - SOLID principles, design patterns, clean code
- `backend-devops.md` - Docker, Kubernetes, deployment strategies, monitoring
- `backend-debugging.md` - Debugging strategies, profiling, logging, production debugging
- `backend-mindset.md` - Problem-solving, architectural thinking, collaboration

## Key Best Practices (2025)

**Security:** Argon2id passwords, parameterized queries (98% SQL injection reduction), OAuth 2.1 + PKCE, rate limiting, security headers

**Performance:** Redis caching (90% DB load reduction), database indexing (30% I/O reduction), CDN (50%+ latency cut), connection pooling

**Testing:** 70-20-10 pyramid (unit-integration-E2E), Vitest 50% faster than Jest, contract testing for microservices, 83% migrations fail without tests

**DevOps:** Blue-green/canary deployments, feature flags (90% fewer failures), Kubernetes 84% adoption, Prometheus/Grafana monitoring, OpenTelemetry tracing

## Quick Decision Matrix

| Need | Choose |
|------|--------|
| Enterprise/Full-stack | C# + ASP.NET Core |
| Fast development | Node.js + NestJS |
| Data/ML integration | Python + FastAPI |
| High concurrency | Go + Gin |
| ACID transactions | SQL Server/PostgreSQL |
| Flexible schema | MongoDB |
| Caching | Redis |
| Internal services | gRPC |
| Public APIs | GraphQL/REST |
| Real-time events | Kafka/Azure Service Bus |
| .NET ORM (full-featured) | Entity Framework Core |
| .NET ORM (performance) | Dapper |

## Implementation Checklist

**API:** Choose style → Design schema → Validate input → Add auth → Rate limiting → Documentation → Error handling

**Database:** Choose DB → Design schema → Create indexes → Connection pooling → Migration strategy → Backup/restore → Test performance

**Security:** OWASP Top 10 → Parameterized queries → OAuth 2.1 + JWT → Security headers → Rate limiting → Input validation → Argon2id passwords

**Testing:** Unit 70% → Integration 20% → E2E 10% → Load tests → Migration tests → Contract tests (microservices)

**Deployment:** Docker → CI/CD → Blue-green/canary → Feature flags → Monitoring → Logging → Health checks

## Resources

- OWASP Top 10: https://owasp.org/www-project-top-ten/
- OAuth 2.1: https://oauth.net/2.1/
- OpenTelemetry: https://opentelemetry.io/
