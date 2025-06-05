import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/database/prisma.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { OwnershipGuard } from 'src/common/guards/ownership.guard';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    JwtAuthGuard,
    JwtStrategy,
    OwnershipGuard,
  ],
})
export class UsersModule {}
