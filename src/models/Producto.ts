
export class Producto {
    private _id_producto?: number;
    private _nombre_producto: string;
    private _descripcion_producto: string;
    private _precio_base: number;
    private _imagen: string;
    private _estado_producto: "ACTIVO" | "INACTIVO";
    //private _id_categoria?: number;
    //private _id_genero?: number;
    //private _id_tamaño?: number;
    //private _created_at?: Date;

    constructor(
        nombre_producto: string,
        descripcion_producto: string,
        precio_base: number,
        imagen: string
    ) {
        this._nombre_producto = nombre_producto;
        this._descripcion_producto = descripcion_producto;
        this._precio_base = precio_base;
        this._imagen = imagen;
        this._estado_producto = "ACTIVO"; // default inteligente
    }

    // ===== GETTERS =====
    get id_producto() {
        return this._id_producto;
    }

    get nombre_producto() {
        return this._nombre_producto;
    }

    get descripcion_producto() {
        return this._descripcion_producto;
    }

    get precio_base() {
        return this._precio_base;
    }

    get imagen() {
        return this._imagen;
    }

    get estado_producto() {
        return this._estado_producto;
    }

    // ===== SETTERS =====
    set nombre_producto(value: string) {
        this._nombre_producto = value;
    }

    set descripcion_producto(value: string) {
        this._descripcion_producto = value;
    }

    set precio_base(value: number) {
        if (value <= 0) {
            throw new Error("El precio debe ser mayor a 0");
        }
        this._precio_base = value;
    }

    set imagen(value: string) {
        this._imagen = value;
    }

    set estado_producto(value: "ACTIVO" | "INACTIVO") {
        this._estado_producto = value;
    }
}
