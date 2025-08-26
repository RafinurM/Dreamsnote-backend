import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { DreamsModule } from './dreams/dreams.module';
import { AuthModule } from './auth/auth.module';
import { MailService } from './mail/mail.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DreamsModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
