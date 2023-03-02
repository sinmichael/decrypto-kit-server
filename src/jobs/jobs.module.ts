import { Logger, Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { SwitchesService } from 'src/switches/switches.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Switch } from 'src/switches/entities/switch.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { MinerHelper } from 'src/utils/miner-helper';
import { MinersService } from 'src/miners/miners.service';
import { Miner } from 'src/miners/entities/miner.entity';
import { MinerHourlyStat } from 'src/miner-hourly-stats/entities/miner-hourly-stat.entity';
import { StatsHelper } from 'src/utils/stats-helper';
import { MinerDailyStat } from 'src/miner-daily-stats/entities/miner-daily-stat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Switch, Miner, MinerHourlyStat, MinerDailyStat]),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  controllers: [JobsController],
  providers: [Logger, MinerHelper, StatsHelper, JobsService, SwitchesService, MinersService],
})
export class JobsModule {}
