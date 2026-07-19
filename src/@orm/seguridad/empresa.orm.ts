import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { UsuarioOrm } from './usuario.orm';

@Entity('GENEMPRESA')
export class EmpresaOrm {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'smallint' })
  id!: number;

  @Column({ name: 'CODIGO', length: 10, unique: true })
  codigo!: string;

  @Column({ name: 'NOMBRE', length: 100 })
  nombre!: string;

  @ManyToMany(() => UsuarioOrm, usuario => usuario.empresas)
  usuarios!: UsuarioOrm[];
}
