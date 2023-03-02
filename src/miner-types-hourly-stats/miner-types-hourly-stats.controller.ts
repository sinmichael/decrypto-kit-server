import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MinerTypesHourlyStatsService } from './miner-types-hourly-stats.service';
import { CreateMinerTypesHourlyStatDto } from './dto/create-miner-types-hourly-stat.dto';
import { UpdateMinerTypesHourlyStatDto } from './dto/update-miner-types-hourly-stat.dto';

@Controller('miner-types-hourly-stats')
export class MinerTypesHourlyStatsController {
  constructor(private readonly minerTypesHourlyStatsService: MinerTypesHourlyStatsService) {}

  @Post()
  create(@Body() createMinerTypesHourlyStatDto: CreateMinerTypesHourlyStatDto) {
    return this.minerTypesHourlyStatsService.create(createMinerTypesHourlyStatDto);
  }

  @Get()
  findAll() {
    return this.minerTypesHourlyStatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.minerTypesHourlyStatsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMinerTypesHourlyStatDto: UpdateMinerTypesHourlyStatDto) {
    return this.minerTypesHourlyStatsService.update(+id, updateMinerTypesHourlyStatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.minerTypesHourlyStatsService.remove(+id);
  }
}
