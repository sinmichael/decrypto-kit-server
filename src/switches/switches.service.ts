import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom, map } from 'rxjs';
import { Repository } from 'typeorm/repository/Repository';
import { CreateSwitchDto } from './dto/create-switch.dto';
import { UpdateSwitchDto } from './dto/update-switch.dto';
import { Switch } from './entities/switch.entity';

@Injectable()
export class SwitchesService {
  constructor(
    @InjectRepository(Switch)
    private switchRepository: Repository<Switch>,
    private httpService: HttpService,
  ) {}

  create(createSwitchDto: CreateSwitchDto) {
    return 'This action adds a new switch';
  }

  findAll() {
    return `This action returns all switches`;
  }

  findOne(id: number) {
    return `This action returns a #${id} switch`;
  }

  update(id: number, updateSwitchDto: UpdateSwitchDto) {
    return `This action updates a #${id} switch`;
  }

  remove(id: number) {
    return `This action removes a #${id} switch`;
  }

  async getMinersFromSwitch(id: number) {
    const switch_ = await this.switchRepository.findOne({ where: { id: id } });
    const timeSpan = 80;

    if (switch_.isMeraki) {
      const apiKeyMeraki = process.env.API_KEY_MERAKI;
      const config = {
        headers: {
          'X-Cisco-Meraki-API-Key': apiKeyMeraki,
        },
      };

      try {
        const response = (await lastValueFrom(
          this.httpService
            .get(
              `https://api.meraki.com/api/v0/devices/${switch_.serialNumber}/clients?timespan=${timeSpan}`,
              config,
            )
            .pipe(map((response: any) => response.data)),
        )) as any;

        return response.sort((a, b) => a.switchport - b.switchport);
      } catch (error) {
        // logger.error(
        //   `Something went wrong. Error number: ${error.errno}, Code: ${error.code}`,
        // );
        return [];
      }
    } else {
      return [];
    }
  }
}
