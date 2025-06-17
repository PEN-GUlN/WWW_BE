export class PostListResponse {
  posts: PostResponse[];
  postCnt: number;
}

export class PostResponse {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  type: string;
  tags: string[];
  user: {
    email: string;
  };
}
