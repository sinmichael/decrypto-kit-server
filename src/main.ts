import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(port);
}
bootstrap();

// const transportConsole = new winston.transports.Console({
//   format: winston.format.combine(
//     winston.format.colorize({ all: true }),
//     winston.format.timestamp({
//       format: 'MMM-DD-YYYY HH:mm:ss',
//     }),
//     winston.format.printf(
//       (info) => `${[info.timestamp]}: [${info.level}]: ${info.message}`,
//     ),
//   ),
// });

// const app = await NestFactory.create(AppModule, {
//   cors: true,
//   logger: WinstonModule.createLogger({
//     transports: [transportConsole],
//   }),
// });
