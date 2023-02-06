import { Logger, Module } from '@nestjs/common';
import { MinersService } from './miners.service';
import { MinersController } from './miners.controller';
import { SwitchesService } from 'src/switches/switches.service';
import { MinerHelper } from 'src/utils/miner-helper';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Switch } from 'src/switches/entities/switch.entity';
import { Miner } from './entities/miner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Miner, Switch]), HttpModule],
  controllers: [MinersController],
  providers: [Logger, MinerHelper, MinersService, SwitchesService],
})
export class MinersModule {}
