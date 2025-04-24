import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostRequest } from './dto/request/post.request';
import { SessionAuthGuard } from 'src/auth/session-auth.guard';
import { Type } from 'src/comm/enum/type';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/save')
  @UseGuards(SessionAuthGuard)
  async savePost(@Body() request: PostRequest, @Session() session: Record<string, any>) {
    const userMail = session.user.mail;

    await this.postService.savePost(request, userMail);
  }

  @Get('/query/all')
  @UseGuards(SessionAuthGuard)
  async getAllPosts() {
    return await this.postService.getAllPosts();
  }

  @Get('/query/:type')
  @UseGuards(SessionAuthGuard)
  async getPostsByType(@Param('type') type: Type) {
    return await this.postService.getPostsByType(type);
  }

  @Get('/query/detail/:id')
  @UseGuards(SessionAuthGuard)
  async getPostById(@Param('id') id: number) {
    return await this.postService.getPostById(id);
  }
}
