import { MinerTypesHourlyStat } from "src/miner-types-hourly-stats/entities/miner-types-hourly-stat.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MinerTypesHourlyStatDetail extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => MinerTypesHourlyStat, (minerTypesHourlyStat) => minerTypesHourlyStat.minerTypesHourlyStatDetails)
    minerTypesHourlyStat: MinerTypesHourlyStat;

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
