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
    TypeOrmModule.forFeature([Switch, Miner]),
    MinersModule,
    SettingsModule,
    SwitchesModule,
    JobsModule,
  ],
  controllers: [AppController],
  providers: [Logger, AppService, StatsHelper],
})
export class AppModule {}
