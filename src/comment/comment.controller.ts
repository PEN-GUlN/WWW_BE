import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './service/comment.service';
import { CommentRequest } from './dto/request/comment.request';
import { SessionAuthGuard } from 'src/auth/session-auth.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/save')
  @UseGuards(SessionAuthGuard)
  async saveComment(@Body() request: CommentRequest, @Session() session: Record<string, any>) {
    const userMail = session.user.mail;

    await this.commentService.saveComment(request, userMail);
  }

  @HttpCode(204)
  @Delete('/delete/:id')
  @UseGuards(SessionAuthGuard)
  async deleteComment(@Param('id') id: number, @Session() session: Record<string, any>) {
    const userMail = session.user.mail;

    await this.commentService.deleteComment(id, userMail);
  }
}
