import { Test, TestingModule } from '@nestjs/testing';
import { MinersService } from './miners.service';

describe('MinersService', () => {
  let service: MinersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinersService],
    }).compile();

    service = module.get<MinersService>(MinersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
