import { Injectable, ConflictException, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { Student } from './entities/student.entity';
import { OTP } from './entities/otp.entity';
import { EmailService } from './email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    
    @InjectRepository(OTP)
    private otpRepository: Repository<OTP>,
    
    private emailService: EmailService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['student']
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (user.status !== 'active') {
      throw new UnauthorizedException('Account is not active. Please complete your registration.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = user;
    
    return {
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
    };
  }

  async initiateSignup(signupData: {
    email: string;
    password: string;
  }) {
    const existingUser = await this.userRepository.findOne({
      where: { email: signupData.email }
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(signupData.password, 12);
    const userId = 'USR' + Date.now();

    const user = this.userRepository.create({
      user_id: userId,
      fname: 'Pending',
      lname: 'Pending',
      email: signupData.email,
      password: hashedPassword,
      contact_number: 'Pending',
      status: 'inactive',
      roles: 'parent',
    });

    await this.userRepository.save(user);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.otpRepository.delete({ email: signupData.email });

    const otpRecord = this.otpRepository.create({
      email: signupData.email,
      code: otp,
      expires_at: expiresAt,
      used: false,
    });

    await this.otpRepository.save(otpRecord);

    const emailSent = await this.emailService.sendOtpEmail(signupData.email, otp);

    return {
      success: true,
      message: emailSent ? 'OTP sent to your email' : 'Signup initiated but email failed',
      user_id: userId,
      email: signupData.email,
      test_otp: process.env.NODE_ENV === 'development' ? otp : undefined,
    };
  }

  async verifyOtp(email: string, code: string) {
    const otpRecord = await this.otpRepository.findOne({
      where: { email, code, used: false }
    });

    if (!otpRecord) {
      throw new BadRequestException('Invalid OTP');
    }

    if (new Date() > otpRecord.expires_at) {
      throw new BadRequestException('OTP expired');
    }

    otpRecord.used = true;
    await this.otpRepository.save(otpRecord);

    return {
      success: true,
      message: 'OTP verified successfully',
    };
  }

  async resendOtp(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.otpRepository.delete({ email });

    const otpRecord = this.otpRepository.create({
      email,
      code: otp,
      expires_at: expiresAt,
      used: false,
    });

    await this.otpRepository.save(otpRecord);

    const emailSent = await this.emailService.sendOtpEmail(email, otp);

    return {
      success: true,
      message: emailSent ? 'New OTP sent to your email' : 'Failed to send OTP',
      test_otp: process.env.NODE_ENV === 'development' ? otp : undefined,
    };
  }

  async completeProfile(profileData: {
    email: string;
    firstName: string;
    lastName: string;
    contactNumber: string;
    role: string;
  }) {
    const user = await this.userRepository.findOne({
      where: { email: profileData.email }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.fname = profileData.firstName;
    user.lname = profileData.lastName;
    user.contact_number = profileData.contactNumber;
    user.roles = profileData.role;
    user.status = 'active';

    await this.userRepository.save(user);

    return {
      success: true,
      message: 'Profile completed',
      user_id: user.user_id,
    };
  }

  async checkStudent(studentId: number) {
    const student = await this.studentRepository.findOne({
      where: { student_id: studentId }
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const fullName = `${student.fname} ${student.midname} ${student.lname}`.trim();

    return {
      exists: true,
      student: {
        id: student.student_id,
        full_name: fullName,
        first_name: student.fname,
        middle_name: student.midname,
        last_name: student.lname,
        birthdate: student.birthdate,
        gender: student.gender,
      },
    };
  }

  async verifyStudent(userId: string, studentId: number, role: string) {
    const student = await this.studentRepository.findOne({
      where: { student_id: studentId }
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const user = await this.userRepository.findOne({
      where: { user_id: userId }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ 
        student_id: studentId,
        roles: role 
      })
      .where("user_id = :userId", { userId })
      .execute();

    return {
      success: true,
      message: 'Student verification successful',
      student_name: student.fname + ' ' + student.lname,
    };
  }
}