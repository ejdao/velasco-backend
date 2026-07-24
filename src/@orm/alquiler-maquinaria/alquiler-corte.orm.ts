import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ItemAlquilerOrm } from './producto-alquiler.orm';
import { AlquilerOrm } from './alquiler.orm';

@Entity('ALQMAQPRODALQUICORT')
export class AlquilerCorteOrm {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'int' })
  id!: number;

  @Column({ name: 'ALQMAQPRODALQUILER', type: 'int' })
  alquilerId!: number;

  @ManyToOne(() => AlquilerOrm, alquiler => alquiler.cortes)
  @JoinColumn({ name: 'ALQMAQPRODALQUILER' })
  alquiler!: AlquilerOrm;

  @Column({ name: 'FECHAINICIO' })
  fechaInicio!: Date;

  @Column({ name: 'FECHAFIN' })
  fechaFin!: Date;
}
