-- Script to fix the sequence for table 'venta'
-- Run this in your Supabase SQL Editor

-- 1. Check max ID
SELECT MAX(id_venta) FROM venta;

-- 2. Reset the sequence to the max ID + 1
-- Replace 'venta_id_venta_seq' if your sequence name is different
-- You can find the sequence name by running: 
-- SELECT c.relname FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace WHERE c.relkind = 'S' AND n.nspname = 'public';

SELECT setval('venta_id_venta_seq', (SELECT MAX(id_venta) FROM venta));

-- 3. Verify
SELECT nextval('venta_id_venta_seq');
