import { Module } from '@nestjs/common';
import { MinerTypesDailyStatDetailsService } from './miner-types-daily-stat-details.service';
import { MinerTypesDailyStatDetailsController } from './miner-types-daily-stat-details.controller';

@Module({
  controllers: [MinerTypesDailyStatDetailsController],
  providers: [MinerTypesDailyStatDetailsService]
})
export class MinerTypesDailyStatDetailsModule {}
