import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entity/post.entity';
import { Repository } from 'typeorm';
import { PostListResponse, PostResponse } from '../dto/response/post-list.response';
import { Type } from 'src/comm/enum/type';
import { Comment } from 'src/comment/entity/comment.entity';
import { PostDetailResponse } from '../dto/response/post-detail.response';

@Injectable()
export class QueryPostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
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
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    const comments = await this.commentRepository.find({
      where: { post },
      relations: ['user'],
      order: { id: 'DESC' },
    });

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
}
