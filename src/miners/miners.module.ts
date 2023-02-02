import { Module } from '@nestjs/common';
import { MinersService } from './miners.service';
import { MinersController } from './miners.controller';

@Module({
  controllers: [MinersController],
  providers: [MinersService]
})
export class MinersModule {}
