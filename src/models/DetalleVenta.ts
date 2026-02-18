import { Producto } from './Producto';

export class DetalleVenta {
    id_detalle_venta?: number;
    id_venta?: number;
    id_producto?: number;
    id_color?: number;
    cantidad: number;
    precio_unitario: number;

    // Relations
    producto?: Producto;
    color?: { nombre_color: string; codigo_color: string };

    constructor(data: Partial<DetalleVenta>) {
        this.id_detalle_venta = data.id_detalle_venta;
        this.id_venta = data.id_venta;
        this.id_producto = data.id_producto;
        this.id_color = data.id_color;
        this.cantidad = data.cantidad || 1;
        this.precio_unitario = data.precio_unitario || 0;
        this.producto = data.producto;
        this.color = data.color;
    }
}
