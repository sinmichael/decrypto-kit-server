import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMinerHourlyStatDto } from './dto/create-miner-hourly-stat.dto';
import { UpdateMinerHourlyStatDto } from './dto/update-miner-hourly-stat.dto';
import { MinerHourlyStat } from './entities/miner-hourly-stat.entity';

@Injectable()
export class MinerHourlyStatsService {
}
