import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ description: 'ID de l\'utilisateur', example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ description: 'Email de l\'utilisateur', example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ description: 'Nom de l\'utilisateur', example: 'John Doe' })
  name: string;

  @ApiProperty({ description: 'Date de création', example: '2025-11-09T20:00:00.000Z' })
  createdAt: Date;

  constructor(user: {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
  }) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.createdAt = user.createdAt;
  }
}

