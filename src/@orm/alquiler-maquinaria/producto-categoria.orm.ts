import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductoOrm } from './producto.orm';

@Entity('ALQMAQPRODCATEGORIA')
export class CategoriaProductoOrm {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'smallint' })
  id!: number;

  @Column({ name: 'NOMBRE', length: 100, unique: true })
  nombre!: string;

  @Column({ name: 'DESCRIPCION', length: 500, nullable: true })
  descripcion!: string;

  @OneToMany(() => ProductoOrm, producto => producto.categoria)
  productos!: ProductoOrm[];
}
