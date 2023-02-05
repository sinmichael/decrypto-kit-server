import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { SwitchesService } from 'src/switches/switches.service';
@Injectable()
export class JobsService {
  constructor(private readonly switchesService: SwitchesService) {}

  @Cron('*/5 * * * * *')
  async fetch() {
    const miners = await this.switchesService.getMinersFromSwitch(1);
    console.log(miners);
  }
}
