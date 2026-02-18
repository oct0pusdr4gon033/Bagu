import { EstadoPedido } from "../models/EstadoPedido";
import { supabase } from "../lib/supabase";

export const getEstados = async (): Promise<EstadoPedido[]> => {
    const { data, error } = await supabase
        .from('estado_pedido')
        .select('*')
        .order('nombre_estado', { ascending: true });

    if (error) throw error;
    return data as EstadoPedido[];
};