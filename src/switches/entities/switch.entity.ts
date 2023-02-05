import { Miner } from 'src/miners/entities/miner.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Switch extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ default: false })
  isMeraki: boolean;

  @Column({ default: false })
  isRange: boolean;

  @Column({ nullable: true })
  macAddress: string;

  @Column({ nullable: true })
  serialNumber: string;

  @Column({ nullable: true })
  ipAddressRange1: string;

  @Column({ nullable: true })
  ipAddressRange2: string;

  @Column({ nullable: true })
  model: string;

  @Column({ default: 5 })
  width: number;

  @Column({ default: 6 })
  height: number;

  @OneToMany(() => Miner, (miner) => miner.switch)
  miners: Miner[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;

  @Column({ type: 'timestamptz', default: new Date() })
  lastChecked: Date;
}
