import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductoOrm } from './producto.orm';

@Entity('ALQMAQPRODCATEGORIA')
export class CategoriaProductoOrm {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'smallint' })
  id!: number;

  @Column({ name: 'CODIGO', length: 10, unique: true })
  codigo!: string;

  @Column({ name: 'NOMBRE', length: 100 })
  nombre!: string;

  @OneToMany(() => ProductoOrm, producto => producto.categoria)
  productos!: ProductoOrm[];
}
