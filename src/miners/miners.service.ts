import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { SwitchesService } from 'src/switches/switches.service';
import { MinerHelper } from 'src/utils/miner-helper';
import { Repository } from 'typeorm';
import { CreateMinerDto } from './dto/create-miner.dto';
import { UpdateMinerDto } from './dto/update-miner.dto';
import { Miner } from './entities/miner.entity';

@Injectable()
export class MinersService {
  constructor(
    @InjectRepository(Miner)
    private minerRepository: Repository<Miner>,
    private readonly switchesService: SwitchesService,
    private readonly minerHelper: MinerHelper,
  ) { }

  async create(createMinerDto: CreateMinerDto) {
    const {
      ipAddress,
      macAddress,
      type,
      code,
      switch_,
      switchPort,
      x,
      y,
      status,
      ghs,
      ghsAvg,
      consumption,
      elapsed,
      chain1Acn,
      chain2Acn,
      chain3Acn,
      acnAvg,
      chain1Temp,
      chain2Temp,
      chain3Temp,
      chain1TempPcb,
      chain2TempPcb,
      chain3TempPcb,
      tempAvg,
      chain1Acs,
      chain2Acs,
      chain3Acs,
      fan1,
      fan2,
      fan3,
      fan4,
      fanAvg,
      pool1,
      pool2,
      pool3,
      pool4,
      pool1getworks,
      pool2getworks,
      pool3getworks,
      pool4getworks,
      pool1accepted,
      pool2accepted,
      pool3accepted,
      pool4accepted,
      pool1rejected,
      pool2rejected,
      pool3rejected,
      pool4rejected,
      pool1works,
      pool2works,
      pool3works,
      pool4works,
      pool1discarded,
      pool2discarded,
      pool3discarded,
      pool4discarded,
      pool1stale,
      pool2stale,
      pool3stale,
      pool4stale,
      pool1user,
      pool2user,
      pool3user,
      pool4user,
      pool1ghs,
      pool2ghs,
      pool3ghs,
      pool4ghs,
      pool1difficultyAccepted,
      pool2difficultyAccepted,
      pool3difficultyAccepted,
      pool4difficultyAccepted,
      pool1getFailures,
      pool1remoteFailures,
      pool1diff,
      pool1diff1Shares,
      pool1difficultyRejected,
      pool1difficultyStale,
      pool1lastShareDifficulty,
      pool1workDifficulty,
      pool1hasStratum,
      pool1stratumActive,
      pool1stratumUrl,
      pool1stratumDifficulty,
      pool1bestShare,
      pool1rejectedPercentage,
      pool1stalePercentage,
      pool1badWork,
      pool1currentBlockHeight,
      pool1currentBlockVersion,
      pool2getFailures,
      pool2remoteFailures,
      pool2diff,
      pool2diff1Shares,
      pool2difficultyRejected,
      pool2difficultyStale,
      pool2lastShareDifficulty,
      pool2workDifficulty,
      pool2hasStratum,
      pool2stratumActive,
      pool2stratumUrl,
      pool2stratumDifficulty,
      pool2bestShare,
      pool2rejectedPercentage,
      pool2stalePercentage,
      pool2badWork,
      pool2currentBlockHeight,
      pool2currentBlockVersion,
      pool3getFailures,
      pool3remoteFailures,
      pool3diff,
      pool3diff1Shares,
      pool3difficultyRejected,
      pool3difficultyStale,
      pool3lastShareDifficulty,
      pool3workDifficulty,
      pool3hasStratum,
      pool3stratumActive,
      pool3stratumUrl,
      pool3stratumDifficulty,
      pool3bestShare,
      pool3rejectedPercentage,
      pool3stalePercentage,
      pool3badWork,
      pool3currentBlockHeight,
      pool3currentBlockVersion,
      pool4getFailures,
      pool4remoteFailures,
      pool4diff,
      pool4diff1Shares,
      pool4difficultyRejected,
      pool4difficultyStale,
      pool4lastShareDifficulty,
      pool4workDifficulty,
      pool4hasStratum,
      pool4stratumActive,
      pool4stratumUrl,
      pool4stratumDifficulty,
      pool4bestShare,
      pool4rejectedPercentage,
      pool4stalePercentage,
      pool4badWork,
      pool4currentBlockHeight,
      pool4currentBlockVersion,
      username,
      password,
      firmware,
      software,
      hardware,
    } = createMinerDto;

    let miner = await this.minerRepository.findOne({
      where: { ipAddress: ipAddress, macAddress: macAddress, code: code },
    });

    if (!miner) miner = new Miner();

    miner.ipAddress = ipAddress;
    miner.macAddress = macAddress;
    miner.type = type;
    miner.code = code;
    miner.switch = switch_;
    miner.switchPort = switchPort;
    miner.x = x;
    miner.y = y;
    miner.status = status;
    miner.ghs = ghs;
    miner.ghsAvg = ghsAvg;
    miner.consumption = consumption;
    miner.elapsed = elapsed;
    miner.chain1Acn = chain1Acn;
    miner.chain2Acn = chain2Acn;
    miner.chain3Acn = chain3Acn;
    miner.acnAvg = acnAvg;
    miner.chain1Temp = chain1Temp;
    miner.chain2Temp = chain2Temp;
    miner.chain3Temp = chain3Temp;
    miner.chain1TempPcb = chain1TempPcb;
    miner.chain2TempPcb = chain2TempPcb;
    miner.chain3TempPcb = chain3TempPcb;
    miner.tempAvg = tempAvg;
    miner.chain1Acs = chain1Acs;
    miner.chain2Acs = chain2Acs;
    miner.chain3Acs = chain3Acs;
    miner.fan1 = fan1;
    miner.fan2 = fan2;
    miner.fan3 = fan3;
    miner.fan4 = fan4;
    miner.fanAvg = fanAvg;
    miner.pool1 = pool1;
    miner.pool2 = pool2;
    miner.pool3 = pool3;
    miner.pool4 = pool4;
    miner.pool1getworks = pool1getworks;
    miner.pool2getworks = pool2getworks;
    miner.pool3getworks = pool3getworks;
    miner.pool4getworks = pool4getworks;
    miner.pool1accepted = pool1accepted;
    miner.pool2accepted = pool2accepted;
    miner.pool3accepted = pool3accepted;
    miner.pool4accepted = pool4accepted;
    miner.pool1rejected = pool1rejected;
    miner.pool2rejected = pool2rejected;
    miner.pool3rejected = pool3rejected;
    miner.pool4rejected = pool4rejected;
    miner.pool1works = pool1works;
    miner.pool2works = pool2works;
    miner.pool3works = pool3works;
    miner.pool4works = pool4works;
    miner.pool1discarded = pool1discarded;
    miner.pool2discarded = pool2discarded;
    miner.pool3discarded = pool3discarded;
    miner.pool4discarded = pool4discarded;
    miner.pool1stale = pool1stale;
    miner.pool2stale = pool2stale;
    miner.pool3stale = pool3stale;
    miner.pool4stale = pool4stale;
    miner.pool1user = pool1user;
    miner.pool2user = pool2user;
    miner.pool3user = pool3user;
    miner.pool4user = pool4user;
    miner.pool1ghs = pool1ghs;
    miner.pool2ghs = pool2ghs;
    miner.pool3ghs = pool3ghs;
    miner.pool4ghs = pool4ghs;
    miner.pool1difficultyAccepted = pool1difficultyAccepted;
    miner.pool2difficultyAccepted = pool2difficultyAccepted;
    miner.pool3difficultyAccepted = pool3difficultyAccepted;
    miner.pool4difficultyAccepted = pool4difficultyAccepted;
    miner.pool1getFailures = pool1getFailures;
    miner.pool1remoteFailures = pool1remoteFailures;
    miner.pool1diff = pool1diff;
    miner.pool1diff1Shares = pool1diff1Shares;
    miner.pool1difficultyRejected = pool1difficultyRejected;
    miner.pool1difficultyStale = pool1difficultyStale;
    miner.pool1lastShareDifficulty = pool1lastShareDifficulty;
    miner.pool1workDifficulty = pool1workDifficulty;
    miner.pool1hasStratum = pool1hasStratum;
    miner.pool1stratumActive = pool1stratumActive;
    miner.pool1stratumUrl = pool1stratumUrl;
    miner.pool1stratumDifficulty = pool1stratumDifficulty;
    miner.pool1bestShare = pool1bestShare;
    miner.pool1rejectedPercentage = pool1rejectedPercentage;
    miner.pool1stalePercentage = pool1stalePercentage;
    miner.pool1badWork = pool1badWork;
    miner.pool1currentBlockHeight = pool1currentBlockHeight;
    miner.pool1currentBlockVersion = pool1currentBlockVersion;
    miner.pool2getFailures = pool2getFailures;
    miner.pool2remoteFailures = pool2remoteFailures;
    miner.pool2diff = pool2diff;
    miner.pool2diff1Shares = pool2diff1Shares;
    miner.pool2difficultyRejected = pool2difficultyRejected;
    miner.pool2difficultyStale = pool2difficultyStale;
    miner.pool2lastShareDifficulty = pool2lastShareDifficulty;
    miner.pool2workDifficulty = pool2workDifficulty;
    miner.pool2hasStratum = pool2hasStratum;
    miner.pool2stratumActive = pool2stratumActive;
    miner.pool2stratumUrl = pool2stratumUrl;
    miner.pool2stratumDifficulty = pool2stratumDifficulty;
    miner.pool2bestShare = pool2bestShare;
    miner.pool2rejectedPercentage = pool2rejectedPercentage;
    miner.pool2stalePercentage = pool2stalePercentage;
    miner.pool2badWork = pool2badWork;
    miner.pool2currentBlockHeight = pool2currentBlockHeight;
    miner.pool2currentBlockVersion = pool2currentBlockVersion;
    miner.pool3getFailures = pool3getFailures;
    miner.pool3remoteFailures = pool3remoteFailures;
    miner.pool3diff = pool3diff;
    miner.pool3diff1Shares = pool3diff1Shares;
    miner.pool3difficultyRejected = pool3difficultyRejected;
    miner.pool3difficultyStale = pool3difficultyStale;
    miner.pool3lastShareDifficulty = pool3lastShareDifficulty;
    miner.pool3workDifficulty = pool3workDifficulty;
    miner.pool3hasStratum = pool3hasStratum;
    miner.pool3stratumActive = pool3stratumActive;
    miner.pool3stratumUrl = pool3stratumUrl;
    miner.pool3stratumDifficulty = pool3stratumDifficulty;
    miner.pool3bestShare = pool3bestShare;
    miner.pool3rejectedPercentage = pool3rejectedPercentage;
    miner.pool3stalePercentage = pool3stalePercentage;
    miner.pool3badWork = pool3badWork;
    miner.pool3currentBlockHeight = pool3currentBlockHeight;
    miner.pool3currentBlockVersion = pool3currentBlockVersion;
    miner.pool4getFailures = pool4getFailures;
    miner.pool4remoteFailures = pool4remoteFailures;
    miner.pool4diff = pool4diff;
    miner.pool4diff1Shares = pool4diff1Shares;
    miner.pool4difficultyRejected = pool4difficultyRejected;
    miner.pool4difficultyStale = pool4difficultyStale;
    miner.pool4lastShareDifficulty = pool4lastShareDifficulty;
    miner.pool4workDifficulty = pool4workDifficulty;
    miner.pool4hasStratum = pool4hasStratum;
    miner.pool4stratumActive = pool4stratumActive;
    miner.pool4stratumUrl = pool4stratumUrl;
    miner.pool4stratumDifficulty = pool4stratumDifficulty;
    miner.pool4bestShare = pool4bestShare;
    miner.pool4rejectedPercentage = pool4rejectedPercentage;
    miner.pool4stalePercentage = pool4stalePercentage;
    miner.pool4badWork = pool4badWork;
    miner.pool4currentBlockHeight = pool4currentBlockHeight;
    miner.pool4currentBlockVersion = pool4currentBlockVersion;
    miner.username = username;
    miner.password = password;
    miner.firmware = firmware;
    miner.software = software;
    miner.hardware = hardware;

    await miner.save();
  }

  findAll() {
    return this.minerHelper.getDeviceDetails('10.12.10.92');
  }

  async paginate(query: PaginateQuery): Promise<Paginated<Miner>> {
    const response = await paginate(query, this.minerRepository.createQueryBuilder(), { sortableColumns: ['type', 'ghs'], defaultSortBy: [['updatedAt', 'DESC']] })
    return response;
  }

  async findByIpAddress(ipAddress: string) {
    return await this.minerHelper.getDeviceDetails(ipAddress);
  }

  async findByIpAddressRaw(ipAddress: string) {
    return await this.minerHelper.getDeviceDetails(ipAddress, undefined, true);
  }

  findOne(id: number) {
    return `This action returns a #${id} miner`;
  }

  update(id: number, updateMinerDto: UpdateMinerDto) {
    return `This action updates a #${id} miner`;
  }

  remove(id: number) {
    return `This action removes a #${id} miner`;
  }
}
