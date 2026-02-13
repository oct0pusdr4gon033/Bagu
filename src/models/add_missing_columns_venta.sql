-- Add missing columns to the 'venta' table
ALTER TABLE api.venta ADD COLUMN IF NOT EXISTS direccion_envio text;
ALTER TABLE api.venta ADD COLUMN IF NOT EXISTS notas text;
