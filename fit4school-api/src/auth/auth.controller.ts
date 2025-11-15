import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Uniform } from './entities/uniform.entity';
import { Measurement } from './entities/measurement.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupData: any) {
    return this.authService.initiateSignup(signupData);
  }

  @Post('login')
  async login(@Body() loginData: { email: string; password: string }) {
    return this.authService.login(loginData.email, loginData.password);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: { email: string; code: string }) {
    return this.authService.verifyOtp(body.email, body.code);
  }

  @Post('resend-otp')
  async resendOtp(@Body() body: { email: string }) {
    return this.authService.resendOtp(body.email);
  }

  @Post('complete-profile')
  async completeProfile(@Body() body: any) {
    return this.authService.completeProfile(body);
  }

  @Get('student/:studentId')
  async checkStudent(@Param('studentId') studentId: number) {
    return this.authService.checkStudent(studentId);
  }

  @Post('verify-student')
  async verifyStudent(@Body() body: { userId: string; studentId: number; role: string }) {
    return this.authService.verifyStudent(body.userId, body.studentId, body.role);
  }

  @Get('uniforms')
  async getUniforms(@Query('grade') grade?: string) {
    return this.authService.getUniformsByGrade(grade);
  }

  @Get('uniforms/:itemId')
  async getUniformDetails(@Param('itemId') itemId: string) {
    return this.authService.getUniformDetails(itemId);
  }

  @Get('uniforms/:itemId/sizes')
  async getAvailableSizes(
    @Param('itemId') itemId: string,
    @Query('gender') gender: string
  ) {
    return this.authService.getAvailableSizes(itemId, gender);
  }

}