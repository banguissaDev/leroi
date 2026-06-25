import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './entities/vendor.entity';
import { Document } from '../documents/entities/document.entity';
import { VendorsController } from './vendors.controller';
import { VendorsService } from './vendors.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vendor, Document]),
  ],
  controllers: [VendorsController],
  providers: [VendorsService],
  // Expose le service pour que AdminModule puisse l'utiliser
  exports: [VendorsService],
})
export class VendorsModule {}
