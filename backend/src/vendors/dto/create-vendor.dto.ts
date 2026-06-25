import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateVendorDto {
  // ─── Infos boutique ─────────────────────────────────────────────
  @IsString()
  @IsNotEmpty({ message: 'Le nom de la boutique est requis.' })
  @MaxLength(100)
  shopName: string;

  @IsString()
  @IsNotEmpty({ message: 'La catégorie est requise.' })
  category: string;

  @IsString()
  @IsNotEmpty({ message: 'La description est requise.' })
  @MinLength(20, { message: 'La description doit contenir au moins 20 caractères.' })
  @MaxLength(1000)
  description: string;

  // ─── Infos gérant ────────────────────────────────────────────────
  @IsString()
  @IsNotEmpty({ message: 'Le nom complet est requis.' })
  fullName: string;

  @IsEmail({}, { message: 'Email invalide.' })
  @IsNotEmpty({ message: "L'email est requis." })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Le téléphone est requis.' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'La ville est requise.' })
  city: string;
}
