import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import type { CategoriaProductoCode } from '@ctypes/alquiler-maquinaria/producto';
import { TarifaProductoOrm } from './producto-tarifa.orm';
import { ProductoStockOrm } from './producto-stock.orm';

@Entity('ALQMAQPRODUCTO')
export class ProductoOrm {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'int' })
  id!: number;

  @Column({ name: 'CODIGO', length: 30, unique: true })
  codigo!: string;

  @Column({ name: 'NOMBRE', length: 150 })
  nombre!: string;

  @Column({ name: 'DESCRIPCION', length: 500, nullable: true })
  descripcion!: string;

  @Column({ name: 'ALQMAQPRODCATEGORIA', type: 'smallint' })
  categoriaCode!: CategoriaProductoCode;

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
