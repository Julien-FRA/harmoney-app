import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateHouseholdDto {
  @IsString({ message: 'Le nom du foyer est requis.' })
  @MinLength(2, { message: 'Le nom doit faire au moins 2 caractères.' })
  @MaxLength(50, { message: 'Le nom doit faire au maximum 50 caractères.' })
  name: string;
}
