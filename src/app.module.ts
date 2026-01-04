import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // <--- Ensure this is imported
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    // This line creates the connection. If it is missing, your app crashes.
    ConfigModule.forRoot({ isGlobal: true }), // <--- Add this FIRST
    MongooseModule.forRoot(process.env.MONGO_URI!),
    UsersModule,
    AuthModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}