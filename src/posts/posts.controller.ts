import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(@Body() dto: CreatePostDto) {
    return this.postsService.createPost(dto);
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

  @Patch(':id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePostDto,
  ) {
    return this.postsService.updatePost(id, dto);
  }

  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost(id);
  }
}
