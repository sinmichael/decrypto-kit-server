import { PartialType } from '@nestjs/mapped-types';
import { CreateMinerTypesDailyStatDto } from './create-miner-types-daily-stat.dto';

export class UpdateMinerTypesDailyStatDto extends PartialType(CreateMinerTypesDailyStatDto) {}
