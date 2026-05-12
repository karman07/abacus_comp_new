import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS
  app.enableCors();

  // ✅ Apply global validation pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // ✅ Swagger config
  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('NestJS Auth API with MongoDB, JWT, Swagger')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
