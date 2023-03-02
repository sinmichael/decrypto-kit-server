import { Module } from '@nestjs/common';
import { MinerDailyStatsService } from './miner-daily-stats.service';
import { MinerDailyStatsController } from './miner-daily-stats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinerDailyStat } from './entities/miner-daily-stat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MinerDailyStat])],
  controllers: [MinerDailyStatsController],
  providers: [MinerDailyStatsService],
})
export class MinerDailyStatsModule {}
