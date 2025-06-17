export class CommentResponse {
  id: number;
  content: string;
  created_at: Date;
  user: {
    email: string;
  };
}
