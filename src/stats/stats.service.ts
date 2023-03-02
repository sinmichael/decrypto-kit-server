import { Injectable } from '@nestjs/common';
import { StatsHelper } from 'src/utils/stats-helper';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';

@Injectable()
export class StatsService {
  constructor(
    private readonly statsHelper: StatsHelper,
  ) {}
  getCurrentMinerTotalStats() {
    return this.statsHelper.getCurrentMinerTotalStats();
  }
  getMinersBreakdown() {
    return this.statsHelper.getMinersBreakdown();
  }
  getMinersHourly() {
    return this.statsHelper.getMinersHourly();
  }
  getMinersDaily() {
    return this.statsHelper.getMinersDaily();
  }
}
