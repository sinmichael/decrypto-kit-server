import { Test, TestingModule } from '@nestjs/testing';
import { MinerHourlyStatsController } from './miner-hourly-stats.controller';
import { MinerHourlyStatsService } from './miner-hourly-stats.service';

describe('MinerHourlyStatsController', () => {
  let controller: MinerHourlyStatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinerHourlyStatsController],
      providers: [MinerHourlyStatsService],
    }).compile();

    controller = module.get<MinerHourlyStatsController>(MinerHourlyStatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
