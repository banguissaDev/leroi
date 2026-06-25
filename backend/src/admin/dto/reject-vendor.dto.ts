import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RejectVendorDto {
  @IsString()
  @IsNotEmpty({ message: 'Le motif du rejet est obligatoire.' })
  @MaxLength(500)
  reason: string;
}
