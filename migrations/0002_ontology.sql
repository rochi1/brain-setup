-- Superbrain — ontology tables (system-of-record fallback).
-- Cognee/Graphiti hold the queryable views; these tables hold the
-- authoritative records when sourced from internal apps + RBAC enforcement.

CREATE TABLE IF NOT EXISTS project (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id   UUID NOT NULL REFERENCES tenant(id) ON DELETE CASCADE,
    name        TEXT NOT NULL,
    client_id   UUID,
    status      TEXT,
    start_date  DATE,
    end_date    DATE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ix_project_tenant ON project(tenant_id);

CREATE TABLE IF NOT EXISTS client (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id   UUID NOT NULL REFERENCES tenant(id) ON DELETE CASCADE,
    name        TEXT NOT NULL,
    industry    TEXT,
    region      TEXT
);

CREATE TABLE IF NOT EXISTS contact (
    id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id          UUID NOT NULL REFERENCES tenant(id) ON DELETE CASCADE,
    organisation_id    UUID,
    organisation_type  TEXT,
    name               TEXT NOT NULL,
    email              TEXT,
    role               TEXT
);

CREATE TABLE IF NOT EXISTS subcontractor (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id   UUID NOT NULL REFERENCES tenant(id) ON DELETE CASCADE,
    name        TEXT NOT NULL,
    region      TEXT,
    rating      NUMERIC(3,2)
);

CREATE TABLE IF NOT EXISTS contract (
    id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id          UUID NOT NULL REFERENCES tenant(id) ON DELETE CASCADE,
    project_id         UUID REFERENCES project(id) ON DELETE SET NULL,
    counterparty_id    UUID,
    counterparty_type  TEXT,
    value              NUMERIC(18,2),
    currency           TEXT,
    start_date         DATE,
    end_date           DATE
);

CREATE TABLE IF NOT EXISTS rfi (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id     UUID NOT NULL REFERENCES tenant(id) ON DELETE CASCADE,
    project_id    UUID NOT NULL REFERENCES project(id) ON DELETE CASCADE,
    number        TEXT,
    status        TEXT,
    raised_by     UUID,
    responded_by  UUID,
    raised_at     TIMESTAMPTZ,
    responded_at  TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS variation (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id         UUID NOT NULL REFERENCES tenant(id) ON DELETE CASCADE,
    project_id        UUID NOT NULL REFERENCES project(id) ON DELETE CASCADE,
    contract_id       UUID REFERENCES contract(id) ON DELETE SET NULL,
    number            TEXT,
    status            TEXT,
    cost_impact       NUMERIC(18,2),
    time_impact_days  INTEGER
);

CREATE TABLE IF NOT EXISTS claim (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id   UUID NOT NULL REFERENCES tenant(id) ON DELETE CASCADE,
    project_id  UUID NOT NULL REFERENCES project(id) ON DELETE CASCADE,
    contract_id UUID REFERENCES contract(id) ON DELETE SET NULL,
    amount      NUMERIC(18,2),
    currency    TEXT,
    status      TEXT
);

CREATE TABLE IF NOT EXISTS decision (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id     UUID NOT NULL REFERENCES tenant(id) ON DELETE CASCADE,
    project_id    UUID REFERENCES project(id) ON DELETE SET NULL,
    decided_by    UUID,
    rationale     TEXT,
    supersedes_id UUID REFERENCES decision(id) ON DELETE SET NULL,
    decided_at    TIMESTAMPTZ
);
