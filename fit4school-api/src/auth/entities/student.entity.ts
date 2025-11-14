import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_stud')
export class Student {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column()
  fname: string;

  @Column()
  midname: string;

  @Column()
  lname: string;

  @Column()
  birthdate: Date;

  @Column({
    type: 'enum',
    enum: ['male', 'female'],
  })
  gender: string;
}