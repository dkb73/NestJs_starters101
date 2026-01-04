import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'default_secret',
    });
  }

  // This runs after the token is verified. 
  // The return value becomes "req.user"
  async validate(payload: any) {
    return { 
      userId: payload.sub, 
      email: payload.username, 
      roles: payload.roles || ['customer'] // Fallback if roles are missing
    };
  }
}