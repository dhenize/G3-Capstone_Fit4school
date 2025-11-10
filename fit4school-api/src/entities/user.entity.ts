import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Student } from './student.entity';

@Entity('tbl_user')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 150 })
  fname: string;

  @Column({ length: 150 })
  lname: string;

  @Column({
    type: 'enum',
    enum: ['user_pr', 'user_gp', 'user_lg', 'user_ols', 'user_std', 'admin', 'accountant'],
  })
  roles: string;

  @Column()
  password: string;

  @Column({ length: 20 })
  contact_number: string;

  @Column({ unique: true, length: 150 })
  email: string;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'unverified'],
    default: 'unverified',
  })
  status: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToOne(() => Student, (student) => student.user, { nullable: true })
  @JoinColumn({ name: 'student_id' })
  student?: Student;
}
