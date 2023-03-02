import { Module } from '@nestjs/common';
import { MinerHourlyStatsService } from './miner-hourly-stats.service';
import { MinerHourlyStatsController } from './miner-hourly-stats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinerHourlyStat } from './entities/miner-hourly-stat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MinerHourlyStat])],
  controllers: [MinerHourlyStatsController],
  providers: [MinerHourlyStatsService]
})
export class MinerHourlyStatsModule {}
