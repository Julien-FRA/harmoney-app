import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { ExpensesService } from '../services/expenses.service';
import { CreateExpensesDto } from '../dto/create-expenses.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { FilterDto } from 'src/common/dto/filter.dto';
import { ExpenseResponseDto } from '../dto/expense-response.dto';
import { PaginatedResponseDto } from 'src/common/dto/pagination.dto';
import { HouseholdMemberGuard } from 'src/common/guards/household-member.guard';

@ApiTags('Expenses')
@ApiBearerAuth('JWT-auth')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post('create')
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'Créer une nouvelle dépense' })
  @ApiResponse({
    status: 201,
    description: 'Dépense créée avec succès',
    type: ExpenseResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 403, description: 'Non autorisé' })
  createExpense(@Body() createExpenseDto: CreateExpensesDto) {
    return this.expensesService.createExpense(createExpenseDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une dépense par ID' })
  @ApiResponse({
    status: 200,
    description: 'Dépense trouvée',
    type: ExpenseResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Dépense non trouvée' })
  findById(@Param('id') id: string) {
    return this.expensesService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les dépenses (avec pagination)' })
  @ApiResponse({
    status: 200,
    description: 'Liste des dépenses',
    type: PaginatedResponseDto<ExpenseResponseDto>,
  })
  @ApiQuery({ name: 'householdId', required: false, type: String })
  findAll(
    @Query() pagination: PaginationDto,
    @Query() filter: FilterDto,
    @Query('householdId') householdId?: string,
  ) {
    return this.expensesService.findAll(pagination, filter, householdId);
  }
}
