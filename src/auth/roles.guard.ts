import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. What roles are required for this route?
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true; // No roles required, let them pass
    }

    // 2. Who is the user? (AuthGuard attached this earlier)
    const { user } = context.switchToHttp().getRequest();
    
    // 3. Does the user have the role?
    // (Note: In your JWT payload, we need to ensure 'roles' are included. We'll fix that next.)
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}