import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentRequest } from '../dto/request/comment.request';
import { Comment } from '../entity/comment.entity';
import { UserService } from 'src/user/user.service';
import { QueryPostService } from 'src/post/service/query-post.service';

@Injectable()
export class CommCommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly userService: UserService,
    private readonly queryPostService: QueryPostService,
  ) {}

  async saveComment(request: CommentRequest, userMail: string) {
    const user = await this.userService.findUserByMailOrThrow(userMail);
    const post = await this.queryPostService.findPostByIdOrThrow(request.postId);

    const newComment = new Comment();

    newComment.content = request.content;
    newComment.post = post;
    newComment.user = user;

    await this.commentRepository.save(newComment);
  }

  async deleteComment(id: number, userMail: string) {
    const user = await this.userService.findUserByMailOrThrow(userMail);

    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.user.mail !== user.mail) {
      throw new ForbiddenException('Not Your Comment');
    }

    await this.commentRepository.delete(id);
  }
}
