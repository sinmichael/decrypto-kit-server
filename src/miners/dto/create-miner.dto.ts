import { IsBooleanString, IsNumberString, IsString } from 'class-validator';
import { Switch } from 'src/switches/entities/switch.entity';

export class CreateMinerDto {
  @IsString()
  ipAddress: string;

  @IsString()
  macAddress: string;

  @IsString()
  type: string;

  @IsString()
  code: string;

  switch_: Switch;

  @IsNumberString()
  switchPort: number;

  @IsNumberString()
  x: number;

  @IsNumberString()
  y: number;

  @IsString()
  status: string;

  @IsNumberString()
  ghs: number;

  @IsNumberString()
  ghsAvg: number;

  @IsNumberString()
  consumption: number;

  @IsNumberString()
  elapsed: number;

  @IsString()
  chain1Acn: string;

  @IsString()
  chain2Acn: string;

  @IsString()
  chain3Acn: string;

  @IsString()
  acnAvg: string;

  @IsString()
  chain1Temp: string;

  @IsString()
  chain2Temp: string;

  @IsString()
  chain3Temp: string;

  @IsString()
  chain1TempPcb: string;

  @IsString()
  chain2TempPcb: string;

  @IsString()
  chain3TempPcb: string;

  @IsString()
  tempAvg: string;

  @IsString()
  chain1Acs: string;

  @IsString()
  chain2Acs: string;

  @IsString()
  chain3Acs: string;

  @IsNumberString()
  fan1: number;

  @IsNumberString()
  fan2: number;

  @IsNumberString()
  fan3: number;

  @IsNumberString()
  fan4: number;

  @IsString()
  fanAvg: string;

  @IsString()
  pool1: string;

  @IsString()
  pool2: string;

  @IsString()
  pool3: string;

  @IsString()
  pool4: string;

  @IsNumberString()
  pool1getworks: number;

  @IsNumberString()
  pool2getworks: number;

  @IsNumberString()
  pool3getworks: number;

  @IsNumberString()
  pool4getworks: number;

  @IsNumberString()
  pool1accepted: number;

  @IsNumberString()
  pool2accepted: number;

  @IsNumberString()
  pool3accepted: number;

  @IsNumberString()
  pool4accepted: number;

  @IsNumberString()
  pool1rejected: number;

  @IsNumberString()
  pool2rejected: number;

  @IsNumberString()
  pool3rejected: number;

  @IsNumberString()
  pool4rejected: number;

  @IsNumberString()
  pool1works: number;

  @IsNumberString()
  pool2works: number;

  @IsNumberString()
  pool3works: number;

  @IsNumberString()
  pool4works: number;

  @IsNumberString()
  pool1discarded: number;

  @IsNumberString()
  pool2discarded: number;

  @IsNumberString()
  pool3discarded: number;

  @IsNumberString()
  pool4discarded: number;

  @IsNumberString()
  pool1stale: number;

  @IsNumberString()
  pool2stale: number;

  @IsNumberString()
  pool3stale: number;

  @IsNumberString()
  pool4stale: number;

  @IsString()
  pool1user: string;

  @IsString()
  pool2user: string;

  @IsString()
  pool3user: string;

  @IsString()
  pool4user: string;

  @IsNumberString()
  pool1ghs: number;

  @IsNumberString()
  pool2ghs: number;

  @IsNumberString()
  pool3ghs: number;

  @IsNumberString()
  pool4ghs: number;

  @IsNumberString()
  pool1difficultyAccepted: number;

  @IsNumberString()
  pool2difficultyAccepted: number;

  @IsNumberString()
  pool3difficultyAccepted: number;

  @IsNumberString()
  pool4difficultyAccepted: number;

  @IsNumberString()
  pool1getFailures: number;

  @IsNumberString()
  pool1remoteFailures: number;

  @IsString()
  pool1diff: string;

  @IsNumberString()
  pool1diff1Shares: number;

  @IsNumberString()
  pool1difficultyRejected: number;

  @IsNumberString()
  pool1difficultyStale: number;

  @IsNumberString()
  pool1lastShareDifficulty: number;

  @IsNumberString()
  pool1workDifficulty: number;

  @IsBooleanString()
  pool1hasStratum: boolean;

  @IsBooleanString()
  pool1stratumActive: boolean;

  @IsString()
  pool1stratumUrl: string;

  @IsNumberString()
  pool1stratumDifficulty: number;

  @IsNumberString()
  pool1bestShare: number;

  @IsNumberString()
  pool1rejectedPercentage: number;

  @IsNumberString()
  pool1stalePercentage: number;

  @IsNumberString()
  pool1badWork: number;

  @IsNumberString()
  pool1currentBlockHeight: number;

  @IsNumberString()
  pool1currentBlockVersion: number;

  @IsNumberString()
  pool2getFailures: number;

  @IsNumberString()
  pool2remoteFailures: number;

  @IsString()
  pool2diff: string;

  @IsNumberString()
  pool2diff1Shares: number;

  @IsNumberString()
  pool2difficultyRejected: number;

  @IsNumberString()
  pool2difficultyStale: number;

  @IsNumberString()
  pool2lastShareDifficulty: number;

  @IsNumberString()
  pool2workDifficulty: number;

  @IsBooleanString()
  pool2hasStratum: boolean;

  @IsBooleanString()
  pool2stratumActive: boolean;

  @IsString()
  pool2stratumUrl: string;

  @IsNumberString()
  pool2stratumDifficulty: number;

  @IsNumberString()
  pool2bestShare: number;

  @IsNumberString()
  pool2rejectedPercentage: number;

  @IsNumberString()
  pool2stalePercentage: number;

  @IsNumberString()
  pool2badWork: number;

  @IsNumberString()
  pool2currentBlockHeight: number;

  @IsNumberString()
  pool2currentBlockVersion: number;

  @IsNumberString()
  pool3getFailures: number;

  @IsNumberString()
  pool3remoteFailures: number;

  @IsString()
  pool3diff: string;

  @IsNumberString()
  pool3diff1Shares: number;

  @IsNumberString()
  pool3difficultyRejected: number;

  @IsNumberString()
  pool3difficultyStale: number;

  @IsNumberString()
  pool3lastShareDifficulty: number;

  @IsNumberString()
  pool3workDifficulty: number;

  @IsBooleanString()
  pool3hasStratum: boolean;

  @IsBooleanString()
  pool3stratumActive: boolean;

  @IsString()
  pool3stratumUrl: string;

  @IsNumberString()
  pool3stratumDifficulty: number;

  @IsNumberString()
  pool3bestShare: number;

  @IsNumberString()
  pool3rejectedPercentage: number;

  @IsNumberString()
  pool3stalePercentage: number;

  @IsNumberString()
  pool3badWork: number;

  @IsNumberString()
  pool3currentBlockHeight: number;

  @IsNumberString()
  pool3currentBlockVersion: number;

  @IsNumberString()
  pool4getFailures: number;

  @IsNumberString()
  pool4remoteFailures: number;

  @IsString()
  pool4diff: string;

  @IsNumberString()
  pool4diff1Shares: number;

  @IsNumberString()
  pool4difficultyRejected: number;

  @IsNumberString()
  pool4difficultyStale: number;

  @IsNumberString()
  pool4lastShareDifficulty: number;

  @IsNumberString()
  pool4workDifficulty: number;

  @IsBooleanString()
  pool4hasStratum: boolean;

  @IsBooleanString()
  pool4stratumActive: boolean;

  @IsString()
  pool4stratumUrl: string;

  @IsNumberString()
  pool4stratumDifficulty: number;

  @IsNumberString()
  pool4bestShare: number;

  @IsNumberString()
  pool4rejectedPercentage: number;

  @IsNumberString()
  pool4stalePercentage: number;

  @IsNumberString()
  pool4badWork: number;

  @IsNumberString()
  pool4currentBlockHeight: number;

  @IsNumberString()
  pool4currentBlockVersion: number;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  firmware: string;

  @IsString()
  software: string;

  @IsString()
  hardware: string;
}
