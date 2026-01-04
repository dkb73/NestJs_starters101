import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { RolesGuard } from '../auth/roles.guard'; 
import { Roles } from '../auth/roles.decorator';

// 1. Apply Guards: Token first (Auth), then Role (RBAC)
@UseGuards(AuthGuard('jwt'), RolesGuard) 
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Roles('customer') // 2. Strict Check: Token must have "roles: ['customer']"
  create(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    // req.user comes from JwtStrategy.validate()
    return this.ordersService.placeOrder(req.user.userId, createOrderDto);
  }
}