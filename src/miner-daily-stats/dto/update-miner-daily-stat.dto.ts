import { PartialType } from '@nestjs/mapped-types';
import { CreateMinerDailyStatDto } from './create-miner-daily-stat.dto';

export class UpdateMinerDailyStatDto extends PartialType(CreateMinerDailyStatDto) {}
