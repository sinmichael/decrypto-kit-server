import { MinerTypesHourlyStatDetail } from "src/miner-types-hourly-stat-details/entities/miner-types-hourly-stat-detail.entity";
import { BaseEntity, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MinerTypesHourlyStat extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @OneToMany(() => MinerTypesHourlyStatDetail, (minerTypesHourlyStatDetail) => minerTypesHourlyStatDetail.minerTypesHourlyStat)
    minerTypesHourlyStatDetails: MinerTypesHourlyStatDetail[];

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
  
    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt: Date;
}
