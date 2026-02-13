export class TipoPedido {
    id_tipo_pedido?: number;
    nombre_tipo: string;

    constructor(data: Partial<TipoPedido>) {
        this.id_tipo_pedido = data.id_tipo_pedido;
        this.nombre_tipo = data.nombre_tipo || '';
    }
}
