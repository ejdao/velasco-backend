import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { EstadoProductoCode } from '@ctypes/alquiler-maquinaria/producto';
import { TerceroOrm } from '@orm/seguridad';
import { ProductoOrm } from './producto.orm';

@Entity('ALQMAQPRODSTOCK')
export class ProductoStockOrm {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'int' })
  id!: number;

  @Column({ name: 'CODIGO', length: 30, unique: true })
  codigo!: string;

  @Column({ name: 'ALQMAQPRODUCTO', type: 'int' })
  productoId!: number;

  @ManyToOne(() => ProductoOrm, producto => producto.stocks)
  @JoinColumn({ name: 'ALQMAQPRODUCTO' })
  producto!: ProductoOrm;

  @Column({ name: 'GENTERCERO', type: 'int' })
  proveedorId!: number;

  @ManyToOne(() => TerceroOrm)
  @JoinColumn({ name: 'GENTERCERO' })
  proveedor!: TerceroOrm;

  @Column({ name: 'CANTIDAD', type: 'numeric', precision: 5, scale: 2 })
  cantidad!: number;

  @Column({ name: 'FECHAVENCIMIENTO', nullable: true })
  fechaVencimiento!: Date;

  @Column({ name: 'ESTADO', type: 'smallint' })
  estadoCode!: EstadoProductoCode;
}
