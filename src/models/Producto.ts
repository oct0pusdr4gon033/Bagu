export class Producto {
    id_producto?: number;
    nombre_producto: string;
    descripcion_producto: string;
    precio_base: number;
    imagen_url: string; // Changed from imagen to match DB
    estado_producto: "ACTIVO" | "INACTIVO" | "disponible"; // added disponible as it is default in DB
    id_categoria?: number;
    id_genero?: number;
    id_tamano?: number; // Changed from id_tamaño to match DB (often DB uses ascii) but SQL says id_tamano
    precio_oferta?: number;
    en_oferta?: boolean;
    destacado?: boolean;
    created_at?: Date;

    // Optional: relations for UI display
    categoria?: { nombre_categoria: string };
    imagenes?: { id_imagen: number; imagen_url: string }[]; // Relation from producto_imagen

    constructor(data: Partial<Producto>) {
        this.id_producto = data.id_producto;
        this.nombre_producto = data.nombre_producto || '';
        this.descripcion_producto = data.descripcion_producto || '';
        this.precio_base = data.precio_base || 0;
        this.imagen_url = data.imagen_url || '';
        this.estado_producto = data.estado_producto || 'ACTIVO';
        this.id_categoria = data.id_categoria;
        this.id_genero = data.id_genero;
        this.id_tamano = data.id_tamano;
        this.precio_oferta = data.precio_oferta;
        this.en_oferta = data.en_oferta;
        this.destacado = data.destacado;
        this.created_at = data.created_at;
        this.imagenes = data.imagenes;
    }
}
