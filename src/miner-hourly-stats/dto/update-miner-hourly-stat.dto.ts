import { PartialType } from '@nestjs/mapped-types';
import { CreateMinerHourlyStatDto } from './create-miner-hourly-stat.dto';

export class UpdateMinerHourlyStatDto extends PartialType(CreateMinerHourlyStatDto) {}
