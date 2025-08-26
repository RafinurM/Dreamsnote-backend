import { Body, Injectable, NotFoundException, Query } from '@nestjs/common';
import { UpdateDreamDto } from './dto/update-dream.dto';
import { GetDreamsDto } from './dto/get-dreams.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDreamDto } from './dto/create-dream.dto';

@Injectable()
export class DreamsService {
  constructor(private prisma: PrismaService) {}
  getAllDreams(@Query() getDreamsDto: GetDreamsDto) {
    return this.prisma.dream.findMany();
  }

  getDreamById(id: number) {
    const dream = this.prisma.dream.findUnique({ where: { id } });
    return dream;
  }

  async createDream(@Body() createDreamDto: CreateDreamDto) {
    const newDream = await this.prisma.dream.create({
      data: {
        title: createDreamDto.title,
        content: createDreamDto.content,
        published: createDreamDto.published,
        userId: createDreamDto.userId,
      },
    });

    return newDream;
  }

  async updateDream(id: number, updateDreamDto: UpdateDreamDto) {
    const dream = await this.prisma.dream.findUnique({ where: { id } });
    if (!dream) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    const updated = await this.prisma.dream.update({
      where: { id },
      data: {
        title: updateDreamDto.title ?? undefined,
        content: updateDreamDto.content ?? undefined,
        published: updateDreamDto.published ?? undefined,
        userId: updateDreamDto.userId ?? undefined,
      },
    });
    return updated;
  }

  async deleteDream(id: number) {
    const dream = await this.prisma.dream.findUnique({ where: { id } });
    if (!dream) {
      throw new NotFoundException(`dream with id ${id} not found`);
    }
    await this.prisma.dream.delete({ where: { id } });
    // Можно вернуть удалённый объект или просто void
    return;
  }

  async likeDream(id: number, userId: number) {
    const dream = await this.prisma.dream.findUnique({ where: { id } });
    if (!dream) {
      throw new NotFoundException(`Dream with id ${id} not found`);
    } 
    const currentLikes: number[] = dream.likes ?? [];
    const alreadyLiked = currentLikes.includes(userId);
    const updatedLikes = alreadyLiked
      ? currentLikes
      : [...currentLikes, userId];
    const updatedDream = await this.prisma.dream.update({
      where: { id },
      data: { likes: updatedLikes },
    });
    return updatedDream;
  }
}
