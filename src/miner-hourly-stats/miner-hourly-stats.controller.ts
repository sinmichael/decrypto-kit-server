import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MinerHourlyStatsService } from './miner-hourly-stats.service';
import { CreateMinerHourlyStatDto } from './dto/create-miner-hourly-stat.dto';
import { UpdateMinerHourlyStatDto } from './dto/update-miner-hourly-stat.dto';

@Controller('miner-hourly-stats')
export class MinerHourlyStatsController {
  constructor(private readonly minerHourlyStatsService: MinerHourlyStatsService) {}
}
