import { Test, TestingModule } from '@nestjs/testing';
import { MinerTypesHourlyStatDetailsService } from './miner-types-hourly-stat-details.service';

describe('MinerTypesHourlyStatDetailsService', () => {
  let service: MinerTypesHourlyStatDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinerTypesHourlyStatDetailsService],
    }).compile();

    service = module.get<MinerTypesHourlyStatDetailsService>(MinerTypesHourlyStatDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
