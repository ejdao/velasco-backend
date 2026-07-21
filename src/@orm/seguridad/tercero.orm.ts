import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import type { EstadoUsuarioCode } from '@ctypes/general/usuario';
import type { TipoTerceroCode } from '@ctypes/general/tercero';
import { MunicipioOrm } from '@orm/shared/ubicacion';
import { ObraOrm, ProductoStockOrm } from '@orm/alquiler-maquinaria';
import { UsuarioOrm } from './usuario.orm';

@Entity('GENTERCERO')
export class TerceroOrm {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'int' })
  id!: number;

  @Column({ name: 'TIPOPER', type: 'smallint' })
  tipoCode!: TipoTerceroCode;

  @Column({ name: 'NIT', length: 20, unique: true })
  nit!: string;

  @Column({ name: 'NOMBRE', length: 150 })
  nombre!: string;

  @Column({ name: 'UBIMUNICI', type: 'int' })
  municipioId!: number;

  @Column({ name: 'DIRECCION', length: 150 })
  direccion!: string;

  @Column({ name: 'ESTADO', type: 'smallint' })
  estadoCode!: EstadoUsuarioCode;

  @ManyToMany(() => UsuarioOrm, usuario => usuario.terceros)
  usuarios!: UsuarioOrm[];

  @OneToMany(() => ObraOrm, obra => obra.tercero)
  obras!: ObraOrm[];

  @OneToMany(() => ProductoStockOrm, stock => stock.proveedor)
  stocks!: ProductoStockOrm[];

  municipio!: MunicipioOrm;
}
