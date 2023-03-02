import { PartialType } from '@nestjs/mapped-types';
import { CreateMinerTypesHourlyStatDetailDto } from './create-miner-types-hourly-stat-detail.dto';

export class UpdateMinerTypesHourlyStatDetailDto extends PartialType(CreateMinerTypesHourlyStatDetailDto) {}
