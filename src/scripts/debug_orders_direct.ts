
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jrfcsvojhodecheuxyjw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyZmNzdm9qaG9kZWNoZXV4eWp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4Mjk5NTUsImV4cCI6MjA4NTQwNTk1NX0.JtzfxmkWpiMm70pEQU31xA0AI3wFYvlBVFkMZ0ofVAY";

const supabase = createClient(supabaseUrl, supabaseKey, {
    db: {
        schema: 'api'
    }
});

async function debugOrders() {
    console.log("Testing connection and query with DIRECT credentials...");

    try {
        // 1. Simple count
        console.log("Fetching count...");
        const { count, error: countError } = await supabase
            .from('venta')
            .select('*', { count: 'exact', head: true });

        if (countError) {
            console.error("Error getting count:", countError);
        } else {
            console.log("Total rows in 'venta':", count);
        }

        // 2. Fetch with relations
        console.log("Fetching data with relations...");
        const { data, error } = await supabase
            .from('venta')
            .select(`
                *,
                cliente:id_comprador (*),
                estado_pedido:id_estado (*),
                detalles:detalle_venta (
                    *,
                    producto:id_producto (*)
                )
            `)
            .limit(5);

        if (error) {
            console.error("Error fetching data with relations:", error);
            console.error("Details:", error.details);
            console.error("Hint:", error.hint);
        } else {
            console.log("Data fetched successfully.");
            console.log("First item:", JSON.stringify(data[0], null, 2));
            console.log("Total items returned:", data.length);
        }

        // 3. Check estado_pedido table
        console.log("Fetching estado_pedido...");
        const { data: estados, error: estadoError } = await supabase
            .from('estado_pedido')
            .select('*');

        if (estadoError) {
            console.error("Error fetching estado_pedido:", estadoError);
        } else {
            console.log("Estados fetched:", JSON.stringify(estados, null, 2));
        }
    } catch (err) {
        console.error("Unexpected error:", err);
    }
}

debugOrders();
