import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioOrm } from './usuario.orm';
import type { EstadoUsuarioCode } from '@ctypes/general/usuario';
import { ObraOrm } from '@orm/alquiler-maquinaria';

@Entity('GENTERCERO')
export class TerceroOrm {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'int' })
  id!: number;

  @Column({ name: 'NIT', length: 20, unique: true })
  nit!: string;

  @Column({ name: 'NOMBRE', length: 150 })
  nombre!: string;

  @Column({ name: 'UBIMUNICI', type: 'int' })
  municipioId!: number;

  @Column({ name: 'DIRECCION', length: 150 })
  direccion!: string;

  @Column({ name: 'ESTADO', type: 'smallint' })
  estadoCode!: EstadoUsuarioCode;

  @OneToMany(() => UsuarioOrm, usuario => usuario.terceros)
  usuarios!: UsuarioOrm[];

  @OneToMany(() => ObraOrm, obra => obra.tercero)
  obras!: ObraOrm[];
}
