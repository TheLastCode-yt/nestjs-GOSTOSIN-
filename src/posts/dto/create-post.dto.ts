import { IsString, IsOptional, IsNumber } from 'class-validator';
export class CreatePostDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsNumber({}, { message: 'authorId deve ser um número' })
  authorId: number;
}
