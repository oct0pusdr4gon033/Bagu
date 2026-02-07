import { supabase } from '../lib/supabase';
import { Colores } from '../models/Colores';

// Obtener todos los colores
export const getColores = async (): Promise<Colores[]> => {
    const { data, error } = await supabase
        .from('color')
        .select('*')
        .order('id_color', { ascending: true }); // Ordenar por ID para consistencia

    if (error) throw error;
    return data as Colores[];
};

// Crear un nuevo color
// Crear un nuevo color con ID manual (simulando auto-increment)
export const createColor = async (color: Partial<Colores>): Promise<Colores> => {
    // 1. Obtener el ID máximo actual
    const { data: maxIdData } = await supabase
        .from('color')
        .select('id_color')
        .order('id_color', { ascending: false })
        .limit(1)
        .single();

    let nextId = 1;
    if (maxIdData) {
        nextId = (maxIdData.id_color || 0) + 1;
    }

    // 2. Insertar con el nuevo ID
    const { data, error } = await supabase
        .from('color')
        .insert([{
            id_color: nextId,
            nombre_color: color.nombre_color,
            codigo_color: color.codigo_color,
            estado: color.estado ?? true
        }])
        .select()
        .single();

    if (error) throw error;
    return data as Colores;
};

// Actualizar un color existente
export const updateColor = async (color: Partial<Colores>): Promise<Colores> => {
    if (!color.id_color) throw new Error("ID de color requerido para actualizar");

    const { data, error } = await supabase
        .from('color')
        .update({
            nombre_color: color.nombre_color,
            codigo_color: color.codigo_color
        })
        .eq('id_color', color.id_color)
        .select()
        .single();

    if (error) throw error;
    return data as Colores;
};

// Cambiar estado (Activar/Desactivar) - Soft Delete
export const toggleColorStatus = async (id: number, nuevoEstado: boolean): Promise<void> => {
    const { error } = await supabase
        .from('color')
        .update({ estado: nuevoEstado })
        .eq('id_color', id);

    if (error) throw error;
};