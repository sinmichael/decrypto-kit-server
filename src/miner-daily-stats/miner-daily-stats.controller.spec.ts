import { Test, TestingModule } from '@nestjs/testing';
import { MinerDailyStatsController } from './miner-daily-stats.controller';
import { MinerDailyStatsService } from './miner-daily-stats.service';

describe('MinerDailyStatsController', () => {
  let controller: MinerDailyStatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinerDailyStatsController],
      providers: [MinerDailyStatsService],
    }).compile();

    controller = module.get<MinerDailyStatsController>(MinerDailyStatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
