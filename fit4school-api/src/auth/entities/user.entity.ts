import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from './student.entity';

@Entity('tbl_user')
export class User {
  @PrimaryColumn()
  user_id: string;

  @Column()
  fname: string;

  @Column()
  lname: string;

  @Column({
    type: 'enum',
    enum: ['parent', 'legal guardian', 'grandparent', 'older sibling', 'student'],
  })
  roles: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive'],
    default: 'inactive',
  })
  status: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column()
  contact_number: string;

  @Column({ nullable: true })
  student_id: number;

  @ManyToOne(() => Student, { nullable: true })
  @JoinColumn({ name: 'student_id' })
  student: Student;
}