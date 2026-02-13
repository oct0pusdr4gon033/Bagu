import type { Cliente } from './Cliente';
import type { TipoPedido } from './TipoPedido';
import type { DetalleVenta } from './DetalleVenta';

export class Venta {
    id_venta?: number;
    id_comprador?: string; // dni field from Cliente
    id_tipo_pedido?: number;
    total_venta: number;
    fecha_venta?: Date;
    direccion_envio?: string;
    notas?: string;

    // Relations
    cliente?: Cliente;
    tipo_pedido?: TipoPedido;
    detalles?: DetalleVenta[];

    constructor(data: Partial<Venta>) {
        this.id_venta = data.id_venta;
        this.id_comprador = data.id_comprador;
        this.id_tipo_pedido = data.id_tipo_pedido;
        this.total_venta = data.total_venta || 0;
        this.fecha_venta = data.fecha_venta ? new Date(data.fecha_venta) : undefined;
        this.direccion_envio = data.direccion_envio;
        this.notas = data.notas;

        this.cliente = data.cliente;
        this.tipo_pedido = data.tipo_pedido;
        this.detalles = data.detalles;
    }
}
