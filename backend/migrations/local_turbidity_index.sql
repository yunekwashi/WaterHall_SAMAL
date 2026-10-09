-- Additive local-index history; never relabel or rewrite existing NTU rows.
-- Run once before deploying the index API; repeat execution is harmless.
BEGIN;
SET LOCAL lock_timeout = '5s';
ALTER TABLE reservoir_quality_readings
    ADD COLUMN IF NOT EXISTS turbidity_index_json TEXT;
COMMIT;
