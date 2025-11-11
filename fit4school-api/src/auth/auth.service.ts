import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Student } from '../entities/student.entity';
import { Otp } from '../entities/otp.entity';
import { EmailService } from '../email/email.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
    @InjectRepository(Otp)
    private otpRepo: Repository<Otp>,
    private emailService: EmailService,
  ) {}

  async signup(data: any) {
    const { fname, lname, email, password, contact_number } = data;

    const exists = await this.userRepo.findOne({ where: { email } });
    if (exists) throw new BadRequestException('Email already registered');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepo.create({
      fname,
      lname,
      email,
      password: hashedPassword,
      contact_number,
      roles: 'user_pr',
      status: 'unverified',
    });

    const savedUser = await this.userRepo.save(newUser);

    const otpResult = await this.sendOtp(email);

    return {
      message: 'Signup successful. OTP sent to your email.',
      user_id: savedUser.user_id,
      email: savedUser.email,
      expires_at: otpResult.expires_at,
      test_otp: otpResult.test_otp,
    };
  }

  async sendOtp(email: string) {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    const otp = this.otpRepo.create({
      email,
      code: otpCode,
      expires_at: expiresAt,
    });
    await this.otpRepo.save(otp);

    await this.emailService.sendOtpEmail(email, otpCode);

    const result: any = { 
      message: 'OTP sent to email',
      expires_at: expiresAt,
    };

    if (process.env.NODE_ENV === 'development') {
      result.test_otp = otpCode;
    }

    return result;
  }

  async verifyOtp(email: string, code: string) {
    const otp = await this.otpRepo.findOne({
      where: { email, code, used: false },
      order: { created_at: 'DESC' },
    });

    if (!otp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (new Date() > otp.expires_at) {
      throw new BadRequestException('OTP has expired');
    }


    otp.used = true;
    await this.otpRepo.save(otp);

    await this.userRepo.update({ email }, { status: 'active' });

    const user = await this.userRepo.findOne({ 
      where: { email },
      select: ['user_id', 'fname', 'lname', 'email', 'status']
    });

    if (!user) {
      throw new NotFoundException('User not found after OTP verification');
    }

    return { 
      message: 'Email verified successfully',
      user: user
    };
  }

  async verifyStudentExists(studentId: number) {
    const student = await this.studentRepo.findOne({
      where: { student_id: studentId },
    });
    return student;
  }

  async verifyStudentAndCompleteProfile(userId: number, studentId: number, role: string) {
    const student = await this.studentRepo.findOne({
      where: { student_id: studentId },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const roleMap = {
      'Parent': 'user_pr',
      'Guardian': 'user_gp',
      'Student': 'user_std'
    };

    const dbRole = roleMap[role] || 'user_pr';

    await this.userRepo.update(userId, {
      student_id: studentId,
      roles: dbRole,
    });

    const updatedUser = await this.userRepo.findOne({
      where: { user_id: userId },
      relations: ['student'],
    });

    if (!updatedUser) {
      throw new NotFoundException('User not found after update');
    }

    return {
      message: 'Student verified and profile completed successfully',
      student_name: student.full_name,
      user: {
        user_id: updatedUser.user_id,
        fname: updatedUser.fname,
        lname: updatedUser.lname,
        email: updatedUser.email,
        role: updatedUser.roles,
        student_id: updatedUser.student_id,
        student_name: student.full_name,
      },
    };
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({
      where: { email },
      relations: ['student'],
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    if (user.status !== 'active') {
      throw new BadRequestException('Account not verified. Please verify your email first.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    return {
      message: 'Login successful',
      user: {
        user_id: user.user_id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        role: user.roles,
        student_name: user.student?.full_name,
        student_id: user.student_id,
      },
    };
  }

  async resendOtp(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Email not found');
    }

    return await this.sendOtp(email);
  }

  async checkEmailExists(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    return user;
  }
}