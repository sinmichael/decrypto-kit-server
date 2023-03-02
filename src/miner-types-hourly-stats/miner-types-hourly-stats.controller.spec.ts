import { Test, TestingModule } from '@nestjs/testing';
import { MinerTypesHourlyStatsController } from './miner-types-hourly-stats.controller';
import { MinerTypesHourlyStatsService } from './miner-types-hourly-stats.service';

describe('MinerTypesHourlyStatsController', () => {
  let controller: MinerTypesHourlyStatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinerTypesHourlyStatsController],
      providers: [MinerTypesHourlyStatsService],
    }).compile();

    controller = module.get<MinerTypesHourlyStatsController>(MinerTypesHourlyStatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
