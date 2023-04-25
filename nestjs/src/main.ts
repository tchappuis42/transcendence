import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.setBaseViewsDir(join(__dirname, "..", "views"))
  app.useStaticAssets(join(__dirname, "..", "public"))
  app.setViewEngine("ejs")
  await app.listen(3000);
}
bootstrap();
