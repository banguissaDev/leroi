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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vendor_entity_1 = require("../vendors/entities/vendor.entity");
const vendor_status_enum_1 = require("../common/enums/vendor-status.enum");
let AdminService = class AdminService {
    constructor(vendorRepository) {
        this.vendorRepository = vendorRepository;
    }
    async findAll(status) {
        const query = this.vendorRepository
            .createQueryBuilder('vendor')
            .leftJoinAndSelect('vendor.documents', 'documents')
            .orderBy('vendor.created_at', 'DESC');
        if (status) {
            query.where('vendor.status = :status', { status });
        }
        return query.getMany();
    }
    async approve(id) {
        const vendor = await this.findVendorOrFail(id);
        vendor.status = vendor_status_enum_1.VendorStatus.APPROVED;
        vendor.rejectReason = null;
        return this.vendorRepository.save(vendor);
    }
    async reject(id, dto) {
        const vendor = await this.findVendorOrFail(id);
        vendor.status = vendor_status_enum_1.VendorStatus.REJECTED;
        vendor.rejectReason = dto.reason;
        return this.vendorRepository.save(vendor);
    }
    async getStats() {
        const [total, pending, approved, rejected] = await Promise.all([
            this.vendorRepository.count(),
            this.vendorRepository.count({ where: { status: vendor_status_enum_1.VendorStatus.PENDING } }),
            this.vendorRepository.count({ where: { status: vendor_status_enum_1.VendorStatus.APPROVED } }),
            this.vendorRepository.count({ where: { status: vendor_status_enum_1.VendorStatus.REJECTED } }),
        ]);
        return { total, pending, approved, rejected };
    }
    async findVendorOrFail(id) {
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
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vendor_entity_1.Vendor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map