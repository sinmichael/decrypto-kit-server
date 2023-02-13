import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Miner } from "src/miners/entities/miner.entity";
import { Switch } from "src/switches/entities/switch.entity";
import { Repository } from "typeorm";

@Injectable()
export class StatsHelper {
    constructor(
        @InjectRepository(Switch)
        private switchRepository: Repository<Switch>,
        @InjectRepository(Miner)
        private minerRepository: Repository<Miner>,
        private readonly logger: Logger,
    ) { }

    async getCurrentMinerTotalStats() {
        return await this.minerRepository.createQueryBuilder('miner').select(['COUNT(*)::integer as "minerCount"', 'SUM(ghs)::float as ghs', 'SUM("ghsAvg")::float as "ghsAvg"', 'SUM(consumption)::float as consumption']).getRawOne();
    }
}