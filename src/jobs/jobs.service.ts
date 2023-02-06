import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMinerDto } from 'src/miners/dto/create-miner.dto';
import { Miner } from 'src/miners/entities/miner.entity';
import { MinersService } from 'src/miners/miners.service';
import { SwitchesService } from 'src/switches/switches.service';
import { MinerHelper } from 'src/utils/miner-helper';
import { Repository } from 'typeorm';

let isFetchRunning = false;

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Miner)
    private minerRepository: Repository<Miner>,
    private readonly switchesService: SwitchesService,
    private readonly minersService: MinersService,
    private readonly minerHelper: MinerHelper,
    private readonly logger: Logger,
  ) {}

  @Cron('*/5 * * * * *')
  async fetch() {
    if (isFetchRunning) return;

    this.logger.log('FETCH job started');

    isFetchRunning = true;

    const switches = await this.switchesService.findAll();
    for (const switch_ of switches) {
      const miners = await this.switchesService.getMinersFromSwitch(switch_.id);
      for (const miner of miners) {
        const minerData = await this.minerHelper.getDeviceDetails(
          miner.ipAddress,
        );

        if (minerData === undefined) continue;

        const createMinerDto = new CreateMinerDto();
        createMinerDto.ipAddress = miner.ipAddress;
        createMinerDto.macAddress = miner.macAddress;
        createMinerDto.switchPort = miner.switchPort;
        createMinerDto.switch_ = switch_;
        createMinerDto.type = minerData.asicModel;
        createMinerDto.code = minerData.code;
        createMinerDto.x = minerData.x;
        createMinerDto.y = minerData.y;
        createMinerDto.status = minerData.status;
        createMinerDto.ghs = minerData.ghs;
        createMinerDto.ghsAvg = minerData.ghsAvg;
        createMinerDto.consumption = minerData.consumption;
        createMinerDto.elapsed = minerData.elapsed;
        createMinerDto.chain1Acn = minerData.chain1Acn;
        createMinerDto.chain2Acn = minerData.chain2Acn;
        createMinerDto.chain3Acn = minerData.chain3Acn;
        createMinerDto.acnAvg = minerData.acnAvg;
        createMinerDto.chain1Temp = minerData.chain1Temp;
        createMinerDto.chain2Temp = minerData.chain2Temp;
        createMinerDto.chain3Temp = minerData.chain3Temp;
        createMinerDto.chain1TempPcb = minerData.chain1TempPcb;
        createMinerDto.chain2TempPcb = minerData.chain2TempPcb;
        createMinerDto.chain3TempPcb = minerData.chain3TempPcb;
        createMinerDto.tempAvg = minerData.tempAvg;
        createMinerDto.chain1Acs = minerData.chain1Acs;
        createMinerDto.chain2Acs = minerData.chain2Acs;
        createMinerDto.chain3Acs = minerData.chain3Acs;
        createMinerDto.fan1 = minerData.fan1 === 'N/A' ? null : +minerData.fan1;
        createMinerDto.fan2 = minerData.fan2 === 'N/A' ? null : +minerData.fan2;
        createMinerDto.fan3 = minerData.fan3 === 'N/A' ? null : +minerData.fan3;
        createMinerDto.fan4 = minerData.fan4 === 'N/A' ? null : +minerData.fan4;
        createMinerDto.fanAvg = minerData.fanAvg;
        createMinerDto.pool1 = minerData.pool1;
        createMinerDto.pool2 = minerData.pool2;
        createMinerDto.pool3 = minerData.pool3;
        createMinerDto.pool4 = minerData.pool4;
        createMinerDto.pool1getworks = minerData.pool1getworks;
        createMinerDto.pool2getworks = minerData.pool2getworks;
        createMinerDto.pool3getworks = minerData.pool3getworks;
        createMinerDto.pool4getworks = minerData.pool4getworks;
        createMinerDto.pool1accepted = minerData.pool1accepted;
        createMinerDto.pool2accepted = minerData.pool2accepted;
        createMinerDto.pool3accepted = minerData.pool3accepted;
        createMinerDto.pool4accepted = minerData.pool4accepted;
        createMinerDto.pool1rejected = minerData.pool1rejected;
        createMinerDto.pool2rejected = minerData.pool2rejected;
        createMinerDto.pool3rejected = minerData.pool3rejected;
        createMinerDto.pool4rejected = minerData.pool4rejected;
        createMinerDto.pool1works = minerData.pool1works;
        createMinerDto.pool2works = minerData.pool2works;
        createMinerDto.pool3works = minerData.pool3works;
        createMinerDto.pool4works = minerData.pool4works;
        createMinerDto.pool1discarded = minerData.pool1discarded;
        createMinerDto.pool2discarded = minerData.pool2discarded;
        createMinerDto.pool3discarded = minerData.pool3discarded;
        createMinerDto.pool4discarded = minerData.pool4discarded;
        createMinerDto.pool1stale = minerData.pool1stale;
        createMinerDto.pool2stale = minerData.pool2stale;
        createMinerDto.pool3stale = minerData.pool3stale;
        createMinerDto.pool4stale = minerData.pool4stale;
        createMinerDto.pool1user = minerData.pool1user;
        createMinerDto.pool2user = minerData.pool2user;
        createMinerDto.pool3user = minerData.pool3user;
        createMinerDto.pool4user = minerData.pool4user;
        createMinerDto.pool1ghs = minerData.pool1ghs;
        createMinerDto.pool2ghs = minerData.pool2ghs;
        createMinerDto.pool3ghs = minerData.pool3ghs;
        createMinerDto.pool4ghs = minerData.pool4ghs;
        createMinerDto.pool1difficultyAccepted =
          minerData.pool1difficultyAccepted;
        createMinerDto.pool2difficultyAccepted =
          minerData.pool2difficultyAccepted;
        createMinerDto.pool3difficultyAccepted =
          minerData.pool3difficultyAccepted;
        createMinerDto.pool4difficultyAccepted =
          minerData.pool4difficultyAccepted;
        createMinerDto.pool1getFailures = minerData.pool1getFailures;
        createMinerDto.pool1remoteFailures = minerData.pool1remoteFailures;
        createMinerDto.pool1diff = minerData.pool1diff;
        createMinerDto.pool1diff1Shares = minerData.pool1diff1Shares;
        createMinerDto.pool1difficultyRejected =
          minerData.pool1difficultyRejected;
        createMinerDto.pool1difficultyStale = minerData.pool1difficultyStale;
        createMinerDto.pool1lastShareDifficulty =
          minerData.pool1lastShareDifficulty;
        createMinerDto.pool1workDifficulty = minerData.pool1workDifficulty;
        createMinerDto.pool1hasStratum = minerData.pool1hasStratum;
        createMinerDto.pool1stratumActive = minerData.pool1stratumActive;
        createMinerDto.pool1stratumUrl = minerData.pool1stratumUrl;
        createMinerDto.pool1stratumDifficulty =
          minerData.pool1stratumDifficulty;
        createMinerDto.pool1bestShare = minerData.pool1bestShare;
        createMinerDto.pool1rejectedPercentage =
          minerData.pool1rejectedPercentage;
        createMinerDto.pool1stalePercentage = minerData.pool1stalePercentage;
        createMinerDto.pool1badWork = minerData.pool1badWork;
        createMinerDto.pool1currentBlockHeight =
          minerData.pool1currentBlockHeight;
        createMinerDto.pool1currentBlockVersion =
          minerData.pool1currentBlockVersion;
        createMinerDto.pool2getFailures = minerData.pool2getFailures;
        createMinerDto.pool2remoteFailures = minerData.pool2remoteFailures;
        createMinerDto.pool2diff = minerData.pool2diff;
        createMinerDto.pool2diff1Shares = minerData.pool2diff1Shares;
        createMinerDto.pool2difficultyRejected =
          minerData.pool2difficultyRejected;
        createMinerDto.pool2difficultyStale = minerData.pool2difficultyStale;
        createMinerDto.pool2lastShareDifficulty =
          minerData.pool2lastShareDifficulty;
        createMinerDto.pool2workDifficulty = minerData.pool2workDifficulty;
        createMinerDto.pool2hasStratum = minerData.pool2hasStratum;
        createMinerDto.pool2stratumActive = minerData.pool2stratumActive;
        createMinerDto.pool2stratumUrl = minerData.pool2stratumUrl;
        createMinerDto.pool2stratumDifficulty =
          minerData.pool2stratumDifficulty;
        createMinerDto.pool2bestShare = minerData.pool2bestShare;
        createMinerDto.pool2rejectedPercentage =
          minerData.pool2rejectedPercentage;
        createMinerDto.pool2stalePercentage = minerData.pool2stalePercentage;
        createMinerDto.pool2badWork = minerData.pool2badWork;
        createMinerDto.pool2currentBlockHeight =
          minerData.pool2currentBlockHeight;
        createMinerDto.pool2currentBlockVersion =
          minerData.pool2currentBlockVersion;
        createMinerDto.pool3getFailures = minerData.pool3getFailures;
        createMinerDto.pool3remoteFailures = minerData.pool3remoteFailures;
        createMinerDto.pool3diff = minerData.pool3diff;
        createMinerDto.pool3diff1Shares = minerData.pool3diff1Shares;
        createMinerDto.pool3difficultyRejected =
          minerData.pool3difficultyRejected;
        createMinerDto.pool3difficultyStale = minerData.pool3difficultyStale;
        createMinerDto.pool3lastShareDifficulty =
          minerData.pool3lastShareDifficulty;
        createMinerDto.pool3workDifficulty = minerData.pool3workDifficulty;
        createMinerDto.pool3hasStratum = minerData.pool3hasStratum;
        createMinerDto.pool3stratumActive = minerData.pool3stratumActive;
        createMinerDto.pool3stratumUrl = minerData.pool3stratumUrl;
        createMinerDto.pool3stratumDifficulty =
          minerData.pool3stratumDifficulty;
        createMinerDto.pool3bestShare = minerData.pool3bestShare;
        createMinerDto.pool3rejectedPercentage =
          minerData.pool3rejectedPercentage;
        createMinerDto.pool3stalePercentage = minerData.pool3stalePercentage;
        createMinerDto.pool3badWork = minerData.pool3badWork;
        createMinerDto.pool3currentBlockHeight =
          minerData.pool3currentBlockHeight;
        createMinerDto.pool3currentBlockVersion =
          minerData.pool3currentBlockVersion;
        createMinerDto.pool4getFailures = minerData.pool4getFailures;
        createMinerDto.pool4remoteFailures = minerData.pool4remoteFailures;
        createMinerDto.pool4diff = minerData.pool4diff;
        createMinerDto.pool4diff1Shares = minerData.pool4diff1Shares;
        createMinerDto.pool4difficultyRejected =
          minerData.pool4difficultyRejected;
        createMinerDto.pool4difficultyStale = minerData.pool4difficultyStale;
        createMinerDto.pool4lastShareDifficulty =
          minerData.pool4lastShareDifficulty;
        createMinerDto.pool4workDifficulty = minerData.pool4workDifficulty;
        createMinerDto.pool4hasStratum = minerData.pool4hasStratum;
        createMinerDto.pool4stratumActive = minerData.pool4stratumActive;
        createMinerDto.pool4stratumUrl = minerData.pool4stratumUrl;
        createMinerDto.pool4stratumDifficulty =
          minerData.pool4stratumDifficulty;
        createMinerDto.pool4bestShare = minerData.pool4bestShare;
        createMinerDto.pool4rejectedPercentage =
          minerData.pool4rejectedPercentage;
        createMinerDto.pool4stalePercentage = minerData.pool4stalePercentage;
        createMinerDto.pool4badWork = minerData.pool4badWork;
        createMinerDto.pool4currentBlockHeight =
          minerData.pool4currentBlockHeight;
        createMinerDto.pool4currentBlockVersion =
          minerData.pool4currentBlockVersion;
        createMinerDto.username = minerData.username;
        createMinerDto.password = minerData.password;
        createMinerDto.firmware = minerData.firmware;
        createMinerDto.software = minerData.software;
        createMinerDto.hardware = minerData.hardware;

        await this.minersService.create(createMinerDto);
      }
    }

    isFetchRunning = false;
  }
}
