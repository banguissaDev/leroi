import { VendorStatus } from '../../common/enums/vendor-status.enum';
import { Document } from '../../documents/entities/document.entity';
export declare class Vendor {
    id: string;
    shopName: string;
    category: string;
    description: string;
    fullName: string;
    email: string;
    phone: string;
    city: string;
    status: VendorStatus;
    rejectReason: string | null;
    documents: Document[];
    createdAt: Date;
    updatedAt: Date;
}
