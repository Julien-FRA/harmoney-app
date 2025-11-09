import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { HouseholdMembersService } from 'src/modules/household_members/services/household_members.service';
import { CurrentUserPayload } from '../decorators/current-user.decorator';

@Injectable()
export class HouseholdMemberGuard implements CanActivate {
  constructor(
    private readonly householdMembersService: HouseholdMembersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user: CurrentUserPayload = req.user;

    if (!user) {
      throw new ForbiddenException('Utilisateur non authentifié');
    }

    // Récupérer l'ID du household depuis les paramètres ou le body
    const householdId =
      req.params?.householdId ||
      req.body?.householdId ||
      req.query?.householdId;

    if (!householdId) {
      throw new ForbiddenException("L'ID du foyer est requis");
    }

    // Vérifier que l'utilisateur est membre du household
    const members = await this.householdMembersService.findByHouseholdId(
      householdId,
    );

    const isMember = members.some(
      (member) => member.userId === user.id || member.user.id === user.id,
    );

    if (!isMember) {
      throw new ForbiddenException(
        "Vous n'êtes pas membre de ce foyer",
      );
    }

    return true;
  }
}

