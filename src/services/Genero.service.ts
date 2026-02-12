import { supabase } from "../lib/supabase";
import { Genero } from "../models/Genero";


export const getGeneros = async (): Promise<Genero[]> => {
    const { data, error } = await supabase
        .from('genero')
        .select('*')
        .order('nombre_genero', { ascending: false });

    if (error) throw error;
    return data as Genero[];
};
