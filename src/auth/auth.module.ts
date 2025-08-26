import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '15m' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService]
})
export class AuthModule {}
