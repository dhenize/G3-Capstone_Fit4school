import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASS'),
      },
    });
  }

  async sendOtpEmail(email: string, otpCode: string): Promise<boolean> {
    try {
      const mailOptions = {
        from: this.configService.get('EMAIL_USER'),
        to: email,
        subject: 'Your OTP Code - Fit4School',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #61C35C;">Email Verification</h2>
            <p>Your OTP code for Fit4School registration is:</p>
            <div style="background-color: #f4f4f4; padding: 15px; text-align: center; margin: 20px 0;">
              <h1 style="color: #61C35C; margin: 0; font-size: 32px; letter-spacing: 5px;">${otpCode}</h1>
            </div>
            <p>This code will expire in 5 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #666; font-size: 12px;">Fit4School Team</p>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`OTP email sent to ${email}: ${otpCode}`);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);

      console.log(`OTP for ${email}: ${otpCode} (Email failed but logged for testing)`);
      return true; 
    }
  }
}