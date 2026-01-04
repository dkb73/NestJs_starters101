import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @IsString({ each: true }) // Ensures every item in the array is a string
  items: string[];

  @IsNumber()
  totalPrice: number;
}