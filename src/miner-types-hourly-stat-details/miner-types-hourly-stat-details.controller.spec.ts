import { Test, TestingModule } from '@nestjs/testing';
import { MinerTypesHourlyStatDetailsController } from './miner-types-hourly-stat-details.controller';
import { MinerTypesHourlyStatDetailsService } from './miner-types-hourly-stat-details.service';

describe('MinerTypesHourlyStatDetailsController', () => {
  let controller: MinerTypesHourlyStatDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinerTypesHourlyStatDetailsController],
      providers: [MinerTypesHourlyStatDetailsService],
    }).compile();

    controller = module.get<MinerTypesHourlyStatDetailsController>(MinerTypesHourlyStatDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
