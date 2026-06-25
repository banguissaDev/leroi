import { Repository } from 'typeorm';
import { Vendor } from '../vendors/entities/vendor.entity';
import { VendorStatus } from '../common/enums/vendor-status.enum';
import { RejectVendorDto } from './dto/reject-vendor.dto';
export declare class AdminService {
    private readonly vendorRepository;
    constructor(vendorRepository: Repository<Vendor>);
    findAll(status?: VendorStatus): Promise<Vendor[]>;
    approve(id: string): Promise<Vendor>;
    reject(id: string, dto: RejectVendorDto): Promise<Vendor>;
    getStats(): Promise<{
        total: number;
        pending: number;
        approved: number;
        rejected: number;
    }>;
    private findVendorOrFail;
}
