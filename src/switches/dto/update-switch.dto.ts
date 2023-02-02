import { PartialType } from '@nestjs/mapped-types';
import { CreateSwitchDto } from './create-switch.dto';

export class UpdateSwitchDto extends PartialType(CreateSwitchDto) {}
