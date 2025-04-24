import { Module } from '@nestjs/common';
import { SavePostService } from './service/save-post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { User } from 'src/user/entity/user.entity';
import { PostService } from './service/post.service';
import { QueryPostService } from './service/query-post.service';
import { Comment } from 'src/comment/entity/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Comment])],
  controllers: [PostController],
  providers: [PostService, SavePostService, QueryPostService],
})
export class PostModule {}
