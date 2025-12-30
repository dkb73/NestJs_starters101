import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strips out properties that are NOT in the DTO
    forbidNonWhitelisted: true, // Throws an error if extra properties are sent
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
