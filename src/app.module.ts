import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // <--- Ensure this is imported
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // This line creates the connection. If it is missing, your app crashes.
    MongooseModule.forRoot('mongodb://mongo:27017/nest-starter'),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}