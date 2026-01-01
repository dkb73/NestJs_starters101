import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false }) // <--- Change to false
password: string;

  @Prop({ default: 'user' }) // Default role is 'user'
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);