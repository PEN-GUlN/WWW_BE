import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { PostController } from './post.controller';
import { PostService } from './service/post.service';
import { QueryPostService } from './service/query-post.service';
import { UserModule } from 'src/user/user.module';
import { CommandPostService } from './service/command-post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), forwardRef(() => UserModule)],
  controllers: [PostController],
  providers: [PostService, CommandPostService, QueryPostService],
  exports: [PostService],
})
export class PostModule {}
