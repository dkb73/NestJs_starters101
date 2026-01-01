import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './create-user.dto';
import { User } from './users.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Add this inside UsersService class
  async createGoogleUser(email: string, name: string): Promise<User> {
    const newUser = new this.userModel({
      email,
      name,
      roles: ['user'], // Default role
      password: '',    // Empty password for OAuth users
    });
    return newUser.save();
  }
}

