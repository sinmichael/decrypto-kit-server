import { Test, TestingModule } from '@nestjs/testing';
import { MinerTypesDailyStatDetailsController } from './miner-types-daily-stat-details.controller';
import { MinerTypesDailyStatDetailsService } from './miner-types-daily-stat-details.service';

describe('MinerTypesDailyStatDetailsController', () => {
  let controller: MinerTypesDailyStatDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinerTypesDailyStatDetailsController],
      providers: [MinerTypesDailyStatDetailsService],
    }).compile();

    controller = module.get<MinerTypesDailyStatDetailsController>(MinerTypesDailyStatDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
