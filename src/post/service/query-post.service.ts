import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entity/post.entity';
import { Repository } from 'typeorm';
import { PostListResponse } from '../dto/response/post-list.response';

@Injectable()
export class QueryPostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async queryAllPosts(): Promise<PostListResponse> {
    const posts = await this.postRepository.find({
      relations: ['user'],
    });
    const postListResponse = new PostListResponse();

    postListResponse.posts = posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      type: post.type,
      created_at: post.created_at,
      user: {
        mail: post.user.mail,
      },
    }));

    postListResponse.postCnt = posts.length;
    return postListResponse;
  }
}
