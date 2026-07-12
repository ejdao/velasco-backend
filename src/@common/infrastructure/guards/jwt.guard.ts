import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { RSA_SERVICES } from '@common/application/services';
import { ENVIRONMENTS } from '@env';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const token = context.switchToHttp().getRequest().headers.authorization.split(' ')[1];
      const tokenUncrypted = RSA_SERVICES.decryptValue(token);
      jwt.verify(tokenUncrypted, ENVIRONMENTS.secretKey);
      return true;
    } catch (error: any) {
      throw new UnauthorizedException(error.message);
    }
  }
}
