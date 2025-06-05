import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/database/prisma.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { PostOwnershipGuard } from 'src/common/guards/post-ownership.guard';

@Module({
  providers: [
    PostsService,
    PrismaService,
    JwtAuthGuard,
    JwtStrategy,
    PostOwnershipGuard,
  ],
  controllers: [PostsController],
})
export class PostsModule {}
