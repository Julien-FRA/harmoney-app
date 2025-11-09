import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email de l\'utilisateur',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Nom de l\'utilisateur',
    example: 'John Doe',
    minLength: 3,
    maxLength: 20,
  })
  @IsString({ message: 'Votre nom doit être une chaine de caractère.' })
  @MinLength(3, { message: 'Votre nom doit faire au moins 3 caractères.' })
  @MaxLength(20, { message: 'Votre nom doit faire au maximum 20 caractères.' })
  name: string;

  @ApiProperty({
    description: 'Mot de passe',
    example: 'password123',
    minLength: 3,
  })
  @IsString({
    message: 'Votre mot de passe doit être une chaine de caractère.',
  })
  @MinLength(3, {
    message: 'Votre mot de passe doit faire au moins 3 caractères.',
  })
  password: string;
}
