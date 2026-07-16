import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductoOrm } from './producto.orm';

@Entity('ALQMAQPRODTARIFA')
export class TarifaProductoOrm {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'int' })
  id!: number;

  @Column({ name: 'ALQMAQPRODUCTO', type: 'int' })
  productoId!: number;

  @ManyToOne(() => ProductoOrm, producto => producto.tarifas)
  @JoinColumn({ name: 'ALQMAQPRODUCTO' })
  producto!: ProductoOrm;

  @Column({ name: 'VALOR', type: 'numeric', precision: 14, scale: 2 })
  valor!: number;

  @Column({ name: 'FECHAINICIO' })
  fechaInicio!: Date;

  @Column({ name: 'FECHAFIN', nullable: true })
  fechaFin!: Date;
}
