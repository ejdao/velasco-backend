import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ name: 'FECHAFIN', nullable: true })
  fechaFin!: Date;

  @Column({ name: 'TOTALFACTU', type: 'numeric', precision: 14, scale: 2 })
  totalFacturado!: number;

  @Column({ name: 'OBSERVACION', type: 'varchar', length: 500, nullable: true })
  observacion!: string;
}
