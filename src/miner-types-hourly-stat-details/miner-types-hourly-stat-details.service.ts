import { Injectable } from '@nestjs/common';
import { CreateMinerTypesHourlyStatDetailDto } from './dto/create-miner-types-hourly-stat-detail.dto';
import { UpdateMinerTypesHourlyStatDetailDto } from './dto/update-miner-types-hourly-stat-detail.dto';

@Injectable()
export class MinerTypesHourlyStatDetailsService {
  create(createMinerTypesHourlyStatDetailDto: CreateMinerTypesHourlyStatDetailDto) {
    return 'This action adds a new minerTypesHourlyStatDetail';
  }

  findAll() {
    return `This action returns all minerTypesHourlyStatDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} minerTypesHourlyStatDetail`;
  }

  update(id: number, updateMinerTypesHourlyStatDetailDto: UpdateMinerTypesHourlyStatDetailDto) {
    return `This action updates a #${id} minerTypesHourlyStatDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} minerTypesHourlyStatDetail`;
  }
}
