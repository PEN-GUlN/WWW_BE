import { PostListResponse } from 'src/post/dto/response/post-list.response';

export class MyPageResponse {
  email: string;

  interest: string;

  posts: PostListResponse;
}
