import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(Number(process.env.PORT) ?? 3001);
}
bootstrap();
