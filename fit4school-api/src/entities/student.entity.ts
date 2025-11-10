import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('tbl_stud')
export class Student {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column({ length: 300 })
  full_name: string;

  @Column({ type: 'date' })
  birthdate: string;

  @Column({ type: 'enum', enum: ['male', 'female'] })
  gender: string;

  @OneToOne(() => User, (user) => user.student)
  user?: User;
}
