import { Repository } from 'typeorm';
import { Vendor } from './entities/vendor.entity';
import { Document } from '../documents/entities/document.entity';
import { VendorStatus } from '../common/enums/vendor-status.enum';
import { CreateVendorDto } from './dto/create-vendor.dto';
export declare class VendorsService {
    private readonly vendorRepository;
    private readonly documentRepository;
    constructor(vendorRepository: Repository<Vendor>, documentRepository: Repository<Document>);
    create(dto: CreateVendorDto, files: {
        idDocument?: Express.Multer.File[];
        registreDocument?: Express.Multer.File[];
    }): Promise<Vendor>;
    getStatus(id: string): Promise<{
        id: string;
        status: VendorStatus;
        rejectReason: string | null;
    }>;
    findOne(id: string): Promise<Vendor>;
}
