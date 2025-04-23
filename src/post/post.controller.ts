import { Body, Controller, Post, Session } from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostRequest } from './dto/request/post.request';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/save')
  async savePost(@Body() request: PostRequest, @Session() session: Record<string, any>) {
    if (!session.user) {
      throw new Error('로그인 후 사용해주세요.');
    }

    const userMail = session.user.id;

    await this.postService.savePost(request, userMail);
  }
}
