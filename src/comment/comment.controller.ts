import { Body, Controller, Post, Session, UseGuards } from '@nestjs/common';
import { CommentService } from './service/comment.service';
import { CommentRequest } from './dto/request/comment.request';
import { SessionAuthGuard } from 'src/auth/session-auth.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/save')
  @UseGuards(SessionAuthGuard)
  async saveComment(@Body() request: CommentRequest, @Session() session: Record<string, any>) {
    const userMail = session.user.mail;

    return await this.commentService.saveComment(request, userMail);
  }
}
