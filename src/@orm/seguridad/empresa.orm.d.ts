import { UsuarioOrm } from './usuario.orm';
export declare class EmpresaOrm {
    id: number;
    codigo: string;
    nombre: string;
    usuarios: UsuarioOrm[];
}
