import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from '../vendors/entities/vendor.entity';
import { VendorStatus } from '../common/enums/vendor-status.enum';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
  ) {}

  /**
   * Retourne uniquement les boutiques approuvées, visibles sur l'app.
   * Filtre optionnel par catégorie.
   */
  async findApproved(category?: string): Promise<Partial<Vendor>[]> {
    const query = this.vendorRepository
      .createQueryBuilder('vendor')
      .where('vendor.status = :status', { status: VendorStatus.APPROVED })
      .select([
        'vendor.id',
        'vendor.shopName',
        'vendor.category',
        'vendor.description',
        'vendor.city',
        'vendor.createdAt',
      ])
      .orderBy('vendor.updated_at', 'DESC');

    if (category) {
      query.andWhere('vendor.category = :category', { category });
    }

    return query.getMany();
  }

  /**
   * Retourne le détail public d'une boutique approuvée.
   */
  async findOne(id: string): Promise<Partial<Vendor> | null> {
    return this.vendorRepository.findOne({
      where: { id, status: VendorStatus.APPROVED },
      select: ['id', 'shopName', 'category', 'description', 'city', 'createdAt'],
    });
  }
}
