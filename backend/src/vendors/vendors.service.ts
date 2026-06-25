import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './entities/vendor.entity';
import { Document, DocumentType } from '../documents/entities/document.entity';
import { VendorStatus } from '../common/enums/vendor-status.enum';
import { CreateVendorDto } from './dto/create-vendor.dto';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,

    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  /**
   * Crée un nouveau fournisseur avec ses documents.
   * Vérifie que l'email n'est pas déjà utilisé.
   */
  async create(
    dto: CreateVendorDto,
    files: {
      idDocument?: Express.Multer.File[];
      registreDocument?: Express.Multer.File[];
    },
  ): Promise<Vendor> {
    // Vérification des fichiers requis
    if (!files.idDocument?.[0] || !files.registreDocument?.[0]) {
      throw new BadRequestException(
        'Les deux documents sont obligatoires : pièce d\'identité et registre de commerce.',
      );
    }

    // Vérification unicité email
    const existing = await this.vendorRepository.findOne({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException(
        'Un dossier avec cet email existe déjà. Vérifiez le statut de votre demande.',
      );
    }

    // Création du fournisseur
    const vendor = this.vendorRepository.create({
      ...dto,
      status: VendorStatus.PENDING,
    });
    const savedVendor = await this.vendorRepository.save(vendor);

    // Sauvegarde des documents
    const idFile = files.idDocument[0];
    const registreFile = files.registreDocument[0];

    const idDocument = this.documentRepository.create({
      vendor: savedVendor,
      documentType: DocumentType.ID_DOCUMENT,
      filename: idFile.filename,
      originalName: idFile.originalname,
      mimetype: idFile.mimetype,
      path: idFile.path,
      sizeBytes: idFile.size,
    });

    const registreDocument = this.documentRepository.create({
      vendor: savedVendor,
      documentType: DocumentType.REGISTRE_COMMERCE,
      filename: registreFile.filename,
      originalName: registreFile.originalname,
      mimetype: registreFile.mimetype,
      path: registreFile.path,
      sizeBytes: registreFile.size,
    });

    await this.documentRepository.save([idDocument, registreDocument]);

    return this.findOne(savedVendor.id);
  }

  /**
   * Retourne le statut d'une demande par son ID.
   */
  async getStatus(id: string): Promise<{ id: string; status: VendorStatus; rejectReason: string | null }> {
    const vendor = await this.vendorRepository.findOne({
      where: { id },
      select: ['id', 'status', 'rejectReason'],
    });
    if (!vendor) {
      throw new NotFoundException(`Aucune demande trouvée avec l'identifiant : ${id}`);
    }
    return { id: vendor.id, status: vendor.status, rejectReason: vendor.rejectReason };
  }

  /**
   * Retourne un fournisseur complet avec ses documents.
   */
  async findOne(id: string): Promise<Vendor> {
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
