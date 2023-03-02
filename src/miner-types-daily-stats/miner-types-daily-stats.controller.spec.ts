import { Test, TestingModule } from '@nestjs/testing';
import { MinerTypesDailyStatsController } from './miner-types-daily-stats.controller';
import { MinerTypesDailyStatsService } from './miner-types-daily-stats.service';

describe('MinerTypesDailyStatsController', () => {
  let controller: MinerTypesDailyStatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinerTypesDailyStatsController],
      providers: [MinerTypesDailyStatsService],
    }).compile();

    controller = module.get<MinerTypesDailyStatsController>(MinerTypesDailyStatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
