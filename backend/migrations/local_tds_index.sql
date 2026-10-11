-- Add local operational-index history without changing historic ppm rows.
BEGIN;
SET LOCAL lock_timeout = '5s';
ALTER TABLE reservoir_quality_readings
    ADD COLUMN IF NOT EXISTS tds_index_json TEXT;
COMMIT;
