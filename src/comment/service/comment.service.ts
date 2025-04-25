import { Injectable } from '@nestjs/common';
import { CommentRequest } from '../dto/request/comment.request';
import { CommandCommentService } from './command-comment.service';

@Injectable()
export class CommentService {
  constructor(private readonly commandCommentService: CommandCommentService) {}

  async saveComment(request: CommentRequest, userMail: string) {
    return this.commandCommentService.saveComment(request, userMail);
  }

  async deleteComment(id: number, userMail: string) {
    return this.commandCommentService.deleteComment(id, userMail);
  }
}
