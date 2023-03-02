import { MinerTypesDailyStatDetail } from "src/miner-types-daily-stat-details/entities/miner-types-daily-stat-detail.entity";
import { BaseEntity, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MinerTypesDailyStat extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @OneToMany(() => MinerTypesDailyStatDetail, (minerTypesDailyStatDetails) => minerTypesDailyStatDetails.minerTypesDailyStat)
    minerTypesDailyStatDetails: MinerTypesDailyStatDetail[];

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
  
    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt: Date;
}
