import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinersModule } from './miners/miners.module';
import { SettingsModule } from './settings/settings.module';
import { SwitchesModule } from './switches/switches.module';
import { JobsModule } from './jobs/jobs.module';
import { StatsHelper } from './utils/stats-helper';
import { Miner } from './miners/entities/miner.entity';
import { Switch } from './switches/entities/switch.entity';
import { MinerHourlyStatsModule } from './miner-hourly-stats/miner-hourly-stats.module';
import { MinerDailyStatsModule } from './miner-daily-stats/miner-daily-stats.module';
import { StatsModule } from './stats/stats.module';
import { MinerHourlyStat } from './miner-hourly-stats/entities/miner-hourly-stat.entity';
import { MinerDailyStat } from './miner-daily-stats/entities/miner-daily-stat.entity';
import { MinerTypesDailyStatsModule } from './miner-types-daily-stats/miner-types-daily-stats.module';
import { MinerTypesHourlyStatsModule } from './miner-types-hourly-stats/miner-types-hourly-stats.module';
import { MinerTypesHourlyStatDetailsModule } from './miner-types-hourly-stat-details/miner-types-hourly-stat-details.module';
import { MinerTypesDailyStatDetailsModule } from './miner-types-daily-stat-details/miner-types-daily-stat-details.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity.{ts,js}'],
      synchronize: true,
      migrationsRun: true,
      migrations: ['dist/migrations/*.{ts,js}'],
    }),
    TypeOrmModule.forFeature([Switch, Miner, MinerHourlyStat, MinerDailyStat]),
    MinersModule,
    SettingsModule,
    SwitchesModule,
    JobsModule,
    MinerHourlyStatsModule,
    MinerDailyStatsModule,
    StatsModule,
    MinerTypesDailyStatsModule,
    MinerTypesHourlyStatsModule,
    MinerTypesHourlyStatDetailsModule,
    MinerTypesDailyStatDetailsModule,
  ],
  controllers: [AppController],
  providers: [Logger, AppService, StatsHelper],
})
export class AppModule {}
