import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from '../vendors/entities/vendor.entity';
import { VendorStatus } from '../common/enums/vendor-status.enum';
import { RejectVendorDto } from './dto/reject-vendor.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
  ) {}

  /**
   * Liste tous les fournisseurs, avec filtre optionnel par statut.
   */
  async findAll(status?: VendorStatus): Promise<Vendor[]> {
    const query = this.vendorRepository
      .createQueryBuilder('vendor')
      .leftJoinAndSelect('vendor.documents', 'documents')
      .orderBy('vendor.created_at', 'DESC');

    if (status) {
      query.where('vendor.status = :status', { status });
    }

    return query.getMany();
  }

  /**
   * Approuve une boutique — son statut passe à APPROVED.
   * La boutique devient visible via GET /api/shops.
   */
  async approve(id: string): Promise<Vendor> {
    const vendor = await this.findVendorOrFail(id);

    vendor.status = VendorStatus.APPROVED;
    vendor.rejectReason = null;

    return this.vendorRepository.save(vendor);
  }

  /**
   * Rejette une boutique avec un motif obligatoire.
   */
  async reject(id: string, dto: RejectVendorDto): Promise<Vendor> {
    const vendor = await this.findVendorOrFail(id);

    vendor.status = VendorStatus.REJECTED;
    vendor.rejectReason = dto.reason;

    return this.vendorRepository.save(vendor);
  }

  /**
   * Statistiques globales pour le dashboard admin.
   */
  async getStats(): Promise<{
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  }> {
    const [total, pending, approved, rejected] = await Promise.all([
      this.vendorRepository.count(),
      this.vendorRepository.count({ where: { status: VendorStatus.PENDING } }),
      this.vendorRepository.count({ where: { status: VendorStatus.APPROVED } }),
      this.vendorRepository.count({ where: { status: VendorStatus.REJECTED } }),
    ]);

    return { total, pending, approved, rejected };
  }

  // ─── Méthode privée ──────────────────────────────────────────────
  private async findVendorOrFail(id: string): Promise<Vendor> {
    const vendor = await this.vendorRepository.findOne({
      where: { id },
      relations: ['documents'],
    });
    if (!vendor) {
      throw new NotFoundException(`Fournisseur introuvable : ${id}`);
    }
    return vendor;
  }
}
