import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { MailService } from '../mail/mail.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}
  async register(dto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new Error('User already exists');
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(dto.password, saltRounds);
    const dreams = Array.isArray(dto.dreams) ? dto.dreams : [];
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        passwordHash: hashedPassword,
        dreams,
      },
    });

    const { passwordHash, ...safeUser } = user;
    const subject = 'Добро пожаловать на Dreamsnote!';
    const html = `<p>Здравствуйте, ${user.name}!</p><p>Спасибо за регистрацию. Добро пожаловать в приложение.</p>`;
    await this.mailService.sendMail(user.email, subject, html);
    return { user: safeUser };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { name: dto.name },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) {
      throw new Error('Invalid credentials');
    }
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
    };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    });
    const { passwordHash, ...safeUser } = user;
    return { accessToken: token, user: safeUser };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      return;
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 1000 * 60 * 60);
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        resetTokenExpires: expires,
      },
    });
    const resetLink = `https://dreamsnote.ru/reset-password?token=${token}&id=${user.id}`;
    const subject = 'Сброс пароля';
    const html = `<p>Чтобы сбросить пароль, перейдите по ссылке: <a href="${resetLink}">${resetLink}</a></p><p>Срок действия ссылки — 1 час.</p>`;
    await this.mailService.sendMail(user.email, subject, html);
  }
  
  async resetPassword(id: number, token: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    if (user.resetToken !== token) {
      throw new Error('Invalid or expired token');
    }
    if (!user.resetTokenExpires || user.resetTokenExpires < new Date()) {
      throw new Error('Token expired');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await this.prisma.user.update({
      where: { id },
      data: {
        passwordHash: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });
  }
}
