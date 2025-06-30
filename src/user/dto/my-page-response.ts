import { BookmarkListResponse } from 'src/bookmark/dto/response/bookmark-list.response';
import { JobListResponse } from 'src/job/dto/response/get-jobs.response';
import { PostListResponse } from 'src/post/dto/response/post-list.response';

export class MyPageResponse {
  email: string;

  interest: string;

  posts: PostListResponse;

  bookmarkedPosts: BookmarkListResponse;
}
