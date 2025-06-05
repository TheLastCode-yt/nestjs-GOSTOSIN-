import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Post, Prisma } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost(data: {
    title: string;
    content?: string;
    authorId: number;
  }): Promise<Post> {
    try {
      return await this.prisma.post.create({ data });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new BadRequestException('Autor não encontrado');
      }
      throw new BadRequestException('Erro ao criar post');
    }
  }

  async findAllPosts() {
    return this.prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findPostById(id: number) {
    const post = this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!post) {
      throw new BadRequestException('Post nao encontrado');
    }

    return post;
  }

  async findPostByAuthorId(authorId: number) {
    return this.prisma.post.findMany({
      where: {
        authorId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updatePost(id: number, data: Prisma.PostUpdateInput) {
    try {
      return this.prisma.post.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Post com ID ${id} não encontrado`);
      }
      throw new BadRequestException('Erro ao atualizar o post');
    }
  }

  async deletePost(id: number) {
    try {
      await this.prisma.post.delete({ where: { id } });
      return {
        message: `Post com ID ${id} deletado com sucesso`,
        statusCode: 200,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Post com ID ${id} nao encontrado`);
      }
      throw new BadRequestException('Erro ao deletar o post');
    }
  }
}
