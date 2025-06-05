import { IsString, IsOptional, IsNumber } from 'class-validator';
export class CreatePostDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString
  content?: string;

  @IsNumber()
  authorId: number;
}
