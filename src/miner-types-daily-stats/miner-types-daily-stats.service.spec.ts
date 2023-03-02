import { Test, TestingModule } from '@nestjs/testing';
import { MinerTypesDailyStatsService } from './miner-types-daily-stats.service';

describe('MinerTypesDailyStatsService', () => {
  let service: MinerTypesDailyStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinerTypesDailyStatsService],
    }).compile();

    service = module.get<MinerTypesDailyStatsService>(MinerTypesDailyStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
