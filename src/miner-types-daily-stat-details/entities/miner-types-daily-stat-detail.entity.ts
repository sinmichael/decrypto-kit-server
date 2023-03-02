import { MinerTypesDailyStat } from "src/miner-types-daily-stats/entities/miner-types-daily-stat.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MinerTypesDailyStatDetail extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => MinerTypesDailyStat, (minerTypesDailyStat) => minerTypesDailyStat.minerTypesDailyStatDetails)
    minerTypesDailyStat: MinerTypesDailyStat;

    @Column({ nullable: true })
    type: string;

    @Column()
    count: number;
  
    @Column({ nullable: true })
    code: string;

    @Column({ type: 'numeric', precision: 32, scale: 2 })
    ghs: number;
  
    @Column({ type: 'numeric', precision: 32, scale: 2 })
    ghsAvg: number;
  
    @Column({ default: 0 })
    consumption: number;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
  
    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt: Date;
}
