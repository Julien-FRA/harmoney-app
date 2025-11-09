import { IsNumber, IsString, IsUUID, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpensesDto {
  @ApiProperty({
    description: 'Titre de la dépense',
    example: 'Courses du week-end',
  })
  @IsString({ message: 'Le titre de la dépense est requis.' })
  title: string;

  @ApiProperty({
    description: 'Montant de la dépense',
    example: 45.99,
    minimum: 0.01,
    maximum: 999999.99,
  })
  @IsNumber({}, { message: 'Le montant de la dépense doit être un nombre.' })
  @Min(0.01, { message: 'Le montant doit être supérieur à 0' })
  @Max(999999.99, { message: 'Le montant est trop élevé' })
  amount: number;

  @ApiProperty({
    description: 'ID de l\'utilisateur (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4', { message: "L'ID utilisateur doit être un UUID valide" })
  userId: string;

  @ApiProperty({
    description: 'ID du foyer (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsUUID('4', { message: "L'ID du foyer doit être un UUID valide" })
  householdId: string;
}
