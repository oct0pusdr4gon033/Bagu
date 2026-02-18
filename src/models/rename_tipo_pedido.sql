-- Rename table
ALTER TABLE IF EXISTS api.tipo_pedido RENAME TO estado_pedido;

-- Rename primary key column and constraint
ALTER TABLE api.estado_pedido RENAME COLUMN id_tipo_pedido TO id_estado_pedido;
ALTER TABLE api.estado_pedido RENAME COLUMN nombre_tipo TO nombre_estado;
-- Assuming constraint name is consistent, let's try to rename it or drop/recreate if needed. 
-- Usually PK constraint name is implicit or 'tipo_pedido_pkey'.
ALTER INDEX IF EXISTS api.tipo_pedido_pkey RENAME TO estado_pedido_pkey;

-- Rename sequence if it exists
ALTER SEQUENCE IF EXISTS api.tipo_pedido_id_tipo_pedido_seq RENAME TO estado_pedido_id_estado_pedido_seq;

-- Update foreign key column in venta table
ALTER TABLE api.venta RENAME COLUMN id_tipo_pedido TO id_estado_pedido;

-- Update foreign key constraint in venta table
-- First drop the old FK constraint
ALTER TABLE api.venta DROP CONSTRAINT IF EXISTS venta_id_tipo_pedido_fkey;

-- Add new FK constraint
ALTER TABLE api.venta 
ADD CONSTRAINT venta_id_estado_pedido_fkey 
FOREIGN KEY (id_estado_pedido) 
REFERENCES api.estado_pedido(id_estado_pedido);

-- Reload schema cache (Supabase specific, usually automated on DDL)
NOTIFY pgrst, 'reload schema';
