import { Module } from '@nestjs/common';
import { SavePostService } from './service/save-post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { User } from 'src/user/entity/user.entity';
import { PostService } from './service/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],

  controllers: [PostController],
  providers: [PostService, SavePostService],
})
export class PostModule {}
