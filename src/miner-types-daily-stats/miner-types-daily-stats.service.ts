import { Injectable } from '@nestjs/common';
import { CreateMinerTypesDailyStatDto } from './dto/create-miner-types-daily-stat.dto';
import { UpdateMinerTypesDailyStatDto } from './dto/update-miner-types-daily-stat.dto';

@Injectable()
export class MinerTypesDailyStatsService {
  create(createMinerTypesDailyStatDto: CreateMinerTypesDailyStatDto) {
    return 'This action adds a new minerTypesDailyStat';
  }

  findAll() {
    return `This action returns all minerTypesDailyStats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} minerTypesDailyStat`;
  }

  update(id: number, updateMinerTypesDailyStatDto: UpdateMinerTypesDailyStatDto) {
    return `This action updates a #${id} minerTypesDailyStat`;
  }

  remove(id: number) {
    return `This action removes a #${id} minerTypesDailyStat`;
  }
}
