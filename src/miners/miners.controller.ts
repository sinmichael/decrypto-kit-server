import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MinersService } from './miners.service';
import { CreateMinerDto } from './dto/create-miner.dto';
import { UpdateMinerDto } from './dto/update-miner.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Miner } from './entities/miner.entity';

@Controller('miners')
export class MinersController {
  constructor(private readonly minersService: MinersService) {}

  @Get()
  findAll() {
    return this.minersService.findAll();
  }

  @Get('paginate')
  paginate(@Paginate() query: PaginateQuery,): Promise<Paginated<Miner>> {
    return this.minersService.paginate(query);
  }

  @Get(':ipAddress')
  findByIpAddress(@Param('ipAddress') ipAddress: string) {
    return this.minersService.findByIpAddress(ipAddress);
  }

  @Get(':ipAddress/raw')
  findByIpAddressRaw(@Param('ipAddress') ipAddress: string) {
    return this.minersService.findByIpAddressRaw(ipAddress);
  }
}
