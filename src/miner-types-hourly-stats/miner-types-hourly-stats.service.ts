import { Injectable } from '@nestjs/common';
import { CreateMinerTypesHourlyStatDto } from './dto/create-miner-types-hourly-stat.dto';
import { UpdateMinerTypesHourlyStatDto } from './dto/update-miner-types-hourly-stat.dto';

@Injectable()
export class MinerTypesHourlyStatsService {
  create(createMinerTypesHourlyStatDto: CreateMinerTypesHourlyStatDto) {
    return 'This action adds a new minerTypesHourlyStat';
  }

  findAll() {
    return `This action returns all minerTypesHourlyStats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} minerTypesHourlyStat`;
  }

  update(id: number, updateMinerTypesHourlyStatDto: UpdateMinerTypesHourlyStatDto) {
    return `This action updates a #${id} minerTypesHourlyStat`;
  }

  remove(id: number) {
    return `This action removes a #${id} minerTypesHourlyStat`;
  }
}
