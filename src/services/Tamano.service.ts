import { supabase } from "../lib/supabase";
import type { Tamano } from "../models/Tamano";

export const createTamano = async (tamano: Tamano): Promise<Tamano | null> => {
    const { data, error } = await supabase
        .from('tamano')
        .insert([tamano])
        .select()
        .single();

    if (error) {
        console.error("Error creating tamano:", error);
        return null; // Or throw error depending on strategy
    }

    return data as Tamano;
};

export const updateTamano = async (id_tamano: number, updates: Partial<Tamano>): Promise<Tamano | null> => {
    const { data, error } = await supabase
        .from('tamano')
        .update(updates)
        .eq('id_tamano', id_tamano)
        .select()
        .single();

    if (error) {
        console.error("Error updating tamano:", error);
        return null;
    }

    return data as Tamano;
};

export const getTamanoByProductoId = async (id_producto: number): Promise<Tamano | null> => {
    const { data, error } = await supabase
        .from('tamano')
        .select('*')
        .eq('id_producto', id_producto)
        .single();  // Since 1:1 relation as per product having id_tamano, but table has id_producto... circular? 
    // Actually usually Product has id_tamano if Many products share ONE size (unlikely) or One product has ONE size. 
    // DB schema says Product has FK `id_tamano` -> Tamano. 
    // AND Tamano has FK `id_producto` -> Product.  
    // This is a 1:1 circular.

    if (error) {
        // It's possible no size exists yet
        return null;
    }
    return data as Tamano;
};
