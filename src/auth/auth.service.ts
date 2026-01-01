import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    // 1. Check if user exists
    const users = await this.usersService.findAll();
    let user = users.find((u) => u.email === req.user.email);

    // 2. If not, create them!
    if (!user) {
        console.log('User not found. Creating new Google user in DB...');
        // REAL SAVE to MongoDB
        user = await this.usersService.createGoogleUser(req.user.email, req.user.name);
    }

    // 3. the JWT (Key Card)
    const payload = { 
      sub: user!['_id'], 
      username: user.email, 
      roles: user.roles 
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}