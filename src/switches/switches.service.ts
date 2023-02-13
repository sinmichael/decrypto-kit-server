import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
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
    private readonly logger: Logger,
  ) {}

  create(createSwitchDto: CreateSwitchDto) {
    return 'This action adds a new switch';
  }

  async findAll() {
    return await this.switchRepository.find({ order: { lastChecked: 'ASC' } });
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
    const timeSpan = 300;
    const ret = [] as any;

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

        response.sort((a, b) => a.switchport - b.switchport);

        for (const client of response) {
          ret.push({
            id: client.id,
            macAddress: client.mac,
            description: client.description,
            mdnsName: client.mdnsName,
            dhcpHostname: client.dhcpHostname,
            user: client.user,
            ipAddress: client.ip,
            vlan: client.vlan,
            switchPort: client.switchport !== null ? +client.switchport : 0,
            usage: client.usage,
          });
        }

        return ret;
      } catch (error) {
        this.logger.error(
          `Something went wrong. Error number: ${error.errno}, Code: ${error.code}`,
        );
        return [];
      }
    }

    if (switch_.isRange) {
      //
    }
  }
}
