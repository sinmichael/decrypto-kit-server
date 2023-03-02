import { Test, TestingModule } from '@nestjs/testing';
import { MinerTypesHourlyStatsService } from './miner-types-hourly-stats.service';

describe('MinerTypesHourlyStatsService', () => {
  let service: MinerTypesHourlyStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinerTypesHourlyStatsService],
    }).compile();

    service = module.get<MinerTypesHourlyStatsService>(MinerTypesHourlyStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
