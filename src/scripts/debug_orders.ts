
import { supabase } from "../lib/supabase";

async function debugOrders() {
    console.log("Testing connection and query...");

    // 1. Simple count
    const { count, error: countError } = await supabase
        .from('venta')
        .select('*', { count: 'exact', head: true });

    if (countError) {
        console.error("Error getting count:", countError);
    } else {
        console.log("Total rows in 'venta':", count);
    }

    // 2. Fetch with relations (same as VentaService)
    const { data, error } = await supabase
        .from('venta')
        .select(`
            *,
            cliente:id_comprador (*),
            estado_pedido:id_estado (*)
        `)
        .limit(5);

    if (error) {
        console.error("Error fetching data with relations:", error);
        console.error("Details:", error.details);
        console.error("Hint:", error.hint);
    } else {
        console.log("Data fetched:", JSON.stringify(data, null, 2));
    }
}

debugOrders();
