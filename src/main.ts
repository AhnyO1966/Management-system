import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PROJECT_PORT;
  const app = await NestFactory.create(AppModule);
  await app.listen(port, ()=>console.log((`project running on port:${port}`))
  );
}
bootstrap();
