import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MinerTypesDailyStatDetailsService } from './miner-types-daily-stat-details.service';
import { CreateMinerTypesDailyStatDetailDto } from './dto/create-miner-types-daily-stat-detail.dto';
import { UpdateMinerTypesDailyStatDetailDto } from './dto/update-miner-types-daily-stat-detail.dto';

@Controller('miner-types-daily-stat-details')
export class MinerTypesDailyStatDetailsController {
  constructor(private readonly minerTypesDailyStatDetailsService: MinerTypesDailyStatDetailsService) {}

  @Post()
  create(@Body() createMinerTypesDailyStatDetailDto: CreateMinerTypesDailyStatDetailDto) {
    return this.minerTypesDailyStatDetailsService.create(createMinerTypesDailyStatDetailDto);
  }

  @Get()
  findAll() {
    return this.minerTypesDailyStatDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.minerTypesDailyStatDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMinerTypesDailyStatDetailDto: UpdateMinerTypesDailyStatDetailDto) {
    return this.minerTypesDailyStatDetailsService.update(+id, updateMinerTypesDailyStatDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.minerTypesDailyStatDetailsService.remove(+id);
  }
}
