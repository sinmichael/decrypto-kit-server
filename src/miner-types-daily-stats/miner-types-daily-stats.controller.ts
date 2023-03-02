import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MinerTypesDailyStatsService } from './miner-types-daily-stats.service';
import { CreateMinerTypesDailyStatDto } from './dto/create-miner-types-daily-stat.dto';
import { UpdateMinerTypesDailyStatDto } from './dto/update-miner-types-daily-stat.dto';

@Controller('miner-types-daily-stats')
export class MinerTypesDailyStatsController {
  constructor(private readonly minerTypesDailyStatsService: MinerTypesDailyStatsService) {}

  @Post()
  create(@Body() createMinerTypesDailyStatDto: CreateMinerTypesDailyStatDto) {
    return this.minerTypesDailyStatsService.create(createMinerTypesDailyStatDto);
  }

  @Get()
  findAll() {
    return this.minerTypesDailyStatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.minerTypesDailyStatsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMinerTypesDailyStatDto: UpdateMinerTypesDailyStatDto) {
    return this.minerTypesDailyStatsService.update(+id, updateMinerTypesDailyStatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.minerTypesDailyStatsService.remove(+id);
  }
}
