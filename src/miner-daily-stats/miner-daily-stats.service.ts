import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMinerDailyStatDto } from './dto/create-miner-daily-stat.dto';
import { UpdateMinerDailyStatDto } from './dto/update-miner-daily-stat.dto';
import { MinerDailyStat } from './entities/miner-daily-stat.entity';

@Injectable()
export class MinerDailyStatsService {
  constructor(
    @InjectRepository(MinerDailyStat)
    private minerDailyStatRepository: Repository<MinerDailyStat>,
  ) {}

  findAll() {
    this.minerDailyStatRepository.find();
  }
}
