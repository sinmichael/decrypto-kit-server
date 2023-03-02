import { Module } from '@nestjs/common';
import { MinerTypesHourlyStatDetailsService } from './miner-types-hourly-stat-details.service';
import { MinerTypesHourlyStatDetailsController } from './miner-types-hourly-stat-details.controller';

@Module({
  controllers: [MinerTypesHourlyStatDetailsController],
  providers: [MinerTypesHourlyStatDetailsService]
})
export class MinerTypesHourlyStatDetailsModule {}
