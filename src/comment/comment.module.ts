import { Module } from '@nestjs/common';
import { Comment } from './entity/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { CommentService } from './service/comment.service';
import { CommCommentService } from './service/comm-comment.service';
import { User } from 'src/user/entity/user.entity';
import { Post } from 'src/post/entity/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Post])],
  controllers: [CommentController],
  providers: [CommentService, CommCommentService],
})
export class CommentModule {}
