export class Cliente {

    dni_cliente: string;
    nombre_cliente: string;
    apellido_cliente: string;
    correo_cliente: string;
    telefono_cliente: string;
    departamento_cliente: string;
    ciudad_cliente: string;
    direccion_cliente: string;
    estado_cliente: boolean;

    constructor(
        dni_cliente: string,
        nombre_cliente: string,
        apellido_cliente: string,
        correo_cliente: string,
        telefono_cliente: string,
        departamento_cliente: string,
        ciudad_cliente: string,
        direccion_cliente: string,
        estado_cliente: boolean
    ) {
        this.dni_cliente = dni_cliente;
        this.nombre_cliente = nombre_cliente;
        this.apellido_cliente = apellido_cliente;
        this.correo_cliente = correo_cliente;
        this.telefono_cliente = telefono_cliente;
        this.departamento_cliente = departamento_cliente;
        this.ciudad_cliente = ciudad_cliente;
        this.direccion_cliente = direccion_cliente;
        this.estado_cliente = estado_cliente;
    }

}