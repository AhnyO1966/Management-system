import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PROJECT_PORT;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, ()=>console.log((`project running on port:${port}`))
  );
}
bootstrap();
