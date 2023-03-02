import { Test, TestingModule } from '@nestjs/testing';
import { MinerTypesDailyStatDetailsService } from './miner-types-daily-stat-details.service';

describe('MinerTypesDailyStatDetailsService', () => {
  let service: MinerTypesDailyStatDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinerTypesDailyStatDetailsService],
    }).compile();

    service = module.get<MinerTypesDailyStatDetailsService>(MinerTypesDailyStatDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
