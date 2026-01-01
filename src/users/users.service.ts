import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Add this inside UsersService class
  async createGoogleUser(email: string, name: string): Promise<User> {
    const newUser = new this.userModel({
      email,
      name,
      roles: ['user'], // Default role
    });
    return newUser.save();
  }
}

