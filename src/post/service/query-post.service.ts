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
      order: { id: 'DESC' },
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
      order: { id: 'DESC' },
    });
    const postListResponse = new PostListResponse();

    postListResponse.posts = posts.map((post) => this.mapToJobResponse(post));

    postListResponse.postCnt = posts.length;
    return postListResponse;
  }

  async queryPostById(id: number): Promise<PostDetailResponse> {
    const post = await this.queryPostByIdOrThrow(id);

    const comments = post.comments;

    const postDetailResponse: PostDetailResponse = {
      id: post.id,
      title: post.title,
      content: post.content,
      type: post.type,
      created_at: post.created_at,
      user: {
        mail: post.user.mail,
      },
      comments: comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        created_at: comment.created_at,
        user: {
          mail: comment.user.mail,
        },
      })),
      commentCnt: comments.length,
    };

    return postDetailResponse;
  }

  async queryPostsByUserMail(userMail: string) {
    return this.postRepository.find({
      where: { user: { mail: userMail } },
      relations: ['user'],
      order: { id: 'DESC' },
    });
  }

  private mapToJobResponse(post: Post): PostResponse {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      type: post.type,
      created_at: post.created_at,
      user: {
        mail: post.user.mail,
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
