import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/types/jwt.type';

export interface CurrentUserPayload extends JwtPayload {
  id: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CurrentUserPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

