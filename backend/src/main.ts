import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation globale des DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS pour Expo (mobile + web)
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Préfixe global de l'API
  app.setGlobalPrefix('api');

  const port = process.env.PORT ?? 3001;
  await app.listen(port);

  console.log(`\n🚀 Chezroi Backend démarré sur http://localhost:${port}/api`);
  console.log(`📦 Vendors  : http://localhost:${port}/api/vendors`);
  console.log(`🔑 Admin    : http://localhost:${port}/api/admin/vendors`);
  console.log(`🏪 Boutiques: http://localhost:${port}/api/shops\n`);
}
bootstrap();
