export class EstadoPedido {
    id_estado_pedido?: number;
    nombre_estado: string;

    constructor(data: Partial<EstadoPedido>) {
        this.id_estado_pedido = data.id_estado_pedido;
        this.nombre_estado = data.nombre_estado || '';
    }
}
