import { IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class CommentRequest {
  @IsPositive()
  @IsNumber()
  postId: number;

  @Length(1, 500)
  @IsString()
  content: string;
}
