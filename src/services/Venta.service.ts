import { supabase } from "../lib/supabase";
import { Venta } from "../models/Venta";
import { DetalleVenta } from "../models/DetalleVenta";
import { EstadoPedido } from "../models/EstadoPedido";

export class VentaService {

    // Fetch all sales with relations
    static async getAll(): Promise<Venta[]> {
        const { data, error } = await supabase
            .from('venta')
            .select(`
                *,
                cliente:id_comprador (*),
                estado_pedido:id_estado (*),
                detalles:detalle_venta (
                    *,
                    producto:id_producto (*),
                    color:id_color (*)
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
                estado_pedido:id_estado (*),
                detalles:detalle_venta (
                    *,
                    producto:id_producto (*),
                    color:id_color (*)
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
            console.log("Attempting to create sale:", venta); // LOG DATA

            // 1. Insert Venta
            const { data: newVenta, error: ventaError } = await supabase
                .from('venta')
                .insert([venta])
                .select()
                .single();

            if (ventaError) {
                console.error("Supabase Error creating Venta:", ventaError);
                console.error("Error Code:", ventaError.code);
                console.error("Error Details:", ventaError.details);
                console.error("Error Hint:", ventaError.hint);
                throw ventaError;
            }
            if (!newVenta) throw new Error("Sale creation failed");

            const ventaId = newVenta.id_venta;
            console.log("Sale created successfully, ID:", ventaId);

            // 2. Insert Details
            if (detalles.length > 0) {
                const detallesWithId = detalles.map(d => ({
                    id_venta: ventaId,
                    id_producto: d.id_producto,
                    cantidad: d.cantidad,
                    precio_unitario: d.precio_unitario,
                    id_color: d.id_color
                }));

                const { error: detallesError } = await supabase
                    .from('detalle_venta')
                    .insert(detallesWithId);

                if (detallesError) {
                    console.error("Supabase Error creating Details:", detallesError);
                    throw detallesError;
                }
            }

            return newVenta as Venta;

        } catch (error) {
            console.error("Error creating sale (catch block):", error);
            throw error;
        }
    }

    // Update sale status
    static async updateStatus(id: number, id_estado: number): Promise<void> {
        console.log(`[VentaService] Updating status for ID ${id} to ${id_estado}`);
        const { error } = await supabase
            .from('venta')
            .update({ id_estado })
            .eq('id_venta', id);

        if (error) {
            console.error("Error updating sale status:", error);
            throw error;
        }
    }

    // Get all order types
    static async getEstadosPedido(): Promise<EstadoPedido[]> {
        const { data, error } = await supabase
            .from('estado_pedido')
            .select('*')
            .order('id_estado', { ascending: true });

        if (error) {
            console.error("Error fetching order states:", error);
            throw error;
        }

        return data as EstadoPedido[];
    }
}
