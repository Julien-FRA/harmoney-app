import { IsNumber, IsString, IsUUID, Min, Max } from 'class-validator';

export class CreateExpensesDto {
  @IsString({ message: 'Le titre de la dépense est requis.' })
  title: string;

  @IsNumber({}, { message: 'Le montant de la dépense doit être un nombre.' })
  @Min(0.01, { message: 'Le montant doit être supérieur à 0' })
  @Max(999999.99, { message: 'Le montant est trop élevé' })
  amount: number;

  @IsUUID('4', { message: "L'ID utilisateur doit être un UUID valide" })
  userId: string;

  @IsUUID('4', { message: "L'ID du foyer doit être un UUID valide" })
  householdId: string;
}
