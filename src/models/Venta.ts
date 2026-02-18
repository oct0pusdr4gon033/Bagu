import type { Cliente } from './Cliente';
import type { EstadoPedido } from './EstadoPedido';
import type { DetalleVenta } from './DetalleVenta';

export class Venta {
    id_venta?: number;
    id_comprador?: string; // dni field from Cliente
    id_estado?: number;
    total_venta: number;
    fecha_venta?: Date;
    direccion_envio?: string;
    notas?: string;

    // Relations
    cliente?: Cliente;
    estado_pedido?: EstadoPedido;
    detalles?: DetalleVenta[];

    constructor(data: Partial<Venta>) {
        this.id_venta = data.id_venta;
        this.id_comprador = data.id_comprador;
        this.id_estado = data.id_estado;
        this.total_venta = data.total_venta || 0;
        this.fecha_venta = data.fecha_venta ? new Date(data.fecha_venta) : undefined;
        this.direccion_envio = data.direccion_envio;
        this.notas = data.notas;

        this.cliente = data.cliente;
        this.estado_pedido = data.estado_pedido;
        this.detalles = data.detalles;
    }
}
