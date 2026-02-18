
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Manual env parsing
const envPath = path.resolve(__dirname, '../.env');
try {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const env: Record<string, string> = {};
    envContent.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join('=').trim();
            env[key] = value;
        }
    });

    const supabaseUrl = env['VITE_SUPABASE_URL'];
    const supabaseKey = env['VITE_SUPABASE_ANON_KEY'];

    if (!supabaseUrl || !supabaseKey) {
        console.error("Missing Supabase credentials in .env");
        process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    async function checkSchema() {
        console.log("Checking api.detalle_venta columns...");

        const { data, error } = await supabase
            .from('detalle_venta')
            .select('*')
            .limit(1);

        if (error) {
            console.error("Error selecting *:", error);
        } else if (data && data.length > 0) {
            console.log("Existing columns based on first row:", Object.keys(data[0]));
        } else {
            console.log("No rows found. Attempting insert dry-run to check columns...");
            // To verify if 'color' exists, we could try to select it specifically
            const { error: colError } = await supabase.from('detalle_venta').select('color').limit(1);
            if (colError) {
                console.log("Column 'color' likely does not exist:", colError.message);
            } else {
                console.log("Column 'color' exists!");
            }

            // Check 'id_color'
            const { error: idColError } = await supabase.from('detalle_venta').select('id_color').limit(1);
            if (idColError) {
                console.log("Column 'id_color' likely does not exist:", idColError.message);
            } else {
                console.log("Column 'id_color' exists!");
            }
        }

        console.log("\nChecking api.producto_color columns...");
        const { data: pcData } = await supabase
            .from('producto_color')
            .select('*')
            .limit(1);

        if (pcData && pcData.length > 0) {
            console.log("ProductoColor columns:", Object.keys(pcData[0]));
        }
    }

    checkSchema();

} catch (err) {
    console.error("Error reading .env:", err);
}
