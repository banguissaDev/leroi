import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerVendorOptions } from '../common/config/multer.config';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { VendorsService } from './vendors.service';

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  /**
   * POST /api/vendors/register
   * Soumet une demande d'ouverture de boutique avec les documents.
   */
  @Post('register')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'idDocument', maxCount: 1 },
        { name: 'registreDocument', maxCount: 1 },
      ],
      multerVendorOptions,
    ),
  )
  async register(
    @Body() createVendorDto: CreateVendorDto,
    @UploadedFiles()
    files: {
      idDocument?: Express.Multer.File[];
      registreDocument?: Express.Multer.File[];
    },
  ) {
    return this.vendorsService.create(createVendorDto, files);
  }

  /**
   * GET /api/vendors/status/:id
   * Vérifie le statut d'une demande en cours.
   */
  @Get('status/:id')
  async getStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.vendorsService.getStatus(id);
  }
}
