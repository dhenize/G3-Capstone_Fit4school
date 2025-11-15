import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Uniform } from './uniform.entity';

@Entity('tbl_measure')
export class Measurement {
  @PrimaryColumn({ name: 'measure_id' })
  measureId: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  chest: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  shoulder: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  sleeve: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  hips: number;

  @Column({ name: 'overall_height', type: 'decimal', precision: 5, scale: 2 })
  overallHeight: number;

  @Column({ name: 'item_id' })
  itemId: string;

  @Column({ name: 'ref_stud_id' })
  refStudId: string;

  @Column({ type: 'enum', enum: ['male', 'female'], nullable: true })
  gender: string;

  @Column({ type: 'enum', enum: ['preschool', 'elementary', 'junior high'], nullable: true })
  grade: string;

  @ManyToOne(() => Uniform, uniform => uniform.measurements)
  @JoinColumn({ name: 'item_id' })
  uniform: Uniform;
}