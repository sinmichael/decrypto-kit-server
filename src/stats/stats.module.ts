import { Logger, Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { StatsHelper } from 'src/utils/stats-helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Miner } from 'src/miners/entities/miner.entity';
import { Switch } from 'src/switches/entities/switch.entity';
import { MinerHourlyStat } from 'src/miner-hourly-stats/entities/miner-hourly-stat.entity';
import { MinerDailyStat } from 'src/miner-daily-stats/entities/miner-daily-stat.entity';
import { JobsModule } from 'src/jobs/jobs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Switch, Miner, MinerHourlyStat, MinerDailyStat]),
  ],
  controllers: [StatsController],
  providers: [Logger, StatsService, StatsHelper]
})
export class StatsModule { }
