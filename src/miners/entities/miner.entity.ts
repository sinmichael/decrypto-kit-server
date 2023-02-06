import { Switch } from 'src/switches/entities/switch.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Miner extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'inet' })
  ipAddress: string;

  @Column({ nullable: true })
  macAddress: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  code: string;

  @ManyToOne(() => Switch, (_switch) => _switch.miners)
  switch: Switch;

  @Column()
  switchPort: number;

  @Column({ nullable: true })
  x: number;

  @Column({ nullable: true })
  y: number;

  @Column()
  status: string;

  @Column({ type: 'numeric', precision: 32, scale: 2 })
  ghs: number;

  @Column({ type: 'numeric', precision: 32, scale: 2 })
  ghsAvg: number;

  @Column({ default: 0 })
  consumption: number;

  @Column()
  elapsed: number;

  @Column({ nullable: true })
  chain1Acn: string;

  @Column({ nullable: true })
  chain2Acn: string;

  @Column({ nullable: true })
  chain3Acn: string;

  @Column({ nullable: true })
  acnAvg: string;

  @Column({ nullable: true })
  chain1Temp: string;

  @Column({ nullable: true })
  chain2Temp: string;

  @Column({ nullable: true })
  chain3Temp: string;

  @Column({ nullable: true })
  chain1TempPcb: string;

  @Column({ nullable: true })
  chain2TempPcb: string;

  @Column({ nullable: true })
  chain3TempPcb: string;

  @Column({ nullable: true })
  tempAvg: string;

  @Column({ nullable: true })
  chain1Acs: string;

  @Column({ nullable: true })
  chain2Acs: string;

  @Column({ nullable: true })
  chain3Acs: string;

  @Column({ nullable: true })
  fan1: number;

  @Column({ nullable: true })
  fan2: number;

  @Column({ nullable: true })
  fan3: number;

  @Column({ nullable: true })
  fan4: number;

  @Column({ nullable: true })
  fanAvg: string;

  @Column({ nullable: true })
  pool1: string;

  @Column({ nullable: true })
  pool2: string;

  @Column({ nullable: true })
  pool3: string;

  @Column({ nullable: true })
  pool4: string;

  @Column({ default: 0 })
  pool1getworks: number;

  @Column({ default: 0 })
  pool2getworks: number;

  @Column({ default: 0 })
  pool3getworks: number;

  @Column({ default: 0 })
  pool4getworks: number;

  @Column({ default: 0 })
  pool1accepted: number;

  @Column({ default: 0 })
  pool2accepted: number;

  @Column({ default: 0 })
  pool3accepted: number;

  @Column({ default: 0 })
  pool4accepted: number;

  @Column({ default: 0 })
  pool1rejected: number;

  @Column({ default: 0 })
  pool2rejected: number;

  @Column({ default: 0 })
  pool3rejected: number;

  @Column({ default: 0 })
  pool4rejected: number;

  @Column({ default: 0 })
  pool1works: number;

  @Column({ default: 0 })
  pool2works: number;

  @Column({ default: 0 })
  pool3works: number;

  @Column({ default: 0 })
  pool4works: number;

  @Column({ default: 0 })
  pool1discarded: number;

  @Column({ default: 0 })
  pool2discarded: number;

  @Column({ default: 0 })
  pool3discarded: number;

  @Column({ default: 0 })
  pool4discarded: number;

  @Column({ default: 0 })
  pool1stale: number;

  @Column({ default: 0 })
  pool2stale: number;

  @Column({ default: 0 })
  pool3stale: number;

  @Column({ default: 0 })
  pool4stale: number;

  @Column({ nullable: true })
  pool1user: string;

  @Column({ nullable: true })
  pool2user: string;

  @Column({ nullable: true })
  pool3user: string;

  @Column({ nullable: true })
  pool4user: string;

  @Column({ type: 'numeric', precision: 32, scale: 2, default: 0.0 })
  pool1ghs: number;

  @Column({ type: 'numeric', precision: 32, scale: 2, default: 0.0 })
  pool2ghs: number;

  @Column({ type: 'numeric', precision: 32, scale: 2, default: 0.0 })
  pool3ghs: number;

  @Column({ type: 'numeric', precision: 32, scale: 2, default: 0.0 })
  pool4ghs: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool1difficultyAccepted: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool2difficultyAccepted: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool3difficultyAccepted: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool4difficultyAccepted: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool1getFailures: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool1remoteFailures: number;

  @Column({ default: 'N/A' })
  pool1diff: string;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool1diff1Shares: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool1difficultyRejected: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool1difficultyStale: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool1lastShareDifficulty: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool1workDifficulty: number;

  @Column({ default: false })
  pool1hasStratum: boolean;

  @Column({ default: false })
  pool1stratumActive: boolean;

  @Column({ default: 'N/A' })
  pool1stratumUrl: string;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool1stratumDifficulty: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool1bestShare: number;

  @Column({ type: 'numeric', precision: 32, scale: 4, default: 0 })
  pool1rejectedPercentage: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool1stalePercentage: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool1badWork: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool1currentBlockHeight: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool1currentBlockVersion: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool2getFailures: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool2remoteFailures: number;

  @Column({ nullable: true })
  pool2diff: string;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool2diff1Shares: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool2difficultyRejected: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool2difficultyStale: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool2lastShareDifficulty: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool2workDifficulty: number;

  @Column({ default: false })
  pool2hasStratum: boolean;

  @Column({ default: false })
  pool2stratumActive: boolean;

  @Column({ nullable: true })
  pool2stratumUrl: string;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool2stratumDifficulty: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool2bestShare: number;

  @Column({ type: 'numeric', precision: 32, scale: 4, default: 0 })
  pool2rejectedPercentage: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool2stalePercentage: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool2badWork: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool2currentBlockHeight: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool2currentBlockVersion: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool3getFailures: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool3remoteFailures: number;

  @Column({ nullable: true })
  pool3diff: string;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool3diff1Shares: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool3difficultyRejected: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool3difficultyStale: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool3lastShareDifficulty: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool3workDifficulty: number;

  @Column({ default: false })
  pool3hasStratum: boolean;

  @Column({ default: false })
  pool3stratumActive: boolean;

  @Column({ nullable: true })
  pool3stratumUrl: string;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool3stratumDifficulty: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool3bestShare: number;

  @Column({ type: 'numeric', precision: 32, scale: 4, default: 0 })
  pool3rejectedPercentage: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool3stalePercentage: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool3badWork: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool3currentBlockHeight: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool3currentBlockVersion: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool4getFailures: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool4remoteFailures: number;

  @Column({ nullable: true })
  pool4diff: string;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool4diff1Shares: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool4difficultyRejected: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool4difficultyStale: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool4lastShareDifficulty: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool4workDifficulty: number;

  @Column({ default: false })
  pool4hasStratum: boolean;

  @Column({ default: false })
  pool4stratumActive: boolean;

  @Column({ nullable: true })
  pool4stratumUrl: string;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool4stratumDifficulty: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool4bestShare: number;

  @Column({ type: 'numeric', precision: 32, scale: 4, default: 0 })
  pool4rejectedPercentage: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool4stalePercentage: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool4badWork: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool4currentBlockHeight: number;

  @Column({ type: 'numeric', precision: 32, default: 0 })
  pool4currentBlockVersion: number;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  firmware: string;

  @Column({ nullable: true })
  software: string;

  @Column({ nullable: true })
  hardware: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}
