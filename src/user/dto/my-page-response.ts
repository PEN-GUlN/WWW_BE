import { PostListResponse } from 'src/post/dto/response/post-list.response';

export class MyPageResponse {
  mail: string;

  interest: string;

  posts: PostListResponse;
}
