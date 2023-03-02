import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MinerHourlyStat extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    minerCount: number;

    @Column({ type: 'numeric', precision: 32, scale: 2 })
    ghs: number;

    @Column({ type: 'numeric', precision: 32, scale: 2 })
    ghsAvg: number;

    @Column({ type: 'numeric', precision: 32, scale: 2 })
    consumption: number;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
  
    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt: Date;
}
