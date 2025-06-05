import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/database/prisma.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { UserOwnershipGuard } from 'src/common/guards/user-ownership.guard';
@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    JwtAuthGuard,
    JwtStrategy,
    UserOwnershipGuard,
  ],
})
export class UsersModule {}
