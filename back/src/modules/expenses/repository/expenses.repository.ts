import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExpensesDto } from '../dto/create-expenses.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { FilterDto } from 'src/common/dto/filter.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExpensesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createExpenses(expenseData: CreateExpensesDto) {
    const { title, amount, userId, householdId } = expenseData;
    return this.prisma.expense.create({
      data: {
        title,
        amount,
        author: { connect: { id: userId } },
        household: { connect: { id: householdId } },
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
          },
        },
        household: {
          select: {
            id: true,
            name: true,
            createdAt: true,
          },
        },
        shares: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
              },
            },
          },
        },
      },
    });
  }

  async findById(id: string) {
    return this.prisma.expense.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
          },
        },
        household: {
          select: {
            id: true,
            name: true,
            createdAt: true,
          },
        },
        shares: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
              },
            },
          },
        },
      },
    });
  }

  async findAll(
    pagination: PaginationDto,
    filter?: FilterDto,
    householdId?: string,
  ) {
    const where: Prisma.ExpenseWhereInput = {};

    if (householdId) {
      where.householdId = householdId;
    }

    if (filter?.search) {
      where.title = {
        contains: filter.search,
        mode: 'insensitive',
      };
    }

    if (filter?.minAmount !== undefined || filter?.maxAmount !== undefined) {
      where.amount = {};
      if (filter.minAmount !== undefined) {
        where.amount.gte = filter.minAmount;
      }
      if (filter.maxAmount !== undefined) {
        where.amount.lte = filter.maxAmount;
      }
    }

    if (filter?.startDate || filter?.endDate) {
      where.createdAt = {};
      if (filter.startDate) {
        where.createdAt.gte = new Date(filter.startDate);
      }
      if (filter.endDate) {
        where.createdAt.lte = new Date(filter.endDate);
      }
    }

    const orderBy: Prisma.ExpenseOrderByWithRelationInput = {};
    if (filter?.sortBy) {
      orderBy[filter.sortBy as keyof Prisma.ExpenseOrderByWithRelationInput] =
        filter.sortOrder || 'desc';
    } else {
      orderBy.createdAt = 'desc';
    }

    const [data, total] = await Promise.all([
      this.prisma.expense.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
        orderBy,
        include: {
          author: {
            select: {
              id: true,
              email: true,
              name: true,
              createdAt: true,
            },
          },
          household: {
            select: {
              id: true,
              name: true,
              createdAt: true,
            },
          },
          shares: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  name: true,
                  createdAt: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.expense.count({ where }),
    ]);

    return { data, total };
  }
}
