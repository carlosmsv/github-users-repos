import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('github-users-repos')
    .setDescription('List users, details and repositories')
    .setVersion('1.0.0')
    .build();

    
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/doc', app, document);
  
  await app.listen(3000);
}

bootstrap();
