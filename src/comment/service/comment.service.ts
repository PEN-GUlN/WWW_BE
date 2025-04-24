import { Injectable } from '@nestjs/common';
import { CommCommentService } from './comm-comment.service';
import { CommentRequest } from '../dto/request/comment.request';

@Injectable()
export class CommentService {
  constructor(private readonly commCommentService: CommCommentService) {}

  async saveComment(request: CommentRequest, userMail: string) {
    return this.commCommentService.saveComment(request, userMail);
  }
}
