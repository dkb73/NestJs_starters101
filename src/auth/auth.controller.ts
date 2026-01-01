import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('validate-token')
    @UseGuards(AuthGuard)
    validateToken(@Req() req) {
      // If this endpoint is reached, token is valid (AuthGuard passed)
      return {
        valid: true,
        user: req.user,
        message: 'Token is valid',
      };
    }

    @Get('google')
    @UseGuards(PassportAuthGuard('google'))
    async googleAuth(@Req() req) {}

    @Get('google/callback')
    @UseGuards(PassportAuthGuard('google'))
    googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
    }
}