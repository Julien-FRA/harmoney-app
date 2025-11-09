import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../users/dto/user-response.dto';
import { HouseholdResponseDto } from '../../household/dto/household-response.dto';

export class ExpenseShareResponseDto {
  @ApiProperty({ description: 'ID du partage', example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ description: 'Montant de la part', example: 15.33 })
  amount: number;

  @ApiProperty({ description: 'Utilisateur concerné', type: UserResponseDto })
  user: UserResponseDto;

  constructor(share: {
    id: string;
    amount: number;
    user: {
      id: string;
      email: string;
      name: string;
      createdAt: Date;
    };
  }) {
    this.id = share.id;
    this.amount = share.amount;
    this.user = new UserResponseDto(share.user);
  }
}

export class ExpenseResponseDto {
  @ApiProperty({ description: 'ID de la dépense', example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ description: 'Titre de la dépense', example: 'Courses du week-end' })
  title: string;

  @ApiProperty({ description: 'Montant de la dépense', example: 45.99 })
  amount: number;

  @ApiProperty({ description: 'Date de création', example: '2025-11-09T20:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Auteur de la dépense', type: UserResponseDto })
  author: UserResponseDto;

  @ApiProperty({ description: 'Foyer concerné', type: HouseholdResponseDto })
  household: HouseholdResponseDto;

  @ApiProperty({ description: 'Parts de la dépense', type: [ExpenseShareResponseDto], required: false })
  shares?: ExpenseShareResponseDto[];

  constructor(expense: {
    id: string;
    title: string;
    amount: number;
    createdAt: Date;
    author: {
      id: string;
      email: string;
      name: string;
      createdAt: Date;
    };
    household: {
      id: string;
      name: string;
      createdAt: Date;
    };
    shares?: Array<{
      id: string;
      amount: number;
      user: {
        id: string;
        email: string;
        name: string;
        createdAt: Date;
      };
    }>;
  }) {
    this.id = expense.id;
    this.title = expense.title;
    this.amount = expense.amount;
    this.createdAt = expense.createdAt;
    this.author = new UserResponseDto(expense.author);
    this.household = new HouseholdResponseDto(expense.household);
    this.shares = expense.shares?.map(
      (share) => new ExpenseShareResponseDto(share),
    );
  }
}

