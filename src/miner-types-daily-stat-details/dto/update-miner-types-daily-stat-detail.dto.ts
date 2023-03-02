import { PartialType } from '@nestjs/mapped-types';
import { CreateMinerTypesDailyStatDetailDto } from './create-miner-types-daily-stat-detail.dto';

export class UpdateMinerTypesDailyStatDetailDto extends PartialType(CreateMinerTypesDailyStatDetailDto) {}
