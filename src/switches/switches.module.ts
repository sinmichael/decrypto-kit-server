import { Logger, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SwitchesService } from './switches.service';
import { SwitchesController } from './switches.controller';
import { Switch } from './entities/switch.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinersService } from 'src/miners/miners.service';
import { MinerHelper } from 'src/utils/miner-helper';
import { Miner } from 'src/miners/entities/miner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Miner, Switch]), HttpModule],
  controllers: [SwitchesController],
  providers: [Logger, MinerHelper, SwitchesService, MinersService],
})
export class SwitchesModule {}
