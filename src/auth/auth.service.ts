import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    // 1. Find the user
    // (Note: Since we haven't built 'findByEmail' in UsersService yet, we need to add it or use findAll.
    // Let's assume we will add findOne to UsersService in a moment.)
    const users = await this.usersService.findAll(); 
    const user = users.find(u => u.email === email);

    // 2. Check "Password" (Mock logic: rejecting if no user found)
    // In real app: await bcrypt.compare(pass, user.password)
    if (!user) {
      throw new UnauthorizedException();
    }

    // 3. Create the Payload (Data inside the card)
    // Inside signIn() method...
const payload = { sub: user['_id'], username: user.email, roles: user.roles }; // <--- Add roles here

    // 4. Generate the Access Token
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
// ==================================================================================================================
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

    // 3. Issue the JWT (Key Card)
    // FIX: We use user! to tell TypeScript "I promise user is not null"
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