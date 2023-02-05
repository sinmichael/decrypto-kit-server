import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SwitchesService } from './switches.service';
import { SwitchesController } from './switches.controller';

@Module({
  imports: [HttpModule],
  controllers: [SwitchesController],
  providers: [SwitchesService],
})
export class SwitchesModule {}
