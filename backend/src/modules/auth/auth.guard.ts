import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

import { ApiConfigService } from 'src/modules/_setup/config/api-config.service';

type AuthUrlQuery = {
  token?: string;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly config: ApiConfigService) {}

  canActivate(context: ExecutionContext) {
    const request: FastifyRequest = context.switchToHttp().getRequest();
    const authQuery = request.query as AuthUrlQuery;
    const authHeader = request.headers.authorization;

    const providedToken = authHeader ? authHeader.split(' ')[1] : authQuery.token;
    if (providedToken === this.config.get('ACCESS_TOKEN')) return true;

    throw new UnauthorizedException();
  }
}
