import { Test, TestingModule } from '@nestjs/testing';
import { MinerHourlyStatsService } from './miner-hourly-stats.service';

describe('MinerHourlyStatsService', () => {
  let service: MinerHourlyStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinerHourlyStatsService],
    }).compile();

    service = module.get<MinerHourlyStatsService>(MinerHourlyStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
