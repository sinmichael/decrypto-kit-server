import { PartialType } from '@nestjs/mapped-types';
import { CreateMinerDto } from './create-miner.dto';

export class UpdateMinerDto extends PartialType(CreateMinerDto) {}
