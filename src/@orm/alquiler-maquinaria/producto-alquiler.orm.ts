import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductoStockOrm } from './producto-stock.orm';
import { AlquilerOrm } from './alquiler.orm';

@Entity('ALQMAQPRODALQUITEM')
export class ItemAlquilerOrm {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'int' })
  id!: number;

  @Column({ name: 'ALQMAQPRODALQUILER', type: 'int' })
  alquilerId!: number;

  @ManyToOne(() => AlquilerOrm, alquiler => alquiler.detalle)
  @JoinColumn({ name: 'ALQMAQPRODALQUILER' })
  alquiler!: AlquilerOrm;

  @Column({ name: 'ALQMAQPRODSTOCK', type: 'int' })
  stockId!: number;

  @ManyToOne(() => ProductoStockOrm, stock => stock.alquileres)
  @JoinColumn({ name: 'ALQMAQPRODSTOCK' })
  stock!: ProductoStockOrm;

  @Column({ name: 'CANTIDAD', type: 'int' })
  cantidad!: number;

  @Column({ name: 'VALORTARIFA', type: 'numeric', precision: 14, scale: 2 })
  valorTarifa!: number;
}
