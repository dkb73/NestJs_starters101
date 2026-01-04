import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersWorker } from './orders.worker';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrdersWorker],
})
export class OrdersModule {}
