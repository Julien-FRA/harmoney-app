import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ExpensesRepository } from '../repository/expenses.repository';
import { UsersService } from 'src/modules/users/services/users.service';
import { HouseholdService } from 'src/modules/household/services/household.service';
import { CreateExpensesDto } from '../dto/create-expenses.dto';

@Injectable()
export class ExpensesService {
  constructor(
    private readonly expensesRepository: ExpensesRepository,
    private readonly usersService: UsersService,
    private readonly householdService: HouseholdService,
  ) {}

  async createExpense(expenses: CreateExpensesDto) {
    const { userId, householdId } = expenses;
    await this.verifyExistingUserAndHouseHold(userId, householdId);

    return this.expensesRepository.createExpenses(expenses);
  }

  async findById(id: string) {
    const expense = await this.expensesRepository.findById(id);
    if (!expense) {
      throw new NotFoundException(`Dépense avec l'ID ${id} non trouvée`);
    }
    return expense;
  }

  async findAll() {
    return this.expensesRepository.findAll();
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
