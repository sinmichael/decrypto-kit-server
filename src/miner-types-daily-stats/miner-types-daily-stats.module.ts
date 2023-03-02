import { Module } from '@nestjs/common';
import { MinerTypesDailyStatsService } from './miner-types-daily-stats.service';
import { MinerTypesDailyStatsController } from './miner-types-daily-stats.controller';

@Module({
  controllers: [MinerTypesDailyStatsController],
  providers: [MinerTypesDailyStatsService]
})
export class MinerTypesDailyStatsModule {}
