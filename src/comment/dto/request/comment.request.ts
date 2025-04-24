import { IsNumber, IsString, Length } from 'class-validator';

export class CommentRequest {
  @IsNumber()
  postId: number;

  @Length(1, 500)
  @IsString()
  content: string;
}
