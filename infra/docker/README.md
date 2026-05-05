# Local stack

```
make dev          # docker compose up -d
make api          # run API locally (alternative: container is exposed on :8080)
```

Smoke test:

```bash
curl -s http://localhost:8080/healthz
```

Ingest a folder of markdown:

```bash
curl -s -X POST http://localhost:8080/ingest \
  -H "X-Tenant-Id: tenant-A" -H "X-Actor-Id: admin" -H "X-Actor-Type: system" \
  -H "Content-Type: application/json" \
  -d '{"connector":"filesystem","config":{"root":"/app/your-business"}}'
```

Search:

```bash
curl -s -X POST http://localhost:8080/search \
  -H "X-Tenant-Id: tenant-A" -H "X-Actor-Id: admin" -H "X-Actor-Type: user" \
  -H "Content-Type: application/json" \
  -d '{"query":"brand voice","limit":5}'
```

The Cognee and Mem0 services in this compose file are placeholders. Replace
the images with the real upstreams when wiring Phase 2 — see
[`docs/rollout/PHASE_2_PILOT.md`](../../docs/rollout/PHASE_2_PILOT.md).
