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
  
}
