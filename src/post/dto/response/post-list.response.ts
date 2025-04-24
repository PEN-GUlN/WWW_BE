export class PostListResponse {
  posts: PostResponse[];
  postCnt: number;
}

export class PostResponse {
  id: number;
  title: string;
  content: string;
  type: string;
  created_at: Date;
  user: {
    mail: string;
  };
}
