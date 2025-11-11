import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: any) {
    return this.authService.signup(body);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: { email: string; code: string }) {
    return this.authService.verifyOtp(body.email, body.code);
  }

  @Post('resend-otp')
  async resendOtp(@Body() body: { email: string }) {
    return this.authService.resendOtp(body.email);
  }

  @Post('verify-student')
  async verifyStudent(@Body() body: { userId: number; studentId: number; role: string }) {
    return this.authService.verifyStudentAndCompleteProfile(body.userId, body.studentId, body.role);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Get('student/:studentId')
  async getStudent(@Param('studentId') studentId: number) {
    const student = await this.authService.verifyStudentExists(studentId);
    return { 
      exists: !!student, 
      student: student || null 
    };
  }

  @Get('check-email/:email')
  async checkEmail(@Param('email') email: string) {
    const user = await this.authService.checkEmailExists(email);
    return { exists: !!user };
  }
}