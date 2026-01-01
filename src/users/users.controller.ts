import { Controller, Get, Post, Body, UseGuards, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { AuthGuard } from '../auth/auth.guard';
// FIX: Add these two lines
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('users') // Base route: /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard) // Run Auth check, THEN Role check
  @Roles('admin') // <--- Only Admins allowed
  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} user`;
  }
}
