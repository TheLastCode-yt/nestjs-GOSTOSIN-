import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { OwnershipGuard } from 'src/common/guards/ownership.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async signupUser(@Body() userData: CreateUserDto): Promise<UserModel> {
    return this.usersService.createUser(userData);
  }

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: UpdateUserDto,
  ): Promise<UserModel> {
    return this.usersService.updateUser({ id: parseInt(id) }, userData);
  }

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser({ id: parseInt(id) });
  }

  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return this.usersService.users({});
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserModel | null> {
    return this.usersService.user({ id: parseInt(id) });
  }
}
