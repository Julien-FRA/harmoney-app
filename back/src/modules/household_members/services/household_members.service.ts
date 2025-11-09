import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { HouseholdMembersRepository } from '../repository/household_members.repository';
import { CreateHouseholdMembersDto } from '../dto/create-household_members.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import { HouseholdService } from 'src/modules/household/services/household.service';

@Injectable()
export class HouseholdMembersService {
  constructor(
    private readonly householdMembersRepository: HouseholdMembersRepository,
    private readonly usersService: UsersService,
    private readonly householdService: HouseholdService,
  ) {}

  async createHouseholdMember(householdMembers: CreateHouseholdMembersDto) {
    const { userId, householdId } = householdMembers;
    await this.verifyExistingUserAndHouseHold(userId, householdId);

    return this.householdMembersRepository.createHouseholdMember(
      householdMembers,
    );
  }

  async findById(id: string) {
    const member = await this.householdMembersRepository.findById(id);
    if (!member) {
      throw new NotFoundException(
        `Membre de foyer avec l'ID ${id} non trouvé`,
      );
    }
    return member;
  }

  async findAll() {
    return this.householdMembersRepository.findAll();
  }

  async findByHouseholdId(householdId: string) {
    if (!householdId) {
      throw new BadRequestException("L'ID du foyer est requis");
    }

    return this.householdMembersRepository.findByHouseholdId(householdId);
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
