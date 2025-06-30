import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { PostListResponse, PostResponse } from 'src/post/dto/response/post-list.response';
import { MyPageResponse } from '../dto/my-page-response';
import { PostService } from 'src/post/service/post.service';
import { BookmarkService } from 'src/bookmark/service/bookmark-service';
import { categoryNameInKorean } from 'src/comm/enum/category';

@Injectable()
export class QueryUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => PostService))
    private readonly postService: PostService,
    @Inject(forwardRef(() => BookmarkService))
    private readonly bookmarkService: BookmarkService,
  ) {}

  async queryMyPage(userEmail: string): Promise<MyPageResponse> {
    const user = await this.queryUserByEmailOrThrow(userEmail);

    const postsData = await this.queryPostsByUser(user.email);

    const bookmarkedJobsResponse = await this.bookmarkService.findBookmarksByUser(user.email);
    const bookmarkData = bookmarkedJobsResponse.bookmarks.map((bookmark) => ({
      id: bookmark.id,
      jobInfo: bookmark.jobInfo,
    }));

    const myPageResponse: MyPageResponse = {
      email: user.email,
      interest: categoryNameInKorean[user.interest],
      posts: {
        posts: postsData.posts,
        postCnt: postsData.postCnt,
      },
      bookmarkedPosts: {
        bookmarkCnt: bookmarkData.length,
        bookmarks: bookmarkData,
      },
    };
    console.log('myPageResponse: ', myPageResponse);

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
      commentCnt: post.comments.length,
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
