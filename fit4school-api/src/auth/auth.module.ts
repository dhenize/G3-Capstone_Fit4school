import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmailService } from '../email/email.service';
import { User } from '../entities/user.entity';
import { Student } from '../entities/student.entity';
import { Otp } from '../entities/otp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Student, Otp])],
  providers: [AuthService, EmailService],
  controllers: [AuthController],
})
export class AuthModule {}