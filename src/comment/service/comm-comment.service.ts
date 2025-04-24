import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentRequest } from '../dto/request/comment.request';
import { Comment } from '../entity/comment.entity';
import { User } from 'src/user/entity/user.entity';
import { Post } from 'src/post/entity/post.entity';

@Injectable()
export class CommCommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async saveComment(request: CommentRequest, userMail: string) {
    const user = await this.userRepository.findOneBy({ mail: userMail });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const post = await this.postRepository.findOneBy({ id: request.postId });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const newComment = new Comment();
    newComment.content = request.content;
    newComment.post = post;
    newComment.user = user;

    await this.commentRepository.save(newComment);
  }
}
