import { Injectable } from '@nestjs/common';
import { CreateMinerDto } from './dto/create-miner.dto';
import { UpdateMinerDto } from './dto/update-miner.dto';

@Injectable()
export class MinersService {
  create(createMinerDto: CreateMinerDto) {
    return 'This action adds a new miner';
  }

  findAll() {
    return `This action returns all miners`;
  }

  findOne(id: number) {
    return `This action returns a #${id} miner`;
  }

  update(id: number, updateMinerDto: UpdateMinerDto) {
    return `This action updates a #${id} miner`;
  }

  remove(id: number) {
    return `This action removes a #${id} miner`;
  }
}
