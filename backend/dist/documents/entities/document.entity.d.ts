import { Vendor } from '../../vendors/entities/vendor.entity';
export declare enum DocumentType {
    ID_DOCUMENT = "id_document",
    REGISTRE_COMMERCE = "registre_commerce"
}
export declare class Document {
    id: string;
    vendor: Vendor;
    documentType: DocumentType;
    filename: string;
    originalName: string;
    mimetype: string;
    path: string;
    sizeBytes: number;
    createdAt: Date;
}
