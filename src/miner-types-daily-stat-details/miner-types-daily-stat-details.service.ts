import { Injectable } from '@nestjs/common';
import { CreateMinerTypesDailyStatDetailDto } from './dto/create-miner-types-daily-stat-detail.dto';
import { UpdateMinerTypesDailyStatDetailDto } from './dto/update-miner-types-daily-stat-detail.dto';

@Injectable()
export class MinerTypesDailyStatDetailsService {
  create(createMinerTypesDailyStatDetailDto: CreateMinerTypesDailyStatDetailDto) {
    return 'This action adds a new minerTypesDailyStatDetail';
  }

  findAll() {
    return `This action returns all minerTypesDailyStatDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} minerTypesDailyStatDetail`;
  }

  update(id: number, updateMinerTypesDailyStatDetailDto: UpdateMinerTypesDailyStatDetailDto) {
    return `This action updates a #${id} minerTypesDailyStatDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} minerTypesDailyStatDetail`;
  }
}
