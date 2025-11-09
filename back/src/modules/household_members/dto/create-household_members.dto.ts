import { IsString, IsUUID, IsIn } from 'class-validator';

export class CreateHouseholdMembersDto {
  @IsString({ message: 'Le rôle du membre du foyer est requis.' })
  @IsIn(['admin', 'member'], {
    message: 'Le rôle doit être "admin" ou "member"',
  })
  role: string;

  @IsUUID('4', { message: "L'ID utilisateur doit être un UUID valide" })
  userId: string;

  @IsUUID('4', { message: "L'ID du foyer doit être un UUID valide" })
  householdId: string;
}
