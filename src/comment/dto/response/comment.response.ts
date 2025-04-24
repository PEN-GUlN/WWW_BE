export class CommentResponse {
  id: number;
  content: string;
  created_at: Date;
  user: {
    mail: string;
  };
}
