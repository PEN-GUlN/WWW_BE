import { Type } from 'src/comm/enum/type';
import { CommentResponse } from 'src/comment/dto/response/comment-list.response';

export class PostDetailResponse {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  type: Type;
  tags: string[];
  user: {
    email: string;
  };
  comments: CommentResponse[];
}
