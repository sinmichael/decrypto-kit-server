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

@Module({
  imports: [
    TypeOrmModule.forFeature([Switch, Miner]),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  controllers: [JobsController],
  providers: [Logger, MinerHelper, JobsService, SwitchesService, MinersService],
})
export class JobsModule {}
