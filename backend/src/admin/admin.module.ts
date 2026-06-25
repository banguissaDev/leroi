import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from '../vendors/entities/vendor.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [
    // Importe directement l'entité Vendor (pas besoin d'importer VendorsModule)
    TypeOrmModule.forFeature([Vendor]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
