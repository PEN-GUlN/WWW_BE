import { Type } from 'src/comm/enum/type';
import { CommentResponse } from 'src/comment/dto/response/comment.response';

export class PostDetailResponse {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  type: Type;
  user: {
    mail: string;
  };
  comments: CommentResponse[];
  commentCnt: number;
}
