import { UserResponseDto } from '../../users/dto/user-response.dto';
import { HouseholdResponseDto } from '../../household/dto/household-response.dto';

export class ExpenseShareResponseDto {
  id: string;
  amount: number;
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
  id: string;
  title: string;
  amount: number;
  createdAt: Date;
  author: UserResponseDto;
  household: HouseholdResponseDto;
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

