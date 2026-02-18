-- Enable RLS on the table (if not already enabled)
ALTER TABLE "api"."genero" ENABLE ROW LEVEL SECURITY;

-- Policy to allow EVERYONE (anon and authenticated) to see all genres
CREATE POLICY "Enable read access for all users" ON "api"."genero"
AS PERMISSIVE FOR SELECT
TO public
USING (true);
