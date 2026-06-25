import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorsModule } from './vendors/vendors.module';
import { AdminModule } from './admin/admin.module';
import { ShopsModule } from './shops/shops.module';
import { DocumentsModule } from './documents/documents.module';

@Module({
  imports: [
    // Variables d'environnement (.env)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // PostgreSQL via TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE', 'chezroi'),
        // Charge automatiquement les entités de tous les modules
        autoLoadEntities: true,
        // En dev uniquement : synchronise le schéma automatiquement
        // ⚠️ Mettre à false en production et utiliser des migrations
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
        logging: configService.get<string>('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),

    // Modules fonctionnels
    VendorsModule,
    AdminModule,
    ShopsModule,
    DocumentsModule,
  ],
})
export class AppModule {}
