BEGIN;
SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '15s';
ALTER TABLE public.reservoir_quality_readings
    ALTER COLUMN turbidity_ntu DROP NOT NULL;
COMMIT;
