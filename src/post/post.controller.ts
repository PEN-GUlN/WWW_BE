import { Body, Controller, Post, Session, UseGuards } from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostRequest } from './dto/request/post.request';
import { SessionAuthGuard } from 'src/auth/session-auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/save')
  @UseGuards(SessionAuthGuard)
  async savePost(@Body() request: PostRequest, @Session() session: Record<string, any>) {
    const userMail = session.user.mail;

    await this.postService.savePost(request, userMail);
  }
}
