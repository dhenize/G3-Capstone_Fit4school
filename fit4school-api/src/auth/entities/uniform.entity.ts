import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Measurement } from './measurement.entity';

@Entity('tbl_itemlist')
export class Uniform {
  @PrimaryColumn({ name: 'item_id' })
  itemId: string;

  @Column({ name: 'measurement_id', nullable: true })
  measurementId: string;

  @Column({ name: 'uniform_type', type: 'enum', enum: ['polo', 'pants', 'blouse', 'skirt', 'vest'], nullable: true })
  uniformType: string;

  @Column({ name: 'image_path' })
  imagePath: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => Measurement, measurement => measurement.uniform)
  measurements: Measurement[];
}