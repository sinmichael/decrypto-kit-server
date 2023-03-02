import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MinerDailyStatsService } from './miner-daily-stats.service';
import { CreateMinerDailyStatDto } from './dto/create-miner-daily-stat.dto';
import { UpdateMinerDailyStatDto } from './dto/update-miner-daily-stat.dto';

@Controller('miner-daily-stats')
export class MinerDailyStatsController {
  constructor(private readonly minerDailyStatsService: MinerDailyStatsService) {}
  @Get()
  findAll() {
    return this.minerDailyStatsService.findAll();
  }
}
