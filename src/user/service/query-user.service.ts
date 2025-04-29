import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { Post } from 'src/post/entity/post.entity';
import { PostListResponse, PostResponse } from 'src/post/dto/response/post-list.response';
import { MyPageResponse } from '../dto/my-page-response';
import { PostService } from 'src/post/service/post.service';

@Injectable()
export class QueryUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly postService: PostService,
  ) {}

  async queryMyPage(userMail: string): Promise<MyPageResponse> {
    const user = await this.queryUserByMailOrThrow(userMail);

    const postsData = await this.queryPostsByUser(user.mail);

    const myPageResponse = new MyPageResponse();

    myPageResponse.mail = user.mail;
    myPageResponse.interest = user.interest;
    myPageResponse.posts = postsData;

    return myPageResponse;
  }

  async queryUserByMailOrThrow(mail: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { mail },
      relations: ['posts'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async queryPostsByUser(userMail: string): Promise<PostListResponse> {
    const posts = await this.postService.getPostsByUserMail(userMail);

    const postsResponse: PostResponse[] = posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      type: post.type,
      created_at: post.created_at,
      user: {
        mail: post.user.mail,
      },
    }));

    return {
      posts: postsResponse,
      postCnt: posts.length,
    };
  }

  async existByMail(mail: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ mail });
    return !!user;
  }
}
