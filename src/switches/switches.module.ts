import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SwitchesService } from './switches.service';
import { SwitchesController } from './switches.controller';
import { Switch } from './entities/switch.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Switch]), HttpModule],
  controllers: [SwitchesController],
  providers: [SwitchesService],
})
export class SwitchesModule {}
