import { IsNumber, IsUUID, Min, Max } from 'class-validator';

export class CreateExpensesSharesDto {
  @IsUUID('4', { message: "L'ID de la dépense doit être un UUID valide" })
  expenseId: string;

  @IsUUID('4', { message: "L'ID de l'utilisateur doit être un UUID valide" })
  userId: string;

  @IsNumber({}, { message: 'Le montant de la part doit être un nombre.' })
  @Min(0.01, { message: 'Le montant doit être supérieur à 0' })
  @Max(999999.99, { message: 'Le montant est trop élevé' })
  amount: number;
}
