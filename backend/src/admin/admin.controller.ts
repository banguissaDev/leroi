import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { RejectVendorDto } from './dto/reject-vendor.dto';
import { VendorStatus } from '../common/enums/vendor-status.enum';

@Controller('admin/vendors')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /**
   * GET /api/admin/vendors
   * Liste tous les fournisseurs. Filtrable par statut :
   * ?status=pending | approved | rejected
   */
  @Get()
  async findAll(@Query('status') status?: VendorStatus) {
    return this.adminService.findAll(status);
  }

  /**
   * GET /api/admin/stats
   * Statistiques globales (total, pending, approved, rejected).
   */
  @Get('stats')
  async getStats() {
    return this.adminService.getStats();
  }

  /**
   * PATCH /api/admin/vendors/:id/approve
   * Approuve une boutique → elle devient visible sur l'app.
   */
  @Patch(':id/approve')
  async approve(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminService.approve(id);
  }

  /**
   * PATCH /api/admin/vendors/:id/reject
   * Rejette une boutique avec un motif obligatoire.
   */
  @Patch(':id/reject')
  async reject(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() rejectVendorDto: RejectVendorDto,
  ) {
    return this.adminService.reject(id, rejectVendorDto);
  }
}
