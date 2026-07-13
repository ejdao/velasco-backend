import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { EstadoObraCode } from '@ctypes/general/obra';
import { TerceroOrm, UsuarioOrm } from '@orm/seguridad';

@Entity('ALQMAQOBRA')
export class ObraOrm {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'int' })
  id!: number;

  @Column({ name: 'NOMBRE', length: 150 })
  nombre!: string;

  @Column({ name: 'GENTERCERO', type: 'int' })
  terceroId!: number;

  @ManyToOne(() => TerceroOrm, tercero => tercero.obras)
  @JoinColumn({ name: 'GENTERCERO' })
  tercero!: TerceroOrm;

  @Column({ name: 'UBIMUNICI', type: 'int' })
  municipioId!: number;

  @Column({ name: 'DIRECCION', length: 150 })
  direccion!: string;

  @Column({ name: 'GENUSUARIO1', type: 'int' })
  responsableId!: number;

  @ManyToOne(() => UsuarioOrm, usuario => usuario.obrasComoResponsable)
  @JoinColumn({ name: 'GENUSUARIO1' })
  responsable!: UsuarioOrm;

  @Column({ name: 'GENUSUARIO2', type: 'int' })
  vendedorId!: number;

  @ManyToOne(() => UsuarioOrm, usuario => usuario.obrasComoVendedor)
  @JoinColumn({ name: 'GENUSUARIO2' })
  vendedor!: UsuarioOrm;

  @Column({ name: 'ESTADO', type: 'smallint' })
  estadoCode!: EstadoObraCode;

  @Column({ name: 'NOTAS', length: 500, nullable: true })
  notas!: string;
}
