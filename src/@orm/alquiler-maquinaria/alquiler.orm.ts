import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ItemAlquilerOrm } from './producto-alquiler.orm';
import { AlquilerCorteOrm } from './alquiler-corte.orm';
import { ObraOrm } from './obra.orm';

@Entity('ALQMAQPRODALQUILER')
export class AlquilerOrm {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'int' })
  id!: number;

  @Column({ name: 'ALQMAQOBRA', type: 'int' })
  obraId!: number;

  @ManyToOne(() => ObraOrm, obra => obra.alquileres)
  @JoinColumn({ name: 'ALQMAQOBRA' })
  obra!: ObraOrm;

  @Column({ name: 'FECHAINICIO' })
  fechaInicio!: Date;

  @Column({ name: 'FECHAFIN', nullable: true })
  fechaFin!: Date;

  @OneToMany(() => AlquilerCorteOrm, corte => corte.alquiler)
  cortes!: AlquilerCorteOrm[];

  @OneToMany(() => ItemAlquilerOrm, detalle => detalle.alquiler)
  detalle!: ItemAlquilerOrm[];
}
