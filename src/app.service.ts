import { Injectable } from '@nestjs/common';
import { StatsHelper } from './utils/stats-helper';

@Injectable()
export class AppService {
  constructor(
    private readonly statsHelper: StatsHelper,
  ) {}

  async getTest() {
    return await this.statsHelper.getCurrentMinerTotalStats();
  }
}
