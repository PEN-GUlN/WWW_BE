import { Module } from '@nestjs/common';
import { SavePostService } from './service/save-post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { PostService } from './service/post.service';
import { QueryPostService } from './service/query-post.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UserModule],
  controllers: [PostController],
  providers: [PostService, SavePostService, QueryPostService],
  exports: [QueryPostService],
})
export class PostModule {}
