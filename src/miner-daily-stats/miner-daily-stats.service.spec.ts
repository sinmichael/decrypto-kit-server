import { Test, TestingModule } from '@nestjs/testing';
import { MinerDailyStatsService } from './miner-daily-stats.service';

describe('MinerDailyStatsService', () => {
  let service: MinerDailyStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinerDailyStatsService],
    }).compile();

    service = module.get<MinerDailyStatsService>(MinerDailyStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
