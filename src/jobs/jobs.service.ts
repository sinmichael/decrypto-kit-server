import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MinerDailyStat } from 'src/miner-daily-stats/entities/miner-daily-stat.entity';
import { MinerHourlyStat } from 'src/miner-hourly-stats/entities/miner-hourly-stat.entity';
import { MinerTypesDailyStatDetail } from 'src/miner-types-daily-stat-details/entities/miner-types-daily-stat-detail.entity';
import { MinerTypesDailyStat } from 'src/miner-types-daily-stats/entities/miner-types-daily-stat.entity';
import { MinerTypesHourlyStatDetail } from 'src/miner-types-hourly-stat-details/entities/miner-types-hourly-stat-detail.entity';
import { MinerTypesHourlyStat } from 'src/miner-types-hourly-stats/entities/miner-types-hourly-stat.entity';
import { CreateMinerDto } from 'src/miners/dto/create-miner.dto';
import { MinersService } from 'src/miners/miners.service';
import { SwitchesService } from 'src/switches/switches.service';
import { MinerHelper } from 'src/utils/miner-helper';
import { StatsHelper } from 'src/utils/stats-helper';

let isFetchRunning = false;

@Injectable()
export class JobsService {
  constructor(
    private readonly switchesService: SwitchesService,
    private readonly minersService: MinersService,
    private readonly minerHelper: MinerHelper,
    private readonly statsHelper: StatsHelper,
    private readonly logger: Logger,
  ) {}

  @Cron('*/5 * * * * *')
  async fetch() {
    if (isFetchRunning) return;

    this.logger.log('FETCH job started');

    isFetchRunning = true;

    const switches = await this.switchesService.findAll();
    for (const switch_ of switches) {
      this.logger.log(`Fetching miners from ${switch_.name}`);
      const miners = await this.switchesService.getMinersFromSwitch(switch_.id);
      for (const miner of miners) {
        const minerData = await this.minerHelper.getDeviceDetails(
          miner.ipAddress,
        );

        if (minerData === undefined) continue;
        
        try {
          const createMinerDto = new CreateMinerDto();
          createMinerDto.ipAddress = miner.ipAddress;
          createMinerDto.macAddress = miner.macAddress;
          createMinerDto.switchPort = miner.switchPort;
          createMinerDto.switch_ = switch_;
          createMinerDto.type = minerData.miner.asicModel;
          createMinerDto.code = minerData.miner.code;
          createMinerDto.x = minerData.x;
          createMinerDto.y = minerData.y;
          createMinerDto.status = minerData.miner.status;
          createMinerDto.ghs = minerData.miner.ghs;
          createMinerDto.ghsAvg = minerData.miner.ghsAvg;
          createMinerDto.consumption = minerData.miner.consumption;
          createMinerDto.elapsed = minerData.miner.elapsed;
          createMinerDto.chain1Acn = minerData.chains[0].acn;
          createMinerDto.chain2Acn = minerData.chains[1].acn;
          createMinerDto.chain3Acn = minerData.chains[2].acn;
          createMinerDto.acnAvg = minerData.miner.acnAvg;
          createMinerDto.chain1Temp = minerData.chains[0].temp;
          createMinerDto.chain2Temp = minerData.chains[1].temp;
          createMinerDto.chain3Temp = minerData.chains[2].temp;
          createMinerDto.chain1TempPcb = minerData.chains[0].tempPcb;
          createMinerDto.chain2TempPcb = minerData.chains[0].tempPcb;
          createMinerDto.chain3TempPcb = minerData.chains[0].tempPcb;
          createMinerDto.tempAvg = minerData.miner.tempAvg;
          createMinerDto.chain1Acs = minerData.chains[0].acs;
          createMinerDto.chain2Acs = minerData.chains[0].acs;
          createMinerDto.chain3Acs = minerData.chains[0].acs;
          createMinerDto.fan1 = minerData.fans[0] === 'N/A' ? null : +minerData.fans[0];
          createMinerDto.fan2 = minerData.fans[1] === 'N/A' ? null : +minerData.fans[1];
          createMinerDto.fan3 = minerData.fans[2] === 'N/A' ? null : +minerData.fans[2];
          createMinerDto.fan4 = minerData.fans[3] === 'N/A' ? null : +minerData.fans[3];
          createMinerDto.fanAvg = minerData.miner.fanAvg;
          createMinerDto.pool1 = minerData.pools[0].pool;
          createMinerDto.pool2 = minerData.pools[1].pool;
          createMinerDto.pool3 = minerData.pools[2].pool;
          createMinerDto.pool4 = minerData.pools[3].pool;
          createMinerDto.pool1getworks = minerData.pools[0].getWorks;
          createMinerDto.pool2getworks = minerData.pools[1].getWorks;
          createMinerDto.pool3getworks = minerData.pools[2].getWorks;
          createMinerDto.pool4getworks = minerData.pools[3].getWorks;
          createMinerDto.pool1accepted = minerData.pools[0].accepted;
          createMinerDto.pool2accepted = minerData.pools[1].accepted;
          createMinerDto.pool3accepted = minerData.pools[2].accepted;
          createMinerDto.pool4accepted = minerData.pools[3].accepted;
          createMinerDto.pool1rejected = minerData.pools[0].rejected;
          createMinerDto.pool2rejected = minerData.pools[1].rejected;
          createMinerDto.pool3rejected = minerData.pools[2].rejected;
          createMinerDto.pool4rejected = minerData.pools[3].rejected;
          createMinerDto.pool1works = minerData.pools[0].works;
          createMinerDto.pool2works = minerData.pools[1].works;
          createMinerDto.pool3works = minerData.pools[2].works;
          createMinerDto.pool4works = minerData.pools[3].works;
          createMinerDto.pool1discarded = minerData.pools[0].discarded;
          createMinerDto.pool2discarded = minerData.pools[1].discarded;
          createMinerDto.pool3discarded = minerData.pools[2].discarded;
          createMinerDto.pool4discarded = minerData.pools[3].discarded;
          createMinerDto.pool1stale = minerData.pools[0].stale;
          createMinerDto.pool2stale = minerData.pools[1].stale;
          createMinerDto.pool3stale = minerData.pools[2].stale;
          createMinerDto.pool4stale = minerData.pools[3].stale;
          createMinerDto.pool1user = minerData.pools[0].user;
          createMinerDto.pool2user = minerData.pools[1].user;
          createMinerDto.pool3user = minerData.pools[2].user;
          createMinerDto.pool4user = minerData.pools[3].user;
          createMinerDto.pool1ghs = minerData.pools[0].ghs;
          createMinerDto.pool2ghs = minerData.pools[1].ghs;
          createMinerDto.pool3ghs = minerData.pools[2].ghs;
          createMinerDto.pool4ghs = minerData.pools[3].ghs;
          createMinerDto.pool1difficultyAccepted =
            minerData.pools[0].difficultyAccepted;
          createMinerDto.pool2difficultyAccepted =
            minerData.pools[1].difficultyAccepted;
          createMinerDto.pool3difficultyAccepted =
            minerData.pools[2].difficultyAccepted;
          createMinerDto.pool4difficultyAccepted =
            minerData.pools[3].difficultyAccepted;
          createMinerDto.pool1getFailures = minerData.pools[0].getFailures;
          createMinerDto.pool1remoteFailures = minerData.pools[0].remoteFailures;
          createMinerDto.pool1diff = minerData.pools[0].diff;
          createMinerDto.pool1diff1Shares = minerData.pools[0].diff1Shares;
          createMinerDto.pool1difficultyRejected =
            minerData.pools[0].difficultyRejected;
          createMinerDto.pool1difficultyStale = minerData.pools[0].difficultyStale;
          createMinerDto.pool1lastShareDifficulty =
            minerData.pools[0].lastShareDifficulty;
          createMinerDto.pool1workDifficulty = minerData.pools[0].workDifficulty;
          createMinerDto.pool1hasStratum = minerData.pools[0].hasStratum;
          createMinerDto.pool1stratumActive = minerData.pools[0].stratumActive;
          createMinerDto.pool1stratumUrl = minerData.pools[0].stratumUrl;
          createMinerDto.pool1stratumDifficulty =
            minerData.pools[0].stratumDifficulty;
          createMinerDto.pool1bestShare = minerData.pools[0].bestShare;
          createMinerDto.pool1rejectedPercentage =
            minerData.pools[0].rejectedPercentage;
          createMinerDto.pool1stalePercentage = minerData.pools[0].stalePercentage;
          createMinerDto.pool1badWork = minerData.pools[0].badWork;
          createMinerDto.pool1currentBlockHeight =
            minerData.pools[0].currentBlockHeight;
          createMinerDto.pool1currentBlockVersion =
            minerData.pools[0].currentBlockVersion;
          createMinerDto.pool2getFailures = minerData.pools[1].getFailures;
          createMinerDto.pool2remoteFailures = minerData.pools[1].remoteFailures;
          createMinerDto.pool2diff = minerData.pools[1].diff;
          createMinerDto.pool2diff1Shares = minerData.pools[1].diff1Shares;
          createMinerDto.pool2difficultyRejected =
            minerData.pools[1].difficultyRejected;
          createMinerDto.pool2difficultyStale = minerData.pools[1].difficultyStale;
          createMinerDto.pool2lastShareDifficulty =
            minerData.pools[1].lastShareDifficulty;
          createMinerDto.pool2workDifficulty = minerData.pools[1].workDifficulty;
          createMinerDto.pool2hasStratum = minerData.pools[1].hasStratum;
          createMinerDto.pool2stratumActive = minerData.pools[1].stratumActive;
          createMinerDto.pool2stratumUrl = minerData.pools[1].stratumUrl;
          createMinerDto.pool2stratumDifficulty =
            minerData.pools[1].stratumDifficulty;
          createMinerDto.pool2bestShare = minerData.pools[1].bestShare;
          createMinerDto.pool2rejectedPercentage =
            minerData.pools[1].rejectedPercentage;
          createMinerDto.pool2stalePercentage = minerData.pools[1].stalePercentage;
          createMinerDto.pool2badWork = minerData.pools[1].badWork;
          createMinerDto.pool2currentBlockHeight =
            minerData.pools[1].currentBlockHeight;
          createMinerDto.pool2currentBlockVersion =
            minerData.pools[1].currentBlockVersion;
          createMinerDto.pool3getFailures = minerData.pools[2].getFailures;
          createMinerDto.pool3remoteFailures = minerData.pools[2].remoteFailures;
          createMinerDto.pool3diff = minerData.pools[2].diff;
          createMinerDto.pool3diff1Shares = minerData.pools[2].diff1Shares;
          createMinerDto.pool3difficultyRejected =
            minerData.pools[2].difficultyRejected;
          createMinerDto.pool3difficultyStale = minerData.pools[2].difficultyStale;
          createMinerDto.pool3lastShareDifficulty =
            minerData.pools[2].lastShareDifficulty;
          createMinerDto.pool3workDifficulty = minerData.pools[2].workDifficulty;
          createMinerDto.pool3hasStratum = minerData.pools[2].hasStratum;
          createMinerDto.pool3stratumActive = minerData.pools[2].stratumActive;
          createMinerDto.pool3stratumUrl = minerData.pools[2].stratumUrl;
          createMinerDto.pool3stratumDifficulty =
            minerData.pools[2].stratumDifficulty;
          createMinerDto.pool3bestShare = minerData.pools[2].bestShare;
          createMinerDto.pool3rejectedPercentage =
            minerData.pools[2].rejectedPercentage;
          createMinerDto.pool3stalePercentage = minerData.pools[2].stalePercentage;
          createMinerDto.pool3badWork = minerData.pools[2].badWork;
          createMinerDto.pool3currentBlockHeight =
            minerData.pools[2].currentBlockHeight;
          createMinerDto.pool3currentBlockVersion =
            minerData.pools[2].currentBlockVersion;
          createMinerDto.pool4getFailures = minerData.pools[3].getFailures;
          createMinerDto.pool4remoteFailures = minerData.pools[3].remoteFailures;
          createMinerDto.pool4diff = minerData.pools[3].diff;
          createMinerDto.pool4diff1Shares = minerData.pools[3].diff1Shares;
          createMinerDto.pool4difficultyRejected =
            minerData.pools[3].difficultyRejected;
          createMinerDto.pool4difficultyStale = minerData.pools[3].difficultyStale;
          createMinerDto.pool4lastShareDifficulty =
            minerData.pools[3].lastShareDifficulty;
          createMinerDto.pool4workDifficulty = minerData.pools[3].workDifficulty;
          createMinerDto.pool4hasStratum = minerData.pools[3].hasStratum;
          createMinerDto.pool4stratumActive = minerData.pools[3].stratumActive;
          createMinerDto.pool4stratumUrl = minerData.pools[3].stratumUrl;
          createMinerDto.pool4stratumDifficulty =
            minerData.pools[3].stratumDifficulty;
          createMinerDto.pool4bestShare = minerData.pools[3].bestShare;
          createMinerDto.pool4rejectedPercentage =
            minerData.pools[3].rejectedPercentage;
          createMinerDto.pool4stalePercentage = minerData.pools[3].stalePercentage;
          createMinerDto.pool4badWork = minerData.pools[3].badWork;
          createMinerDto.pool4currentBlockHeight =
            minerData.pools[3].currentBlockHeight;
          createMinerDto.pool4currentBlockVersion =
            minerData.pools[3].currentBlockVersion;
          createMinerDto.username = minerData.username;
          createMinerDto.password = minerData.password;
          createMinerDto.firmware = minerData.firmware;
          createMinerDto.software = minerData.software;
          createMinerDto.hardware = minerData.hardware;

          await this.minersService.create(createMinerDto);
        } catch(error) {
          this.logger.error(`${miner.ipAddress} ${error}`)
        }
      }
    }

    isFetchRunning = false;
  }

  @Cron('00 * * * *')
  async hourlyJobs() {
    await this.saveMinerHourlyStat();
    await this.saveMinerTypesHourly();
  }

  @Cron('55 23 * * *')
  async dailyJobs() {
    await this.saveMinerDailyStat();
    await this.saveMinerTypesDaily();
  }

  async saveMinerHourlyStat() {
    const currentMinerTotalStats = await this.statsHelper.getCurrentMinerTotalStats();

    const minerHourlyStat = new MinerHourlyStat();
    minerHourlyStat.minerCount = currentMinerTotalStats.minerCount;
    minerHourlyStat.ghs = currentMinerTotalStats.ghs;
    minerHourlyStat.ghsAvg = currentMinerTotalStats.ghsAvg;
    minerHourlyStat.consumption = currentMinerTotalStats.consumption;
    await minerHourlyStat.save();

    this.logger.log('Miner hourly stat saved')
  }

  async saveMinerDailyStat() {
    const currentMinerTotalStats = await this.statsHelper.getCurrentMinerTotalStats();

    const minerDailyStat = new MinerDailyStat();
    minerDailyStat.minerCount = currentMinerTotalStats.minerCount;
    minerDailyStat.ghs = currentMinerTotalStats.ghs;
    minerDailyStat.ghsAvg = currentMinerTotalStats.ghsAvg;
    minerDailyStat.consumption = currentMinerTotalStats.consumption;
    await minerDailyStat.save();

    this.logger.log('Miner daily stat saved')
  }

  async saveMinerTypesHourly() {
    const currentMinerTypesStats = await this.statsHelper.getMinersBreakdown();

    const minerTypeHourlyStat = new MinerTypesHourlyStat();
    await minerTypeHourlyStat.save();

    const details: Array<MinerTypesHourlyStatDetail> = [];

    for (const c of currentMinerTypesStats) {
      const detail = new MinerTypesHourlyStatDetail();
      detail.type = c.type;
      detail.code = c.code;
      detail.count = c.minerCount;
      detail.ghs = c.ghs;
      detail.ghsAvg = c.ghsAvg;
      detail.consumption = c.consumption;
      await detail.save();
      details.push(detail);
    }

    minerTypeHourlyStat.minerTypesHourlyStatDetails = details;
    minerTypeHourlyStat.save();

    this.logger.log('Miner types hourly stat saved')
  }

  async saveMinerTypesDaily() {
    const currentMinerTypesStats = await this.statsHelper.getMinersBreakdown();

    const minerTypesDailyStat = new MinerTypesDailyStat();
    await minerTypesDailyStat.save();

    const details: Array<MinerTypesDailyStatDetail> = [];

    for (const c of currentMinerTypesStats) {
      const detail = new MinerTypesDailyStatDetail();
      detail.type = c.type;
      detail.code = c.code;
      detail.count = c.minerCount;
      detail.ghs = c.ghs;
      detail.ghsAvg = c.ghsAvg;
      detail.consumption = c.consumption;
      await detail.save();
      details.push(detail);
    }

    minerTypesDailyStat.minerTypesDailyStatDetails = details;
    minerTypesDailyStat.save();

    this.logger.log('Miner types daily stat saved')
  }
}
