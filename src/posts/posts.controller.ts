import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { PostOwnershipGuard } from 'src/common/guards/post-ownership.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { JwtUser } from 'src/common/interfaces/jwt-user.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@Body() dto: CreatePostDto, @GetUser() user: JwtUser) {
    const userId = parseInt(user.userId, 10);
    return this.postsService.createPost({ ...dto, authorId: userId });
  }

  @Get()
  findAllPosts() {
    return this.postsService.findAllPosts();
  }

  @Get(':id')
  findPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findPostById(id);
  }

  @Get('author/:id')
  findPostByAuthorId(@Param('id', ParseIntPipe) authorId: number) {
    return this.postsService.findPostByAuthorId(authorId);
  }

  @UseGuards(JwtAuthGuard, PostOwnershipGuard)
  @Patch(':id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePostDto,
  ) {
    return this.postsService.updatePost(id, dto);
  }

  @UseGuards(JwtAuthGuard, PostOwnershipGuard)
  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost(id);
  }
}
