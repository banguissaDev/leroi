import { ShopsService } from './shops.service';
export declare class ShopsController {
    private readonly shopsService;
    constructor(shopsService: ShopsService);
    findAll(category?: string): Promise<Partial<import("../vendors/entities/vendor.entity").Vendor>[]>;
    findOne(id: string): Promise<Partial<import("../vendors/entities/vendor.entity").Vendor>>;
}
