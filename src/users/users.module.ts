import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // <--- Import this
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './users.schema'; // <--- Import Schema

@Module({
  imports: [
    // Register the schema here
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}