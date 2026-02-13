import { supabase } from "../lib/supabase";
import { Venta } from "../models/Venta";
import { DetalleVenta } from "../models/DetalleVenta";
import { TipoPedido } from "../models/TipoPedido";

export class VentaService {

    // Fetch all sales with relations
    static async getAll(): Promise<Venta[]> {
        const { data, error } = await supabase
            .from('venta')
            .select(`
                *,
                cliente:id_comprador (*),
                tipo_pedido:id_tipo_pedido (*),
                detalles:detalle_venta (
                    *,
                    producto:id_producto (*)
                )
            `)
            .order('fecha_venta', { ascending: false });

        if (error) {
            console.error("Error fetching sales:", error);
            throw error;
        }

        return data as Venta[];
    }

    // Get sale by ID
    static async getById(id: number): Promise<Venta | null> {
        const { data, error } = await supabase
            .from('venta')
            .select(`
                *,
                cliente:id_comprador (*),
                tipo_pedido:id_tipo_pedido (*),
                detalles:detalle_venta (
                    *,
                    producto:id_producto (*)
                )
            `)
            .eq('id_venta', id)
            .single();

        if (error) {
            console.error("Error fetching sale by id:", error);
            return null;
        }

        return data as Venta;
    }

    // Create a new sale with details (Transaction-like)
    static async create(venta: Partial<Venta>, detalles: Partial<DetalleVenta>[]): Promise<Venta | null> {
        try {
            // 1. Insert Venta
            const { data: newVenta, error: ventaError } = await supabase
                .from('venta')
                .insert([venta])
                .select()
                .single();

            if (ventaError) throw ventaError;
            if (!newVenta) throw new Error("Sale creation failed");

            const ventaId = newVenta.id_venta;

            // 2. Insert Details
            if (detalles.length > 0) {
                const detallesWithId = detalles.map(d => ({
                    ...d,
                    id_venta: ventaId
                }));

                const { error: detallesError } = await supabase
                    .from('detalle_venta')
                    .insert(detallesWithId);

                if (detallesError) throw detallesError;
            }

            return newVenta as Venta;

        } catch (error) {
            console.error("Error creating sale:", error);
            throw error;
        }
    }

    // Update sale status
    static async updateStatus(id: number, id_tipo_pedido: number): Promise<void> {
        const { error } = await supabase
            .from('venta')
            .update({ id_tipo_pedido })
            .eq('id_venta', id);

        if (error) {
            console.error("Error updating sale status:", error);
            throw error;
        }
    }

    // Get all order types
    static async getTiposPedido(): Promise<TipoPedido[]> {
        const { data, error } = await supabase
            .from('tipo_pedido')
            .select('*')
            .order('id_tipo_pedido', { ascending: true });

        if (error) {
            console.error("Error fetching order types:", error);
            throw error;
        }

        return data as TipoPedido[];
    }
}
