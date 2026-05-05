-- Superbrain — Row-level security on every multi-tenant table.
-- The application is required to set:
--     SET LOCAL app.tenant_id = '<tenant uuid>';
-- on every transaction. Without this, queries return zero rows.

DO $$
DECLARE
    t TEXT;
BEGIN
    FOR t IN
        SELECT unnest(ARRAY[
            'app_user','agent_identity','role_grant',
            'ingestion_run','provenance','audit_event',
            'project','client','contact','subcontractor',
            'contract','rfi','variation','claim','decision'
        ])
    LOOP
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
        EXECUTE format('ALTER TABLE %I FORCE ROW LEVEL SECURITY', t);
        EXECUTE format($f$
            DROP POLICY IF EXISTS tenant_isolation ON %I;
            CREATE POLICY tenant_isolation ON %I
                USING (tenant_id::text = current_setting('app.tenant_id', true))
                WITH CHECK (tenant_id::text = current_setting('app.tenant_id', true));
        $f$, t, t);
    END LOOP;
END $$;
