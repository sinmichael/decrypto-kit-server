import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { SwitchesService } from 'src/switches/switches.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Switch } from 'src/switches/entities/switch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Switch]), HttpModule],
  controllers: [JobsController],
  providers: [JobsService, SwitchesService],
})
export class JobsModule {}
