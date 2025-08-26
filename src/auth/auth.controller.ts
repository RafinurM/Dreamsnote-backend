import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    try {
      const result = await this.authService.register(dto);
      return { result };
    } catch (err) {
      throw new HttpException(
        { message: err?.message ?? 'Registration failed' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      const { accessToken, user } = await this.authService.login(dto);
      return { accessToken, user };
    } catch (err) {
      throw new HttpException(
        { message: err?.message ?? 'Login failed' },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    try {
      await this.authService.forgotPassword(dto.email);
      return { message: 'If the email exists, a reset link has been sent.' };
    } catch (err) {
      throw new HttpException(
        { message: err?.message ?? 'Forgot password failed' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    try {
      await this.authService.resetPassword(dto.id, dto.token, dto.password);
      return { message: 'Password has been reset' };
    } catch (err) {
      throw new HttpException(
        { message: err?.message ?? 'Reset failed' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
