-- Superbrain — initial Postgres schema.
-- Multi-tenant by default; every business table carries tenant_id and is
-- protected by RLS. Apply migrations in numeric order.

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tenants ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tenant (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug            TEXT UNIQUE NOT NULL,
    name            TEXT NOT NULL,
    region          TEXT,
    isolation_tier  TEXT NOT NULL DEFAULT 'logical', -- logical | schema | cluster
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    archived_at     TIMESTAMPTZ
);

-- Identities ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS app_user (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id   UUID NOT NULL REFERENCES tenant(id) ON DELETE CASCADE,
    email       TEXT NOT NULL,
    display_name TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (tenant_id, email)
);

CREATE TABLE IF NOT EXISTS agent_identity (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id   UUID NOT NULL REFERENCES tenant(id) ON DELETE CASCADE,
    name        TEXT NOT NULL,
    role_name   TEXT NOT NULL,
    UNIQUE (tenant_id, name)
);

CREATE TABLE IF NOT EXISTS role_grant (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id   UUID NOT NULL REFERENCES tenant(id) ON DELETE CASCADE,
    actor_id    UUID NOT NULL,
    actor_type  TEXT NOT NULL CHECK (actor_type IN ('user','agent')),
    role_name   TEXT NOT NULL,
    scope       JSONB NOT NULL DEFAULT '{}'::jsonb,
    granted_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Provenance + ingestion ---------------------------------------------------
CREATE TABLE IF NOT EXISTS ingestion_run (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id       UUID NOT NULL REFERENCES tenant(id) ON DELETE CASCADE,
    connector       TEXT NOT NULL,
    started_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    finished_at     TIMESTAMPTZ,
    status          TEXT NOT NULL DEFAULT 'running',
    items_seen      INTEGER NOT NULL DEFAULT 0,
    items_ingested  INTEGER NOT NULL DEFAULT 0,
    items_skipped   INTEGER NOT NULL DEFAULT 0,
    items_failed    INTEGER NOT NULL DEFAULT 0,
    config_hash     TEXT,
    error_summary   TEXT
);
CREATE INDEX IF NOT EXISTS ix_ingestion_run_tenant ON ingestion_run(tenant_id);

CREATE TABLE IF NOT EXISTS provenance (
    id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id          UUID NOT NULL REFERENCES tenant(id) ON DELETE CASCADE,
    source_connector   TEXT NOT NULL,
    source_uri         TEXT NOT NULL,
    source_hash        TEXT NOT NULL,
    ingestion_run_id   UUID REFERENCES ingestion_run(id) ON DELETE SET NULL,
    extractor_version  TEXT NOT NULL,
    confidence         NUMERIC(3,2) NOT NULL CHECK (confidence BETWEEN 0 AND 1),
    recorded_by        UUID,
    recorded_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (tenant_id, source_connector, source_uri, source_hash)
);
CREATE INDEX IF NOT EXISTS ix_provenance_tenant_uri ON provenance(tenant_id, source_uri);

-- Audit (append-only) ------------------------------------------------------
CREATE TABLE IF NOT EXISTS audit_event (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ts              TIMESTAMPTZ NOT NULL DEFAULT now(),
    tenant_id       UUID NOT NULL REFERENCES tenant(id) ON DELETE CASCADE,
    actor_type      TEXT NOT NULL,
    actor_id        UUID NOT NULL,
    action          TEXT NOT NULL,
    scope           JSONB NOT NULL DEFAULT '{}'::jsonb,
    purpose         TEXT,
    request_hash    TEXT NOT NULL,
    result          JSONB NOT NULL DEFAULT '{}'::jsonb,
    prev_hash       TEXT,
    self_hash       TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_audit_tenant_ts ON audit_event(tenant_id, ts DESC);

-- Block updates and deletes on audit_event -------------------------------
CREATE OR REPLACE FUNCTION audit_event_no_modify() RETURNS trigger AS $$
BEGIN
    RAISE EXCEPTION 'audit_event is append-only';
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS audit_event_no_update ON audit_event;
CREATE TRIGGER audit_event_no_update BEFORE UPDATE ON audit_event
    FOR EACH ROW EXECUTE FUNCTION audit_event_no_modify();

DROP TRIGGER IF EXISTS audit_event_no_delete ON audit_event;
CREATE TRIGGER audit_event_no_delete BEFORE DELETE ON audit_event
    FOR EACH ROW EXECUTE FUNCTION audit_event_no_modify();
