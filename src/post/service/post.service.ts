import { Injectable } from '@nestjs/common';
import { SavePostService } from './save-post.service';
import { PostRequest } from '../dto/request/post.request';

@Injectable()
export class PostService {
  constructor(private readonly savePostService: SavePostService) {}

  async savePost(request: PostRequest, userMail: string) {
    return this.savePostService.savePost(request, userMail);
  }
}
