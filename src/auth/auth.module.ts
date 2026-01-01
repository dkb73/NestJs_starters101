import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; 
import { GoogleStrategy } from './google.strategy';
// Import UsersModule

@Module({
  imports: [
    UsersModule, // We need this to check if users exist
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' }, // Token expires in 60 seconds
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}