import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class UserOwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const paramId = parseInt(request.params.id);

    if (user.userId !== paramId) {
      throw new ForbiddenException('Você só pode gerenciar sua própria conta');
    }

    return true;
  }
}
