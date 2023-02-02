import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MinersService } from './miners.service';
import { CreateMinerDto } from './dto/create-miner.dto';
import { UpdateMinerDto } from './dto/update-miner.dto';

@Controller('miners')
export class MinersController {
  constructor(private readonly minersService: MinersService) {}

  @Post()
  create(@Body() createMinerDto: CreateMinerDto) {
    return this.minersService.create(createMinerDto);
  }

  @Get()
  findAll() {
    return this.minersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.minersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMinerDto: UpdateMinerDto) {
    return this.minersService.update(+id, updateMinerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.minersService.remove(+id);
  }
}
