import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetDreamsDto } from './dto/get-dreams.dto';
import { CreateDreamDto } from './dto/create-dream.dto';
import { DreamsService } from './dreams.service';
import { UpdateDreamDto } from './dto/update-dream.dto';

@Controller('dreams')
export class DreamsController {
  constructor(private readonly dreamsService: DreamsService) {}
  @Get()
  getAllDreams(@Query() getDreamsDto: GetDreamsDto) {
    return this.dreamsService.getAllDreams(getDreamsDto);
  }

  @Get(':id')
  getDreamById(@Param('id', ParseIntPipe) id: number) {
    return this.dreamsService.getDreamById(id);
  }

  @Post()
  createDream(@Body() createDreamDto: CreateDreamDto) {
    return this.dreamsService.createDream(createDreamDto);
  }

  @Patch(':id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDreamDto: UpdateDreamDto,
  ) {
    return this.dreamsService.updateDream(id, updateDreamDto);
  }

  @Delete(':id')
  deleteDream(@Param('id', ParseIntPipe) id: number) {
    return this.dreamsService.deleteDream(id);
  }

  @Patch(':id/like')
  likeDream(
    @Param('id', ParseIntPipe) id: number,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    return this.dreamsService.likeDream(id, userId);
  }
}
