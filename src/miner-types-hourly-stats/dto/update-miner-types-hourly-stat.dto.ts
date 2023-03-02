import { PartialType } from '@nestjs/mapped-types';
import { CreateMinerTypesHourlyStatDto } from './create-miner-types-hourly-stat.dto';

export class UpdateMinerTypesHourlyStatDto extends PartialType(CreateMinerTypesHourlyStatDto) {}
