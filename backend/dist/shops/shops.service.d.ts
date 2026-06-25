import { Repository } from 'typeorm';
import { Vendor } from '../vendors/entities/vendor.entity';
export declare class ShopsService {
    private readonly vendorRepository;
    constructor(vendorRepository: Repository<Vendor>);
    findApproved(category?: string): Promise<Partial<Vendor>[]>;
    findOne(id: string): Promise<Partial<Vendor> | null>;
}
