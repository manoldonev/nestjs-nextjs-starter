import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfigService, AppConfigServiceKey } from './config/app.config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get config after app is created
  const appConfig = app.get<AppConfigService>(AppConfigServiceKey);
  const { webUrl, port } = appConfig;

  // Enable CORS for local development
  app.enableCors({
    origin: webUrl,
    credentials: true,
  });

  // Global prefix for all routes
  app.setGlobalPrefix('api');

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
      transform: true, // Automatically transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // Automatically convert primitive types
      },
    }),
  );

  // Setup Swagger/OpenAPI documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API Documentation')
    .setVersion('0.1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);

  console.log(`API is running on: http://localhost:${port}/api`);
  console.log(`API Documentation available at: http://localhost:${port}/api/docs`);
}

bootstrap();
