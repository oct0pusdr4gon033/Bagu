import { supabase } from '../lib/supabase';
import { Categoria } from '../models/Categoria';

// Obtener todas las categorías
export const getCategorias = async (): Promise<Categoria[]> => {
    const { data, error } = await supabase
        .from('categoria')
        .select('*')
        .order('id_categoria', { ascending: true });

    if (error) throw error;
    return data as Categoria[];
};

// Obtener categoría por ID
export const getCategoriaById = async (id: number): Promise<Categoria | null> => {
    const { data, error } = await supabase
        .from('categoria')
        .select('*')
        .eq('id_categoria', id)
        .single();

    if (error) {
        console.error("Error fetching category by id:", error);
        return null;
    }
    return data as Categoria;
};

// Crear una nueva categoría
export const createCategoria = async (categoria: Partial<Categoria>): Promise<Categoria> => {
    // 1. Obtener el ID máximo actual
    const { data: maxIdData } = await supabase
        .from('categoria')
        .select('id_categoria')
        .order('id_categoria', { ascending: false })
        .limit(1)
        .single();

    let nextId = 1;
    if (maxIdData) {
        nextId = (maxIdData.id_categoria || 0) + 1;
    }

    // 2. Insertar con el nuevo ID
    const { data, error } = await supabase
        .from('categoria')
        .insert([{
            id_categoria: nextId,
            nombre_categoria: categoria.nombre_categoria,
            descripcion_categoria: categoria.descripcion_categoria,
            url_categoria: categoria.url_categoria,
            estado_categoria: categoria.estado_categoria ?? true
        }])
        .select()
        .single();

    if (error) throw error;
    return data as Categoria;
};

// Actualizar una categoría existente
export const updateCategoria = async (categoria: Partial<Categoria>): Promise<Categoria> => {
    if (!categoria.id_categoria) throw new Error("ID de categoría requerido para actualizar");

    const { data, error } = await supabase
        .from('categoria')
        .update({
            nombre_categoria: categoria.nombre_categoria,
            descripcion_categoria: categoria.descripcion_categoria,
            url_categoria: categoria.url_categoria
        })
        .eq('id_categoria', categoria.id_categoria)
        .select()
        .single();

    if (error) throw error;
    return data as Categoria;
};

// Cambiar estado (Activar/Desactivar) - Soft Delete
export const toggleCategoriaStatus = async (id: number, nuevoEstado: boolean): Promise<void> => {
    const { error } = await supabase
        .from('categoria')
        .update({ estado_categoria: nuevoEstado })
        .eq('id_categoria', id);

    if (error) throw error;
};
