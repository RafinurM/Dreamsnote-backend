import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
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
  
}
