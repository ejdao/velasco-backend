import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoriaProductoOrm } from './producto-categoria.orm';
import { TarifaProductoOrm } from './producto-tarifa.orm';
import { ProductoStockOrm } from './producto-stock.orm';

@Entity('ALQMAQPRODUCTO')
export class ProductoOrm {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'int' })
  id!: number;

  @Column({ name: 'NOMBRE', length: 150 })
  nombre!: string;

  @Column({ name: 'DESCRIPCION', length: 500, nullable: true })
  descripcion!: string;

  @Column({ name: 'ALQMAQPRODCATEGORIA', type: 'smallint' })
  categoriaId!: number;

  @ManyToOne(() => CategoriaProductoOrm, categoria => categoria.productos)
  @JoinColumn({ name: 'ALQMAQPRODCATEGORIA' })
  categoria!: CategoriaProductoOrm;

  @Column({ name: 'ALQMAQPRODTARIFA', type: 'int', nullable: true })
  tarifaActualId!: number;

  @ManyToOne(() => TarifaProductoOrm)
  @JoinColumn({ name: 'ALQMAQPRODTARIFA' })
  tarifaActual!: TarifaProductoOrm;

  @OneToMany(() => TarifaProductoOrm, tarifa => tarifa.producto)
  tarifas!: TarifaProductoOrm[];

  @OneToMany(() => ProductoStockOrm, stock => stock.producto)
  stocks!: ProductoStockOrm[];
}
