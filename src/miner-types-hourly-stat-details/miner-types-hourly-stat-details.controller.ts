import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MinerTypesHourlyStatDetailsService } from './miner-types-hourly-stat-details.service';
import { CreateMinerTypesHourlyStatDetailDto } from './dto/create-miner-types-hourly-stat-detail.dto';
import { UpdateMinerTypesHourlyStatDetailDto } from './dto/update-miner-types-hourly-stat-detail.dto';

@Controller('miner-types-hourly-stat-details')
export class MinerTypesHourlyStatDetailsController {
  constructor(private readonly minerTypesHourlyStatDetailsService: MinerTypesHourlyStatDetailsService) {}

  @Post()
  create(@Body() createMinerTypesHourlyStatDetailDto: CreateMinerTypesHourlyStatDetailDto) {
    return this.minerTypesHourlyStatDetailsService.create(createMinerTypesHourlyStatDetailDto);
  }

  @Get()
  findAll() {
    return this.minerTypesHourlyStatDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.minerTypesHourlyStatDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMinerTypesHourlyStatDetailDto: UpdateMinerTypesHourlyStatDetailDto) {
    return this.minerTypesHourlyStatDetailsService.update(+id, updateMinerTypesHourlyStatDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.minerTypesHourlyStatDetailsService.remove(+id);
  }
}
