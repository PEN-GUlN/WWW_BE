import { Injectable } from '@nestjs/common';
import { SavePostService } from './save-post.service';
import { PostRequest } from '../dto/request/post.request';
import { QueryPostService } from './query-post.service';

@Injectable()
export class PostService {
  constructor(
    private readonly savePostService: SavePostService,
    private readonly queryPostService: QueryPostService,
  ) {}

  async savePost(request: PostRequest, userMail: string) {
    return this.savePostService.savePost(request, userMail);
  }

  async getAllPosts() {
    return this.queryPostService.queryAllPosts();
  }
}
