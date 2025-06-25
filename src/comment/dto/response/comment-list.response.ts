export class CommentResponse {
  id: number;
  content: string;
  created_at: Date;
  user: {
    email: string;
  };
}

export class CommentListResponse {
  comments: CommentResponse[];
  commentCnt: number;
}
