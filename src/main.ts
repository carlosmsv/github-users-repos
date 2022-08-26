import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('github-users-repos')
    .setDescription('List users')
    .setVersion('0.0.1')
    .build();

    
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/doc', app, document);
  
  await app.listen(3000);
}

bootstrap();