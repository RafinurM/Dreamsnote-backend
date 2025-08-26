import { Module } from '@nestjs/common';
import { DreamsController } from './dreams.controller';
import { DreamsService } from './dreams.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DreamsController],
  providers: [PrismaService, DreamsService]
})
export class DreamsModule {}
