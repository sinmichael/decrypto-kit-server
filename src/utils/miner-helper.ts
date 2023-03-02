import { Injectable, Logger } from '@nestjs/common';
import PromiseSocket, { TimeoutError } from 'promise-socket';
import * as ping from 'ping';
import * as moment from 'moment';

@Injectable()
export class MinerHelper {
  constructor(private readonly logger: Logger) {}

  async getDeviceDetails(ipAddress: string, port = 4028, raw = false) {
    const p = await ping.promise.probe(ipAddress);
    if (!p.alive) {
      this.logger.error(`${ipAddress} connection timed out`);
      return undefined;
    }

    const SOCKET_TIMEOUT = 15000;

    const socket = new PromiseSocket();
    socket.setTimeout(SOCKET_TIMEOUT);
    try {
      if (ipAddress != null || ipAddress == 'N/A') {
        await socket.connect(port, ipAddress);
        await socket.write('{"command": "version+stats+pools"}');

        // Read response
        // https://www.gbmb.org/kb-to-bytes
        const chunk = await socket.read(16384);
        let data = [] as any;
        if (chunk.toString().substring(chunk.toString().length - 1) === '}') {
          data = JSON.parse(chunk.toString());
        } else {
          data = this.encodeData(chunk.toString());
        }
        const tData = {} as any;

        if (data.STATUS != undefined && data.STATUS !== 'E') {
          await socket.end();
          await socket.destroy();
          socket.setTimeout(SOCKET_TIMEOUT);

          await socket.connect(port, ipAddress);
          await socket.write('{"command": "version"}');
          let chunk = await socket.read(16384);
          const dataVersion = this.encodeData(chunk.toString());
          tData.version = [dataVersion];

          await socket.destroy();
          socket.setTimeout(SOCKET_TIMEOUT);

          await socket.connect(port, ipAddress);
          await socket.write('{"command": "pools"}');
          chunk = await socket.read(16384);
          const dataPools = this.encodeData(chunk.toString());
          tData.pools = [dataPools];

          await socket.destroy();
          socket.setTimeout(25000);

          await socket.connect(port, ipAddress);
          await socket.write('{"command": "stats"}');
          chunk = await socket.read(16384);
          const dataStats = this.encodeData(chunk.toString());
          tData.stats = [dataStats];

          await socket.destroy();
          await socket.end();

          if (!raw) return this.parseData2(tData);
          return tData;
        }
        // Whatsminer
        if (data.STATUS === 'E' && data.Code === 45) {
          await socket.end();
          await socket.destroy();
          socket.setTimeout(SOCKET_TIMEOUT);
          await socket.connect(port, ipAddress);
          await socket.write('{"command": "get_version"}');
          let chunk = await socket.read(16384);
          const dataVersion = JSON.parse(chunk.toString());
          tData.version = [dataVersion];

          await socket.destroy();
          socket.setTimeout(SOCKET_TIMEOUT);

          await socket.connect(port, ipAddress);
          await socket.write('{"command": "pools"}');
          chunk = await socket.read(16384);
          const dataPools = JSON.parse(chunk.toString());
          tData.pools = [dataPools];

          await socket.destroy();
          socket.setTimeout(SOCKET_TIMEOUT);

          await socket.connect(port, ipAddress);
          await socket.write('{"command": "summary+devdetails"}');
          chunk = await socket.read(16384);
          const dataStats = JSON.parse(chunk.toString());
          tData.stats = [dataStats];

          await socket.destroy();
          await socket.end();

          if (!raw) return this.parseData2(tData);
          return tData;
        }
        const parsedData = this.parseData2(data);

        await socket.destroy();
        await socket.end();

        if (!raw) return parsedData;
        return data;
      } else {
        return undefined;
      }
    } catch (error) {
      if (error.errno == -4039) {
        return undefined;
      }
      if (error instanceof TimeoutError) {
        return undefined;
      }
      await socket.destroy();
      await socket.end();
      return undefined;
    }
  }

  private encodeData(data): any {
    // Remove last character then parse into JSON
    return JSON.parse(data.slice(0, -1));
  }

  private parseData(data): any {
    let status = 'N/A';
    let code = 'Unrecognized';
    let asicModel = 'Unrecognized';
    let ghs = 0.0;
    let ghsAvg = 0.0;
    let elapsed = '0';
    let chain1_acn = 'N/A';
    let chain2_acn = 'N/A';
    let chain3_acn = 'N/A';
    let acn_avg = 'N/A';
    let chain1_temp = 'N/A';
    let chain2_temp = 'N/A';
    let chain3_temp = 'N/A';
    let chain1_temp_pcb = 'N/A';
    let chain2_temp_pcb = 'N/A';
    let chain3_temp_pcb = 'N/A';
    let temp_avg = 'N/A';
    let chain1_acs = 'N/A';
    let chain2_acs = 'N/A';
    let chain3_acs = 'N/A';
    let fan1 = 'N/A';
    let fan2 = 'N/A';
    let fan3 = 'N/A';
    let fan4 = 'N/A';
    let fan_avg = 'N/A';
    let pool1 = 'N/A';
    let pool2 = 'N/A';
    let pool3 = 'N/A';
    let pool4 = 'N/A';
    let pool1getworks = 0;
    let pool2getworks = 0;
    let pool3getworks = 0;
    let pool4getworks = 0;
    let pool1accepted = 0;
    let pool2accepted = 0;
    let pool3accepted = 0;
    let pool4accepted = 0;
    let pool1rejected = 0;
    let pool2rejected = 0;
    let pool3rejected = 0;
    let pool4rejected = 0;
    let pool1works = 0;
    let pool2works = 0;
    let pool3works = 0;
    let pool4works = 0;
    let pool1discarded = 0;
    let pool2discarded = 0;
    let pool3discarded = 0;
    let pool4discarded = 0;
    let pool1stale = 0;
    let pool2stale = 0;
    let pool3stale = 0;
    let pool4stale = 0;
    let pool1user = 'N/A';
    let pool2user = 'N/A';
    let pool3user = 'N/A';
    let pool4user = 'N/A';
    let pool1ghs = 0.0;
    let pool2ghs = 0.0;
    let pool3ghs = 0.0;
    let pool4ghs = 0.0;
    let pool1difficultyAccepted = 0;
    let pool2difficultyAccepted = 0;
    let pool3difficultyAccepted = 0;
    let pool4difficultyAccepted = 0;
    let chain1_consumption = 0;
    let chain2_consumption = 0;
    let chain3_consumption = 0;
    let consumption = 0;
    let firmware = 'N/A';
    let software = 'N/A';
    let hardware = 'N/A';

    // -----------------
    // New Pool Data
    // -----------------
    let pool1getFailures = 0;
    let pool1remoteFailures = 0;
    let pool1diff = 'N/A';
    let pool1diff1Shares = 0;
    let pool1difficultyRejected = 0;
    let pool1difficultyStale = 0;
    let pool1lastShareDifficulty = 0;
    let pool1workDifficulty = 0;
    let pool1hasStratum = false;
    let pool1stratumActive = false;
    let pool1stratumUrl = 'N/A';
    let pool1stratumDifficulty = 0;
    let pool1bestShare = 0;
    let pool1rejectedPercentage = 0;
    let pool1stalePercentage = 0;
    let pool1badWork = 0;
    let pool1currentBlockHeight = 0;
    let pool1currentBlockVersion = 0;

    let pool2getFailures = 0;
    let pool2remoteFailures = 0;
    let pool2diff = 'N/A';
    let pool2diff1Shares = 0;
    let pool2difficultyRejected = 0;
    let pool2difficultyStale = 0;
    let pool2lastShareDifficulty = 0;
    let pool2workDifficulty = 0;
    let pool2hasStratum = false;
    let pool2stratumActive = false;
    let pool2stratumUrl = 'N/A';
    let pool2stratumDifficulty = 0;
    let pool2bestShare = 0;
    let pool2rejectedPercentage = 0;
    let pool2stalePercentage = 0;
    let pool2badWork = 0;
    let pool2currentBlockHeight = 0;
    let pool2currentBlockVersion = 0;

    let pool3getFailures = 0;
    let pool3remoteFailures = 0;
    let pool3diff = 'N/A';
    let pool3diff1Shares = 0;
    let pool3difficultyRejected = 0;
    let pool3difficultyStale = 0;
    let pool3lastShareDifficulty = 0;
    let pool3workDifficulty = 0;
    let pool3hasStratum = false;
    let pool3stratumActive = false;
    let pool3stratumUrl = 'N/A';
    let pool3stratumDifficulty = 0;
    let pool3bestShare = 0;
    let pool3rejectedPercentage = 0;
    let pool3stalePercentage = 0;
    let pool3badWork = 0;
    let pool3currentBlockHeight = 0;
    let pool3currentBlockVersion = 0;

    let pool4getFailures = 0;
    let pool4remoteFailures = 0;
    let pool4diff = 'N/A';
    let pool4diff1Shares = 0;
    let pool4difficultyRejected = 0;
    let pool4difficultyStale = 0;
    let pool4lastShareDifficulty = 0;
    let pool4workDifficulty = 0;
    let pool4hasStratum = false;
    let pool4stratumActive = false;
    let pool4stratumUrl = 'N/A';
    let pool4stratumDifficulty = 0;
    let pool4bestShare = 0;
    let pool4rejectedPercentage = 0;
    let pool4stalePercentage = 0;
    let pool4badWork = 0;
    let pool4currentBlockHeight = 0;
    let pool4currentBlockVersion = 0;

    const stats = data.stats[0].STATS;
    let found = [] as any;
    let isAvalon = false;
    let isAntMiner = false;
    let isWhatsMiner = false;

    if (stats) {
      found = stats.find((o) => o.STATS === 0);
      isAvalon = found.ID == 'AVA100' ? true : false;

      if (!isAvalon) isAntMiner = true;
    } else {
      isWhatsMiner = data.stats[0].STATS == undefined;
      isAvalon = false;
      isAntMiner = false;
    }

    asicModel = found.ID ? found.ID : 'N/A';

    // If device is an Avalon
    if (isAvalon) {
      const d = found['MM ID0'];
      status = this.getValueAvalon('SYSTEMSTATU', d);
      asicModel = data.version[0].VERSION[0].PROD;
      code = asicModel.replace('AvalonMiner ', 'A');
      ghs = this.getValueAvalon('GHSmm', d);
      ghsAvg = this.getValueAvalon('GHSavg', d);
      elapsed = this.getValueAvalon('Elapsed', d);
      chain1_temp = this.getValueAvalon('Temp', d);
      fan1 = this.getValueAvalon('Fan1', d);
      fan2 = this.getValueAvalon('Fan2', d);
      fan_avg = ((parseInt(fan1) + parseInt(fan2)) / 2).toString();

      const elapsedRaw = this.getValueAvalon('Elapsed', d);

      pool1 = data.pools[0].POOLS[0].URL;
      pool1getworks = data.pools[0].POOLS[0].Getworks;
      pool1accepted = data.pools[0].POOLS[0].Accepted;
      pool1rejected = data.pools[0].POOLS[0].Rejected;
      pool1works = data.pools[0].POOLS[0].Works;
      pool1discarded = data.pools[0].POOLS[0].Discarded;
      pool1stale = data.pools[0].POOLS[0].Stale;
      pool1user = data.pools[0].POOLS[0].User;
      pool1difficultyAccepted = +data.pools[0].POOLS[0]['Difficulty Accepted'];
      pool1ghs =
        (+pool1difficultyAccepted * (2 ** 32 / +elapsedRaw)) / 1000000000;

      pool1getFailures = +data.pools[0].POOLS[0]['Get Failures'];
      pool1remoteFailures = +data.pools[0].POOLS[0]['Remote Failures'];
      pool1diff = data.pools[0].POOLS[0]['Diff'];
      pool1diff1Shares = +data.pools[0].POOLS[0]['Diff1 Shares'];
      pool1difficultyRejected = +data.pools[0].POOLS[0]['Difficulty Rejected'];
      pool1difficultyStale = +data.pools[0].POOLS[0]['Difficulty Stale'];
      pool1lastShareDifficulty =
        +data.pools[0].POOLS[0]['Last Share Difficulty'];
      pool1workDifficulty = +data.pools[0].POOLS[0]['Work Difficulty'];
      pool1hasStratum = data.pools[0].POOLS[0]['Has Stratum'];
      pool1stratumActive = data.pools[0].POOLS[0]['Stratum Active'];
      pool1stratumUrl = data.pools[0].POOLS[0]['Stratum URL'];
      pool1stratumDifficulty = data.pools[0].POOLS[0]['Stratum Difficulty'];
      pool1bestShare = data.pools[0].POOLS[0]['Best Share'];
      pool1rejectedPercentage = data.pools[0].POOLS[0]['Pool Rejected%'];
      pool1stalePercentage = data.pools[0].POOLS[0]['Pool Stale%'];
      pool1badWork = data.pools[0].POOLS[0]['Bad Work'];
      pool1currentBlockHeight = data.pools[0].POOLS[0]['Current Block Height'];
      pool1currentBlockVersion =
        data.pools[0].POOLS[0]['Current Block Version'];

      if (data.pools[0].POOLS[1]) {
        pool2 = data.pools[0].POOLS[1].URL;
        pool2getworks = data.pools[0].POOLS[1].Getworks;
        pool2accepted = data.pools[0].POOLS[1].Accepted;
        pool2rejected = data.pools[0].POOLS[1].Rejected;
        pool2works = data.pools[0].POOLS[1].Works;
        pool2discarded = data.pools[0].POOLS[1].Discarded;
        pool2stale = data.pools[0].POOLS[1].Stale;
        pool2user = data.pools[0].POOLS[1].User;
        pool2difficultyAccepted =
          +data.pools[0].POOLS[1]['Difficulty Accepted'];
        pool2ghs =
          (+pool2difficultyAccepted * (2 ** 32 / +elapsedRaw)) / 1000000000;

        pool2getFailures = +data.pools[0].POOLS[1]['Get Failures'];
        pool2remoteFailures = +data.pools[0].POOLS[1]['Remote Failures'];
        pool2diff = data.pools[0].POOLS[1]['Diff'];
        pool2diff1Shares = +data.pools[0].POOLS[1]['Diff1 Shares'];
        pool2difficultyRejected =
          +data.pools[0].POOLS[1]['Difficulty Rejected'];
        pool2difficultyStale = +data.pools[0].POOLS[1]['Difficulty Stale'];
        pool2lastShareDifficulty =
          +data.pools[0].POOLS[1]['Last Share Difficulty'];
        pool2workDifficulty = +data.pools[0].POOLS[1]['Work Difficulty'];
        pool2hasStratum = data.pools[0].POOLS[1]['Has Stratum'];
        pool2stratumActive = data.pools[0].POOLS[1]['Stratum Active'];
        pool2stratumUrl = data.pools[0].POOLS[1]['Stratum URL'];
        pool2stratumDifficulty = data.pools[0].POOLS[1]['Stratum Difficulty'];
        pool2bestShare = data.pools[0].POOLS[1]['Best Share'];
        pool2rejectedPercentage = data.pools[0].POOLS[1]['Pool Rejected%'];
        pool2stalePercentage = data.pools[0].POOLS[1]['Pool Stale%'];
        pool2badWork = data.pools[0].POOLS[1]['Bad Work'];
        pool2currentBlockHeight =
          data.pools[0].POOLS[1]['Current Block Height'];
        pool2currentBlockVersion =
          data.pools[0].POOLS[1]['Current Block Version'];
      }

      if (data.pools[0].POOLS[2]) {
        pool3 = data.pools[0].POOLS[2].URL;
        pool3getworks = data.pools[0].POOLS[2].Getworks;
        pool3accepted = data.pools[0].POOLS[2].Accepted;
        pool3rejected = data.pools[0].POOLS[2].Rejected;
        pool3works = data.pools[0].POOLS[2].Works;
        pool3discarded = data.pools[0].POOLS[2].Discarded;
        pool3stale = data.pools[0].POOLS[2].Stale;
        pool3user = data.pools[0].POOLS[2].User;
        pool3difficultyAccepted =
          +data.pools[0].POOLS[2]['Difficulty Accepted'];
        pool3ghs =
          (+pool3difficultyAccepted * (2 ** 32 / +elapsedRaw)) / 1000000000;

        pool3getFailures = +data.pools[0].POOLS[2]['Get Failures'];
        pool3remoteFailures = +data.pools[0].POOLS[2]['Remote Failures'];
        pool3diff = data.pools[0].POOLS[2]['Diff'];
        pool3diff1Shares = +data.pools[0].POOLS[2]['Diff1 Shares'];
        pool3difficultyRejected =
          +data.pools[0].POOLS[2]['Difficulty Rejected'];
        pool3difficultyStale = +data.pools[0].POOLS[2]['Difficulty Stale'];
        pool3lastShareDifficulty =
          +data.pools[0].POOLS[2]['Last Share Difficulty'];
        pool3workDifficulty = +data.pools[0].POOLS[2]['Work Difficulty'];
        pool3hasStratum = data.pools[0].POOLS[2]['Has Stratum'];
        pool3stratumActive = data.pools[0].POOLS[2]['Stratum Active'];
        pool3stratumUrl = data.pools[0].POOLS[2]['Stratum URL'];
        pool3stratumDifficulty = data.pools[0].POOLS[2]['Stratum Difficulty'];
        pool3bestShare = data.pools[0].POOLS[2]['Best Share'];
        pool3rejectedPercentage = data.pools[0].POOLS[2]['Pool Rejected%'];
        pool3stalePercentage = data.pools[0].POOLS[2]['Pool Stale%'];
        pool3badWork = data.pools[0].POOLS[2]['Bad Work'];
        pool3currentBlockHeight =
          data.pools[0].POOLS[2]['Current Block Height'];
        pool3currentBlockVersion =
          data.pools[0].POOLS[2]['Current Block Version'];
      }

      if (data.pools[0].POOLS[3]) {
        pool4 = data.pools[0].POOLS[3].URL;
        pool4getworks = data.pools[0].POOLS[3].Getworks;
        pool4accepted = data.pools[0].POOLS[3].Accepted;
        pool4rejected = data.pools[0].POOLS[3].Rejected;
        pool4works = data.pools[0].POOLS[3].Works;
        pool4discarded = data.pools[0].POOLS[3].Discarded;
        pool4stale = data.pools[0].POOLS[3].Stale;
        pool4user = data.pools[0].POOLS[3].User;
        pool4difficultyAccepted =
          +data.pools[0].POOLS[3]['Difficulty Accepted'];
        pool4ghs =
          (+pool4difficultyAccepted * (2 ** 32 / +elapsedRaw)) / 1000000000;

        pool4getFailures = +data.pools[0].POOLS[3]['Get Failures'];
        pool4remoteFailures = +data.pools[0].POOLS[3]['Remote Failures'];
        pool4diff = data.pools[0].POOLS[3]['Diff'];
        pool4diff1Shares = +data.pools[0].POOLS[3]['Diff1 Shares'];
        pool4difficultyRejected =
          +data.pools[0].POOLS[3]['Difficulty Rejected'];
        pool4difficultyStale = +data.pools[0].POOLS[3]['Difficulty Stale'];
        pool4lastShareDifficulty =
          +data.pools[0].POOLS[3]['Last Share Difficulty'];
        pool4workDifficulty = +data.pools[0].POOLS[3]['Work Difficulty'];
        pool4hasStratum = data.pools[0].POOLS[3]['Has Stratum'];
        pool4stratumActive = data.pools[0].POOLS[3]['Stratum Active'];
        pool4stratumUrl = data.pools[0].POOLS[3]['Stratum URL'];
        pool4stratumDifficulty = data.pools[0].POOLS[3]['Stratum Difficulty'];
        pool4bestShare = data.pools[0].POOLS[3]['Best Share'];
        pool4rejectedPercentage = data.pools[0].POOLS[3]['Pool Rejected%'];
        pool4stalePercentage = data.pools[0].POOLS[3]['Pool Stale%'];
        pool4badWork = data.pools[0].POOLS[3]['Bad Work'];
        pool4currentBlockHeight =
          data.pools[0].POOLS[3]['Current Block Height'];
        pool4currentBlockVersion =
          data.pools[0].POOLS[3]['Current Block Version'];
      }

      let c = parseInt(this.getValueAvalon('PS', d).split(' ')[4]);
      if (c == 0) {
        if (ghs >= 35000) {
          c = 2380;
        }
        if (ghs >= 30000 && ghs <= 34999) {
          c = 2180;
        }
        if (ghs >= 19000 && ghs <= 29999) {
          c = 1730;
        }
        if (ghs >= 15000 && ghs <= 18999) {
          c = 1730;
        }
        if (ghs >= 15000 && ghs <= 18999) {
          c = 1190;
        }
        if (ghs <= 14999) {
          c = 1090;
        }
      }
      consumption = c;
    }

    if (isAntMiner) {
      // Else, probably an Antminer
      if (found.state) {
        status = found.state;
      }
      asicModel = data.stats[0].STATS[0].Type;
      code = asicModel.split('Antminer ')[1].split(' (')[0];
      ghs = parseFloat(found['GHS 5s']);
      ghsAvg = found['GHS av'];
      elapsed = found['Elapsed'];
      chain1_acn = found['chain_acn1'];
      chain2_acn = found['chain_acn2'];
      chain3_acn = found['chain_acn3'];
      acn_avg = (
        (parseInt(chain1_acn) + parseInt(chain2_acn) + parseInt(chain3_acn)) /
        3
      ).toString();
      chain1_temp = found['temp_chip1'];
      chain2_temp = found['temp_chip2'];
      chain3_temp = found['temp_chip3'];
      chain1_temp_pcb = found['temp_pcb1'];
      chain2_temp_pcb = found['temp_pcb2'];
      chain3_temp_pcb = found['temp_pcb3'];
      chain1_acs = found['chain_acs1'];
      chain2_acs = found['chain_acs2'];
      chain3_acs = found['chain_acs3'];
      fan1 = found['fan1'];
      fan2 = found['fan2'];
      fan3 = found['fan3'];
      fan4 = found['fan4'];
      fan_avg = (
        (parseInt(fan1) + parseInt(fan2) + parseInt(fan3) + parseInt(fan4)) /
        4
      ).toString();
      pool1 = data.pools[0].POOLS[0].URL;
      pool2 = data.pools[0].POOLS[1].URL;
      pool3 = data.pools[0].POOLS[2].URL;
      pool1getworks = data.pools[0].POOLS[0].Getworks;
      pool2getworks = data.pools[0].POOLS[1].Getworks;
      pool3getworks = data.pools[0].POOLS[2].Getworks;
      pool1accepted = data.pools[0].POOLS[0].Accepted;
      pool2accepted = data.pools[0].POOLS[1].Accepted;
      pool3accepted = data.pools[0].POOLS[2].Accepted;
      pool1rejected = data.pools[0].POOLS[0].Rejected;
      pool2rejected = data.pools[0].POOLS[1].Rejected;
      pool3rejected = data.pools[0].POOLS[2].Rejected;
      pool1works = data.pools[0].POOLS[0].Works;
      pool2works = data.pools[0].POOLS[1].Works;
      pool3works = data.pools[0].POOLS[2].Works;
      pool1discarded = data.pools[0].POOLS[0].Discarded;
      pool2discarded = data.pools[0].POOLS[1].Discarded;
      pool3discarded = data.pools[0].POOLS[2].Discarded;
      pool1stale = data.pools[0].POOLS[0].Stale;
      pool2stale = data.pools[0].POOLS[1].Stale;
      pool3stale = data.pools[0].POOLS[2].Stale;
      pool1user = data.pools[0].POOLS[0].User;
      pool2user = data.pools[0].POOLS[1].User;
      pool3user = data.pools[0].POOLS[2].User;
      pool1difficultyAccepted = +data.pools[0].POOLS[0]['Difficulty Accepted'];
      pool2difficultyAccepted = +data.pools[0].POOLS[1]['Difficulty Accepted'];
      pool3difficultyAccepted = +data.pools[0].POOLS[2]['Difficulty Accepted'];
      pool1ghs =
        (+pool1difficultyAccepted * (2 ** 32 / +found['Elapsed'])) / 1000000000;
      pool2ghs =
        (+pool2difficultyAccepted * (2 ** 32 / +found['Elapsed'])) / 1000000000;
      pool3ghs =
        (+pool3difficultyAccepted * (2 ** 32 / +found['Elapsed'])) / 1000000000;
      firmware = moment(new Date(data.stats[0].STATS[0].CompileTime)).format(
        'YYYYMMDD',
      );
      software = data.stats[0].STATS[0].BMMiner
        ? `BMMiner ${data.stats[0].STATS[0].BMMiner}`
        : `Cgminer ${data.stats[0].STATS[0].Cgminer}`;
      hardware = data.stats[0].STATS[0].Miner;

      pool1getFailures = +data.pools[0].POOLS[0]['Get Failures'];
      pool1remoteFailures = +data.pools[0].POOLS[0]['Remote Failures'];
      pool1diff = data.pools[0].POOLS[0]['Diff'];
      pool1diff1Shares = +data.pools[0].POOLS[0]['Diff1 Shares'];
      pool1difficultyRejected = +data.pools[0].POOLS[0]['Difficulty Rejected'];
      pool1difficultyStale = +data.pools[0].POOLS[0]['Difficulty Stale'];
      pool1lastShareDifficulty =
        +data.pools[0].POOLS[0]['Last Share Difficulty'];
      pool1workDifficulty = +data.pools[0].POOLS[0]['Work Difficulty'];
      pool1hasStratum = data.pools[0].POOLS[0]['Has Stratum'];
      pool1stratumActive = data.pools[0].POOLS[0]['Stratum Active'];
      pool1stratumUrl = data.pools[0].POOLS[0]['Stratum URL'];
      pool1stratumDifficulty = data.pools[0].POOLS[0]['Stratum Difficulty'];
      pool1bestShare = data.pools[0].POOLS[0]['Best Share'];
      pool1rejectedPercentage = data.pools[0].POOLS[0]['Pool Rejected%'];
      pool1stalePercentage = data.pools[0].POOLS[0]['Pool Stale%'];
      pool1badWork = data.pools[0].POOLS[0]['Bad Work'];
      pool1currentBlockHeight = data.pools[0].POOLS[0]['Current Block Height'];
      pool1currentBlockVersion =
        data.pools[0].POOLS[0]['Current Block Version'];

      pool2getFailures = +data.pools[0].POOLS[1]['Get Failures'];
      pool2remoteFailures = +data.pools[0].POOLS[1]['Remote Failures'];
      pool2diff = data.pools[0].POOLS[1]['Diff'];
      pool2diff1Shares = +data.pools[0].POOLS[1]['Diff1 Shares'];
      pool2difficultyRejected = +data.pools[0].POOLS[1]['Difficulty Rejected'];
      pool2difficultyStale = +data.pools[0].POOLS[1]['Difficulty Stale'];
      pool2lastShareDifficulty =
        +data.pools[0].POOLS[1]['Last Share Difficulty'];
      pool2workDifficulty = +data.pools[0].POOLS[1]['Work Difficulty'];
      pool2hasStratum = data.pools[0].POOLS[1]['Has Stratum'];
      pool2stratumActive = data.pools[0].POOLS[1]['Stratum Active'];
      pool2stratumUrl = data.pools[0].POOLS[1]['Stratum URL'];
      pool2stratumDifficulty = data.pools[0].POOLS[1]['Stratum Difficulty'];
      pool2bestShare = data.pools[0].POOLS[1]['Best Share'];
      pool2rejectedPercentage = data.pools[0].POOLS[1]['Pool Rejected%'];
      pool2stalePercentage = data.pools[0].POOLS[1]['Pool Stale%'];
      pool2badWork = data.pools[0].POOLS[1]['Bad Work'];
      pool2currentBlockHeight = data.pools[0].POOLS[1]['Current Block Height'];
      pool2currentBlockVersion =
        data.pools[0].POOLS[1]['Current Block Version'];

      pool3getFailures = +data.pools[0].POOLS[2]['Get Failures'];
      pool3remoteFailures = +data.pools[0].POOLS[2]['Remote Failures'];
      pool3diff = data.pools[0].POOLS[2]['Diff'];
      pool3diff1Shares = +data.pools[0].POOLS[2]['Diff1 Shares'];
      pool3difficultyRejected = +data.pools[0].POOLS[2]['Difficulty Rejected'];
      pool3difficultyStale = +data.pools[0].POOLS[2]['Difficulty Stale'];
      pool3lastShareDifficulty =
        +data.pools[0].POOLS[2]['Last Share Difficulty'];
      pool3workDifficulty = +data.pools[0].POOLS[2]['Work Difficulty'];
      pool3hasStratum = data.pools[0].POOLS[2]['Has Stratum'];
      pool3stratumActive = data.pools[0].POOLS[2]['Stratum Active'];
      pool3stratumUrl = data.pools[0].POOLS[2]['Stratum URL'];
      pool3stratumDifficulty = data.pools[0].POOLS[2]['Stratum Difficulty'];
      pool3bestShare = data.pools[0].POOLS[2]['Best Share'];
      pool3rejectedPercentage = data.pools[0].POOLS[2]['Pool Rejected%'];
      pool3stalePercentage = data.pools[0].POOLS[2]['Pool Stale%'];
      pool3badWork = data.pools[0].POOLS[2]['Bad Work'];
      pool3currentBlockHeight = data.pools[0].POOLS[2]['Current Block Height'];
      pool3currentBlockVersion =
        data.pools[0].POOLS[2]['Current Block Version'];

      if (data.pools[0].POOLS[3]) {
        pool4difficultyAccepted =
          +data.pools[0].POOLS[3]['Difficulty Accepted'];
        pool4 = data.pools[0].POOLS[3].URL;
        pool4getworks = data.pools[0].POOLS[3].Getworks;
        pool4accepted = data.pools[0].POOLS[3].Accepted;
        pool4rejected = data.pools[0].POOLS[3].Rejected;
        pool4works = data.pools[0].POOLS[3].Works;
        pool4discarded = data.pools[0].POOLS[3].Discarded;
        pool4stale = data.pools[0].POOLS[3].Stale;
        pool4user = data.pools[0].POOLS[3].User;
        pool4ghs =
          (+pool4difficultyAccepted * (2 ** 32 / +found['Elapsed'])) /
          1000000000;

        pool4getFailures = +data.pools[0].POOLS[3]['Get Failures'];
        pool4remoteFailures = +data.pools[0].POOLS[3]['Remote Failures'];
        pool4diff = data.pools[0].POOLS[3]['Diff'];
        pool4diff1Shares = +data.pools[0].POOLS[3]['Diff1 Shares'];
        pool4difficultyRejected =
          +data.pools[0].POOLS[3]['Difficulty Rejected'];
        pool4difficultyStale = +data.pools[0].POOLS[3]['Difficulty Stale'];
        pool4lastShareDifficulty =
          +data.pools[0].POOLS[3]['Last Share Difficulty'];
        pool4workDifficulty = +data.pools[0].POOLS[3]['Work Difficulty'];
        pool4hasStratum = data.pools[0].POOLS[3]['Has Stratum'];
        pool4stratumActive = data.pools[0].POOLS[3]['Stratum Active'];
        pool4stratumUrl = data.pools[0].POOLS[3]['Stratum URL'];
        pool4stratumDifficulty = data.pools[0].POOLS[3]['Stratum Difficulty'];
        pool4bestShare = data.pools[0].POOLS[3]['Best Share'];
        pool4rejectedPercentage = data.pools[0].POOLS[3]['Pool Rejected%'];
        pool4stalePercentage = data.pools[0].POOLS[3]['Pool Stale%'];
        pool4badWork = data.pools[0].POOLS[3]['Bad Work'];
        pool4currentBlockHeight =
          data.pools[0].POOLS[3]['Current Block Height'];
        pool4currentBlockVersion =
          data.pools[0].POOLS[3]['Current Block Version'];
      }

      const c = [0, 0, 0];

      if (found['chain_consumption1'] != null) {
        c[0] = parseInt(found['chain_consumption1']);
        c[1] = parseInt(found['chain_consumption2']);
        c[2] = parseInt(found['chain_consumption3']);
      } else {
        if (code === 'T19') {
          c[0] = 3150 / 3;
          c[1] = 3150 / 3;
          c[2] = 3150 / 3;
        }
        if (code === 'S19') {
          c[0] = 3250 / 3;
          c[1] = 3250 / 3;
          c[2] = 3250 / 3;
        }
      }

      chain1_consumption = c[0];
      chain2_consumption = c[1];
      chain3_consumption = c[2];

      consumption = c[0] + c[1] + c[2];
    }

    if (isWhatsMiner) {
      // Whatsminer
      let b = data.stats[0].devdetails[0].DEVDETAILS[0].Model;
      b = b.includes('M30S') ? 'M30S' : b;
      const summary = data.stats[0].summary[0].SUMMARY[0];
      status = summary['HS RT'] > 0 ? 'Mining' : 'N/A';
      asicModel = 'WhatsMiner ' + b;
      code = b;
      ghs = summary['HS RT'] / 1000;
      ghsAvg = summary['MHS av'] / 1000;
      elapsed = summary['Elapsed'];
      chain1_temp = summary['Temperature'];
      temp_avg = summary['Chip Temp Avg'];
      fan1 = summary['Fan Speed In'];
      fan2 = summary['Fan Speed Out'];
      fan_avg = ((parseInt(fan1) + parseInt(fan2)) / 2).toString();
      pool1 = data.pools[0].POOLS[0].URL;
      pool2 = data.pools[0].POOLS[1].URL;
      pool3 = data.pools[0].POOLS[2].URL;
      pool1getworks = data.pools[0].POOLS[0].Getworks;
      pool2getworks = data.pools[0].POOLS[1].Getworks;
      pool3getworks = data.pools[0].POOLS[2].Getworks;
      pool1accepted = data.pools[0].POOLS[0].Accepted;
      pool2accepted = data.pools[0].POOLS[1].Accepted;
      pool3accepted = data.pools[0].POOLS[2].Accepted;
      pool1rejected = data.pools[0].POOLS[0].Rejected;
      pool2rejected = data.pools[0].POOLS[1].Rejected;
      pool3rejected = data.pools[0].POOLS[2].Rejected;
      pool1works = data.pools[0].POOLS[0].Works;
      pool2works = data.pools[0].POOLS[1].Works;
      pool3works = data.pools[0].POOLS[2].Works;
      pool1discarded = data.pools[0].POOLS[0].Discarded;
      pool2discarded = data.pools[0].POOLS[1].Discarded;
      pool3discarded = data.pools[0].POOLS[2].Discarded;
      pool1stale = data.pools[0].POOLS[0].Stale;
      pool2stale = data.pools[0].POOLS[1].Stale;
      pool3stale = data.pools[0].POOLS[2].Stale;
      pool1user = data.pools[0].POOLS[0].User;
      pool2user = data.pools[0].POOLS[1].User;
      pool3user = data.pools[0].POOLS[2].User;
      pool1difficultyAccepted =
        +data.pools[0].POOLS[0]['Difficulty Accepted'] / 1000000000;
      pool2difficultyAccepted =
        +data.pools[0].POOLS[1]['Difficulty Accepted'] / 1000000000;
      pool3difficultyAccepted =
        +data.pools[0].POOLS[2]['Difficulty Accepted'] / 1000000000;
      pool1ghs = +pool1difficultyAccepted * (2 ** 32 / +summary['Elapsed']);
      pool2ghs = +pool2difficultyAccepted * (2 ** 32 / +summary['Elapsed']);
      pool3ghs = +pool3difficultyAccepted * (2 ** 32 / +summary['Elapsed']);
      consumption = summary['Power'];
      firmware = data.version[0].Msg.fw_ver;

      pool1getFailures = +data.pools[0].POOLS[0]['Get Failures'];
      pool1remoteFailures = +data.pools[0].POOLS[0]['Remote Failures'];
      pool1diff = data.pools[0].POOLS[0]['Diff'];
      pool1diff1Shares = +data.pools[0].POOLS[0]['Diff1 Shares'];
      pool1difficultyRejected = +data.pools[0].POOLS[0]['Difficulty Rejected'];
      pool1difficultyStale = +data.pools[0].POOLS[0]['Difficulty Stale'];
      pool1lastShareDifficulty =
        +data.pools[0].POOLS[0]['Last Share Difficulty'];
      pool1workDifficulty = +data.pools[0].POOLS[0]['Work Difficulty'];
      pool1hasStratum = data.pools[0].POOLS[0]['Has Stratum'];
      pool1stratumActive = data.pools[0].POOLS[0]['Stratum Active'];
      pool1stratumUrl = data.pools[0].POOLS[0]['Stratum URL'];
      pool1stratumDifficulty = data.pools[0].POOLS[0]['Stratum Difficulty'];
      pool1bestShare = data.pools[0].POOLS[0]['Best Share'];
      pool1rejectedPercentage = data.pools[0].POOLS[0]['Pool Rejected%'];
      pool1stalePercentage = data.pools[0].POOLS[0]['Pool Stale%'];
      pool1badWork = data.pools[0].POOLS[0]['Bad Work'];
      pool1currentBlockHeight = data.pools[0].POOLS[0]['Current Block Height'];
      pool1currentBlockVersion =
        data.pools[0].POOLS[0]['Current Block Version'];

      pool2getFailures = +data.pools[0].POOLS[1]['Get Failures'];
      pool2remoteFailures = +data.pools[0].POOLS[1]['Remote Failures'];
      pool2diff = data.pools[0].POOLS[1]['Diff'];
      pool2diff1Shares = +data.pools[0].POOLS[1]['Diff1 Shares'];
      pool2difficultyRejected = +data.pools[0].POOLS[1]['Difficulty Rejected'];
      pool2difficultyStale = +data.pools[0].POOLS[1]['Difficulty Stale'];
      pool2lastShareDifficulty =
        +data.pools[0].POOLS[1]['Last Share Difficulty'];
      pool2workDifficulty = +data.pools[0].POOLS[1]['Work Difficulty'];
      pool2hasStratum = data.pools[0].POOLS[1]['Has Stratum'];
      pool2stratumActive = data.pools[0].POOLS[1]['Stratum Active'];
      pool2stratumUrl = data.pools[0].POOLS[1]['Stratum URL'];
      pool2stratumDifficulty = data.pools[0].POOLS[1]['Stratum Difficulty'];
      pool2bestShare = data.pools[0].POOLS[1]['Best Share'];
      pool2rejectedPercentage = data.pools[0].POOLS[1]['Pool Rejected%'];
      pool2stalePercentage = data.pools[0].POOLS[1]['Pool Stale%'];
      pool2badWork = data.pools[0].POOLS[1]['Bad Work'];
      pool2currentBlockHeight = data.pools[0].POOLS[1]['Current Block Height'];
      pool2currentBlockVersion =
        data.pools[0].POOLS[1]['Current Block Version'];

      pool3getFailures = +data.pools[0].POOLS[2]['Get Failures'];
      pool3remoteFailures = +data.pools[0].POOLS[2]['Remote Failures'];
      pool3diff = data.pools[0].POOLS[2]['Diff'];
      pool3diff1Shares = +data.pools[0].POOLS[2]['Diff1 Shares'];
      pool3difficultyRejected = +data.pools[0].POOLS[2]['Difficulty Rejected'];
      pool3difficultyStale = +data.pools[0].POOLS[2]['Difficulty Stale'];
      pool3lastShareDifficulty =
        +data.pools[0].POOLS[2]['Last Share Difficulty'];
      pool3workDifficulty = +data.pools[0].POOLS[2]['Work Difficulty'];
      pool3hasStratum = data.pools[0].POOLS[2]['Has Stratum'];
      pool3stratumActive = data.pools[0].POOLS[2]['Stratum Active'];
      pool3stratumUrl = data.pools[0].POOLS[2]['Stratum URL'];
      pool3stratumDifficulty = data.pools[0].POOLS[2]['Stratum Difficulty'];
      pool3bestShare = data.pools[0].POOLS[2]['Best Share'];
      pool3rejectedPercentage = data.pools[0].POOLS[2]['Pool Rejected%'];
      pool3stalePercentage = data.pools[0].POOLS[2]['Pool Stale%'];
      pool3badWork = data.pools[0].POOLS[2]['Bad Work'];
      pool3currentBlockHeight = data.pools[0].POOLS[2]['Current Block Height'];
      pool3currentBlockVersion =
        data.pools[0].POOLS[2]['Current Block Version'];
    }

    return {
      status: status,
      asicModel: asicModel,
      code: code,
      ghs: ghs,
      ghsAvg: ghsAvg,
      elapsed: elapsed,
      chain1_acn: chain1_acn,
      chain2_acn: chain2_acn,
      chain3_acn: chain3_acn,
      acn_avg: acn_avg,
      chain1_temp: chain1_temp,
      chain2_temp: chain2_temp,
      chain3_temp: chain3_temp,
      chain1_temp_pcb: chain1_temp_pcb,
      chain2_temp_pcb: chain2_temp_pcb,
      chain3_temp_pcb: chain3_temp_pcb,
      temp_avg: temp_avg,
      chain1_acs: chain1_acs,
      chain2_acs: chain2_acs,
      chain3_acs: chain3_acs,
      fan1: fan1,
      fan2: fan2,
      fan3: fan3,
      fan4: fan4,
      fan_avg: fan_avg,
      pool1: pool1,
      pool2: pool2,
      pool3: pool3,
      pool4: pool4,
      pool1getworks: pool1getworks,
      pool2getworks: pool2getworks,
      pool3getworks: pool3getworks,
      pool4getworks: pool4getworks,
      pool1accepted: pool1accepted,
      pool2accepted: pool2accepted,
      pool3accepted: pool3accepted,
      pool4accepted: pool4accepted,
      pool1rejected: pool1rejected,
      pool2rejected: pool2rejected,
      pool3rejected: pool3rejected,
      pool4rejected: pool4rejected,
      pool1works: pool1works,
      pool2works: pool2works,
      pool3works: pool3works,
      pool4works: pool4works,
      pool1discarded: pool1discarded,
      pool2discarded: pool2discarded,
      pool3discarded: pool3discarded,
      pool4discarded: pool4discarded,
      pool1stale: pool1stale,
      pool2stale: pool2stale,
      pool3stale: pool3stale,
      pool4stale: pool4stale,
      pool1user: pool1user,
      pool2user: pool2user,
      pool3user: pool3user,
      pool4user: pool4user,
      pool1difficultyAccepted: pool1difficultyAccepted,
      pool2difficultyAccepted: pool2difficultyAccepted,
      pool3difficultyAccepted: pool3difficultyAccepted,
      pool4difficultyAccepted: pool4difficultyAccepted,
      pool1ghs: pool1ghs,
      pool2ghs: pool2ghs,
      pool3ghs: pool3ghs,
      pool4ghs: pool4ghs,
      chain1_consumption: chain1_consumption,
      chain2_consumption: chain2_consumption,
      chain3_consumption: chain3_consumption,
      consumption: consumption,
      firmware: firmware,
      software: software,
      hardware: hardware,
      pool1getFailures: pool1getFailures,
      pool1remoteFailures: pool1remoteFailures,
      pool1diff: pool1diff,
      pool1diff1Shares: pool1diff1Shares,
      pool1difficultyRejected: pool1difficultyRejected,
      pool1difficultyStale: pool1difficultyStale,
      pool1lastShareDifficulty: pool1lastShareDifficulty,
      pool1workDifficulty: pool1workDifficulty,
      pool1hasStratum: pool1hasStratum,
      pool1stratumActive: pool1stratumActive,
      pool1stratumUrl: pool1stratumUrl,
      pool1stratumDifficulty: pool1stratumDifficulty,
      pool1bestShare: pool1bestShare,
      pool1rejectedPercentage: pool1rejectedPercentage,
      pool1stalePercentage: pool1stalePercentage,
      pool1badWork: pool1badWork,
      pool1currentBlockHeight: pool1currentBlockHeight,
      pool1currentBlockVersion: pool1currentBlockVersion,
      pool2getFailures: pool2getFailures,
      pool2remoteFailures: pool2remoteFailures,
      pool2diff: pool2diff,
      pool2diff1Shares: pool2diff1Shares,
      pool2difficultyRejected: pool2difficultyRejected,
      pool2difficultyStale: pool2difficultyStale,
      pool2lastShareDifficulty: pool2lastShareDifficulty,
      pool2workDifficulty: pool2workDifficulty,
      pool2hasStratum: pool2hasStratum,
      pool2stratumActive: pool2stratumActive,
      pool2stratumUrl: pool2stratumUrl,
      pool2stratumDifficulty: pool2stratumDifficulty,
      pool2bestShare: pool2bestShare,
      pool2rejectedPercentage: pool2rejectedPercentage,
      pool2stalePercentage: pool2stalePercentage,
      pool2badWork: pool2badWork,
      pool2currentBlockHeight: pool2currentBlockHeight,
      pool2currentBlockVersion: pool2currentBlockVersion,
      pool3getFailures: pool3getFailures,
      pool3remoteFailures: pool3remoteFailures,
      pool3diff: pool3diff,
      pool3diff1Shares: pool3diff1Shares,
      pool3difficultyRejected: pool3difficultyRejected,
      pool3difficultyStale: pool3difficultyStale,
      pool3lastShareDifficulty: pool3lastShareDifficulty,
      pool3workDifficulty: pool3workDifficulty,
      pool3hasStratum: pool3hasStratum,
      pool3stratumActive: pool3stratumActive,
      pool3stratumUrl: pool3stratumUrl,
      pool3stratumDifficulty: pool3stratumDifficulty,
      pool3bestShare: pool3bestShare,
      pool3rejectedPercentage: pool3rejectedPercentage,
      pool3stalePercentage: pool3stalePercentage,
      pool3badWork: pool3badWork,
      pool3currentBlockHeight: pool3currentBlockHeight,
      pool3currentBlockVersion: pool3currentBlockVersion,
      pool4getFailures: pool4getFailures,
      pool4remoteFailures: pool4remoteFailures,
      pool4diff: pool4diff,
      pool4diff1Shares: pool4diff1Shares,
      pool4difficultyRejected: pool4difficultyRejected,
      pool4difficultyStale: pool4difficultyStale,
      pool4lastShareDifficulty: pool4lastShareDifficulty,
      pool4workDifficulty: pool4workDifficulty,
      pool4hasStratum: pool4hasStratum,
      pool4stratumActive: pool4stratumActive,
      pool4stratumUrl: pool4stratumUrl,
      pool4stratumDifficulty: pool4stratumDifficulty,
      pool4bestShare: pool4bestShare,
      pool4rejectedPercentage: pool4rejectedPercentage,
      pool4stalePercentage: pool4stalePercentage,
      pool4badWork: pool4badWork,
      pool4currentBlockHeight: pool4currentBlockHeight,
      pool4currentBlockVersion: pool4currentBlockVersion,
    };
  }

  private parseData2(data: any): any {
    let status = 'N/A';
    let code = 'Unrecognized';
    let asicModel = 'Unrecognized';
    let ghs = 0.0;
    let ghsAvg = 0.0;
    let elapsed = '0';
    let chain1_acn = 'N/A';
    let chain2_acn = 'N/A';
    let chain3_acn = 'N/A';
    let acn_avg = 'N/A';
    let chain1_temp = 'N/A';
    let chain2_temp = 'N/A';
    let chain3_temp = 'N/A';
    let chain1_temp_pcb = 'N/A';
    let chain2_temp_pcb = 'N/A';
    let chain3_temp_pcb = 'N/A';
    let temp_avg = 'N/A';
    let chain1_acs = 'N/A';
    let chain2_acs = 'N/A';
    let chain3_acs = 'N/A';
    let fan1 = 'N/A';
    let fan2 = 'N/A';
    let fan3 = 'N/A';
    let fan4 = 'N/A';
    let fan_avg = 'N/A';
    let pool1 = 'N/A';
    let pool2 = 'N/A';
    let pool3 = 'N/A';
    let pool4 = 'N/A';
    let pool1getworks = 0;
    let pool2getworks = 0;
    let pool3getworks = 0;
    let pool4getworks = 0;
    let pool1accepted = 0;
    let pool2accepted = 0;
    let pool3accepted = 0;
    let pool4accepted = 0;
    let pool1rejected = 0;
    let pool2rejected = 0;
    let pool3rejected = 0;
    let pool4rejected = 0;
    let pool1works = 0;
    let pool2works = 0;
    let pool3works = 0;
    let pool4works = 0;
    let pool1discarded = 0;
    let pool2discarded = 0;
    let pool3discarded = 0;
    let pool4discarded = 0;
    let pool1stale = 0;
    let pool2stale = 0;
    let pool3stale = 0;
    let pool4stale = 0;
    let pool1user = 'N/A';
    let pool2user = 'N/A';
    let pool3user = 'N/A';
    let pool4user = 'N/A';
    let pool1ghs = 0.0;
    let pool2ghs = 0.0;
    let pool3ghs = 0.0;
    let pool4ghs = 0.0;
    let pool1difficultyAccepted = 0;
    let pool2difficultyAccepted = 0;
    let pool3difficultyAccepted = 0;
    let pool4difficultyAccepted = 0;
    let chain1_consumption = 0;
    let chain2_consumption = 0;
    let chain3_consumption = 0;
    let consumption = 0;
    let firmware = 'N/A';
    let software = 'N/A';
    let hardware = 'N/A';

    // -----------------
    // New Pool Data
    // -----------------
    let pool1getFailures = 0;
    let pool1remoteFailures = 0;
    let pool1diff = 'N/A';
    let pool1diff1Shares = 0;
    let pool1difficultyRejected = 0;
    let pool1difficultyStale = 0;
    let pool1lastShareDifficulty = 0;
    let pool1workDifficulty = 0;
    let pool1hasStratum = false;
    let pool1stratumActive = false;
    let pool1stratumUrl = 'N/A';
    let pool1stratumDifficulty = 0;
    let pool1bestShare = 0;
    let pool1rejectedPercentage = 0;
    let pool1stalePercentage = 0;
    let pool1badWork = 0;
    let pool1currentBlockHeight = 0;
    let pool1currentBlockVersion = 0;

    let pool2getFailures = 0;
    let pool2remoteFailures = 0;
    let pool2diff = 'N/A';
    let pool2diff1Shares = 0;
    let pool2difficultyRejected = 0;
    let pool2difficultyStale = 0;
    let pool2lastShareDifficulty = 0;
    let pool2workDifficulty = 0;
    let pool2hasStratum = false;
    let pool2stratumActive = false;
    let pool2stratumUrl = 'N/A';
    let pool2stratumDifficulty = 0;
    let pool2bestShare = 0;
    let pool2rejectedPercentage = 0;
    let pool2stalePercentage = 0;
    let pool2badWork = 0;
    let pool2currentBlockHeight = 0;
    let pool2currentBlockVersion = 0;

    let pool3getFailures = 0;
    let pool3remoteFailures = 0;
    let pool3diff = 'N/A';
    let pool3diff1Shares = 0;
    let pool3difficultyRejected = 0;
    let pool3difficultyStale = 0;
    let pool3lastShareDifficulty = 0;
    let pool3workDifficulty = 0;
    let pool3hasStratum = false;
    let pool3stratumActive = false;
    let pool3stratumUrl = 'N/A';
    let pool3stratumDifficulty = 0;
    let pool3bestShare = 0;
    let pool3rejectedPercentage = 0;
    let pool3stalePercentage = 0;
    let pool3badWork = 0;
    let pool3currentBlockHeight = 0;
    let pool3currentBlockVersion = 0;

    let pool4getFailures = 0;
    let pool4remoteFailures = 0;
    let pool4diff = 'N/A';
    let pool4diff1Shares = 0;
    let pool4difficultyRejected = 0;
    let pool4difficultyStale = 0;
    let pool4lastShareDifficulty = 0;
    let pool4workDifficulty = 0;
    let pool4hasStratum = false;
    let pool4stratumActive = false;
    let pool4stratumUrl = 'N/A';
    let pool4stratumDifficulty = 0;
    let pool4bestShare = 0;
    let pool4rejectedPercentage = 0;
    let pool4stalePercentage = 0;
    let pool4badWork = 0;
    let pool4currentBlockHeight = 0;
    let pool4currentBlockVersion = 0;

    const stats = data.stats[0].STATS;
    let found = [] as any;
    let isAvalon = false;
    let isAntMiner = false;
    let isWhatsMiner = false;

    if (stats) {
      found = stats.find((o) => o.STATS === 0);
      isAvalon = found.ID == 'AVA100' ? true : false;

      if (!isAvalon) isAntMiner = true;
    } else {
      isWhatsMiner = data.stats[0].STATS == undefined;
      isAvalon = false;
      isAntMiner = false;
    }

    asicModel = found.ID ? found.ID : 'N/A';

    // If device is an Avalon
    if (isAvalon) {
      const d = found['MM ID0'];
      status = this.getValueAvalon('SYSTEMSTATU', d);
      asicModel = data.version[0].VERSION[0].PROD;
      code = asicModel.replace('AvalonMiner ', 'A');
      ghs = this.getValueAvalon('GHSmm', d);
      ghsAvg = this.getValueAvalon('GHSavg', d);
      elapsed = this.getValueAvalon('Elapsed', d);
      chain1_temp = this.getValueAvalon('Temp', d);
      fan1 = this.getValueAvalon('Fan1', d);
      fan2 = this.getValueAvalon('Fan2', d);
      fan_avg = ((parseInt(fan1) + parseInt(fan2)) / 2).toString();

      const elapsedRaw = this.getValueAvalon('Elapsed', d);

      pool1 = data.pools[0].POOLS[0].URL;
      pool1getworks = data.pools[0].POOLS[0].Getworks;
      pool1accepted = data.pools[0].POOLS[0].Accepted;
      pool1rejected = data.pools[0].POOLS[0].Rejected;
      pool1works = data.pools[0].POOLS[0].Works;
      pool1discarded = data.pools[0].POOLS[0].Discarded;
      pool1stale = data.pools[0].POOLS[0].Stale;
      pool1user = data.pools[0].POOLS[0].User;
      pool1difficultyAccepted = +data.pools[0].POOLS[0]['Difficulty Accepted'];
      pool1ghs =
        (+pool1difficultyAccepted * (2 ** 32 / +elapsedRaw)) / 1000000000;

      pool1getFailures = +data.pools[0].POOLS[0]['Get Failures'];
      pool1remoteFailures = +data.pools[0].POOLS[0]['Remote Failures'];
      pool1diff = data.pools[0].POOLS[0]['Diff'];
      pool1diff1Shares = +data.pools[0].POOLS[0]['Diff1 Shares'];
      pool1difficultyRejected = +data.pools[0].POOLS[0]['Difficulty Rejected'];
      pool1difficultyStale = +data.pools[0].POOLS[0]['Difficulty Stale'];
      pool1lastShareDifficulty =
        +data.pools[0].POOLS[0]['Last Share Difficulty'];
      pool1workDifficulty = +data.pools[0].POOLS[0]['Work Difficulty'];
      pool1hasStratum = data.pools[0].POOLS[0]['Has Stratum'];
      pool1stratumActive = data.pools[0].POOLS[0]['Stratum Active'];
      pool1stratumUrl = data.pools[0].POOLS[0]['Stratum URL'];
      pool1stratumDifficulty = data.pools[0].POOLS[0]['Stratum Difficulty'];
      pool1bestShare = data.pools[0].POOLS[0]['Best Share'];
      pool1rejectedPercentage = data.pools[0].POOLS[0]['Pool Rejected%'];
      pool1stalePercentage = data.pools[0].POOLS[0]['Pool Stale%'];
      pool1badWork = data.pools[0].POOLS[0]['Bad Work'];
      pool1currentBlockHeight = data.pools[0].POOLS[0]['Current Block Height'];
      pool1currentBlockVersion =
        data.pools[0].POOLS[0]['Current Block Version'];

      if (data.pools[0].POOLS[1]) {
        pool2 = data.pools[0].POOLS[1].URL;
        pool2getworks = data.pools[0].POOLS[1].Getworks;
        pool2accepted = data.pools[0].POOLS[1].Accepted;
        pool2rejected = data.pools[0].POOLS[1].Rejected;
        pool2works = data.pools[0].POOLS[1].Works;
        pool2discarded = data.pools[0].POOLS[1].Discarded;
        pool2stale = data.pools[0].POOLS[1].Stale;
        pool2user = data.pools[0].POOLS[1].User;
        pool2difficultyAccepted =
          +data.pools[0].POOLS[1]['Difficulty Accepted'];
        pool2ghs =
          (+pool2difficultyAccepted * (2 ** 32 / +elapsedRaw)) / 1000000000;

        pool2getFailures = +data.pools[0].POOLS[1]['Get Failures'];
        pool2remoteFailures = +data.pools[0].POOLS[1]['Remote Failures'];
        pool2diff = data.pools[0].POOLS[1]['Diff'];
        pool2diff1Shares = +data.pools[0].POOLS[1]['Diff1 Shares'];
        pool2difficultyRejected =
          +data.pools[0].POOLS[1]['Difficulty Rejected'];
        pool2difficultyStale = +data.pools[0].POOLS[1]['Difficulty Stale'];
        pool2lastShareDifficulty =
          +data.pools[0].POOLS[1]['Last Share Difficulty'];
        pool2workDifficulty = +data.pools[0].POOLS[1]['Work Difficulty'];
        pool2hasStratum = data.pools[0].POOLS[1]['Has Stratum'];
        pool2stratumActive = data.pools[0].POOLS[1]['Stratum Active'];
        pool2stratumUrl = data.pools[0].POOLS[1]['Stratum URL'];
        pool2stratumDifficulty = data.pools[0].POOLS[1]['Stratum Difficulty'];
        pool2bestShare = data.pools[0].POOLS[1]['Best Share'];
        pool2rejectedPercentage = data.pools[0].POOLS[1]['Pool Rejected%'];
        pool2stalePercentage = data.pools[0].POOLS[1]['Pool Stale%'];
        pool2badWork = data.pools[0].POOLS[1]['Bad Work'];
        pool2currentBlockHeight =
          data.pools[0].POOLS[1]['Current Block Height'];
        pool2currentBlockVersion =
          data.pools[0].POOLS[1]['Current Block Version'];
      }

      if (data.pools[0].POOLS[2]) {
        pool3 = data.pools[0].POOLS[2].URL;
        pool3getworks = data.pools[0].POOLS[2].Getworks;
        pool3accepted = data.pools[0].POOLS[2].Accepted;
        pool3rejected = data.pools[0].POOLS[2].Rejected;
        pool3works = data.pools[0].POOLS[2].Works;
        pool3discarded = data.pools[0].POOLS[2].Discarded;
        pool3stale = data.pools[0].POOLS[2].Stale;
        pool3user = data.pools[0].POOLS[2].User;
        pool3difficultyAccepted =
          +data.pools[0].POOLS[2]['Difficulty Accepted'];
        pool3ghs =
          (+pool3difficultyAccepted * (2 ** 32 / +elapsedRaw)) / 1000000000;

        pool3getFailures = +data.pools[0].POOLS[2]['Get Failures'];
        pool3remoteFailures = +data.pools[0].POOLS[2]['Remote Failures'];
        pool3diff = data.pools[0].POOLS[2]['Diff'];
        pool3diff1Shares = +data.pools[0].POOLS[2]['Diff1 Shares'];
        pool3difficultyRejected =
          +data.pools[0].POOLS[2]['Difficulty Rejected'];
        pool3difficultyStale = +data.pools[0].POOLS[2]['Difficulty Stale'];
        pool3lastShareDifficulty =
          +data.pools[0].POOLS[2]['Last Share Difficulty'];
        pool3workDifficulty = +data.pools[0].POOLS[2]['Work Difficulty'];
        pool3hasStratum = data.pools[0].POOLS[2]['Has Stratum'];
        pool3stratumActive = data.pools[0].POOLS[2]['Stratum Active'];
        pool3stratumUrl = data.pools[0].POOLS[2]['Stratum URL'];
        pool3stratumDifficulty = data.pools[0].POOLS[2]['Stratum Difficulty'];
        pool3bestShare = data.pools[0].POOLS[2]['Best Share'];
        pool3rejectedPercentage = data.pools[0].POOLS[2]['Pool Rejected%'];
        pool3stalePercentage = data.pools[0].POOLS[2]['Pool Stale%'];
        pool3badWork = data.pools[0].POOLS[2]['Bad Work'];
        pool3currentBlockHeight =
          data.pools[0].POOLS[2]['Current Block Height'];
        pool3currentBlockVersion =
          data.pools[0].POOLS[2]['Current Block Version'];
      }

      if (data.pools[0].POOLS[3]) {
        pool4 = data.pools[0].POOLS[3].URL;
        pool4getworks = data.pools[0].POOLS[3].Getworks;
        pool4accepted = data.pools[0].POOLS[3].Accepted;
        pool4rejected = data.pools[0].POOLS[3].Rejected;
        pool4works = data.pools[0].POOLS[3].Works;
        pool4discarded = data.pools[0].POOLS[3].Discarded;
        pool4stale = data.pools[0].POOLS[3].Stale;
        pool4user = data.pools[0].POOLS[3].User;
        pool4difficultyAccepted =
          +data.pools[0].POOLS[3]['Difficulty Accepted'];
        pool4ghs =
          (+pool4difficultyAccepted * (2 ** 32 / +elapsedRaw)) / 1000000000;

        pool4getFailures = +data.pools[0].POOLS[3]['Get Failures'];
        pool4remoteFailures = +data.pools[0].POOLS[3]['Remote Failures'];
        pool4diff = data.pools[0].POOLS[3]['Diff'];
        pool4diff1Shares = +data.pools[0].POOLS[3]['Diff1 Shares'];
        pool4difficultyRejected =
          +data.pools[0].POOLS[3]['Difficulty Rejected'];
        pool4difficultyStale = +data.pools[0].POOLS[3]['Difficulty Stale'];
        pool4lastShareDifficulty =
          +data.pools[0].POOLS[3]['Last Share Difficulty'];
        pool4workDifficulty = +data.pools[0].POOLS[3]['Work Difficulty'];
        pool4hasStratum = data.pools[0].POOLS[3]['Has Stratum'];
        pool4stratumActive = data.pools[0].POOLS[3]['Stratum Active'];
        pool4stratumUrl = data.pools[0].POOLS[3]['Stratum URL'];
        pool4stratumDifficulty = data.pools[0].POOLS[3]['Stratum Difficulty'];
        pool4bestShare = data.pools[0].POOLS[3]['Best Share'];
        pool4rejectedPercentage = data.pools[0].POOLS[3]['Pool Rejected%'];
        pool4stalePercentage = data.pools[0].POOLS[3]['Pool Stale%'];
        pool4badWork = data.pools[0].POOLS[3]['Bad Work'];
        pool4currentBlockHeight =
          data.pools[0].POOLS[3]['Current Block Height'];
        pool4currentBlockVersion =
          data.pools[0].POOLS[3]['Current Block Version'];
      }

      let c = parseInt(this.getValueAvalon('PS', d).split(' ')[4]);
      if (c == 0) {
        if (ghs >= 35000) {
          c = 2380;
        }
        if (ghs >= 30000 && ghs <= 34999) {
          c = 2180;
        }
        if (ghs >= 19000 && ghs <= 29999) {
          c = 1730;
        }
        if (ghs >= 15000 && ghs <= 18999) {
          c = 1730;
        }
        if (ghs >= 15000 && ghs <= 18999) {
          c = 1190;
        }
        if (ghs <= 14999) {
          c = 1090;
        }
      }
      consumption = c;
    }

    if (isAntMiner) {
      // Else, probably an Antminer
      if (found.state) {
        status = found.state;
      }
      asicModel = data.stats[0].STATS[0].Type;
      code = asicModel.split('Antminer ')[1].split(' (')[0];
      ghs = parseFloat(found['GHS 5s']);
      ghsAvg = found['GHS av'];
      elapsed = found['Elapsed'];
      chain1_acn = found['chain_acn1'];
      chain2_acn = found['chain_acn2'];
      chain3_acn = found['chain_acn3'];
      acn_avg = (
        (parseInt(chain1_acn) + parseInt(chain2_acn) + parseInt(chain3_acn)) /
        3
      ).toString();
      chain1_temp = found['temp_chip1'];
      chain2_temp = found['temp_chip2'];
      chain3_temp = found['temp_chip3'];
      chain1_temp_pcb = found['temp_pcb1'];
      chain2_temp_pcb = found['temp_pcb2'];
      chain3_temp_pcb = found['temp_pcb3'];
      chain1_acs = found['chain_acs1'];
      chain2_acs = found['chain_acs2'];
      chain3_acs = found['chain_acs3'];
      fan1 = found['fan1'];
      fan2 = found['fan2'];
      fan3 = found['fan3'];
      fan4 = found['fan4'];
      fan_avg = (
        (parseInt(fan1) + parseInt(fan2) + parseInt(fan3) + parseInt(fan4)) /
        4
      ).toString();
      pool1 = data.pools[0].POOLS[0].URL;
      pool2 = data.pools[0].POOLS[1].URL;
      pool3 = data.pools[0].POOLS[2].URL;
      pool1getworks = data.pools[0].POOLS[0].Getworks;
      pool2getworks = data.pools[0].POOLS[1].Getworks;
      pool3getworks = data.pools[0].POOLS[2].Getworks;
      pool1accepted = data.pools[0].POOLS[0].Accepted;
      pool2accepted = data.pools[0].POOLS[1].Accepted;
      pool3accepted = data.pools[0].POOLS[2].Accepted;
      pool1rejected = data.pools[0].POOLS[0].Rejected;
      pool2rejected = data.pools[0].POOLS[1].Rejected;
      pool3rejected = data.pools[0].POOLS[2].Rejected;
      pool1works = data.pools[0].POOLS[0].Works;
      pool2works = data.pools[0].POOLS[1].Works;
      pool3works = data.pools[0].POOLS[2].Works;
      pool1discarded = data.pools[0].POOLS[0].Discarded;
      pool2discarded = data.pools[0].POOLS[1].Discarded;
      pool3discarded = data.pools[0].POOLS[2].Discarded;
      pool1stale = data.pools[0].POOLS[0].Stale;
      pool2stale = data.pools[0].POOLS[1].Stale;
      pool3stale = data.pools[0].POOLS[2].Stale;
      pool1user = data.pools[0].POOLS[0].User;
      pool2user = data.pools[0].POOLS[1].User;
      pool3user = data.pools[0].POOLS[2].User;
      pool1difficultyAccepted = +data.pools[0].POOLS[0]['Difficulty Accepted'];
      pool2difficultyAccepted = +data.pools[0].POOLS[1]['Difficulty Accepted'];
      pool3difficultyAccepted = +data.pools[0].POOLS[2]['Difficulty Accepted'];
      pool1ghs =
        (+pool1difficultyAccepted * (2 ** 32 / +found['Elapsed'])) / 1000000000;
      pool2ghs =
        (+pool2difficultyAccepted * (2 ** 32 / +found['Elapsed'])) / 1000000000;
      pool3ghs =
        (+pool3difficultyAccepted * (2 ** 32 / +found['Elapsed'])) / 1000000000;
      firmware = moment(new Date(data.stats[0].STATS[0].CompileTime)).format(
        'YYYYMMDD',
      );
      software = data.stats[0].STATS[0].BMMiner
        ? `BMMiner ${data.stats[0].STATS[0].BMMiner}`
        : `Cgminer ${data.stats[0].STATS[0].Cgminer}`;
      hardware = data.stats[0].STATS[0].Miner;

      pool1getFailures = +data.pools[0].POOLS[0]['Get Failures'];
      pool1remoteFailures = +data.pools[0].POOLS[0]['Remote Failures'];
      pool1diff = data.pools[0].POOLS[0]['Diff'];
      pool1diff1Shares = +data.pools[0].POOLS[0]['Diff1 Shares'];
      pool1difficultyRejected = +data.pools[0].POOLS[0]['Difficulty Rejected'];
      pool1difficultyStale = +data.pools[0].POOLS[0]['Difficulty Stale'];
      pool1lastShareDifficulty =
        +data.pools[0].POOLS[0]['Last Share Difficulty'];
      pool1workDifficulty = +data.pools[0].POOLS[0]['Work Difficulty'];
      pool1hasStratum = data.pools[0].POOLS[0]['Has Stratum'];
      pool1stratumActive = data.pools[0].POOLS[0]['Stratum Active'];
      pool1stratumUrl = data.pools[0].POOLS[0]['Stratum URL'];
      pool1stratumDifficulty = data.pools[0].POOLS[0]['Stratum Difficulty'];
      pool1bestShare = data.pools[0].POOLS[0]['Best Share'];
      pool1rejectedPercentage = data.pools[0].POOLS[0]['Pool Rejected%'];
      pool1stalePercentage = data.pools[0].POOLS[0]['Pool Stale%'];
      pool1badWork = data.pools[0].POOLS[0]['Bad Work'];
      pool1currentBlockHeight = data.pools[0].POOLS[0]['Current Block Height'];
      pool1currentBlockVersion =
        data.pools[0].POOLS[0]['Current Block Version'];

      pool2getFailures = +data.pools[0].POOLS[1]['Get Failures'];
      pool2remoteFailures = +data.pools[0].POOLS[1]['Remote Failures'];
      pool2diff = data.pools[0].POOLS[1]['Diff'];
      pool2diff1Shares = +data.pools[0].POOLS[1]['Diff1 Shares'];
      pool2difficultyRejected = +data.pools[0].POOLS[1]['Difficulty Rejected'];
      pool2difficultyStale = +data.pools[0].POOLS[1]['Difficulty Stale'];
      pool2lastShareDifficulty =
        +data.pools[0].POOLS[1]['Last Share Difficulty'];
      pool2workDifficulty = +data.pools[0].POOLS[1]['Work Difficulty'];
      pool2hasStratum = data.pools[0].POOLS[1]['Has Stratum'];
      pool2stratumActive = data.pools[0].POOLS[1]['Stratum Active'];
      pool2stratumUrl = data.pools[0].POOLS[1]['Stratum URL'];
      pool2stratumDifficulty = data.pools[0].POOLS[1]['Stratum Difficulty'];
      pool2bestShare = data.pools[0].POOLS[1]['Best Share'];
      pool2rejectedPercentage = data.pools[0].POOLS[1]['Pool Rejected%'];
      pool2stalePercentage = data.pools[0].POOLS[1]['Pool Stale%'];
      pool2badWork = data.pools[0].POOLS[1]['Bad Work'];
      pool2currentBlockHeight = data.pools[0].POOLS[1]['Current Block Height'];
      pool2currentBlockVersion =
        data.pools[0].POOLS[1]['Current Block Version'];

      pool3getFailures = +data.pools[0].POOLS[2]['Get Failures'];
      pool3remoteFailures = +data.pools[0].POOLS[2]['Remote Failures'];
      pool3diff = data.pools[0].POOLS[2]['Diff'];
      pool3diff1Shares = +data.pools[0].POOLS[2]['Diff1 Shares'];
      pool3difficultyRejected = +data.pools[0].POOLS[2]['Difficulty Rejected'];
      pool3difficultyStale = +data.pools[0].POOLS[2]['Difficulty Stale'];
      pool3lastShareDifficulty =
        +data.pools[0].POOLS[2]['Last Share Difficulty'];
      pool3workDifficulty = +data.pools[0].POOLS[2]['Work Difficulty'];
      pool3hasStratum = data.pools[0].POOLS[2]['Has Stratum'];
      pool3stratumActive = data.pools[0].POOLS[2]['Stratum Active'];
      pool3stratumUrl = data.pools[0].POOLS[2]['Stratum URL'];
      pool3stratumDifficulty = data.pools[0].POOLS[2]['Stratum Difficulty'];
      pool3bestShare = data.pools[0].POOLS[2]['Best Share'];
      pool3rejectedPercentage = data.pools[0].POOLS[2]['Pool Rejected%'];
      pool3stalePercentage = data.pools[0].POOLS[2]['Pool Stale%'];
      pool3badWork = data.pools[0].POOLS[2]['Bad Work'];
      pool3currentBlockHeight = data.pools[0].POOLS[2]['Current Block Height'];
      pool3currentBlockVersion =
        data.pools[0].POOLS[2]['Current Block Version'];

      if (data.pools[0].POOLS[3]) {
        pool4difficultyAccepted =
          +data.pools[0].POOLS[3]['Difficulty Accepted'];
        pool4 = data.pools[0].POOLS[3].URL;
        pool4getworks = data.pools[0].POOLS[3].Getworks;
        pool4accepted = data.pools[0].POOLS[3].Accepted;
        pool4rejected = data.pools[0].POOLS[3].Rejected;
        pool4works = data.pools[0].POOLS[3].Works;
        pool4discarded = data.pools[0].POOLS[3].Discarded;
        pool4stale = data.pools[0].POOLS[3].Stale;
        pool4user = data.pools[0].POOLS[3].User;
        pool4ghs =
          (+pool4difficultyAccepted * (2 ** 32 / +found['Elapsed'])) /
          1000000000;

        pool4getFailures = +data.pools[0].POOLS[3]['Get Failures'];
        pool4remoteFailures = +data.pools[0].POOLS[3]['Remote Failures'];
        pool4diff = data.pools[0].POOLS[3]['Diff'];
        pool4diff1Shares = +data.pools[0].POOLS[3]['Diff1 Shares'];
        pool4difficultyRejected =
          +data.pools[0].POOLS[3]['Difficulty Rejected'];
        pool4difficultyStale = +data.pools[0].POOLS[3]['Difficulty Stale'];
        pool4lastShareDifficulty =
          +data.pools[0].POOLS[3]['Last Share Difficulty'];
        pool4workDifficulty = +data.pools[0].POOLS[3]['Work Difficulty'];
        pool4hasStratum = data.pools[0].POOLS[3]['Has Stratum'];
        pool4stratumActive = data.pools[0].POOLS[3]['Stratum Active'];
        pool4stratumUrl = data.pools[0].POOLS[3]['Stratum URL'];
        pool4stratumDifficulty = data.pools[0].POOLS[3]['Stratum Difficulty'];
        pool4bestShare = data.pools[0].POOLS[3]['Best Share'];
        pool4rejectedPercentage = data.pools[0].POOLS[3]['Pool Rejected%'];
        pool4stalePercentage = data.pools[0].POOLS[3]['Pool Stale%'];
        pool4badWork = data.pools[0].POOLS[3]['Bad Work'];
        pool4currentBlockHeight =
          data.pools[0].POOLS[3]['Current Block Height'];
        pool4currentBlockVersion =
          data.pools[0].POOLS[3]['Current Block Version'];
      }

      const c = [0, 0, 0];

      if (found['chain_consumption1'] != null) {
        c[0] = parseInt(found['chain_consumption1']);
        c[1] = parseInt(found['chain_consumption2']);
        c[2] = parseInt(found['chain_consumption3']);
      } else {
        if (code === 'T19') {
          c[0] = 3150 / 3;
          c[1] = 3150 / 3;
          c[2] = 3150 / 3;
        }
        if (code === 'S19') {
          c[0] = 3250 / 3;
          c[1] = 3250 / 3;
          c[2] = 3250 / 3;
        }
      }

      chain1_consumption = c[0];
      chain2_consumption = c[1];
      chain3_consumption = c[2];

      consumption = c[0] + c[1] + c[2];
    }

    if (isWhatsMiner) {
      // Whatsminer
      let b = data.stats[0].devdetails[0].DEVDETAILS[0].Model;
      b = b.includes('M30S') ? 'M30S' : b;
      const summary = data.stats[0].summary[0].SUMMARY[0];
      status = summary['HS RT'] > 0 ? 'Mining' : 'N/A';
      asicModel = 'WhatsMiner ' + b;
      code = b;
      ghs = summary['HS RT'] / 1000;
      ghsAvg = summary['MHS av'] / 1000;
      elapsed = summary['Elapsed'];
      chain1_temp = summary['Temperature'];
      temp_avg = summary['Chip Temp Avg'];
      fan1 = summary['Fan Speed In'];
      fan2 = summary['Fan Speed Out'];
      fan_avg = ((parseInt(fan1) + parseInt(fan2)) / 2).toString();
      pool1 = data.pools[0].POOLS[0].URL;
      pool2 = data.pools[0].POOLS[1].URL;
      pool3 = data.pools[0].POOLS[2].URL;
      pool1getworks = data.pools[0].POOLS[0].Getworks;
      pool2getworks = data.pools[0].POOLS[1].Getworks;
      pool3getworks = data.pools[0].POOLS[2].Getworks;
      pool1accepted = data.pools[0].POOLS[0].Accepted;
      pool2accepted = data.pools[0].POOLS[1].Accepted;
      pool3accepted = data.pools[0].POOLS[2].Accepted;
      pool1rejected = data.pools[0].POOLS[0].Rejected;
      pool2rejected = data.pools[0].POOLS[1].Rejected;
      pool3rejected = data.pools[0].POOLS[2].Rejected;
      pool1works = data.pools[0].POOLS[0].Works;
      pool2works = data.pools[0].POOLS[1].Works;
      pool3works = data.pools[0].POOLS[2].Works;
      pool1discarded = data.pools[0].POOLS[0].Discarded;
      pool2discarded = data.pools[0].POOLS[1].Discarded;
      pool3discarded = data.pools[0].POOLS[2].Discarded;
      pool1stale = data.pools[0].POOLS[0].Stale;
      pool2stale = data.pools[0].POOLS[1].Stale;
      pool3stale = data.pools[0].POOLS[2].Stale;
      pool1user = data.pools[0].POOLS[0].User;
      pool2user = data.pools[0].POOLS[1].User;
      pool3user = data.pools[0].POOLS[2].User;
      pool1difficultyAccepted =
        +data.pools[0].POOLS[0]['Difficulty Accepted'] / 1000000000;
      pool2difficultyAccepted =
        +data.pools[0].POOLS[1]['Difficulty Accepted'] / 1000000000;
      pool3difficultyAccepted =
        +data.pools[0].POOLS[2]['Difficulty Accepted'] / 1000000000;
      pool1ghs = +pool1difficultyAccepted * (2 ** 32 / +summary['Elapsed']);
      pool2ghs = +pool2difficultyAccepted * (2 ** 32 / +summary['Elapsed']);
      pool3ghs = +pool3difficultyAccepted * (2 ** 32 / +summary['Elapsed']);
      consumption = summary['Power'];
      firmware = data.version[0].Msg.fw_ver;

      pool1getFailures = +data.pools[0].POOLS[0]['Get Failures'];
      pool1remoteFailures = +data.pools[0].POOLS[0]['Remote Failures'];
      pool1diff = data.pools[0].POOLS[0]['Diff'];
      pool1diff1Shares = +data.pools[0].POOLS[0]['Diff1 Shares'];
      pool1difficultyRejected = +data.pools[0].POOLS[0]['Difficulty Rejected'];
      pool1difficultyStale = +data.pools[0].POOLS[0]['Difficulty Stale'];
      pool1lastShareDifficulty =
        +data.pools[0].POOLS[0]['Last Share Difficulty'];
      pool1workDifficulty = +data.pools[0].POOLS[0]['Work Difficulty'];
      pool1hasStratum = data.pools[0].POOLS[0]['Has Stratum'];
      pool1stratumActive = data.pools[0].POOLS[0]['Stratum Active'];
      pool1stratumUrl = data.pools[0].POOLS[0]['Stratum URL'];
      pool1stratumDifficulty = data.pools[0].POOLS[0]['Stratum Difficulty'];
      pool1bestShare = data.pools[0].POOLS[0]['Best Share'];
      pool1rejectedPercentage = data.pools[0].POOLS[0]['Pool Rejected%'];
      pool1stalePercentage = data.pools[0].POOLS[0]['Pool Stale%'];
      pool1badWork = data.pools[0].POOLS[0]['Bad Work'];
      pool1currentBlockHeight = data.pools[0].POOLS[0]['Current Block Height'];
      pool1currentBlockVersion =
        data.pools[0].POOLS[0]['Current Block Version'];

      pool2getFailures = +data.pools[0].POOLS[1]['Get Failures'];
      pool2remoteFailures = +data.pools[0].POOLS[1]['Remote Failures'];
      pool2diff = data.pools[0].POOLS[1]['Diff'];
      pool2diff1Shares = +data.pools[0].POOLS[1]['Diff1 Shares'];
      pool2difficultyRejected = +data.pools[0].POOLS[1]['Difficulty Rejected'];
      pool2difficultyStale = +data.pools[0].POOLS[1]['Difficulty Stale'];
      pool2lastShareDifficulty =
        +data.pools[0].POOLS[1]['Last Share Difficulty'];
      pool2workDifficulty = +data.pools[0].POOLS[1]['Work Difficulty'];
      pool2hasStratum = data.pools[0].POOLS[1]['Has Stratum'];
      pool2stratumActive = data.pools[0].POOLS[1]['Stratum Active'];
      pool2stratumUrl = data.pools[0].POOLS[1]['Stratum URL'];
      pool2stratumDifficulty = data.pools[0].POOLS[1]['Stratum Difficulty'];
      pool2bestShare = data.pools[0].POOLS[1]['Best Share'];
      pool2rejectedPercentage = data.pools[0].POOLS[1]['Pool Rejected%'];
      pool2stalePercentage = data.pools[0].POOLS[1]['Pool Stale%'];
      pool2badWork = data.pools[0].POOLS[1]['Bad Work'];
      pool2currentBlockHeight = data.pools[0].POOLS[1]['Current Block Height'];
      pool2currentBlockVersion =
        data.pools[0].POOLS[1]['Current Block Version'];

      pool3getFailures = +data.pools[0].POOLS[2]['Get Failures'];
      pool3remoteFailures = +data.pools[0].POOLS[2]['Remote Failures'];
      pool3diff = data.pools[0].POOLS[2]['Diff'];
      pool3diff1Shares = +data.pools[0].POOLS[2]['Diff1 Shares'];
      pool3difficultyRejected = +data.pools[0].POOLS[2]['Difficulty Rejected'];
      pool3difficultyStale = +data.pools[0].POOLS[2]['Difficulty Stale'];
      pool3lastShareDifficulty =
        +data.pools[0].POOLS[2]['Last Share Difficulty'];
      pool3workDifficulty = +data.pools[0].POOLS[2]['Work Difficulty'];
      pool3hasStratum = data.pools[0].POOLS[2]['Has Stratum'];
      pool3stratumActive = data.pools[0].POOLS[2]['Stratum Active'];
      pool3stratumUrl = data.pools[0].POOLS[2]['Stratum URL'];
      pool3stratumDifficulty = data.pools[0].POOLS[2]['Stratum Difficulty'];
      pool3bestShare = data.pools[0].POOLS[2]['Best Share'];
      pool3rejectedPercentage = data.pools[0].POOLS[2]['Pool Rejected%'];
      pool3stalePercentage = data.pools[0].POOLS[2]['Pool Stale%'];
      pool3badWork = data.pools[0].POOLS[2]['Bad Work'];
      pool3currentBlockHeight = data.pools[0].POOLS[2]['Current Block Height'];
      pool3currentBlockVersion =
        data.pools[0].POOLS[2]['Current Block Version'];
    }

    return {
      miner: {
        status: status,
        asicModel: asicModel,
        code: code,
        ghs: ghs,
        ghsAvg: ghsAvg,
        consumption: consumption,
        elapsed: elapsed,
        acnAvg: acn_avg,
        fanAvg: fan_avg,
        tempAvg: temp_avg,
        firmware: firmware,
        software: software,
        hardware: hardware,
      },
      chains: [
        {
          id: 1,
          acn: chain1_acn,
          temp: chain1_temp,
          tempPcb: chain1_temp_pcb,
          acs: chain1_acs,
          consumption: chain1_consumption,
        },
        {
          id: 2,
          acn: chain2_acn,
          temp: chain2_temp,
          tempPcb: chain2_temp_pcb,
          acs: chain2_acs,
          consumption: chain2_consumption,
        },
        {
          id: 3,
          acn: chain2_acn,
          temp: chain2_temp,
          tempPcb: chain2_temp_pcb,
          acs: chain2_acs,
          consumption: chain3_consumption,
        },
      ],
      fans: [
        fan1, fan2, fan3, fan4
      ],
      pools: [
        {
          pool: pool1,
          getWorks: pool1getworks,
          accepted: pool1accepted,
          rejected: pool1rejected,
          works: pool1works,
          discarded: pool1discarded,
          stale: pool1stale,
          user: pool1user,
          difficultyAccepted: pool1difficultyAccepted,
          ghs: pool1ghs,
          getFailures: pool1getFailures,
          remoteFailures: pool1remoteFailures,
          diff: pool1diff,
          diff1Shares: pool1diff1Shares,
          difficultyRejected: pool1difficultyRejected,
          difficultyStale: pool1difficultyStale,
          lastShareDifficulty: pool1lastShareDifficulty,
          workDifficulty: pool1workDifficulty,
          hasStratum: pool1hasStratum,
          stratumActive: pool1stratumActive,
          stratumUrl: pool1stratumUrl,
          stratumDifficulty: pool1stratumDifficulty,
          bestShare: pool1bestShare,
          rejectedPercentage: pool1rejectedPercentage,
          stalePercenteage: pool1stalePercentage,
          badWork: pool1badWork,
          currentBlockHeight: pool1currentBlockHeight,
          currentBlockVersion: pool1currentBlockVersion,
        },
        {
          pool: pool2,
          getWorks: pool2getworks,
          accepted: pool2accepted,
          rejected: pool2rejected,
          works: pool2works,
          discarded: pool2discarded,
          stale: pool2stale,
          user: pool2user,
          difficultyAccepted: pool2difficultyAccepted,
          ghs: pool2ghs,
          getFailures: pool2getFailures,
          remoteFailures: pool2remoteFailures,
          diff: pool2diff,
          diff1Shares: pool2diff1Shares,
          difficultyRejected: pool2difficultyRejected,
          difficultyStale: pool2difficultyStale,
          lastShareDifficulty: pool2lastShareDifficulty,
          workDifficulty: pool2workDifficulty,
          hasStratum: pool2hasStratum,
          stratumActive: pool2stratumActive,
          stratumUrl: pool2stratumUrl,
          stratumDifficulty: pool2stratumDifficulty,
          bestShare: pool2bestShare,
          rejectedPercentage: pool2rejectedPercentage,
          stalePercenteage: pool2stalePercentage,
          badWork: pool2badWork,
          currentBlockHeight: pool2currentBlockHeight,
          currentBlockVersion: pool2currentBlockVersion,
        },
        {
          pool: pool3,
          getWorks: pool3getworks,
          accepted: pool3accepted,
          rejected: pool3rejected,
          works: pool3works,
          discarded: pool3discarded,
          stale: pool3stale,
          user: pool3user,
          difficultyAccepted: pool3difficultyAccepted,
          ghs: pool3ghs,
          getFailures: pool3getFailures,
          remoteFailures: pool3remoteFailures,
          diff: pool3diff,
          diff1Shares: pool3diff1Shares,
          difficultyRejected: pool3difficultyRejected,
          difficultyStale: pool3difficultyStale,
          lastShareDifficulty: pool3lastShareDifficulty,
          workDifficulty: pool3workDifficulty,
          hasStratum: pool3hasStratum,
          stratumActive: pool3stratumActive,
          stratumUrl: pool3stratumUrl,
          stratumDifficulty: pool3stratumDifficulty,
          bestShare: pool3bestShare,
          rejectedPercentage: pool3rejectedPercentage,
          stalePercenteage: pool3stalePercentage,
          badWork: pool3badWork,
          currentBlockHeight: pool3currentBlockHeight,
          currentBlockVersion: pool3currentBlockVersion,
        },
        {
          pool: pool4,
          getWorks: pool4getworks,
          accepted: pool4accepted,
          rejected: pool4rejected,
          works: pool4works,
          discarded: pool4discarded,
          stale: pool4stale,
          user: pool4user,
          difficultyAccepted: pool4difficultyAccepted,
          ghs: pool4ghs,
          getFailures: pool4getFailures,
          remoteFailures: pool4remoteFailures,
          diff: pool4diff,
          diff1Shares: pool4diff1Shares,
          difficultyRejected: pool4difficultyRejected,
          difficultyStale: pool4difficultyStale,
          lastShareDifficulty: pool4lastShareDifficulty,
          workDifficulty: pool4workDifficulty,
          hasStratum: pool4hasStratum,
          stratumActive: pool4stratumActive,
          stratumUrl: pool4stratumUrl,
          stratumDifficulty: pool4stratumDifficulty,
          bestShare: pool4bestShare,
          rejectedPercentage: pool4rejectedPercentage,
          stalePercenteage: pool4stalePercentage,
          badWork: pool4badWork,
          currentBlockHeight: pool4currentBlockHeight,
          currentBlockVersion: pool4currentBlockVersion,
        }
      ]
    };
  }

  private getValueAvalon(key, data): any {
    const items = data.split('] ');
    const match = items.find((element) => {
      if (element.includes(key)) {
        return true;
      }
    });
    return match.replace(key + '[', '').trim();
  }
}
