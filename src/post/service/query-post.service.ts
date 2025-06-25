import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entity/post.entity';
import { Repository } from 'typeorm';
import { PostListResponse, PostResponse } from '../dto/response/post-list.response';
import { Type } from 'src/comm/enum/type';
import { PostDetailResponse } from '../dto/response/post-detail.response';

@Injectable()
export class QueryPostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async queryAllPosts(): Promise<PostListResponse> {
    const posts = await this.postRepository.find({
      relations: ['user'],
      order: { created_at: 'DESC' },
    });
    const postListResponse = new PostListResponse();

    postListResponse.posts = posts.map((post) => this.mapToJobResponse(post));

    postListResponse.postCnt = posts.length;
    return postListResponse;
  }

  async queryPostsByType(type: Type): Promise<PostListResponse> {
    const posts = await this.postRepository.find({
      where: { type },
      relations: ['user'],
      order: { created_at: 'DESC' },
    });

    const postListResponse = new PostListResponse();

    postListResponse.posts = posts.map((post) => this.mapToJobResponse(post));

    postListResponse.postCnt = posts.length;
    return postListResponse;
  }

  async queryPostById(id: number): Promise<PostDetailResponse> {
    const post = await this.queryPostByIdOrThrow(id);

    const postDetailResponse = new PostDetailResponse();
    postDetailResponse.id = post.id;
    postDetailResponse.title = post.title;
    postDetailResponse.content = post.content;
    postDetailResponse.type = post.type;
    postDetailResponse.created_at = post.created_at;
    postDetailResponse.tags = post.tags.split(', ').map((tag) => tag.trim());
    postDetailResponse.user = {
      email: post.user.email,
    };
    postDetailResponse.comments = post.comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      created_at: comment.created_at,
      user: {
        email: comment.user.email,
      },
    }));

    return postDetailResponse;
  }

  async queryPostsByUserEmail(userEmail: string) {
    return this.postRepository.find({
      where: { user: { email: userEmail } },
      relations: ['user'],
      order: { created_at: 'DESC' },
    });
  }

  private mapToJobResponse(post: Post): PostResponse {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      type: post.type,
      created_at: post.created_at,
      tags: post.tags.split(', ').map((tag) => tag.trim()),
      user: {
        email: post.user.email,
      },
    };
  }

  async queryPostByIdOrThrow(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user', 'comments', 'comments.user'],
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }
}
