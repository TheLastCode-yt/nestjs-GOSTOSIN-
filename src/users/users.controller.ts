import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async signupUser(@Body() userData: CreateUserDto): Promise<UserModel> {
    return this.usersService.createUser(userData);
  }
}
