import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CRUD of Tasks')
    .setDescription('Create, read, update and delete tasks')
    .setVersion('1.0')
    .addTag('tasks')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-challenge-ticmas', app, documentFactory);

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
