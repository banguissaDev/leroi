import { CreateVendorDto } from './dto/create-vendor.dto';
import { VendorsService } from './vendors.service';
export declare class VendorsController {
    private readonly vendorsService;
    constructor(vendorsService: VendorsService);
    register(createVendorDto: CreateVendorDto, files: {
        idDocument?: Express.Multer.File[];
        registreDocument?: Express.Multer.File[];
    }): Promise<import("./entities/vendor.entity").Vendor>;
    getStatus(id: string): Promise<{
        id: string;
        status: import("../common/enums/vendor-status.enum").VendorStatus;
        rejectReason: string | null;
    }>;
}
