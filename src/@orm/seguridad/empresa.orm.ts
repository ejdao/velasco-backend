import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { UsuarioOrm } from './usuario.orm';
import { type TipoTerceroCode } from '@ctypes/general/tercero';

@Entity('GENEMPRESA')
export class EmpresaOrm {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'smallint' })
  id!: number;

  @Column({ name: 'CODIGO', length: 20, unique: true })
  codigo!: string;

  @Column({ name: 'DOCUMENTO', length: 20, unique: true })
  documento!: string;

  @Column({ name: 'TIPOTER', type: 'smallint' })
  tipoCode!: TipoTerceroCode;

  @Column({ name: 'NOMBRE', length: 100 })
  nombre!: string;

  @Column({ name: 'UBIMUNICI', type: 'int' })
  municipioId!: number;

  @Column({ name: 'DIRECCION', length: 150 })
  direccion!: string;

  @ManyToMany(() => UsuarioOrm, usuario => usuario.empresas)
  usuarios!: UsuarioOrm[];
}
