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
exports.ShopsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vendor_entity_1 = require("../vendors/entities/vendor.entity");
const vendor_status_enum_1 = require("../common/enums/vendor-status.enum");
let ShopsService = class ShopsService {
    constructor(vendorRepository) {
        this.vendorRepository = vendorRepository;
    }
    async findApproved(category) {
        const query = this.vendorRepository
            .createQueryBuilder('vendor')
            .where('vendor.status = :status', { status: vendor_status_enum_1.VendorStatus.APPROVED })
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
    async findOne(id) {
        return this.vendorRepository.findOne({
            where: { id, status: vendor_status_enum_1.VendorStatus.APPROVED },
            select: ['id', 'shopName', 'category', 'description', 'city', 'createdAt'],
        });
    }
};
exports.ShopsService = ShopsService;
exports.ShopsService = ShopsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vendor_entity_1.Vendor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ShopsService);
//# sourceMappingURL=shops.service.js.map