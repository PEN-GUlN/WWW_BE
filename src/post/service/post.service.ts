import { Injectable } from '@nestjs/common';

import { PostRequest } from '../dto/request/post.request';
import { QueryPostService } from './query-post.service';
import { Type } from 'src/comm/enum/type';
import { CommandPostService } from './command-post.service';

@Injectable()
export class PostService {
  constructor(
    private readonly commandPostService: CommandPostService,
    private readonly queryPostService: QueryPostService,
  ) {}

  async savePost(request: PostRequest, userEmail: string) {
    return this.commandPostService.savePost(request, userEmail);
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

  async getPostsByUserEmail(userEmail: string) {
    return this.queryPostService.queryPostsByUserEmail(userEmail);
  }
}
