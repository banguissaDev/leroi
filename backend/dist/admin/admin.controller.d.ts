import { AdminService } from './admin.service';
import { RejectVendorDto } from './dto/reject-vendor.dto';
import { VendorStatus } from '../common/enums/vendor-status.enum';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    findAll(status?: VendorStatus): Promise<import("../vendors/entities/vendor.entity").Vendor[]>;
    getStats(): Promise<{
        total: number;
        pending: number;
        approved: number;
        rejected: number;
    }>;
    approve(id: string): Promise<import("../vendors/entities/vendor.entity").Vendor>;
    reject(id: string, rejectVendorDto: RejectVendorDto): Promise<import("../vendors/entities/vendor.entity").Vendor>;
}
