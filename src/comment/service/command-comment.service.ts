import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentRequest } from '../dto/request/comment.request';
import { Comment } from '../entity/comment.entity';
import { PostService } from 'src/post/service/post.service';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class CommandCommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  async saveComment(request: CommentRequest, userMail: string) {
    const user = await this.userService.findUserByMailOrThrow(userMail);
    const post = await this.postService.getPostByIdOrThrow(request.postId);

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
