import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env manually to avoid dotenv dependency
const envPath = path.resolve(process.cwd(), '.env');
let supabaseUrl = '';
let supabaseKey = '';

if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            const trimmedKey = key.trim();
            const trimmedValue = value.trim().replace(/^["']|["']$/g, ''); // Remove quotes
            if (trimmedKey === 'VITE_SUPABASE_URL') supabaseUrl = trimmedValue;
            if (trimmedKey === 'VITE_SUPABASE_ANON_KEY') supabaseKey = trimmedValue;
        }
    });
} else {
    console.warn("Warning: .env file not found at", envPath);
}

if (!supabaseUrl || !supabaseKey) {
    console.error("Error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in .env");
    process.exit(1);
}

// Try 'api' schema if 'public' is failing? 
// Or maybe the tables are just not in public.
const supabase = createClient(supabaseUrl, supabaseKey, { db: { schema: 'api' } });

async function checkSchema() {
    console.log("Checking 'venta' table structure...");
    // Get one row to see keys
    const { data: ventaData, error: ventaError } = await supabase.from('venta').select('*').limit(1);

    if (ventaError) {
        console.error("Error accessing 'venta' table:", ventaError.message);
    } else if (ventaData && ventaData.length > 0) {
        console.log("Successfully accessed 'venta' table.");
        console.log("Columns found in 'venta':", Object.keys(ventaData[0]).join(', '));
    } else {
        console.log("Successfully accessed 'venta' table, but it is empty.");
    }

    console.log("\nChecking 'estado_pedido' table...");
    const { data: estadoData, error: estadoError } = await supabase.from('estado_pedido').select('*').limit(1);

    if (estadoError) {
        console.log("❌ 'estado_pedido' table access FAILED:", estadoError.message);
    } else {
        console.log("✅ 'estado_pedido' table access SUCCESS.");
        if (estadoData && estadoData.length > 0) {
            console.log("Columns found in 'estado_pedido':", Object.keys(estadoData[0]).join(', '));
        }
    }
}

checkSchema();
