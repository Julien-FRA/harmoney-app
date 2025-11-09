import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ExpensesRepository } from '../repository/expenses.repository';
import { UsersService } from 'src/modules/users/services/users.service';
import { HouseholdService } from 'src/modules/household/services/household.service';
import { CreateExpensesDto } from '../dto/create-expenses.dto';
import { PaginationDto, PaginatedResponseDto } from 'src/common/dto/pagination.dto';
import { FilterDto } from 'src/common/dto/filter.dto';
import { ExpenseResponseDto } from '../dto/expense-response.dto';

@Injectable()
export class ExpensesService {
  constructor(
    private readonly expensesRepository: ExpensesRepository,
    private readonly usersService: UsersService,
    private readonly householdService: HouseholdService,
  ) {}

  async createExpense(expenses: CreateExpensesDto): Promise<ExpenseResponseDto> {
    const { userId, householdId } = expenses;
    await this.verifyExistingUserAndHouseHold(userId, householdId);

    const expense = await this.expensesRepository.createExpenses(expenses);
    return new ExpenseResponseDto(expense);
  }

  async findById(id: string): Promise<ExpenseResponseDto> {
    const expense = await this.expensesRepository.findById(id);
    if (!expense) {
      throw new NotFoundException(`Dépense avec l'ID ${id} non trouvée`);
    }
    return new ExpenseResponseDto(expense);
  }

  async findAll(
    pagination: PaginationDto,
    filter?: FilterDto,
    householdId?: string,
  ): Promise<PaginatedResponseDto<ExpenseResponseDto>> {
    const { data, total } = await this.expensesRepository.findAll(
      pagination,
      filter,
      householdId,
    );

    const expenses = data.map((expense) => new ExpenseResponseDto(expense));
    return new PaginatedResponseDto(expenses, total, pagination);
  }

  private async verifyExistingUserAndHouseHold(
    userId: string,
    householdId: string,
  ) {
    if (!userId || !householdId) {
      throw new BadRequestException(
        "L'ID utilisateur et l'ID du foyer sont requis",
      );
    }

    const existingUser = await this.usersService.findById(userId);
    if (!existingUser) {
      throw new NotFoundException(`Utilisateur avec l'ID ${userId} non trouvé`);
    }

    const existingHousehold = await this.householdService.findById(householdId);
    if (!existingHousehold) {
      throw new NotFoundException(
        `Foyer avec l'ID ${householdId} non trouvé`,
      );
    }
  }
}
