import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatsService } from './stats.service';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}
  @Get('miners')
  getCurrentMinerTotalStats() {
    return this.statsService.getCurrentMinerTotalStats();
  }
  @Get('miners-breakdown')
  getMinersBreakdown() {
    return this.statsService.getMinersBreakdown();
  }
  @Get('miners-hourly')
  getMinersHourly() {
    return this.statsService.getMinersHourly();
  }
  @Get('miners-daily')
  getMinersDaily() {
    return this.statsService.getMinersDaily();
  }
}
