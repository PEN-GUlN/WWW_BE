import { Injectable } from '@nestjs/common';
import { SavePostService } from './save-post.service';
import { PostRequest } from '../dto/request/post.request';
import { QueryPostService } from './query-post.service';
import { Type } from 'src/comm/enum/type';

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

  async getPostsByType(type: Type) {
    return this.queryPostService.queryPostsByType(type);
  }

  async getPostById(id: number) {
    return this.queryPostService.queryPostById(id);
  }

  async getPostByIdOrThrow(id: number) {
    return this.queryPostService.queryPostByIdOrThrow(id);
  }

  async getPostsByUserMail(userMail: string) {
    return this.queryPostService.queryPostsByUserMail(userMail);
  }
}
