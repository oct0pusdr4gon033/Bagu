-- RLS Policies for Venta and Detalle Venta Tables

-- Venta
ALTER TABLE api.venta ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all for authenticated users on venta"
ON api.venta
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable read for anon on venta"
ON api.venta FOR SELECT
TO anon
USING (true);

-- Detalle Venta
ALTER TABLE api.detalle_venta ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all for authenticated users on detalle_venta"
ON api.detalle_venta
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable read for anon on detalle_venta"
ON api.detalle_venta FOR SELECT
TO anon
USING (true);
