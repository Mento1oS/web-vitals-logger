import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: ['http://localhost:8000'],
    methods: ['POST'],
    allowedHeaders: ['Content-Type'],
  });

  app.useBodyParser('json', { limit: '1mb' });
  app.useBodyParser('urlencoded', { extended: true, limit: '1mb' });
  await app.listen(3000);
}

bootstrap();
