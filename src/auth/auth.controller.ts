import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {}

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
    }
}