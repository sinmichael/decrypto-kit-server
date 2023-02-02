import { Test, TestingModule } from '@nestjs/testing';
import { MinersController } from './miners.controller';
import { MinersService } from './miners.service';

describe('MinersController', () => {
  let controller: MinersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinersController],
      providers: [MinersService],
    }).compile();

    controller = module.get<MinersController>(MinersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
