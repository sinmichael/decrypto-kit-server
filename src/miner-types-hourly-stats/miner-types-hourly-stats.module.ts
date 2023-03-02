import { Module } from '@nestjs/common';
import { MinerTypesHourlyStatsService } from './miner-types-hourly-stats.service';
import { MinerTypesHourlyStatsController } from './miner-types-hourly-stats.controller';

@Module({
  controllers: [MinerTypesHourlyStatsController],
  providers: [MinerTypesHourlyStatsService]
})
export class MinerTypesHourlyStatsModule {}
