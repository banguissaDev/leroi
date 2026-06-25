"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vendor_entity_1 = require("./entities/vendor.entity");
const document_entity_1 = require("../documents/entities/document.entity");
const vendor_status_enum_1 = require("../common/enums/vendor-status.enum");
let VendorsService = class VendorsService {
    constructor(vendorRepository, documentRepository) {
        this.vendorRepository = vendorRepository;
        this.documentRepository = documentRepository;
    }
    async create(dto, files) {
        if (!files.idDocument?.[0] || !files.registreDocument?.[0]) {
            throw new common_1.BadRequestException('Les deux documents sont obligatoires : pièce d\'identité et registre de commerce.');
        }
        const existing = await this.vendorRepository.findOne({
            where: { email: dto.email },
        });
        if (existing) {
            throw new common_1.ConflictException('Un dossier avec cet email existe déjà. Vérifiez le statut de votre demande.');
        }
        const vendor = this.vendorRepository.create({
            ...dto,
            status: vendor_status_enum_1.VendorStatus.PENDING,
        });
        const savedVendor = await this.vendorRepository.save(vendor);
        const idFile = files.idDocument[0];
        const registreFile = files.registreDocument[0];
        const idDocument = this.documentRepository.create({
            vendor: savedVendor,
            documentType: document_entity_1.DocumentType.ID_DOCUMENT,
            filename: idFile.filename,
            originalName: idFile.originalname,
            mimetype: idFile.mimetype,
            path: idFile.path,
            sizeBytes: idFile.size,
        });
        const registreDocument = this.documentRepository.create({
            vendor: savedVendor,
            documentType: document_entity_1.DocumentType.REGISTRE_COMMERCE,
            filename: registreFile.filename,
            originalName: registreFile.originalname,
            mimetype: registreFile.mimetype,
            path: registreFile.path,
            sizeBytes: registreFile.size,
        });
        await this.documentRepository.save([idDocument, registreDocument]);
        return this.findOne(savedVendor.id);
    }
    async getStatus(id) {
        const vendor = await this.vendorRepository.findOne({
            where: { id },
            select: ['id', 'status', 'rejectReason'],
        });
        if (!vendor) {
            throw new common_1.NotFoundException(`Aucune demande trouvée avec l'identifiant : ${id}`);
        }
        return { id: vendor.id, status: vendor.status, rejectReason: vendor.rejectReason };
    }
    async findOne(id) {
        const vendor = await this.vendorRepository.findOne({
            where: { id },
            relations: ['documents'],
        });
        if (!vendor) {
            throw new common_1.NotFoundException(`Fournisseur introuvable : ${id}`);
        }
        return vendor;
    }
};
exports.VendorsService = VendorsService;
exports.VendorsService = VendorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vendor_entity_1.Vendor)),
    __param(1, (0, typeorm_1.InjectRepository)(document_entity_1.Document)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], VendorsService);
//# sourceMappingURL=vendors.service.js.map