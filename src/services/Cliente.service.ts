import { supabase } from '../lib/supabase';
import { Cliente } from '../models/Cliente';

// Obtener todos los clientes
export const getClientes = async (): Promise<Cliente[]> => {
    const { data, error } = await supabase
        .from('cliente')
        .select('*')
        .order('nombre_cliente', { ascending: true });

    if (error) throw error;
    return data as Cliente[];
};

// Crear un nuevo cliente
export const createCliente = async (cliente: Cliente): Promise<Cliente> => {
    // Validar si ya existe el DNI
    const { data: existing } = await supabase
        .from('cliente')
        .select('dni_cliente')
        .eq('dni_cliente', cliente.dni_cliente)
        .single();

    if (existing) {
        throw new Error(`El cliente con DNI ${cliente.dni_cliente} ya existe.`);
    }

    const { data, error } = await supabase
        .from('cliente')
        .insert([{
            dni_cliente: cliente.dni_cliente,
            nombre_cliente: cliente.nombre_cliente,
            apellido_cliente: cliente.apellido_cliente,
            correo_cliente: cliente.correo_cliente,
            telefono_cliente: cliente.telefono_cliente,
            departamento_cliente: cliente.departamento_cliente,
            ciudad_cliente: cliente.ciudad_cliente,
            direccion_cliente: cliente.direccion_cliente,
            estado_cliente: cliente.estado_cliente ?? true
        }])
        .select()
        .single();

    if (error) throw error;
    return data as Cliente;
};

// Actualizar un cliente existente
export const updateCliente = async (cliente: Cliente): Promise<Cliente> => {
    const { data, error } = await supabase
        .from('cliente')
        .update({
            nombre_cliente: cliente.nombre_cliente,
            apellido_cliente: cliente.apellido_cliente,
            correo_cliente: cliente.correo_cliente,
            telefono_cliente: cliente.telefono_cliente,
            departamento_cliente: cliente.departamento_cliente,
            ciudad_cliente: cliente.ciudad_cliente,
            direccion_cliente: cliente.direccion_cliente
        })
        .eq('dni_cliente', cliente.dni_cliente)
        .select()
        .single();

    if (error) throw error;
    return data as Cliente;
};

// Cambiar estado (Activar/Desactivar) - Soft Delete
export const toggleClienteStatus = async (dni: string, nuevoEstado: boolean): Promise<void> => {
    const { error } = await supabase
        .from('cliente')
        .update({ estado_cliente: nuevoEstado })
        .eq('dni_cliente', dni);

    if (error) throw error;
};
