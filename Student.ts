export class Student {
    nombre: string;
    codigo: number;
    cedula: number;
    fechaNacimiento: Date;
    direccion: string;
    telefono: string;
    fotoUrl: string;


    constructor(nombre: string, codigo: number, cedula: number, fechaNacimiento: Date, direccion: string, telefono: string, fotoUrl: string) {
        this.nombre = nombre;
        this.codigo = codigo;
        this.cedula = cedula;
        this.fechaNacimiento = fechaNacimiento;
        this.direccion = direccion;
        this.telefono = telefono;
        this.fotoUrl = fotoUrl;
    }
}
