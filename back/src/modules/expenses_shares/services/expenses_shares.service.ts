import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ExpensesService } from 'src/modules/expenses/services/expenses.service';
import { UsersService } from 'src/modules/users/services/users.service';
import { ExpensesSharesRepository } from '../repository/expenses_shares.repository';
import { CreateExpensesSharesDto } from '../dto/create-expenses_shares.dto';

@Injectable()
export class ExpensesSharesService {
  constructor(
    private readonly expensesSharesRepository: ExpensesSharesRepository,
    private readonly expensesService: ExpensesService,
    private readonly usersSerivce: UsersService,
  ) {}

  async createExpensesShare(expenseShareData: CreateExpensesSharesDto) {
    const { expenseId, userId } = expenseShareData;
    await this.verifyExistingExpensesAndUsers(expenseId, userId);

    if (!expenseShareData.amount) {
      throw new BadRequestException('Le montant est requis');
    }

    if (expenseShareData.amount <= 0) {
      throw new BadRequestException('Le montant doit être supérieur à zéro');
    }

    return this.expensesSharesRepository.createExpenseShare(expenseShareData);
  }

  async findById(id: string) {
    const expenseShare = await this.expensesSharesRepository.findById(id);
    if (!expenseShare) {
      throw new NotFoundException(
        `Partage de dépense avec l'ID ${id} non trouvé`,
      );
    }
    return expenseShare;
  }

  async findAll() {
    return this.expensesSharesRepository.findAll();
  }

  private async verifyExistingExpensesAndUsers(
    expenseId: string,
    userId: string,
  ) {
    if (!expenseId || !userId) {
      throw new BadRequestException(
        "L'ID de la dépense et l'ID utilisateur sont requis",
      );
    }

    try {
      await this.expensesService.findById(expenseId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(
          `Dépense avec l'ID ${expenseId} non trouvée`,
        );
      }
      throw error;
    }

    const user = await this.usersSerivce.findById(userId);
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${userId} non trouvé`);
    }
  }
}
