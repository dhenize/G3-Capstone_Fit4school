import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailService } from './email.service';
import { User } from './entities/user.entity';
import { Student } from './entities/student.entity';
import { OTP } from './entities/otp.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Student, OTP]),
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailService],
  exports: [AuthService],
})
export class AuthModule {}