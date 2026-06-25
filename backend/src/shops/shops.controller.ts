import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ShopsService } from './shops.service';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  /**
   * GET /api/shops
   * Liste publique de toutes les boutiques approuvées.
   * Filtre optionnel : ?category=Électronique
   */
  @Get()
  async findAll(@Query('category') category?: string) {
    return this.shopsService.findApproved(category);
  }

  /**
   * GET /api/shops/:id
   * Détail public d'une boutique approuvée.
   */
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.shopsService.findOne(id);
  }
}
