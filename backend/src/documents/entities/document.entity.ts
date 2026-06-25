import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Vendor } from '../../vendors/entities/vendor.entity';

export enum DocumentType {
  ID_DOCUMENT = 'id_document',
  REGISTRE_COMMERCE = 'registre_commerce',
}

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ─── Relation avec le fournisseur ───────────────────────────────
  @ManyToOne(() => Vendor, (vendor) => vendor.documents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;

  // ─── Informations du fichier ─────────────────────────────────────
  @Column({
    name: 'document_type',
    type: 'enum',
    enum: DocumentType,
  })
  documentType: DocumentType;

  @Column()
  filename: string;

  @Column({ name: 'original_name' })
  originalName: string;

  @Column()
  mimetype: string;

  @Column()
  path: string;

  @Column({ name: 'size_bytes', type: 'bigint' })
  sizeBytes: number;

  // ─── Timestamps ──────────────────────────────────────────────────
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
