import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async signup(data: any) {
    const { fname, lname, email, password, contact_number, roles } = data;

    //If user already exists
    const exists = await this.userRepo.findOne({ where: { email } });
    if (exists) throw new Error('Email already registered');

    // Encrypt password
    const hashed = await bcrypt.hash(password, 10);

    const newUser = this.userRepo.create({
      fname,
      lname,
      email,
      password: hashed,
      contact_number,
      roles,
      status: 'unverified',
    });

    return this.userRepo.save(newUser);
  }
}
