// models/ProductoCard.ts
export class ProductoCard {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
    precio_oferta?: number; // Optional
    en_oferta?: boolean;    // Optional
    destacado?: boolean;    // Optional

    constructor(
        id: number,
        nombre: string,
        precio: number,
        imagen: string,
        precio_oferta?: number,
        en_oferta?: boolean,
        destacado?: boolean
    ) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.precio_oferta = precio_oferta;
        this.en_oferta = en_oferta;
        this.destacado = destacado;
    }
}
