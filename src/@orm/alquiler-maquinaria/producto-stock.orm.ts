import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductoOrm } from './producto.orm';
import { TerceroOrm } from '@orm/seguridad';
import { ItemAlquilerOrm } from './producto-alquiler.orm';

@Entity('ALQMAQPRODSTOCK')
export class ProductoStockOrm {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'int' })
  id!: number;

  @Column({ name: 'ALQMAQPRODUCTO', type: 'int' })
  productoId!: number;

  @ManyToOne(() => ProductoOrm, producto => producto.stocks)
  @JoinColumn({ name: 'ALQMAQPRODUCTO' })
  producto!: ProductoOrm;

  @Column({ name: 'GENTERCERO', type: 'int' })
  proveedorId!: number;

  @ManyToOne(() => TerceroOrm, proveedor => proveedor.stocks)
  @JoinColumn({ name: 'GENTERCERO' })
  proveedor!: TerceroOrm;

  @Column({ name: 'STOCKORIGINAL', type: 'int' })
  stockOriginal!: number;

  @Column({ name: 'STOCKACTUAL', type: 'int', nullable: true })
  stockDisponible!: number;

  @Column({ name: 'STOCKRESERVADO', type: 'int', nullable: true })
  stockReservado!: number;

  @Column({ name: 'STOCKENALQUILE', type: 'int', nullable: true })
  stockEnAlquiler!: number;

  @Column({ name: 'STOCKENMANTENI', type: 'int', nullable: true })
  stockEnMantenimiento!: number;

  @Column({ name: 'STOCKRETIRADO', type: 'int', nullable: true })
  stockRetirado!: number;

  @OneToMany(() => ItemAlquilerOrm, alquiler => alquiler.stock)
  alquileres!: ItemAlquilerOrm[];
}
