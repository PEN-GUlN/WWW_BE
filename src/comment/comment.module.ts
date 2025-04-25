import { Module } from '@nestjs/common';
import { Comment } from './entity/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { CommentService } from './service/comment.service';
import { UserModule } from 'src/user/user.module';
import { PostModule } from 'src/post/post.module';
import { CommandCommentService } from './service/command-comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UserModule, PostModule],
  controllers: [CommentController],
  providers: [CommentService, CommandCommentService],
})
export class CommentModule {}
