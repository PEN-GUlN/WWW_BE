import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { PostController } from './post.controller';
import { PostService } from './service/post.service';
import { SavePostService } from './service/save-post.service';
import { QueryPostService } from './service/query-post.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), forwardRef(() => UserModule)],
  controllers: [PostController],
  providers: [PostService, SavePostService, QueryPostService],
  exports: [PostService],
})
export class PostModule {}
