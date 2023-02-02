import { Injectable } from '@nestjs/common';
import { CreateSwitchDto } from './dto/create-switch.dto';
import { UpdateSwitchDto } from './dto/update-switch.dto';

@Injectable()
export class SwitchesService {
  create(createSwitchDto: CreateSwitchDto) {
    return 'This action adds a new switch';
  }

  findAll() {
    return `This action returns all switches`;
  }

  findOne(id: number) {
    return `This action returns a #${id} switch`;
  }

  update(id: number, updateSwitchDto: UpdateSwitchDto) {
    return `This action updates a #${id} switch`;
  }

  remove(id: number) {
    return `This action removes a #${id} switch`;
  }
}
