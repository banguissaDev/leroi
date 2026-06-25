import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { VendorStatus } from '../../common/enums/vendor-status.enum';
import { Document } from '../../documents/entities/document.entity';

@Entity('vendors')
export class Vendor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ─── Infos boutique ─────────────────────────────────────────────
  @Column({ name: 'shop_name' })
  shopName: string;

  @Column()
  category: string;

  @Column({ type: 'text' })
  description: string;

  // ─── Infos gérant ────────────────────────────────────────────────
  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  city: string;

  // ─── Statut de la demande ─────────────────────────────────────────
  @Column({
    type: 'enum',
    enum: VendorStatus,
    default: VendorStatus.PENDING,
  })
  status: VendorStatus;

  @Column({ name: 'reject_reason', type: 'text', nullable: true })
  rejectReason: string | null;

  // ─── Relations ───────────────────────────────────────────────────
  @OneToMany(() => Document, (document) => document.vendor, {
    cascade: true,
    eager: true,
  })
  documents: Document[];

  // ─── Timestamps ──────────────────────────────────────────────────
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
