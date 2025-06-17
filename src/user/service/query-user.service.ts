import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { PostListResponse, PostResponse } from 'src/post/dto/response/post-list.response';
import { MyPageResponse } from '../dto/my-page-response';
import { PostService } from 'src/post/service/post.service';

@Injectable()
export class QueryUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => PostService))
    private readonly postService: PostService,
  ) {}

  async queryMyPage(userEmail: string): Promise<MyPageResponse> {
    const user = await this.queryUserByEmailOrThrow(userEmail);

    const postsData = await this.queryPostsByUser(user.email);

    const myPageResponse = new MyPageResponse();

    myPageResponse.email = user.email;
    myPageResponse.interest = user.interest;
    myPageResponse.posts = postsData;

    return myPageResponse;
  }

  async queryUserByEmailOrThrow(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['posts'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async queryPostsByUser(userEmail: string): Promise<PostListResponse> {
    const posts = await this.postService.getPostsByUserEmail(userEmail);

    const postsResponse: PostResponse[] = posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      type: post.type,
      tags: post.tags.split(', ').map((tag) => tag.trim()),
      created_at: post.created_at,
      user: {
        email: post.user.email,
      },
    }));

    return {
      posts: postsResponse,
      postCnt: posts.length,
    };
  }

  async existByEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ email });
    return !!user;
  }
}
