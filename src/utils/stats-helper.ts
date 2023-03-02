import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MinerDailyStat } from "src/miner-daily-stats/entities/miner-daily-stat.entity";
import { MinerHourlyStat } from "src/miner-hourly-stats/entities/miner-hourly-stat.entity";
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
        @InjectRepository(MinerHourlyStat)
        private minerHourlyStatRepository: Repository<MinerHourlyStat>,
        @InjectRepository(MinerDailyStat)
        private minerDailyStatRepository: Repository<MinerDailyStat>,
        private readonly logger: Logger,
    ) { }

    async getCurrentMinerTotalStats() {
        return await this.minerRepository
            .createQueryBuilder('miner')
            .select([
                'COUNT(*)::integer as "minerCount"',
                'SUM(ghs)::float as ghs',
                'SUM("ghsAvg")::float as "ghsAvg"',
                'SUM(consumption)::float as consumption'])
            .getRawOne();
    }

    async getMinersBreakdown() {
        return await this.minerRepository
            .createQueryBuilder('miner')
            .select([
                'type',
                'code',
                'COUNT(*)::integer as "minerCount"',
                'SUM(ghs)::float as ghs',
                'SUM("ghsAvg")::float as "ghsAvg"',
                'SUM(consumption)::float as consumption'])
            .groupBy('type, code')
            .getRawMany();
    }

    async getMinersHourly() {
        return await this.minerHourlyStatRepository.createQueryBuilder().select(['"minerCount"', 'ghs', '"ghsAvg"', 'consumption', '"createdAt"']).getRawMany();
    }

    async getMinersDaily() {
        return await this.minerDailyStatRepository.createQueryBuilder().select(['"minerCount"', 'ghs', '"ghsAvg"', 'consumption', '"createdAt"']).getRawMany();
    }
}