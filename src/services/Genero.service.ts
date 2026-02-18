import { supabase } from "../lib/supabase";
import type { Genero } from "../models/Genero";

export const getGeneros = async (): Promise<Genero[]> => {
    const { data, error } = await supabase
        .from('genero')
        .select('*')
        .order('nombre_genero', { ascending: true });

    if (error) {
        console.error("Error fetching generos:", error);
        return [];
    }
    console.log("Generos fetched in service:", data);
    return data as Genero[];
};
