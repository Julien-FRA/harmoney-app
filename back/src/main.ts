import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration CORS
  app.enableCors({
    origin:
      process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Filtres d'exception globaux
  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new ValidationExceptionFilter(),
  );

  // Validation pipe global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
