
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Try to load env from root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    console.log("Checking api.detalle_venta columns...");

    // Attempt to select a non-existent column to see error, or just * to see keys if any rows exist
    const { data, error } = await supabase
        .from('detalle_venta')
        .select('*')
        .limit(1);

    if (error) {
        console.error("Error selecting *:", error);
    } else if (data && data.length > 0) {
        console.log("Existing columns based on first row:", Object.keys(data[0]));
    } else {
        console.log("No rows found. Cannot infer columns from data.");
        // If no rows, we can't easily check columns without access to information_schema which might be restricted
        // But we can try to insert a dummy with a 'color' field and see if it yells
    }

    console.log("\nChecking api.producto_color columns...");
    const { data: pcData, error: pcError } = await supabase
        .from('producto_color')
        .select('*')
        .limit(1);

    if (pcData && pcData.length > 0) {
        console.log("ProductoColor columns:", Object.keys(pcData[0]));
    }
}

checkSchema();
